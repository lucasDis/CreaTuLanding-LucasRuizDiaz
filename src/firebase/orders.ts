import { 
  collection, 
  addDoc, 
  doc, 
  getDoc,
  query,
  where,
  getDocs,
  Timestamp 
} from 'firebase/firestore';
import { db } from './config';
import { type CartItem } from '../context/CartContext';

// Interfaz de Order
export interface Order {
  id?: string;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  customerInfo: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
  };
  paymentInfo: {
    cardName: string;
    cardNumber: string; // Solo últimos 4 dígitos en producción
  };
  status: 'pending' | 'completed' | 'cancelled';
  createdAt?: any;
}

const ORDERS_COLLECTION = 'orders';

/**
 * Crear nueva orden
 */
export const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt'>): Promise<string> => {
  try {
    const ordersCol = collection(db, ORDERS_COLLECTION);
    const docRef = await addDoc(ordersCol, {
      ...orderData,
      createdAt: Timestamp.now()
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error al crear orden:', error);
    throw new Error('No se pudo crear la orden');
  }
};

/**
 * Obtener orden por ID
 */
export const getOrderById = async (id: string): Promise<Order | null> => {
  try {
    const docRef = doc(db, ORDERS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Order;
    }
    
    return null;
  } catch (error) {
    console.error('Error al obtener orden:', error);
    throw new Error('No se pudo cargar la orden');
  }
};

/**
 * Obtener órdenes por email del cliente
 */
export const getOrdersByEmail = async (email: string): Promise<Order[]> => {
  try {
    const ordersCol = collection(db, ORDERS_COLLECTION);
    const q = query(ordersCol, where('customerInfo.email', '==', email));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Order));
  } catch (error) {
    console.error('Error al obtener órdenes del cliente:', error);
    throw new Error('No se pudieron cargar las órdenes');
  }
};
