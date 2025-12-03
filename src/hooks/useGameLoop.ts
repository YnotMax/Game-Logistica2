import { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, Task, Order, Truck, Position } from '../types';
import { initializeGameState, getCell, getManhattanDistance } from '../utils/gameInit';
import {
    generateRandomOrder,
    generateRandomTruck,
    shouldGenerateOrder,
    shouldGenerateTruck
} from '../utils/eventGenerator';
import { ITEM_CATALOG } from '../data/items';

const GAME_TICK_INTERVAL = 100; // 100ms = 10 ticks por segundo
const TIME_MULTIPLIER = 60; // 1 segundo real = 60 segundos do jogo (1 minuto do jogo)

export function useGameLoop() {
    const [gameState, setGameState] = useState<GameState>(() => initializeGameState());
    const lastOrderTimeRef = useRef(0);
    const lastTruckTimeRef = useRef(0);
    const orderIdCounterRef = useRef(1);
    const truckIdCounterRef = useRef(1);

    // Toggle pause
    const togglePause = useCallback(() => {
        setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
    }, []);

    // Mudar velocidade
    const changeSpeed = useCallback((speed: number) => {
        setGameState(prev => ({ ...prev, gameSpeed: speed }));
    }, []);

    // Processar tarefas
    const processTasks = useCallback((currentState: GameState, deltaTime: number): GameState => {
        const updatedTasks = currentState.tasks.map(task => {
            if (task.status !== 'in_progress') return task;

            const progress = Math.min(1, task.progress + deltaTime / (task.estimatedDuration * 1000));

            if (progress >= 1) {
                // Tarefa completada
                return {
                    ...task,
                    progress: 1,
                    status: 'completed' as const,
                };
            }

            return { ...task, progress };
        });

        // Remover tarefas completadas e liberar funcionários
        const activeTasks = updatedTasks.filter(task => task.status !== 'completed');
        const completedTasks = updatedTasks.filter(task => task.status === 'completed');

        const freedEmployees = completedTasks.reduce((count, task) => {
            return task.assignedEmployee ? count + 1 : count;
        }, 0);

        return {
            ...currentState,
            tasks: activeTasks,
            availableEmployees: currentState.availableEmployees + freedEmployees,
        };
    }, []);

    // Gerar novos eventos
    const generateEvents = useCallback((currentState: GameState): GameState => {
        let newState = { ...currentState };

        // Gerar novos pedidos
        if (shouldGenerateOrder(
            newState.orders.length,
            newState.currentTime,
            lastOrderTimeRef.current
        )) {
            const newOrder = generateRandomOrder(newState.currentTime, orderIdCounterRef.current++);
            newState = {
                ...newState,
                orders: [...newState.orders, newOrder],
            };
            lastOrderTimeRef.current = newState.currentTime;
        }

        // Gerar novos caminhões
        if (shouldGenerateTruck(
            newState.trucks.length,
            newState.currentTime,
            lastTruckTimeRef.current
        )) {
            // Encontrar uma doca de recebimento disponível
            for (let row = 0; row < newState.warehouseSize.rows; row++) {
                for (let col = 0; col < newState.warehouseSize.cols; col++) {
                    const cell = newState.warehouse[row][col];
                    if (cell.type === 'receiving_dock') {
                        const dockPosition: Position = { row, col };
                        const newTruck = generateRandomTruck(
                            newState.currentTime,
                            truckIdCounterRef.current++,
                            dockPosition
                        );
                        newState = {
                            ...newState,
                            trucks: [...newState.trucks, newTruck],
                        };
                        lastTruckTimeRef.current = newState.currentTime;
                        break;
                    }
                }
                if (newState.trucks.length > currentState.trucks.length) break;
            }
        }

        return newState;
    }, []);

    // Auto-processar tarefas simples (picking automático)
    const autoProcessOrders = useCallback((currentState: GameState): GameState => {
        if (currentState.availableEmployees === 0 || currentState.orders.length === 0) {
            return currentState;
        }

        let newState = { ...currentState };

        // Tentar processar um pedido pendente
        const pendingOrders = newState.orders.filter(o => o.status === 'pending');
        if (pendingOrders.length === 0) return newState;

        const order = pendingOrders[0];

        // Criar tarefa de picking para o pedido
        const pickingTask: Task = {
            id: `task_${Date.now()}`,
            type: 'picking',
            status: 'in_progress',
            priority: order.priority === 'urgent' ? 10 : order.priority === 'high' ? 7 : order.priority === 'medium' ? 5 : 3,
            estimatedDuration: 30 + order.items.length * 10, // 30s base + 10s por item
            progress: 0,
            assignedEmployee: `emp_${Math.floor(Math.random() * newState.employees.length) + 1}`,
            createdAt: newState.currentTime,
            items: order.items,
        };

        // Atualizar ordem
        const updatedOrders = newState.orders.map(o =>
            o.id === order.id ? { ...o, status: 'picking' as const } : o
        );

        newState = {
            ...newState,
            orders: updatedOrders,
            tasks: [...newState.tasks, pickingTask],
            availableEmployees: newState.availableEmployees - 1,
        };

        return newState;
    }, []);

    // Auto-processar caminhões (recebimento automático)
    const autoProcessTrucks = useCallback((currentState: GameState): GameState => {
        if (currentState.availableEmployees === 0 || currentState.trucks.filter(t => !t.unloaded).length === 0) {
            return currentState;
        }

        let newState = { ...currentState };

        // Tentar processar um caminhão não descarregado
        const unloadedTrucks = newState.trucks.filter(t => !t.unloaded);
        if (unloadedTrucks.length === 0) return newState;

        const truck = unloadedTrucks[0];

        // Criar tarefa de recebimento
        const receivingTask: Task = {
            id: `task_recv_${Date.now()}`,
            type: 'receiving',
            status: 'in_progress',
            priority: 8,
            estimatedDuration: 45 + truck.items.length * 5, // 45s base + 5s por tipo de item
            progress: 0,
            assignedEmployee: `emp_${Math.floor(Math.random() * newState.employees.length) + 1}`,
            createdAt: newState.currentTime,
            items: truck.items.map(item => ({ itemId: item.itemId, quantity: item.quantity })),
            targetPosition: truck.dockPosition,
        };

        // Marcar caminhão como processado
        const updatedTrucks = newState.trucks.map(t =>
            t.id === truck.id ? { ...t, unloaded: true } : t
        );

        newState = {
            ...newState,
            trucks: updatedTrucks,
            tasks: [...newState.tasks, receivingTask],
            availableEmployees: newState.availableEmployees - 1,
        };

        return newState;
    }, []);

    // Atualizar dia quando passar 24h
    const updateDay = useCallback((currentState: GameState): GameState => {
        const dayInMs = 24 * 60 * 60 * 1000;
        const currentDay = Math.floor(currentState.currentTime / dayInMs) + 1;

        if (currentDay !== currentState.day) {
            return { ...currentState, day: currentDay };
        }
        return currentState;
    }, []);

    // Loop principal do jogo
    useEffect(() => {
        const interval = setInterval(() => {
            setGameState(prev => {
                if (prev.isPaused) return prev;

                // Calcular delta time baseado na velocidade do jogo
                const deltaTime = (GAME_TICK_INTERVAL / 1000) * TIME_MULTIPLIER * prev.gameSpeed * 1000;

                let newState = {
                    ...prev,
                    currentTime: prev.currentTime + deltaTime,
                };

                // Processar tarefas
                newState = processTasks(newState, deltaTime);

                // Gerar novos eventos
                newState = generateEvents(newState);

                // Auto-processar pedidos e caminhões
                newState = autoProcessOrders(newState);
                newState = autoProcessTrucks(newState);

                // Atualizar dia
                newState = updateDay(newState);

                return newState;
            });
        }, GAME_TICK_INTERVAL);

        return () => clearInterval(interval);
    }, [processTasks, generateEvents, autoProcessOrders, autoProcessTrucks, updateDay]);

    // Callback para clique em célula (placeholder para futura funcionalidade)
    const handleCellClick = useCallback((row: number, col: number) => {
        const cell = getCell(gameState.warehouse, row, col);
        if (cell) {
            console.log(`Célula clicada: [${row}, ${col}]`, cell);
        }
    }, [gameState.warehouse]);

    return {
        gameState,
        togglePause,
        changeSpeed,
        handleCellClick,
    };
}
