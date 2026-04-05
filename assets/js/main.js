/**
 * SDNET Monthly Report Dashboard
 * Main Navigation & Controls
 */

class PresentationController {
  constructor() {
    this.slides = document.querySelectorAll('.slide');
    this.currentSlide = 0;
    this.totalSlides = this.slides.length;
    this.isFullscreen = false;

    this.init();
  }

  init() {
    this.createNavDots();
    this.createControls();
    this.createProgressLine();
    this.bindEvents();
    this.updateSlide();
    this.loadData();
  }

  createNavDots() {
    const container = document.createElement('div');
    container.className = 'nav-dots';

    const slideTitles = [
      'Cover',
      'Ringkasan',
      'High Issue',
      'Monitoring',
      'Statistik',
      'Gangguan',
      'Perbandingan',
      'Kesimpulan'
    ];

    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement('button');
      dot.className = 'nav-dot';
      dot.dataset.title = slideTitles[i] || `Slide ${i + 1}`;
      dot.addEventListener('click', () => this.goToSlide(i));
      container.appendChild(dot);
    }

    document.body.appendChild(container);
    this.navDots = container.querySelectorAll('.nav-dot');
  }

  createControls() {
    const controls = document.createElement('div');
    controls.className = 'controls';
    controls.innerHTML = `
      <button class="control-btn" id="prev-btn" title="Previous (←)">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <span class="slide-counter">
        <span id="current-slide">1</span> / <span id="total-slides">${this.totalSlides}</span>
      </span>
      <button class="control-btn" id="next-btn" title="Next (→)">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>
      <div style="width: 1px; height: 24px; background: var(--border-color);"></div>
      <button class="control-btn" id="autoplay-btn" title="Toggle Autoplay (Space)">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" id="play-icon">
          <polygon points="5 3 19 12 5 21 5 3"/>
        </svg>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" id="pause-icon" style="display: none;">
          <rect x="6" y="4" width="4" height="16"/>
          <rect x="14" y="4" width="4" height="16"/>
        </svg>
      </button>
      <button class="control-btn" id="fullscreen-btn" title="Fullscreen (F)">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
        </svg>
      </button>
    `;

    document.body.appendChild(controls);

    document.getElementById('prev-btn').addEventListener('click', () => this.prevSlide());
    document.getElementById('next-btn').addEventListener('click', () => this.nextSlide());
    document.getElementById('autoplay-btn').addEventListener('click', () => this.toggleAutoplay());
    document.getElementById('fullscreen-btn').addEventListener('click', () => this.toggleFullscreen());
  }

  createProgressLine() {
    const line = document.createElement('div');
    line.className = 'progress-line';
    line.id = 'progress-line';
    document.body.appendChild(line);
  }

  bindEvents() {
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault();
          this.nextSlide();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          this.prevSlide();
          break;
        case 'Home':
          e.preventDefault();
          this.goToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          this.goToSlide(this.totalSlides - 1);
          break;
        case ' ':
          e.preventDefault();
          this.toggleAutoplay();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          this.toggleFullscreen();
          break;
        case 'Escape':
          if (this.isFullscreen) {
            this.toggleFullscreen();
          }
          break;
      }
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    });

    // Mouse wheel navigation DISABLED - scroll should only scroll content, not change slides
    // Users can use keyboard arrows, nav dots, or buttons to navigate
  }

  handleSwipe() {
    const threshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
  }

  goToSlide(index) {
    if (index < 0 || index >= this.totalSlides) return;

    this.currentSlide = index;
    this.updateSlide();
  }

  nextSlide() {
    if (this.currentSlide < this.totalSlides - 1) {
      this.currentSlide++;
      this.updateSlide();
    } else {
      // Loop back to first slide
      this.currentSlide = 0;
      this.updateSlide();
    }
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.updateSlide();
    } else {
      // Loop to last slide
      this.currentSlide = this.totalSlides - 1;
      this.updateSlide();
    }
  }

  updateSlide() {
    // Update slides
    this.slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === this.currentSlide);
    });

    // Update nav dots
    this.navDots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentSlide);
    });

    // Update counter
    document.getElementById('current-slide').textContent = this.currentSlide + 1;

    // Update progress line
    const progress = ((this.currentSlide + 1) / this.totalSlides) * 100;
    document.getElementById('progress-line').style.width = `${progress}%`;
  }

  toggleAutoplay() {
    window.slideshow?.toggle();
  }

  toggleFullscreen() {
    const presentation = document.querySelector('.presentation');

    if (!document.fullscreenElement) {
      presentation.requestFullscreen?.() ||
        presentation.webkitRequestFullscreen?.() ||
        presentation.msRequestFullscreen?.();
      this.isFullscreen = true;
      presentation.classList.add('fullscreen');
    } else {
      document.exitFullscreen?.() ||
        document.webkitExitFullscreen?.() ||
        document.msExitFullscreen?.();
      this.isFullscreen = false;
      presentation.classList.remove('fullscreen');
    }
  }

  async loadData() {
    try {
      const response = await fetch('assets/data/data.json');
      const data = await response.json();
      this.renderData(data);
    } catch (error) {
      console.warn('Could not load data.json, using static content:', error);
    }
  }

  renderData(data) {
    // Render network graphs
    this.renderGraphs(data.networkGraphs);

    // Data is pre-rendered in HTML for better performance
    console.log('Data loaded successfully:', data.report.title);
  }

  renderGraphs(graphs) {
    const dailyContainer = document.getElementById('daily-graphs');
    const monthlyContainer = document.getElementById('monthly-graphs');

    if (dailyContainer && graphs.daily) {
      graphs.daily.forEach(graph => {
        const card = this.createGraphCard(graph, 'daily');
        dailyContainer.appendChild(card);
      });
    }

    if (monthlyContainer && graphs.monthly) {
      graphs.monthly.forEach(graph => {
        const card = this.createGraphCard(graph, 'monthly');
        monthlyContainer.appendChild(card);
      });
    }
  }

  createGraphCard(graph, type) {
    const card = document.createElement('div');
    card.className = 'graph-card';
    card.innerHTML = `
      <img src="PNG/${graph.file}" alt="${graph.name}" loading="lazy">
      <div class="graph-card-title">${graph.name}</div>
    `;

    card.addEventListener('click', () => {
      this.openModal(`PNG/${graph.file}`, graph.name);
    });

    return card;
  }

  openModal(src, title) {
    let modal = document.getElementById('graph-modal');

    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'graph-modal';
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <button class="modal-close">&times;</button>
        <div class="modal-content">
          <img src="" alt="">
          <div class="modal-title"></div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.classList.remove('active');
      });

      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    }

    modal.querySelector('img').src = src;
    modal.querySelector('.modal-title').textContent = title;
    modal.classList.add('active');
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.presentation = new PresentationController();
});
