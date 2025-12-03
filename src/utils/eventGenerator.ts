import { Order, Truck, Position } from '../types';
import { ITEM_IDS, getItem } from '../data/items';

// Gerar um número aleatório dentro de um intervalo
function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Gerar um número de lote aleatório
function generateLotNumber(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lotPrefix = letters[randomInt(0, 25)] + letters[randomInt(0, 25)];
    const lotNumber = randomInt(1000, 9999);
    return `${lotPrefix}${lotNumber}`;
}

// Gerar um pedido aleatório
export function generateRandomOrder(currentTime: number, orderId: number): Order {
    const priorities: Array<'low' | 'medium' | 'high' | 'urgent'> = ['low', 'medium', 'high', 'urgent'];
    const priority = priorities[randomInt(0, 3)];

    // Número de itens diferentes no pedido (1-5)
    const itemCount = randomInt(1, 5);
    const items: { itemId: string; quantity: number }[] = [];

    // Selecionar itens aleatórios
    const selectedIds = new Set<string>();
    while (selectedIds.size < itemCount) {
        const randomId = ITEM_IDS[randomInt(0, ITEM_IDS.length - 1)];
        selectedIds.add(randomId);
    }

    // Adicionar quantidades
    selectedIds.forEach(itemId => {
        const item = getItem(itemId);
        // Itens de curva A são pedidos em maior quantidade
        let maxQty = 5;
        if (item.turnoverClass === 'A') maxQty = 20;
        else if (item.turnoverClass === 'B') maxQty = 10;

        items.push({
            itemId,
            quantity: randomInt(1, maxQty),
        });
    });

    // Deadline baseado na prioridade (em minutos do jogo)
    let deadlineMinutes = 480; // 8 horas
    switch (priority) {
        case 'urgent':
            deadlineMinutes = 60; // 1 hora
            break;
        case 'high':
            deadlineMinutes = 180; // 3 horas
            break;
        case 'medium':
            deadlineMinutes = 360; // 6 horas
            break;
    }

    return {
        id: `ORD-${orderId.toString().padStart(4, '0')}`,
        customerId: `CUST-${randomInt(100, 999)}`,
        items,
        priority,
        deadline: currentTime + deadlineMinutes * 60 * 1000, // Converter para ms
        createdAt: currentTime,
        status: 'pending',
    };
}

// Gerar um caminhão de entrega
export function generateRandomTruck(
    currentTime: number,
    truckId: number,
    dockPosition: Position
): Truck {
    // Número de tipos de itens diferentes (2-6)
    const itemTypeCount = randomInt(2, 6);
    const items: { itemId: string; quantity: number; lotNumber: string; expiryDate: number }[] = [];

    // Selecionar itens aleatórios
    const selectedIds = new Set<string>();
    while (selectedIds.size < itemTypeCount) {
        const randomId = ITEM_IDS[randomInt(0, ITEM_IDS.length - 1)];
        selectedIds.add(randomId);
    }

    // Adicionar quantidades e informações de lote
    selectedIds.forEach(itemId => {
        const item = getItem(itemId);

        // Quantidade baseada na curva ABC
        let quantity = randomInt(10, 50);
        if (item.turnoverClass === 'A') quantity = randomInt(50, 200);
        else if (item.turnoverClass === 'B') quantity = randomInt(30, 100);

        // Data de validade (adicionar os dias de validade ao tempo atual)
        const expiryDate = currentTime + item.expiryDays * 24 * 60 * 60 * 1000;

        items.push({
            itemId,
            quantity,
            lotNumber: generateLotNumber(),
            expiryDate,
        });
    });

    return {
        id: `TRK-${truckId.toString().padStart(4, '0')}`,
        arrivalTime: currentTime,
        items,
        dockPosition,
        unloaded: false,
    };
}

// Verificar se deve gerar um novo pedido (baseado em probabilidade e tempo)
export function shouldGenerateOrder(
    currentOrders: number,
    gameTime: number,
    lastOrderTime: number
): boolean {
    // Não gerar se já houver muitos pedidos pendentes
    if (currentOrders >= 10) {
        console.log('⏸️ [eventGenerator] Muitos pedidos pendentes, aguardando...');
        return false;
    }

    // Horário comercial: 8h às 18h (480 minutos a 1080 minutos do dia)
    const minutesInDay = (gameTime / (60 * 1000)) % (24 * 60);
    const hours = Math.floor(minutesInDay / 60);
    const mins = Math.floor(minutesInDay % 60);

    if (minutesInDay < 480 || minutesInDay > 1080) {
        if (Math.random() < 0.01) { // Log ocasional para não poluir
            console.log(`⏰ [eventGenerator] Fora do horário comercial: ${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`);
        }
        return false;
    }

    // Tempo desde o último pedido (em minutos)
    const timeSinceLastOrder = (gameTime - lastOrderTime) / (60 * 1000);

    // Probabilidade aumenta com o tempo
    // AJUSTADO: 1 pedido a cada 3-10 minutos (era 15-30)
    if (timeSinceLastOrder < 2) return false;

    const probability = Math.min((timeSinceLastOrder - 2) / 8, 0.9);
    const willGenerate = Math.random() < probability;

    if (willGenerate) {
        console.log(`✅ [eventGenerator] Condições OK para gerar pedido! (${timeSinceLastOrder.toFixed(1)} min desde último)`);
    }

    return willGenerate;
}

// Verificar se deve gerar um novo caminhão
export function shouldGenerateTruck(
    currentTrucks: number,
    gameTime: number,
    lastTruckTime: number
): boolean {
    // Não gerar se já houver muitos caminhões esperando
    if (currentTrucks >= 3) {
        console.log('⏸️ [eventGenerator] Muitos caminhões na doca, aguardando...');
        return false;
    }

    // Horário de recebimento: 6h às 14h (360 minutos a 840 minutos do dia)
    const minutesInDay = (gameTime / (60 * 1000)) % (24 * 60);
    const hours = Math.floor(minutesInDay / 60);
    const mins = Math.floor(minutesInDay % 60);

    if (minutesInDay < 360 || minutesInDay > 840) {
        if (Math.random() < 0.01) { // Log ocasional
            console.log(`⏰ [eventGenerator] Fora do horário de recebimento: ${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`);
        }
        return false;
    }

    // Tempo desde o último caminhão (em minutos)
    const timeSinceLastTruck = (gameTime - lastTruckTime) / (60 * 1000);

    // AJUSTADO: 1 caminhão a cada 20-40 minutos (era 60-90)
    if (timeSinceLastTruck < 15) return false;

    const probability = Math.min((timeSinceLastTruck - 15) / 25, 0.8);
    const willGenerate = Math.random() < probability;

    if (willGenerate) {
        console.log(`✅ [eventGenerator] Condições OK para gerar caminhão! (${timeSinceLastTruck.toFixed(1)} min desde último)`);
    }

    return willGenerate;
}
