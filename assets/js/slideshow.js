/**
 * SDNET Monthly Report Dashboard
 * Auto Slideshow Controller
 */

class SlideshowController {
    constructor(options = {}) {
        this.interval = options.interval || 8000; // 8 seconds default
        this.isPlaying = false;
        this.timer = null;
        this.progressTimer = null;
        this.progressStartTime = null;

        this.init();
    }

    init() {
        this.playIcon = document.getElementById('play-icon');
        this.pauseIcon = document.getElementById('pause-icon');
        this.autoplayBtn = document.getElementById('autoplay-btn');

        // Add autoplay indicator
        this.createProgressRing();

        // Pause on hover
        document.querySelector('.presentation')?.addEventListener('mouseenter', () => {
            if (this.isPlaying) {
                this.pauseTemporarily();
            }
        });

        document.querySelector('.presentation')?.addEventListener('mouseleave', () => {
            if (this.wasPlaying) {
                this.resumeFromPause();
            }
        });

        // Auto-start after 3 seconds
        setTimeout(() => {
            this.start();
        }, 3000);
    }

    createProgressRing() {
        // Add a subtle indicator around the autoplay button
        if (this.autoplayBtn) {
            this.autoplayBtn.style.position = 'relative';
        }
    }

    start() {
        if (this.isPlaying) return;

        this.isPlaying = true;
        this.updateUI();
        this.scheduleNext();

        console.log('Slideshow started');
    }

    stop() {
        if (!this.isPlaying) return;

        this.isPlaying = false;
        this.clearTimers();
        this.updateUI();

        console.log('Slideshow stopped');
    }

    toggle() {
        if (this.isPlaying) {
            this.stop();
        } else {
            this.start();
        }
    }

    pauseTemporarily() {
        this.wasPlaying = this.isPlaying;
        if (this.isPlaying) {
            this.clearTimers();
            this.remainingTime = this.interval - (Date.now() - this.progressStartTime);
        }
    }

    resumeFromPause() {
        if (this.wasPlaying && this.remainingTime > 0) {
            this.timer = setTimeout(() => {
                this.advance();
                this.scheduleNext();
            }, this.remainingTime);
        }
        this.wasPlaying = false;
    }

    scheduleNext() {
        this.clearTimers();
        this.progressStartTime = Date.now();

        this.timer = setTimeout(() => {
            this.advance();
            if (this.isPlaying) {
                this.scheduleNext();
            }
        }, this.interval);
    }

    advance() {
        if (window.presentation) {
            window.presentation.nextSlide();
        }
    }

    clearTimers() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        if (this.progressTimer) {
            clearInterval(this.progressTimer);
            this.progressTimer = null;
        }
    }

    updateUI() {
        if (this.playIcon && this.pauseIcon) {
            this.playIcon.style.display = this.isPlaying ? 'none' : 'block';
            this.pauseIcon.style.display = this.isPlaying ? 'block' : 'none';
        }

        if (this.autoplayBtn) {
            this.autoplayBtn.classList.toggle('autoplay-indicator', this.isPlaying);
        }
    }

    setInterval(ms) {
        this.interval = ms;
        if (this.isPlaying) {
            this.scheduleNext();
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.slideshow = new SlideshowController({
        interval: 8000 // 8 seconds as specified
    });
});
