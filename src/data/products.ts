export interface Product {
    id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    category: string;
}

const products: Product[] = [
    // Herramientas Eléctricas
    { id: '1', title: 'Amoladora Angular 115mm 820W', description: 'Black + Decker G720N. Potente y duradera.', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=500&q=60', price: 85000, category: 'herramientas-electricas' },
    { id: '2', title: 'Taladro Percutor 13mm 650W', description: 'Velocidad variable y reversible.', image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=500&q=60', price: 65000, category: 'herramientas-electricas' },
    { id: '3', title: 'Sierra Circular 185mm 1400W', description: 'Corte preciso y potente.', image: 'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=500&q=60', price: 120000, category: 'herramientas-electricas' },
    { id: '4', title: 'Lijadora Orbital 200W', description: 'Ideal para terminaciones finas.', image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=500&q=60', price: 45000, category: 'herramientas-electricas' },
    { id: '5', title: 'Rotomartillo SDS Plus 800W', description: '3 modos de operación.', image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=500&q=60', price: 150000, category: 'herramientas-electricas' },
    { id: '6', title: 'Atornillador Inalámbrico 12V', description: 'Batería de litio de larga duración.', image: 'https://images.unsplash.com/photo-1566937169390-7be4c63b8a0e?auto=format&fit=crop&w=500&q=60', price: 75000, category: 'herramientas-electricas' },

    // Herramientas Manuales
    { id: '7', title: 'Set de Destornilladores 10 pzas', description: 'Puntas magnéticas y mango ergonómico.', image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=500&q=60', price: 15000, category: 'herramientas-manuales' },
    { id: '8', title: 'Martillo Galponero', description: 'Mango de fibra de vidrio.', image: 'https://images.unsplash.com/photo-1586864387789-628af9fe484d?auto=format&fit=crop&w=500&q=60', price: 12000, category: 'herramientas-manuales' },
    { id: '9', title: 'Llave Francesa 10 pulgadas', description: 'Acero cromo vanadio.', image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=500&q=60', price: 18000, category: 'herramientas-manuales' },
    { id: '10', title: 'Alicate Universal 8 pulgadas', description: 'Aislación 1000V.', image: 'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=500&q=60', price: 9500, category: 'herramientas-manuales' },

    // Pinturas
    { id: '11', title: 'Látex Interior Blanco 20L', description: 'Alto poder cubritivo.', image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=500&q=60', price: 85000, category: 'pinturas' },
    { id: '12', title: 'Esmalte Sintético Negro 4L', description: 'Secado rápido y brillante.', image: 'https://images.unsplash.com/photo-1562259926-4b36333745a9?auto=format&fit=crop&w=500&q=60', price: 42000, category: 'pinturas' },
    { id: '13', title: 'Rodillo Antigota 22cm', description: 'Para superficies lisas.', image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=500&q=60', price: 5000, category: 'pinturas' },
    { id: '14', title: 'Pincel Cerda China n20', description: 'Ideal para esmaltes.', image: 'https://images.unsplash.com/photo-1595429035839-c99c298ffdde?auto=format&fit=crop&w=500&q=60', price: 2500, category: 'pinturas' },

    // Construcción
    { id: '15', title: 'Cemento Portland 50kg', description: 'Alta resistencia inicial.', image: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?auto=format&fit=crop&w=500&q=60', price: 9000, category: 'construccion' },
    { id: '16', title: 'Cal Hidratada 25kg', description: 'Mayor plasticidad.', image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=500&q=60', price: 4500, category: 'construccion' },
    { id: '17', title: 'Arena Fina x Metro', description: 'Lavada y tamizada.', image: 'https://images.unsplash.com/photo-1621261327027-2b0d61e4d306?auto=format&fit=crop&w=500&q=60', price: 25000, category: 'construccion' },

    // Electricidad
    { id: '18', title: 'Cable Unipolar 2.5mm 100m', description: 'Norma IRAM.', image: 'https://images.unsplash.com/photo-1544724569-5f546fd6dd2d?auto=format&fit=crop&w=500&q=60', price: 35000, category: 'electricidad' },
    { id: '19', title: 'Tomacorriente Doble', description: 'Línea moderna blanca.', image: 'https://images.unsplash.com/photo-1556609894-0d3d4b0c1e0c?auto=format&fit=crop&w=500&q=60', price: 3500, category: 'electricidad' },
    { id: '20', title: 'Lámpara LED 9W E27', description: 'Luz fría, bajo consumo.', image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=500&q=60', price: 1200, category: 'electricidad' },

    // Plomería
    { id: '21', title: 'Caño Termofusión 25mm', description: 'Agua caliente/fría.', image: 'https://images.unsplash.com/photo-1605631097435-95e2cc315a6b?auto=format&fit=crop&w=500&q=60', price: 8500, category: 'plomeria' },
    { id: '22', title: 'Grifería Lavatorio Monocomando', description: 'Cierre cerámico.', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=500&q=60', price: 45000, category: 'plomeria' },

    // Jardinería
    { id: '23', title: 'Manguera Riego 1/2" 25m', description: 'Reforzada antitorsión.', image: 'https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?auto=format&fit=crop&w=500&q=60', price: 18000, category: 'jardineria' },
    { id: '24', title: 'Pala de Punta', description: 'Acero forjado.', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=500&q=60', price: 15000, category: 'jardineria' },
    { id: '25', title: 'Cortadora de Césped Eléctrica', description: '1HP con bolsa recolectora.', image: 'https://images.unsplash.com/photo-1592424036068-b9383626354f?auto=format&fit=crop&w=500&q=60', price: 180000, category: 'jardineria' },
];

// Simular llamada a API
export const getProducts = (): Promise<Product[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products);
        }, 500); // Simular delay de red
    });
};

export const getProductsByCategory = (categoryId: string): Promise<Product[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const filtered = products.filter(p => p.category === categoryId);
            resolve(filtered.length > 0 ? filtered : products); // Fallback to all if empty for demo
        }, 500);
    });
};

export const getProductById = (id: string): Promise<Product | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products.find(p => p.id === id));
        }, 500);
    });
};
