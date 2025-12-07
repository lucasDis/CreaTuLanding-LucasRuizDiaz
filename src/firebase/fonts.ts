import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query, 
  where,
  orderBy,
  limit,
  Timestamp 
} from 'firebase/firestore';
import { db } from './config';

// Interface principal de Font
export interface Font {
  id?: string;
  nombre: string;
  categoria: 'serif' | 'sans-serif' | 'monospace' | 'display' | 'handwriting';
  precio: number;
  descripcion: string;
  variantes: string[];
  googleFontsUrl: string;
  popularidad?: number;
  ventas?: number;
  createdAt?: any;
  updatedAt?: any;
}

const FONTS_COLLECTION = 'fonts';

// ============================================
// CRUD Operations - Read
// ============================================

export const getAllFonts = async (): Promise<Font[]> => {
  try {
    const fontsCol = collection(db, FONTS_COLLECTION);
    const snapshot = await getDocs(fontsCol);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Font));
  } catch (error) {
    console.error('Error al obtener tipografías:', error);
    throw new Error('No se pudieron cargar las tipografías');
  }
};

export const getFontById = async (id: string): Promise<Font | null> => {
  try {
    const docRef = doc(db, FONTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Font;
    }
    
    return null;
  } catch (error) {
    console.error('Error al obtener tipografía:', error);
    throw new Error('No se pudo cargar la tipografía');
  }
};

export const getFontsByCategory = async (category: string): Promise<Font[]> => {
  try {
    const fontsCol = collection(db, FONTS_COLLECTION);
    const q = query(fontsCol, where('categoria', '==', category));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Font));
  } catch (error) {
    console.error('Error al filtrar por categoría:', error);
    throw new Error('No se pudieron filtrar las tipografías');
  }
};

// Búsqueda avanzada con filtros múltiples
export const searchFonts = async (filters: {
  categoria?: string;
  minVariantes?: number;
  sortByPopular?: boolean;
  sortByBestSelling?: boolean;
}): Promise<Font[]> => {
  try {
    const fontsCol = collection(db, FONTS_COLLECTION);
    let q = query(fontsCol);
    
    if (filters.categoria) {
      q = query(q, where('categoria', '==', filters.categoria));
    }
    
    if (filters.sortByPopular) {
      q = query(q, orderBy('popularidad', 'desc'));
    }
    
    if (filters.sortByBestSelling) {
      q = query(q, orderBy('ventas', 'desc'));
    }
    
    const snapshot = await getDocs(q);
    let results = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Font));
    
    // Filtrado client-side para variantes
    if (filters.minVariantes && filters.minVariantes > 1) {
      results = results.filter(font => font.variantes.length >= (filters.minVariantes || 1));
    }
    
    return results;
  } catch (error) {
    console.error('Error en búsqueda avanzada:', error);
    throw new Error('No se pudo realizar la búsqueda');
  }
};

// ============================================
// CRUD Operations - Create/Update/Delete
// ============================================

export const addFont = async (fontData: Omit<Font, 'id'>): Promise<string> => {
  try {
    const fontsCol = collection(db, FONTS_COLLECTION);
    const docRef = await addDoc(fontsCol, {
      ...fontData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error al agregar tipografía:', error);
    throw new Error('No se pudo agregar la tipografía');
  }
};

export const updateFont = async (id: string, fontData: Partial<Font>): Promise<void> => {
  try {
    const docRef = doc(db, FONTS_COLLECTION, id);
    await updateDoc(docRef, {
      ...fontData,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error al actualizar tipografía:', error);
    throw new Error('No se pudo actualizar la tipografía');
  }
};

export const deleteFont = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, FONTS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error al eliminar tipografía:', error);
    throw new Error('No se pudo eliminar la tipografía');
  }
};

// ============================================
// Queries especializadas
// ============================================

export const getPopularFonts = async (limitCount: number = 10): Promise<Font[]> => {
  try {
    const fontsCol = collection(db, FONTS_COLLECTION);
    const q = query(fontsCol, orderBy('popularidad', 'desc'), limit(limitCount));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Font));
  } catch (error) {
    console.error('Error al obtener tipografías populares:', error);
    throw new Error('No se pudieron cargar las tipografías populares');
  }
};

export const getBestSellingFonts = async (limitCount: number = 10): Promise<Font[]> => {
  try {
    const fontsCol = collection(db, FONTS_COLLECTION);
    const q = query(fontsCol, orderBy('ventas', 'desc'), limit(limitCount));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Font));
  } catch (error) {
    console.error('Error al obtener tipografías más vendidas:', error);
    throw new Error('No se pudieron cargar las tipografías más vendidas');
  }
};
