import { WarehouseRenderer } from './components/WarehouseRenderer';
import { StatusPanel } from './components/StatusPanel';
import { TasksPanel } from './components/TasksPanel';
import { useGameLoop } from './hooks/useGameLoop';
import './App.css';

function App() {
    const { gameState, togglePause, changeSpeed, handleCellClick } = useGameLoop();

    return (
        <div className="app">
            <header className="app-header">
                <div className="header-content">
                    <div className="logo">
                        <span className="logo-icon">📦</span>
                        <h1>Logistics Manager</h1>
                    </div>
                    <p className="subtitle">Simulador de Gerenciamento de Armazém</p>
                </div>
            </header>

            <main className="app-main">
                <div className="left-panel">
                    <StatusPanel
                        gameState={gameState}
                        onTogglePause={togglePause}
                        onChangeSpeed={changeSpeed}
                    />
                </div>

                <div className="center-panel">
                    <div className="warehouse-container">
                        <div className="warehouse-header">
                            <h2>🏭 Centro de Distribuição</h2>
                            <div className="warehouse-legend">
                                <div className="legend-item">
                                    <div className="legend-color receiving"></div>
                                    <span>Recebimento</span>
                                </div>
                                <div className="legend-item">
                                    <div className="legend-color shipping"></div>
                                    <span>Expedição</span>
                                </div>
                                <div className="legend-item">
                                    <div className="legend-color rack"></div>
                                    <span>Racks</span>
                                </div>
                                <div className="legend-item">
                                    <div className="legend-color cold"></div>
                                    <span>Refrigerado</span>
                                </div>
                                <div className="legend-item">
                                    <div className="legend-color controlled"></div>
                                    <span>Controlado</span>
                                </div>
                            </div>
                        </div>
                        <div className="warehouse-wrapper">
                            <WarehouseRenderer
                                gameState={gameState}
                                onCellClick={handleCellClick}
                            />
                        </div>
                    </div>
                </div>

                <div className="right-panel">
                    <TasksPanel
                        orders={gameState.orders}
                        tasks={gameState.tasks}
                        currentTime={gameState.currentTime}
                    />
                </div>
            </main>

            <footer className="app-footer">
                <p>
                    Desenvolvido com ❤️ | Inspirado na logística real da Henry Schein
                </p>
            </footer>
        </div>
    );
}

export default App;
