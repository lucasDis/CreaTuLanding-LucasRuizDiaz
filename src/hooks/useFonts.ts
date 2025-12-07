import { useState, useEffect } from 'react';
import { getAllFonts, getFontsByCategory, type Font } from '../firebase/fonts';

// Hook para fetch de tipografías desde Firestore
export function useFonts(categoryId?: string) {
  const [fonts, setFonts] = useState<Font[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchFonts = async () => {
      try {
        setLoading(true);
        setError(null);

        let result: Font[];
        
        if (categoryId) {
          result = await getFontsByCategory(categoryId);
        } else {
          result = await getAllFonts();
        }

        if (isMounted) {
          setFonts(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Error al cargar tipografías');
          console.error('Error en useFonts:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchFonts();

    return () => {
      isMounted = false;
    };
  }, [categoryId]);

  // Refetch manual
  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = categoryId 
        ? await getFontsByCategory(categoryId)
        : await getAllFonts();
        
      setFonts(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar tipografías');
    } finally {
      setLoading(false);
    }
  };

  return { fonts, loading, error, refetch };
}

// Hook para fetch de una tipografía específica
export function useFont(id: string | undefined) {
  const [font, setFont] = useState<Font | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchFont = async () => {
      try {
        setLoading(true);
        setError(null);

        // Import dinámico para evitar circular dependency
        const { getFontById } = await import('../firebase/fonts');
        const result = await getFontById(id);

        if (isMounted) {
          setFont(result);
          if (!result) {
            setError('Tipografía no encontrada');
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Error al cargar tipografía');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchFont();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { font, loading, error };
}
