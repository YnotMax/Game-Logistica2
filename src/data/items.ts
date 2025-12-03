import { Item } from '../types';

// Catálogo de produtos médicos/odontológicos
export const ITEM_CATALOG: Record<string, Item> = {
    // Produtos de alta rotação (Curva A)
    LUVAS_LATEX: {
        id: 'LUVAS_LATEX',
        name: 'Luvas de Látex (Caixa 100un)',
        type: 'standard',
        size: 1,
        turnoverClass: 'A',
        expiryDays: 365,
        value: 45.90,
        weight: 0.8,
    },
    MASCARA_CIRURGICA: {
        id: 'MASCARA_CIRURGICA',
        name: 'Máscara Cirúrgica (Caixa 50un)',
        type: 'standard',
        size: 1,
        turnoverClass: 'A',
        expiryDays: 730,
        value: 35.50,
        weight: 0.5,
    },
    SERINGA_5ML: {
        id: 'SERINGA_5ML',
        name: 'Seringa 5ml Descartável (Caixa 100un)',
        type: 'standard',
        size: 1,
        turnoverClass: 'A',
        expiryDays: 1095,
        value: 28.90,
        weight: 1.2,
    },

    // Produtos controlados
    ANESTESICO_LIDOCAINA: {
        id: 'ANESTESICO_LIDOCAINA',
        name: 'Anestésico Lidocaína 2% (Tubo)',
        type: 'controlled',
        size: 1,
        turnoverClass: 'B',
        expiryDays: 540,
        value: 89.90,
        weight: 0.3,
    },
    ANESTESICO_ARTICAINA: {
        id: 'ANESTESICO_ARTICAINA',
        name: 'Anestésico Articaína 4% (Tubo)',
        type: 'controlled',
        size: 1,
        turnoverClass: 'B',
        expiryDays: 540,
        value: 125.00,
        weight: 0.3,
    },

    // Cadeia fria
    VACINA_HEPATITE_B: {
        id: 'VACINA_HEPATITE_B',
        name: 'Vacina Hepatite B',
        type: 'cold_chain',
        size: 1,
        turnoverClass: 'C',
        expiryDays: 180,
        value: 450.00,
        weight: 0.2,
    },
    INSULINA_REGULAR: {
        id: 'INSULINA_REGULAR',
        name: 'Insulina Regular (Frasco)',
        type: 'cold_chain',
        size: 1,
        turnoverClass: 'B',
        expiryDays: 90,
        value: 320.00,
        weight: 0.15,
    },

    // Produtos Curva C (baixa rotação)
    BISTURI_ELETRICO: {
        id: 'BISTURI_ELETRICO',
        name: 'Bisturi Elétrico Cirúrgico',
        type: 'standard',
        size: 4,
        turnoverClass: 'C',
        expiryDays: 1825,
        value: 8500.00,
        weight: 5.5,
    },
    CADEIRA_ODONTO: {
        id: 'CADEIRA_ODONTO',
        name: 'Cadeira Odontológica Completa',
        type: 'fragile',
        size: 8,
        turnoverClass: 'C',
        expiryDays: 3650,
        value: 18900.00,
        weight: 85.0,
    },

    // Curva B
    GAZE_ESTERIL: {
        id: 'GAZE_ESTERIL',
        name: 'Gaze Estéril (Pacote 100un)',
        type: 'standard',
        size: 1,
        turnoverClass: 'B',
        expiryDays: 1095,
        value: 22.50,
        weight: 0.6,
    },
    ALGODAO_HIDROFILO: {
        id: 'ALGODAO_HIDROFILO',
        name: 'Algodão Hidrófilo (Rolo 500g)',
        type: 'standard',
        size: 2,
        turnoverClass: 'B',
        expiryDays: 1095,
        value: 38.90,
        weight: 0.5,
    },
    BROCA_DIAMANTADA: {
        id: 'BROCA_DIAMANTADA',
        name: 'Kit Brocas Diamantadas (Conjunto)',
        type: 'standard',
        size: 1,
        turnoverClass: 'B',
        expiryDays: 1825,
        value: 285.00,
        weight: 0.3,
    },
};

// Array de IDs para facilitar seleção aleatória
export const ITEM_IDS = Object.keys(ITEM_CATALOG);

// Função helper para obter item por ID
export function getItem(itemId: string): Item {
    return ITEM_CATALOG[itemId];
}

// Função helper para obter itens por classe de rotatividade
export function getItemsByTurnover(turnoverClass: 'A' | 'B' | 'C'): Item[] {
    return Object.values(ITEM_CATALOG).filter(item => item.turnoverClass === turnoverClass);
}

// Função helper para obter itens por tipo
export function getItemsByType(type: Item['type']): Item[] {
    return Object.values(ITEM_CATALOG).filter(item => item.type === type);
}
