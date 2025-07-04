import { contenidoDB, dataAndres, dataDaniel, dataEstrella, biografias } from './data.js';

// Elementos del DOM
const content = document.getElementById('content');
const navItems = document.querySelectorAll('.nav-item');

// Helpers
const stripHTML = html => {
  const div = document.createElement('div');
  div.innerHTML = html || '';
  return div.textContent || '';
};

// Renderizado de tarjetas generales
const renderCard = (item, type) => `
  <article class="card ${item.destacado ? 'highlight' : ''}">
    <div class="card-content">
      <h3>${item.titulo}</h3>
      <p>${stripHTML(type === 'trabajos' ? item.descripcion : item.contenido).substring(0, 150)}...</p>
    </div>
    <div class="card-footer">
      <small>${type === 'trabajos' ? item.equipo : item.autor}</small>
      <button class="btn" data-id="${item.id}" data-type="${type}">Leer más</button>
    </div>
  </article>`;

// Vista completa
const renderFullContent = item => `
  <div class="full-content-container">
    <h1>${item.titulo}</h1>
    <div class="content-body">${item.contenido}</div>
    <button class="btn-back">Volver</button>
  </div>`;

// Renderizado de diapositivas
const renderDiapositivas = (folder = 'estrella', prefix = 'Imagen', startNum = 1, endNum = 5, compact = false) => {
  const slidesToShow = compact ? 1 : endNum - startNum + 1;
  return `
  <section class="diapositivas-section ${compact ? 'compact-mode' : ''}">
    ${!compact ? `<h2>Función del Lenguaje ${folder === 'daniel' ? 'Metalingüística' : 'Emotiva'}</h2>` : ''}
    <div class="card" id="diapositivas-card">
      ${!compact ? `<button class="btn-expandir" id="btnExpandir">⛶</button>` : ''}
      <div class="diapositivas-destacadas">
        <div class="slider" id="slider">
          ${Array.from({ length: slidesToShow }, (_, i) => startNum + i)
            .map(num => `
              <div class="slide">
                <img src="./assets/${folder}/${prefix}${num}.jpeg" alt="Imagen ${num}" loading="lazy">
              </div>`).join('')}
        </div>
        ${!compact ? `<div class="indicadores" id="indicadores"></div>` : ''}
      </div>
      ${!compact ? `
      <div class="controles">
        <button id="prev">Anterior</button>
        <button id="next">Siguiente</button>
      </div>` : ''}
    </div>
  </section>`;
};

// Tarjeta destacada de diapositivas
const renderDiapositivasCard = () => `
  <div class="grid">
    ${['estrella', 'daniel'].map(nombre => `
      <article class="card highlight">
        <div class="card-content">
          <h3>Funciones del Lenguaje - ${nombre === 'estrella' ? 'Emotiva' : 'Metalingüística'}</h3>
          <p>Explora una muestra de nuestras diapositivas sobre la función del lenguaje ${nombre === 'estrella' ? 'emotiva' : 'metalingüística'}.</p>
        </div>
        <div class="card-footer">
          <small>Equipo de Comunicación</small>
          <button class="btn btn-ver-diapositiva" data-profile="${nombre}">Ver diapositiva</button>
        </div>
        <div class="diapositiva-preview" data-profile="${nombre}" style="cursor: pointer;">
          <img src="./assets/${nombre}/${nombre === 'estrella' ? 'Imagen1' : 'DImg6'}.jpeg" alt="Vista previa de diapositiva de ${nombre}" loading="lazy" />
        </div>
      </article>
    `).join('')}
  </div>`;


// Perfil de usuario
const renderProfile = (data, profileKey) => {
  const bio = biografias[profileKey];
  if (!bio) return '<div>Perfil no encontrado</div>';

  return `
    <div class="profile-container">
      <div class="profile-header">
        <h1>${bio.nombre}</h1>
        <div class="profile-bio">
          <p>${bio.bio}</p>
          <div class="profile-interests">
            <strong>Intereses:</strong>
            ${bio.intereses.map(i => `<span class="tag">${i}</span>`).join('')}
          </div>
        </div>
      </div>
      <div class="profile-content">
        ${data.trabajos?.length ? `
        <h2>Trabajos</h2>
        <div class="grid">
          ${data.trabajos.map(t => renderCard(t, 'trabajos')).join('')}
        </div>` : ''}
        ${data.historias?.length ? `
        <h2>Historias</h2>
        <div class="grid">
          ${data.historias.map(h => renderCard(h, 'historias')).join('')}
        </div>` : ''}
        ${data.reflexiones?.length ? `
        <h2>Reflexiones</h2>
        <div class="grid">
          ${data.reflexiones.map(r => renderCard(r, 'reflexiones')).join('')}
        </div>` : ''}
      </div>
      ${profileKey === 'estrella' ? renderDiapositivas('estrella', 'Imagen', 1, 5) : ''}
      ${profileKey === 'daniel' ? renderDiapositivas('daniel', 'DImg', 6, 10) : ''}

      <button class="btn btn-inicio" data-goto="inicio">🏠 Volver al Inicio</button>

    </div>`;
};

