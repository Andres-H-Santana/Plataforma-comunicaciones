// Mantenemos una referencia global para limpieza
let currentSliderInstance = null;

function cleanupPreviousSlider() {
  if (currentSliderInstance) {
    // Limpiar todos los event listeners y el intervalo
    const { prevBtn, nextBtn, btnExpandir, card, intervalo } = currentSliderInstance;
    
    prevBtn?.removeEventListener('click', currentSliderInstance.handleNext);
    nextBtn?.removeEventListener('click', currentSliderInstance.handlePrev);
    btnExpandir?.removeEventListener('click', currentSliderInstance.toggleExpandir);
    card?.removeEventListener('mouseenter', currentSliderInstance.pauseAutoSlide);
    card?.removeEventListener('mouseleave', currentSliderInstance.resumeAutoSlide);
    
    clearInterval(intervalo);
    currentSliderInstance = null;
  }
}

function initDiapositivas() {
  cleanupPreviousSlider(); // Limpiar instancia anterior antes de crear una nueva

  const diapositivasSection = document.querySelector('.diapositivas-section');
  if (!diapositivasSection) {
    // Reintentar después de un breve retraso si el elemento no está listo
    setTimeout(initDiapositivas, 100);
    return;
  }

  // Seleccionar elementos del DOM
  const elements = {
    card: diapositivasSection.querySelector('#diapositivas-card'),
    btnExpandir: diapositivasSection.querySelector('#btnExpandir'),
    slider: diapositivasSection.querySelector('#slider'),
    slides: diapositivasSection.querySelectorAll('.slide'),
    prevBtn: diapositivasSection.querySelector('#prev'),
    nextBtn: diapositivasSection.querySelector('#next'),
    indicadores: diapositivasSection.querySelector('#indicadores'),
    controles: diapositivasSection.querySelector('.controles')
  };

  // Verificar que todos los elementos necesarios existan
  if (!elements.card || !elements.btnExpandir || !elements.slider || 
      elements.slides.length === 0 || !elements.prevBtn || 
      !elements.nextBtn || !elements.indicadores || !elements.controles) {
    console.error('Algunos elementos de diapositivas no se encontraron');
    return;
  }

  // Estado del slider
  let currentSlide = 0;
  const totalSlides = elements.slides.length;
  let isExpanded = false;
  let intervalo;

  // Funciones del slider
  function crearIndicadores() {
    elements.indicadores.innerHTML = '';
    
    elements.slides.forEach((_, index) => {
      const indicador = document.createElement('div');
      indicador.classList.add('indicador');
      if (index === 0) indicador.classList.add('active');
      indicador.addEventListener('click', () => goToSlide(index));
      elements.indicadores.appendChild(indicador);
    });
  }

  function actualizarSlider() {
    elements.slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    actualizarIndicadores();
  }

  function actualizarIndicadores() {
    const indicadores = elements.indicadores.querySelectorAll('.indicador');
    indicadores.forEach((ind, index) => {
      ind.classList.toggle('active', index === currentSlide);
    });
  }

  function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    if (currentSlide >= totalSlides) currentSlide = 0;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    actualizarSlider();
  }

  function toggleExpandir() {
    isExpanded = !isExpanded;
    elements.card.classList.toggle('expanded', isExpanded);
    elements.btnExpandir.textContent = isExpanded ? '✕' : '⛶';
    document.body.style.overflow = isExpanded ? 'hidden' : 'auto';
    
    if (!isExpanded) {
      elements.controles.style.position = '';
      elements.controles.style.bottom = '';
      elements.controles.style.left = '';
      elements.controles.style.transform = '';
      elements.controles.style.background = '';
      elements.controles.style.padding = '';
      elements.controles.style.borderRadius = '';
      elements.controles.style.boxShadow = '';
    }
    
    if (isExpanded) {
      clearInterval(intervalo);
    } else {
      iniciarAutoDesplazamiento();
    }
  }

  function iniciarAutoDesplazamiento() {
    clearInterval(intervalo);
    intervalo = setInterval(() => {
      if (!isExpanded) {
        currentSlide++;
        if (currentSlide >= totalSlides) currentSlide = 0;
        actualizarSlider();
      }
    }, 5000);
  }

  // Handlers para los event listeners (para poder eliminarlos luego)
  function handleNext() {
    currentSlide++;
    if (currentSlide >= totalSlides) currentSlide = 0;
    actualizarSlider();
  }

  function handlePrev() {
    currentSlide--;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    actualizarSlider();
  }

  function pauseAutoSlide() {
    if (!isExpanded) {
      clearInterval(intervalo);
    }
  }

  function resumeAutoSlide() {
    if (!isExpanded) {
      iniciarAutoDesplazamiento();
    }
  }

  // Configurar event listeners
  elements.nextBtn.addEventListener('click', handleNext);
  elements.prevBtn.addEventListener('click', handlePrev);
  elements.btnExpandir.addEventListener('click', toggleExpandir);
  elements.card.addEventListener('mouseenter', pauseAutoSlide);
  elements.card.addEventListener('mouseleave', resumeAutoSlide);

  // Inicializar slider
  crearIndicadores();
  iniciarAutoDesplazamiento();
  actualizarSlider();

  // Guardar referencia para limpieza posterior
  currentSliderInstance = {
    ...elements,
    intervalo,
    handleNext,
    handlePrev,
    toggleExpandir,
    pauseAutoSlide,
    resumeAutoSlide
  };
}

// Manejar la carga inicial y cambios de contenido
document.addEventListener('DOMContentLoaded', () => {
  // Pequeño retraso para asegurar que el DOM esté completamente listo
  setTimeout(initDiapositivas, 50);
});

document.addEventListener('contentChanged', () => {
  // Esperar un breve momento para que el nuevo contenido se renderice
  setTimeout(initDiapositivas, 100);
});