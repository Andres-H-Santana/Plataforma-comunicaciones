import { dataAndres } from './dataAndres.js';
import { dataDaniel } from './dataDaniel.js';
import { dataEstrella } from './dataEstrella.js';

// Función para validar items
function validarItem(item) {
    return {
        ...item,
        titulo: item.titulo || 'Sin título',
        descripcion: item.descripcion || '',
        contenido: item.contenido || '',
        autor: item.autor || '',
        equipo: item.equipo || '',
        fecha: item.fecha || '',
        año: item.año || '',
        tags: item.tags || [],
        destacado: item.destacado || false
    };
}

// Combinamos todo con validación
const contenidoDB = {
    historias: [
        ...(dataAndres.historias || []),
        ...(dataEstrella.historias || []),
        ...(dataDaniel.historias || [])
    ].map(validarItem),
    
    trabajos: [
        ...(dataAndres.trabajos || []),
        ...(dataDaniel.trabajos || []),
        ...(dataEstrella.trabajos || [])
    ].filter((trabajo, index, self) => 
        index === self.findIndex(t => t.id === trabajo.id)
    ).map(validarItem),
    
    reflexiones: [
        ...(dataAndres.reflexiones || []),
        ...(dataDaniel.reflexiones || []),
        ...(dataEstrella.reflexiones || [])
    ].map(validarItem)
};

export { contenidoDB, dataAndres, dataDaniel, dataEstrella };