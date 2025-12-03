import { Order, Task } from '../types';
import { getItem } from '../data/items';
import './TasksPanel.css';

interface TasksPanelProps {
    orders: Order[];
    tasks: Task[];
    currentTime: number;
}

export function TasksPanel({ orders, tasks, currentTime }: TasksPanelProps) {
    // Formatar tempo restante
    const formatTimeRemaining = (deadline: number): string => {
        const remaining = deadline - currentTime;
        if (remaining < 0) return 'ATRASADO';

        const minutes = Math.floor(remaining / (60 * 1000));
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        if (hours > 0) {
            return `${hours}h ${mins}m`;
        }
        return `${mins}m`;
    };

    // Obter classe de prioridade
    const getPriorityClass = (priority: Order['priority']): string => {
        switch (priority) {
            case 'urgent':
                return 'priority-urgent';
            case 'high':
                return 'priority-high';
            case 'medium':
                return 'priority-medium';
            case 'low':
                return 'priority-low';
            default:
                return '';
        }
    };

    // Obter label de prioridade
    const getPriorityLabel = (priority: Order['priority']): string => {
        switch (priority) {
            case 'urgent':
                return '🔴 URGENTE';
            case 'high':
                return '🟡 ALTA';
            case 'medium':
                return '🟢 MÉDIA';
            case 'low':
                return '🔵 BAIXA';
            default:
                return '';
        }
    };

    // Obter ícone de tipo de tarefa
    const getTaskIcon = (type: Task['type']): string => {
        switch (type) {
            case 'receiving':
                return '📥';
            case 'putaway':
                return '📦';
            case 'picking':
                return '🔍';
            case 'packing':
                return '📦';
            case 'shipping':
                return '🚚';
            case 'inventory_check':
                return '📊';
            case 'replenishment':
                return '♻️';
            default:
                return '📋';
        }
    };

    // Obter label de tipo de tarefa
    const getTaskLabel = (type: Task['type']): string => {
        const labels: Record<Task['type'], string> = {
            receiving: 'Recebimento',
            putaway: 'Armazenagem',
            picking: 'Separação',
            packing: 'Embalagem',
            shipping: 'Expedição',
            inventory_check: 'Inventário',
            replenishment: 'Reabastecimento',
        };
        return labels[type];
    };

    return (
        <div className="tasks-panel">
            <div className="panel-section">
                <div className="section-header">
                    <h3>📋 Pedidos Pendentes ({orders.length})</h3>
                </div>

                <div className="orders-list">
                    {orders.length === 0 ? (
                        <div className="empty-state">
                            <p>✨ Nenhum pedido pendente</p>
                        </div>
                    ) : (
                        orders.map(order => (
                            <div key={order.id} className={`order-card ${getPriorityClass(order.priority)}`}>
                                <div className="order-header">
                                    <span className="order-id">{order.id}</span>
                                    <span className="order-priority">{getPriorityLabel(order.priority)}</span>
                                </div>

                                <div className="order-items">
                                    {order.items.map((item, idx) => {
                                        const itemData = getItem(item.itemId);
                                        return (
                                            <div key={idx} className="order-item">
                                                <span className="item-name">{itemData.name}</span>
                                                <span className="item-qty">x{item.quantity}</span>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="order-footer">
                                    <span className="order-customer">Cliente: {order.customerId}</span>
                                    <span className="order-deadline">
                                        ⏱️ {formatTimeRemaining(order.deadline)}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="panel-section">
                <div className="section-header">
                    <h3>⚙️ Tarefas Ativas ({tasks.length})</h3>
                </div>

                <div className="tasks-list">
                    {tasks.length === 0 ? (
                        <div className="empty-state">
                            <p>✨ Nenhuma tarefa em andamento</p>
                        </div>
                    ) : (
                        tasks.map(task => (
                            <div key={task.id} className={`task-card status-${task.status}`}>
                                <div className="task-header">
                                    <span className="task-icon">{getTaskIcon(task.type)}</span>
                                    <span className="task-type">{getTaskLabel(task.type)}</span>
                                    <span className="task-id">#{task.id}</span>
                                </div>

                                <div className="task-progress">
                                    <div className="progress-bar-container">
                                        <div
                                            className="progress-bar-fill"
                                            style={{ width: `${task.progress * 100}%` }}
                                        />
                                    </div>
                                    <span className="progress-text">
                                        {Math.round(task.progress * 100)}%
                                    </span>
                                </div>

                                {task.assignedEmployee && (
                                    <div className="task-employee">
                                        👷 {task.assignedEmployee}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
