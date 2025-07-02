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

const renderFullContent = item => `
  <div class="full-content-container">
    <h1>${item.titulo}</h1>
    <div class="content-body">${item.contenido}</div>
    <button class="btn btn-back">← Volver</button>
  </div>`;

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
  </div>`;
};

// Router
const routes = {
  inicio: () => {
    const allWorks = [
      ...(contenidoDB.trabajos || []),
      ...(contenidoDB.historias?.filter(h => h.destacado) || []),
      ...(contenidoDB.reflexiones?.filter(r => r.destacado) || [])
    ];
    return `
    <h1>Todos los trabajos</h1>
    <div class="grid">
      ${allWorks.map(item => renderCard(item, 
        item.id >= 100 && item.id < 200 ? 'trabajos' : 
        item.id >= 200 ? 'reflexiones' : 'historias')).join('')}
    </div>`;
  },
  'sobre-nosotros': () => `
    <div class="about-container">
      <h1>Sobre Nosotros</h1>
      <p class="team-description">Somos un equipo multidisciplinario comprometido con la comunicación efectiva.</p>
      <div class="team-members">
        ${Object.entries(biografias).map(([key, member]) => `
          <div class="team-member">
            <h2>${member.nombre}</h2>
            <p>${member.bio}</p>
            <div class="member-interests">
              <strong>Intereses:</strong>
              ${member.intereses.map(i => `<span class="tag">${i}</span>`).join('')}
            </div>
            <button class="btn" data-profile="${key}">Ver perfil</button>
          </div>
        `).join('')}
      </div>
    </div>`,
  andres: () => renderProfile(dataAndres, 'andres'),
  daniel: () => renderProfile(dataDaniel, 'daniel'),
  estrella: () => renderProfile(dataEstrella, 'estrella')
};

// Navigation
const handleNavigation = (route) => {
  if (!routes[route]) return;
  
  content.innerHTML = routes[route]();
  document.querySelectorAll('.nav-item input').forEach(radio => {
    radio.checked = radio.id === `${route}-check`;
  });
};

// Event Listeners
const initEventListeners = () => {
  // Menu toggle
  document.querySelector('.aside-nav h2').addEventListener('click', () => {
    document.querySelector('.aside-nav').classList.toggle('collapsed');
  });

  // Nav items
  navItems.forEach(item => {
    const radio = item.querySelector('input');
    const label = item.querySelector('label');
    
    label.addEventListener('click', () => {
      radio.checked = true;
      handleNavigation(radio.id.replace('-check', ''));
    });
  });

  // Delegated events
  document.addEventListener('click', (e) => {
    // Leer más
    if (e.target.classList.contains('btn') && e.target.dataset.id) {
      const { id, type } = e.target.dataset;
      const item = contenidoDB[type].find(item => item.id === parseInt(id));
      if (item) content.innerHTML = renderFullContent(item);
    }
    
    // Volver
    else if (e.target.classList.contains('btn-back')) {
      e.preventDefault();
      const lastChecked = document.querySelector('.nav-item input:checked') || 
                         document.getElementById('inicio-check');
      handleNavigation(lastChecked.id.replace('-check', ''));
    }
    
    // Ver perfil
    else if (e.target.classList.contains('btn') && e.target.dataset.profile) {
      handleNavigation(e.target.dataset.profile);
    }
  });
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initEventListeners();
  handleNavigation('inicio');
});