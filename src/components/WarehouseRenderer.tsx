import { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { GameState, Cell, CellType } from '../types';

interface WarehouseRendererProps {
    gameState: GameState;
    onCellClick?: (row: number, col: number) => void;
}

const CELL_SIZE = 32; // pixels
const COLORS = {
    floor: 0x3a3a3a,
    corridor: 0x4a4a4a,
    rack: 0x2563eb,
    rack_occupied: 0x1e40af,
    cold_rack: 0x06b6d4,
    cold_rack_occupied: 0x0891b2,
    controlled_cage: 0xf59e0b,
    controlled_cage_occupied: 0xd97706,
    receiving_dock: 0x10b981,
    shipping_dock: 0xef4444,
    packing_area: 0x8b5cf6,
    grid_line: 0x1a1a1a,
    text: 0xffffff,
};

function getCellColor(cell: Cell): number {
    const isOccupied = cell.contents.length > 0;

    switch (cell.type) {
        case 'floor':
            return COLORS.floor;
        case 'corridor':
            return COLORS.corridor;
        case 'rack':
            return isOccupied ? COLORS.rack_occupied : COLORS.rack;
        case 'cold_rack':
            return isOccupied ? COLORS.cold_rack_occupied : COLORS.cold_rack;
        case 'controlled_cage':
            return isOccupied ? COLORS.controlled_cage_occupied : COLORS.controlled_cage;
        case 'receiving_dock':
            return COLORS.receiving_dock;
        case 'shipping_dock':
            return COLORS.shipping_dock;
        case 'packing_area':
            return COLORS.packing_area;
        default:
            return COLORS.floor;
    }
}

function getCellLabel(type: CellType): string {
    switch (type) {
        case 'receiving_dock':
            return 'RCV';
        case 'shipping_dock':
            return 'SHP';
        case 'packing_area':
            return 'PCK';
        case 'controlled_cage':
            return '🔒';
        case 'cold_rack':
            return '❄️';
        default:
            return '';
    }
}

export function WarehouseRenderer({ gameState, onCellClick }: WarehouseRendererProps) {
    const canvasRef = useRef<HTMLDivElement>(null);
    const appRef = useRef<PIXI.Application | null>(null);
    const cellGraphicsRef = useRef<PIXI.Graphics[][]>([]);
    const cellLabelsRef = useRef<PIXI.Text[][]>([]);

    // Inicializar PixiJS
    useEffect(() => {
        if (!canvasRef.current) return;

        const width = gameState.warehouseSize.cols * CELL_SIZE;
        const height = gameState.warehouseSize.rows * CELL_SIZE;

        const app = new PIXI.Application();

        app.init({
            width,
            height,
            backgroundColor: 0x1a1a1a,
            antialias: true,
        }).then(() => {
            if (canvasRef.current && app.canvas) {
                canvasRef.current.appendChild(app.canvas as HTMLCanvasElement);
            }

            // Criar grid de células
            const cellGraphics: PIXI.Graphics[][] = [];
            const cellLabels: PIXI.Text[][] = [];

            for (let row = 0; row < gameState.warehouseSize.rows; row++) {
                const graphicsRow: PIXI.Graphics[] = [];
                const labelsRow: PIXI.Text[] = [];

                for (let col = 0; col < gameState.warehouseSize.cols; col++) {
                    const cell = gameState.warehouse[row][col];
                    const x = col * CELL_SIZE;
                    const y = row * CELL_SIZE;

                    // Criar gráfico da célula
                    const cellGraphic = new PIXI.Graphics();
                    cellGraphic.rect(x, y, CELL_SIZE, CELL_SIZE);
                    cellGraphic.fill(getCellColor(cell));
                    cellGraphic.stroke({ width: 1, color: COLORS.grid_line });

                    // Adicionar interatividade
                    cellGraphic.eventMode = 'static';
                    cellGraphic.cursor = 'pointer';
                    cellGraphic.on('pointerdown', () => {
                        if (onCellClick) {
                            onCellClick(row, col);
                        }
                    });

                    app.stage.addChild(cellGraphic);
                    graphicsRow.push(cellGraphic);

                    // Criar label da célula
                    const label = getCellLabel(cell.type);
                    if (label) {
                        const text = new PIXI.Text({
                            text: label,
                            style: {
                                fontSize: 10,
                                fill: COLORS.text,
                                align: 'center',
                            },
                        });
                        text.x = x + CELL_SIZE / 2 - text.width / 2;
                        text.y = y + CELL_SIZE / 2 - text.height / 2;
                        app.stage.addChild(text);
                        labelsRow.push(text);
                    } else {
                        labelsRow.push(null as any);
                    }
                }

                cellGraphics.push(graphicsRow);
                cellLabels.push(labelsRow);
            }

            cellGraphicsRef.current = cellGraphics;
            cellLabelsRef.current = cellLabels;
        });

        appRef.current = app;

        return () => {
            app.destroy(true, { children: true });
        };
    }, [gameState.warehouseSize]);

    // Atualizar cores das células quando o estado mudar
    useEffect(() => {
        if (!appRef.current || cellGraphicsRef.current.length === 0) return;

        for (let row = 0; row < gameState.warehouseSize.rows; row++) {
            for (let col = 0; col < gameState.warehouseSize.cols; col++) {
                const cell = gameState.warehouse[row][col];
                const cellGraphic = cellGraphicsRef.current[row][col];

                if (cellGraphic) {
                    cellGraphic.clear();
                    const x = col * CELL_SIZE;
                    const y = row * CELL_SIZE;
                    cellGraphic.rect(x, y, CELL_SIZE, CELL_SIZE);
                    cellGraphic.fill(getCellColor(cell));
                    cellGraphic.stroke({ width: 1, color: COLORS.grid_line });
                }
            }
        }
    }, [gameState.warehouse, gameState.warehouseSize]);

    return (
        <div
            ref={canvasRef}
            style={{
                border: '2px solid #333',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
            }}
        />
    );
}
