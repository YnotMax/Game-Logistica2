import { GameState } from '../types';
import './StatusPanel.css';

interface StatusPanelProps {
    gameState: GameState;
    onTogglePause: () => void;
    onChangeSpeed: (speed: number) => void;
}

export function StatusPanel({ gameState, onTogglePause, onChangeSpeed }: StatusPanelProps) {
    // Formatar tempo do jogo
    const formatGameTime = (timestamp: number): string => {
        const totalMinutes = Math.floor(timestamp / (60 * 1000));
        const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
        const minutes = totalMinutes % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    // Formatar dinheiro
    const formatMoney = (value: number): string => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    return (
        <div className="status-panel">
            <div className="status-header">
                <h2>📊 Status do Armazém</h2>
            </div>

            <div className="status-section">
                <div className="status-item">
                    <span className="status-label">💰 Dinheiro:</span>
                    <span className="status-value money">{formatMoney(gameState.money)}</span>
                </div>

                <div className="status-item">
                    <span className="status-label">📅 Dia:</span>
                    <span className="status-value">{gameState.day}</span>
                </div>

                <div className="status-item">
                    <span className="status-label">🕐 Hora:</span>
                    <span className="status-value">{formatGameTime(gameState.currentTime)}</span>
                </div>
            </div>

            <div className="status-section">
                <h3>👷 Recursos Humanos</h3>
                <div className="status-item">
                    <span className="status-label">Funcionários Disponíveis:</span>
                    <span className="status-value">
                        {gameState.availableEmployees} / {gameState.employees.length}
                    </span>
                </div>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{
                            width: `${(gameState.availableEmployees / gameState.employees.length) * 100}%`
                        }}
                    />
                </div>
            </div>

            <div className="status-section">
                <h3>📦 Operações</h3>
                <div className="status-item">
                    <span className="status-label">Pedidos Pendentes:</span>
                    <span className="status-value">{gameState.orders.length}</span>
                </div>
                <div className="status-item">
                    <span className="status-label">Tarefas Ativas:</span>
                    <span className="status-value">{gameState.tasks.length}</span>
                </div>
                <div className="status-item">
                    <span className="status-label">Caminhões na Doca:</span>
                    <span className="status-value">{gameState.trucks.length}</span>
                </div>
            </div>

            <div className="status-section">
                <h3>📈 Estatísticas</h3>
                <div className="status-item">
                    <span className="status-label">Pedidos Completos:</span>
                    <span className="status-value success">{gameState.stats.totalOrdersCompleted}</span>
                </div>
                <div className="status-item">
                    <span className="status-label">Pedidos Falhados:</span>
                    <span className="status-value error">{gameState.stats.totalOrdersFailed}</span>
                </div>
                <div className="status-item">
                    <span className="status-label">Taxa de Acurácia:</span>
                    <span className="status-value">{gameState.stats.accuracyRate.toFixed(1)}%</span>
                </div>
                <div className="status-item">
                    <span className="status-label">Itens Estragados:</span>
                    <span className="status-value error">{gameState.stats.spoiledItems}</span>
                </div>
            </div>

            <div className="status-controls">
                <button
                    className={`control-btn ${gameState.isPaused ? 'play' : 'pause'}`}
                    onClick={onTogglePause}
                >
                    {gameState.isPaused ? '▶️ Continuar' : '⏸️ Pausar'}
                </button>

                <div className="speed-controls">
                    <span className="speed-label">Velocidade:</span>
                    <div className="speed-buttons">
                        <button
                            className={`speed-btn ${gameState.gameSpeed === 1 ? 'active' : ''}`}
                            onClick={() => onChangeSpeed(1)}
                        >
                            1x
                        </button>
                        <button
                            className={`speed-btn ${gameState.gameSpeed === 2 ? 'active' : ''}`}
                            onClick={() => onChangeSpeed(2)}
                        >
                            2x
                        </button>
                        <button
                            className={`speed-btn ${gameState.gameSpeed === 3 ? 'active' : ''}`}
                            onClick={() => onChangeSpeed(3)}
                        >
                            3x
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
