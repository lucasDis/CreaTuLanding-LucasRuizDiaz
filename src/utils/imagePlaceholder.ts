// Utilidad para generar placeholder SVG para imágenes del carrito
export const generatePlaceholderImage = (text: string, size: number = 100): string => {
  const firstLetter = text.charAt(0).toUpperCase();
  
  // Generar color basado en el texto
  const hash = text.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  const hue = Math.abs(hash % 360);
  const backgroundColor = `hsl(${hue}, 60%, 45%)`;
  
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="${backgroundColor}"/>
      <text 
        x="50%" 
        y="50%" 
        dominant-baseline="middle" 
        text-anchor="middle" 
        font-family="Arial, sans-serif" 
        font-size="${size * 0.2}" 
        font-weight="bold" 
        fill="white"
      >${firstLetter}</text>
    </svg>
  `;
  
  // Convertir SVG a data URL
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};
