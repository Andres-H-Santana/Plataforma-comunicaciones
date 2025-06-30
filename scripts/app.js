// Reemplaza todo el contenido de app.js con esto:
import { contenidoDB } from './data.js';

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

// Router
const routes = {
  inicio: () => contenidoDB.historias.filter(h => h.destacado).map(h => renderCard(h, 'historias')),
  historias: () => contenidoDB.historias.map(h => renderCard(h, 'historias')),
  trabajos: () => contenidoDB.trabajos.map(t => renderCard(t, 'trabajos')),
  reflexiones: () => contenidoDB.reflexiones.map(r => renderCard(r, 'reflexiones'))
};

// Init
document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('content');
  const asideNav = document.querySelector('.aside-nav');
  
  // Toggle menu
  document.querySelector('.aside-nav h2').addEventListener('click', () => {
    asideNav.classList.toggle('collapsed');
  });

  // Navigation
  const handleNavigation = (radio) => {
    content.innerHTML = `
      <h1>${radio.id.replace('-check', '')}</h1>
      <div class="grid">
        ${routes[radio.id.replace('-check', '')]().join('')}
      </div>`;
  };

  document.querySelectorAll('.nav-item input').forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        handleNavigation(radio);
      }
    });
  });

  // Improved click handling
  document.addEventListener('click', (e) => {
    // Handle "Leer más"
    if (e.target.classList.contains('btn') && !e.target.classList.contains('btn-back')) {
      const {id, type} = e.target.dataset;
      const item = contenidoDB[type].find(item => item.id === parseInt(id));
      if (item) {
        content.innerHTML = renderFullContent(item);
      }
      return;
    }
    
    // Handle "Volver"
    if (e.target.classList.contains('btn-back')) {
      e.preventDefault();
        const lastChecked = document.querySelector('.nav-item input:checked') || 
                    document.getElementById('inicio-check');
        handleNavigation(lastChecked);
      return;
    }
  });

  // Load initial view
  document.getElementById('inicio-check').click();
});