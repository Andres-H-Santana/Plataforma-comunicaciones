import { dataAndres } from './dataAndres.js';
import { dataDaniel } from './dataDaniel.js';
import { dataEstrella } from './dataEstrella.js';

const biografias = {
  andres: {
    nombre: "Andrés Santana",
    bio: "Curioso por naturaleza, con un interés constante en el crecimiento personal, la autenticidad y la exploración interior. Apasionado por la tecnología, el emprendimiento y las distintas formas en que las personas se expresan con profundidad y honestidad. Disfruto tanto de las conversaciones cotidianas como del silencio, valorando los espacios con grandes vistas. Aprecio los vínculos genuinos, el tiempo de calidad, los sabores simples y la conexión con los animales. Deportista y bailarín de breaking.",
    intereses: ["tecnología", "autenticidad", "expresión", "animales", "breaking", "tiempo de calidad"]
  },
  daniel: {
      nombre: "Daniel Agudelo",
      edad: 30,
      bio: "Me gustan los gatos y las plantas. Disfruto una buena conversación y mi bebida favorita es el café. Vivo con mis padres y mi hermana. Tengo experiencia en seguridad privada, carnicería y actualmente estudio desarrollo de software mientras trabajo como panadero.",
      intereses: ["gatos", "plantas", "café", "programación"]
  },
  estrella: {
    nombre: "Nicole Estrella",
    bio: "Tengo 23 años y vivo bajo el cielo vibrante de Medellín, ciudad que me inspira cada día. Actualmente estudio Tecnología en Análisis y Desarrollo de Software en el SENA, donde combino lógica, creatividad y pasión por el mundo digital. Mi mente viaja entre líneas de código y páginas de libros; me encanta leer, dejarme llevar por la música y compartir momentos con las personas que más quiero. Creo en el poder de las pequeñas cosas y en la magia de aprender algo nuevo cada día.",
    intereses: ["educación", "programación", "literatura", "música"]
}
};

const validarItem = item => ({
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
});

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
  ].map(validarItem),
  
  reflexiones: [
    ...(dataAndres.reflexiones || []),
    ...(dataDaniel.reflexiones || []),
    ...(dataEstrella.reflexiones || [])
  ].map(validarItem)
};

export { contenidoDB, dataAndres, dataDaniel, dataEstrella, biografias };