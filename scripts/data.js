import { dataAndres } from './dataAndres.js';
import { dataDaniel } from './dataDaniel.js';
import { dataEstrella } from './dataEstrella.js';

const biografias = {
  andres: {
    nombre: "Andrés Santana",
    bio: "Curioso por naturaleza, con gran interés en el emprendimiento, la tecnología y la expresión auténtica. Hábil en conversaciones cotidianas con un tono reflexivo, siempre en busca de crecimiento personal y profesional. Amante de los animales, los dulces, las salidas nocturnas y el tiempo de calidad. Deportista y bailarín de breaking.",
    intereses: ["tecnología", "crecimiento personal", "animales", "breaking", "tiempo de calidad"]
  },
  daniel: {
      nombre: "Daniel Agudelo",
      edad: 30,
      bio: "Me gustan los gatos, los tucanes y las plantas. Disfruto una buena conversación y mi bebida favorita es el café. Vivo con mis padres y mi hermana. Tengo experiencia en seguridad privada, carnicería y actualmente estudio desarrollo de software mientras trabajo como panadero.",
      intereses: ["gatos", "aves", "plantas", "café", "programación", "panadería"]
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
  ].filter((trabajo, index, self) => 
    index === self.findIndex(t => t.id === trabajo.id)
  ).map(validarItem),
  
  reflexiones: [
    ...(dataAndres.reflexiones || []),
    ...(dataDaniel.reflexiones || []),
    ...(dataEstrella.reflexiones || [])
  ].map(validarItem)
};

export { contenidoDB, dataAndres, dataDaniel, dataEstrella, biografias };