// Datos de introducción
const introData = {
  titulo: "Introducción a la Comunicación",
  introduccion: "La comunicación es un proceso fundamental en la vida humana. A través de ella compartimos ideas, emociones, conocimientos y valores. Se trata de un fenómeno complejo y esencial que va más allá del simple acto de hablar: comunicamos con palabras, gestos, miradas y silencios. Comprender cómo funciona la comunicación es clave para mejorar nuestras relaciones personales, profesionales y sociales.",
  descripcion_general: "A lo largo del estudio de este tema, se han abordado diferentes aspectos que profundizan en el papel que desempeña la comunicación en nuestras vidas.",
  temas_trabajados: [
    {
      titulo: "Comunicación no verbal",
      contenido: "La comunicación no verbal abarca todos aquellos mensajes que transmitimos sin palabras: expresiones faciales, posturas, gestos, tonos de voz, distancia corporal, etc. Este tipo de comunicación juega un papel crucial, ya que muchas veces lo que decimos con el cuerpo tiene más impacto que lo que decimos con la voz."
    },
    {
      titulo: "Funciones del lenguaje",
      contenido: "Se estudiaron las distintas funciones del lenguaje propuestas por Roman Jakobson: referencial, emotiva, conativa, fática, metalingüística y poética. Cada una cumple un propósito distinto dentro del acto comunicativo y nos ayuda a entender no solo qué se dice, sino también para qué se dice."
    },
    {
      titulo: "Tipos de comunicación",
      contenido: {
        "Comunicación pasiva": {
          descripcion: "La comunicación pasiva se caracteriza por la falta de expresión de ideas, sentimientos y necesidades.",
          caracteristicas: [
            "Evita expresar opiniones o deseos",
            "Utiliza un tono de voz bajo y vacilante",
            "Lenguaje corporal inseguro (mirada baja, postura encogida)",
            "Siente ansiedad, frustración o resentimiento acumulado",
            "Frases comunes: 'Como tú digas', 'No importa', 'Está bien, aunque no me guste'"
          ]
        },
        "Comunicación agresiva": {
          descripcion: "La comunicación agresiva se manifiesta mediante la imposición, el juicio y la falta de respeto hacia los demás.",
          caracteristicas: [
            "Interrumpe, grita o intimida durante la conversación",
            "Usa lenguaje verbal ofensivo o sarcástico",
            "Lenguaje corporal dominante (mirada fija desafiante, gestos amenazantes)",
            "Desvaloriza o culpa a otros para imponer su punto de vista",
            "Frases comunes: 'Tú nunca haces nada bien', 'Hazlo como te digo', 'No me importa lo que pienses'"
          ]
        }
      }
    }
  ]
};

// Tema individual
const renderTemaItem = tema => {
  if (typeof tema.contenido === 'string') {
    return `
      <div class="tema-item">
        <h3>${tema.titulo}</h3>
        <p>${tema.contenido}</p>
      </div>`;
  }

  return `
    <div class="tema-item">
      <h3>${tema.titulo}</h3>
      ${Object.entries(tema.contenido).map(([sub, cont]) => `
        <div class="subtema">
          <h4>${sub}</h4>
          <p>${cont.descripcion}</p>
          <ul>${cont.caracteristicas.map(c => `<li>${c}</li>`).join('')}</ul>
        </div>`).join('')}
    </div>`;
};

