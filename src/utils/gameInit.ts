import { GameState, GameConfig, Cell, CellType, Employee } from '../types';

// Configuração padrão do jogo
export const DEFAULT_CONFIG: GameConfig = {
    warehouseRows: 12,
    warehouseCols: 20,
    initialMoney: 50000,
    initialEmployees: 5,
    gameSpeedMultiplier: 1,
};

// Criar uma célula vazia
function createCell(row: number, col: number, type: CellType): Cell {
    let capacity = 0;

    switch (type) {
        case 'rack':
            capacity = 10; // 10 unidades por rack
            break;
        case 'cold_rack':
            capacity = 8;
            break;
        case 'controlled_cage':
            capacity = 5;
            break;
        case 'receiving_dock':
        case 'shipping_dock':
        case 'packing_area':
            capacity = 20; // Áreas de transição
            break;
        default:
            capacity = 0;
    }

    return {
        position: { row, col },
        type,
        capacity,
        contents: [],
        temperature: type === 'cold_rack' ? 4 : undefined,
        locked: type === 'controlled_cage',
    };
}

// Criar layout inicial do armazém
function createWarehouseLayout(rows: number, cols: number): Cell[][] {
    const warehouse: Cell[][] = [];

    for (let row = 0; row < rows; row++) {
        const warehouseRow: Cell[] = [];

        for (let col = 0; col < cols; col++) {
            let cellType: CellType = 'floor';

            // Docas de recebimento (parte superior esquerda)
            if (row === 0 && col >= 0 && col < 4) {
                cellType = 'receiving_dock';
            }
            // Docas de expedição (parte inferior direita)
            else if (row === rows - 1 && col >= cols - 4 && col < cols) {
                cellType = 'shipping_dock';
            }
            // Área de embalagem (próxima às docas de expedição)
            else if (row === rows - 2 && col >= cols - 4 && col < cols) {
                cellType = 'packing_area';
            }
            // Gaiola de controlados (canto superior direito)
            else if (row >= 1 && row <= 2 && col >= cols - 3 && col < cols) {
                cellType = 'controlled_cage';
            }
            // Racks refrigerados (próximos às docas de recebimento)
            else if (row >= 1 && row <= 2 && col >= 5 && col < 8) {
                cellType = 'cold_rack';
            }
            // Corredores (colunas ímpares entre 1 e cols-2)
            else if (col % 3 === 0 && col > 0 && col < cols - 1 && row > 2 && row < rows - 2) {
                cellType = 'corridor';
            }
            // Racks padrão (entre corredores)
            else if (col % 3 !== 0 && col > 0 && col < cols - 1 && row > 2 && row < rows - 2) {
                cellType = 'rack';
            }
            // Corredor principal horizontal
            else if (row === 3 && col > 0 && col < cols - 1) {
                cellType = 'corridor';
            }

            warehouseRow.push(createCell(row, col, cellType));
        }

        warehouse.push(warehouseRow);
    }

    return warehouse;
}

// Criar funcionários iniciais
function createInitialEmployees(count: number): Employee[] {
    const employees: Employee[] = [];
    const names = [
        'João Silva',
        'Maria Santos',
        'Pedro Oliveira',
        'Ana Costa',
        'Lucas Ferreira',
        'Carla Souza',
        'Rafael Lima',
        'Juliana Alves',
    ];

    for (let i = 0; i < count; i++) {
        employees.push({
            id: `emp_${i + 1}`,
            name: names[i] || `Funcionário ${i + 1}`,
            skill: Math.floor(Math.random() * 3) + 5, // Skill 5-7 para iniciantes
            fatigue: 0,
        });
    }

    return employees;
}

// Inicializar estado do jogo
export function initializeGameState(config: GameConfig = DEFAULT_CONFIG): GameState {
    const warehouse = createWarehouseLayout(config.warehouseRows, config.warehouseCols);
    const employees = createInitialEmployees(config.initialEmployees);

    // Começar às 8h00 (horário comercial) - 8 * 60 * 60 * 1000 ms
    const startTime = 8 * 60 * 60 * 1000;

    console.log('🏗️ [gameInit] Criando armazém:', {
        tamanho: `${config.warehouseRows}x${config.warehouseCols}`,
        funcionários: config.initialEmployees,
        dinheiro: config.initialMoney,
        horaInicial: '08:00',
    });

    return {
        currentTime: startTime, // Começa às 08:00 (horário comercial)
        money: config.initialMoney,
        warehouse,
        warehouseSize: {
            rows: config.warehouseRows,
            cols: config.warehouseCols,
        },
        employees,
        availableEmployees: employees.length,
        tasks: [],
        orders: [],
        trucks: [],
        inventory: new Map(),
        stats: {
            totalOrdersCompleted: 0,
            totalOrdersFailed: 0,
            accuracyRate: 100,
            avgPickingTime: 0,
            spoiledItems: 0,
        },
        isPaused: false,
        gameSpeed: config.gameSpeedMultiplier,
        day: 1,
    };
}

// Função helper para obter célula do warehouse
export function getCell(warehouse: Cell[][], row: number, col: number): Cell | null {
    if (row < 0 || row >= warehouse.length || col < 0 || col >= warehouse[0].length) {
        return null;
    }
    return warehouse[row][col];
}

// Função helper para calcular distância Manhattan entre duas posições
export function getManhattanDistance(from: { row: number; col: number }, to: { row: number; col: number }): number {
    return Math.abs(from.row - to.row) + Math.abs(from.col - to.col);
}
