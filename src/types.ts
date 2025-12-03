// Tipos de itens no armazém
export type ItemType = 'standard' | 'controlled' | 'cold_chain' | 'fragile';

// Tipo de tarefa/ação
export type TaskType = 'receiving' | 'putaway' | 'picking' | 'packing' | 'shipping' | 'inventory_check' | 'replenishment';

// Tipo de célula do grid
export type CellType = 'floor' | 'corridor' | 'rack' | 'cold_rack' | 'controlled_cage' | 'receiving_dock' | 'shipping_dock' | 'packing_area';

// Status de uma tarefa
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'failed';

// Produto/SKU
export interface Item {
    id: string;
    name: string;
    type: ItemType;
    size: number; // Espaço que ocupa
    turnoverClass: 'A' | 'B' | 'C'; // Curva ABC
    expiryDays: number; // Dias até vencer
    value: number; // Valor R$
    weight: number; // Peso em kg
}

// Posição no grid
export interface Position {
    row: number;
    col: number;
}

// Célula do armazém
export interface Cell {
    position: Position;
    type: CellType;
    capacity: number;
    contents: InventorySlot[];
    temperature?: number; // Para cold chain
    locked?: boolean; // Para controlados
}

// Slot de inventário
export interface InventorySlot {
    itemId: string;
    quantity: number;
    lotNumber: string;
    expiryDate: number; // timestamp
    receivedDate: number; // timestamp
}

// Funcionário
export interface Employee {
    id: string;
    name: string;
    skill: number; // 1-10
    fatigue: number; // 0-100
    currentTask?: string; // Task ID
    position?: Position;
}

// Tarefa
export interface Task {
    id: string;
    type: TaskType;
    status: TaskStatus;
    priority: number; // 1-10
    startTime?: number;
    estimatedDuration: number; // em segundos (do jogo)
    progress: number; // 0-1
    assignedEmployee?: string; // Employee ID
    sourcePosition?: Position;
    targetPosition?: Position;
    items?: { itemId: string; quantity: number }[];
    createdAt: number;
}

// Pedido de cliente
export interface Order {
    id: string;
    customerId: string;
    items: { itemId: string; quantity: number }[];
    priority: 'low' | 'medium' | 'high' | 'urgent';
    deadline: number; // timestamp
    createdAt: number;
    status: 'pending' | 'picking' | 'packing' | 'shipped' | 'cancelled';
}

// Entrada de caminhão
export interface Truck {
    id: string;
    arrivalTime: number;
    items: { itemId: string; quantity: number; lotNumber: string; expiryDate: number }[];
    dockPosition: Position;
    unloaded: boolean;
}

// Estado do jogo
export interface GameState {
    // Tempo e dinheiro
    currentTime: number; // timestamp do jogo
    money: number;

    // Grid do armazém
    warehouse: Cell[][];
    warehouseSize: { rows: number; cols: number };

    // Recursos
    employees: Employee[];
    availableEmployees: number;

    // Tarefas e pedidos
    tasks: Task[];
    orders: Order[];
    trucks: Truck[];

    // Inventário de itens disponíveis
    inventory: Map<string, InventorySlot[]>;

    // Estatísticas
    stats: {
        totalOrdersCompleted: number;
        totalOrdersFailed: number;
        accuracyRate: number;
        avgPickingTime: number;
        spoiledItems: number;
    };

    // Configurações
    isPaused: boolean;
    gameSpeed: number; // 1x, 2x, 3x
    day: number;
}

// Configuração inicial
export interface GameConfig {
    warehouseRows: number;
    warehouseCols: number;
    initialMoney: number;
    initialEmployees: number;
    gameSpeedMultiplier: number;
}