// Rutas
const routes = {
  inicio: () => {
    const trabajos = contenidoDB.trabajos || [];
    const historias = contenidoDB.historias?.filter(h => h.destacado) || [];
    const reflexiones = contenidoDB.reflexiones || [];

    return `
      <div class="intro-container">
        <h1>${introData.titulo}</h1>
        <div class="intro-content">
          <p>${introData.introduccion}</p>
          <p><strong>${introData.descripcion_general}</strong></p>
          <h2>Temas trabajados</h2>
          ${introData.temas_trabajados.map(renderTemaItem).join('')}
        </div>
      </div>

      <div class="content-sections">
        <section>
          <h2>Trabajos</h2>
          <div class="grid">${trabajos.map(item => renderCard(item, 'trabajos')).join('')}</div>
        </section>
        <section>
          <h2>Historias destacadas</h2>
          <div class="grid">${historias.map(item => renderCard(item, 'historias')).join('')}</div>
        </section>
        <section>
          <h2>Reflexiones</h2>
          <div class="grid">${reflexiones.map(item => renderCard(item, 'reflexiones')).join('')}</div>
        </section>
        <section>
          <h2>Diapositivas destacadas</h2>
          ${renderDiapositivasCard()}
        </section>
      </div>`;
  },
  'sobre-nosotros': () => `
    <div class="about-container">
      <h1>Sobre Nosotros</h1>
      <p class="team-description">Somos un equipo comprometido con la comunicación efectiva.</p>
      <div class="team-members">
        ${Object.entries(biografias).map(([key, member]) => `
          <div class="team-member">
            <h2>${member.nombre}</h2>
            <p>${member.bio}</p>
            <div>
              <strong>Intereses:</strong>
              ${member.intereses.map(i => `<span class="tag">${i}</span>`).join('')}
            </div>
            <button class="btn" data-profile="${key}">Ver perfil</button>
          </div>`).join('')}
      </div>
    </div>`,
  andres: () => renderProfile(dataAndres, 'andres'),
  daniel: () => renderProfile(dataDaniel, 'daniel'),
  estrella: () => renderProfile(dataEstrella, 'estrella'),
};

// Navegación
const handleNavigation = (route) => {
  if (!routes[route]) return;
  content.innerHTML = routes[route]();
  document.querySelectorAll('.nav-item input').forEach(radio => {
    radio.checked = radio.id === `${route}-check`;
  });
  setTimeout(() => document.dispatchEvent(new Event('contentChanged')), 50);
};

const initEventListeners = () => {
  // Menú colapsable
  document.querySelector('.aside-nav h2').addEventListener('click', () => {
    document.querySelector('.aside-nav').classList.toggle('collapsed');
  });

  // Navegación por radio-buttons
  navItems.forEach(item => {
    const radio = item.querySelector('input');
    const label = item.querySelector('label');
    label.addEventListener('click', () => {
      radio.checked = true;
      handleNavigation(radio.id.replace('-check', ''));
    });
  });

  // Eventos globales de clic
  document.addEventListener('click', (e) => {
    // Mostrar u ocultar la vista previa de diapositivas
    if (e.target.id === 'btn-ver-diapositivas') {
      e.preventDefault();
      const preview = document.getElementById('preview-diapositivas');
      if (preview) {
        preview.style.display = preview.style.display === 'none' ? 'block' : 'none';
        if (preview.style.display === 'block') {
          setTimeout(() => {
            document.dispatchEvent(new Event('contentChanged'));
          }, 100);
        }
      }
      return;
    }

    // Redirección al perfil al hacer clic en imagen o botón de vista previa
    if (e.target.closest('.btn-ver-diapositiva') || e.target.closest('.diapositiva-preview')) {
      const profile = e.target.dataset.profile || e.target.closest('[data-profile]')?.dataset.profile;
      if (profile) {
        handleNavigation(profile);
      }
      return;
    }

    // Botón "Leer más"
    if (e.target.classList.contains('btn') && e.target.dataset.id) {
      const { id, type } = e.target.dataset;
      const item = contenidoDB[type].find(item => item.id === parseInt(id));
      if (item) {
        content.innerHTML = renderFullContent(item);
      }
      return;
    }

    // Botón "Ver perfil"
    if (e.target.classList.contains('btn') && e.target.dataset.profile) {
      handleNavigation(e.target.dataset.profile);
      return;
    }

    // Botón "Volver"
    if (e.target.classList.contains('btn-back')) {
      e.preventDefault();
      const lastChecked = document.querySelector('.nav-item input:checked') || document.getElementById('inicio-check');
      handleNavigation(lastChecked.id.replace('-check', ''));
      document.dispatchEvent(new Event('contentChanged'));
    }

    // Botón "Volver al Inicio"
    if (e.target.classList.contains('btn-inicio')) {
      e.preventDefault();
      handleNavigation('inicio');
      return;
    }

  });
};


// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  initEventListeners();
  handleNavigation('inicio');
});
