// 1. Mobile Drawer Navigation Controls
const drawerTrigger = document.getElementById('drawerTrigger');
const mobileDrawer = document.getElementById('mobileDrawer');
const drawerOverlay = document.getElementById('drawerOverlay');

function toggleDrawer() {
  const isOpen = mobileDrawer.classList.toggle('open');
  drawerOverlay.classList.toggle('active', isOpen);
  drawerTrigger.classList.toggle('open', isOpen);
  drawerTrigger.setAttribute('aria-expanded', isOpen);
}

function closeDrawer() {
  if (mobileDrawer) mobileDrawer.classList.remove('open');
  if (drawerOverlay) drawerOverlay.classList.remove('active');
  if (drawerTrigger) {
    drawerTrigger.classList.remove('open');
    drawerTrigger.setAttribute('aria-expanded', 'false');
  }
}

if (drawerTrigger) {
  drawerTrigger.addEventListener('click', toggleDrawer);
}
if (drawerOverlay) {
  drawerOverlay.addEventListener('click', closeDrawer);
}

// Close mobile drawer when a nav link is clicked
document.querySelectorAll('.mobile-drawer-link').forEach(link => {
  link.addEventListener('click', closeDrawer);
});

// 2. Generate Hero Floating Particles (on index.html only)
const particlesContainer = document.getElementById('heroParticles');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (particlesContainer && !prefersReducedMotion) {
  const particleCount = 24;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('span');
    const size = Math.random() * 5 + 3; // Random size between 3px and 8px
    const left = Math.random() * 100; // Random horizontal placement
    const duration = Math.random() * 10 + 10; // Animation duration between 10s and 20s
    const delay = Math.random() * 10; // Animation delay up to 10s
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}%`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `-${delay}s`; // Negative delay to start immediately
    
    particlesContainer.appendChild(particle);
  }
}

// 3. Scroll Reveal Logic (Intersection Observer)
const revealElements = document.querySelectorAll('.reveal');

if (revealElements.length > 0) {
  if (prefersReducedMotion) {
    // Instantly show everything if reduced motion is requested
    revealElements.forEach(el => el.classList.add('in'));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }
}

// 4. Stat Counter Animations
const statCounters = document.querySelectorAll('.stat-number');

if (statCounters.length > 0) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetCount = parseInt(el.getAttribute('data-count'), 10);
        const valSpan = el.querySelector('.num-val');
        
        if (prefersReducedMotion) {
          valSpan.textContent = targetCount;
        } else {
          let currentCount = 0;
          const duration = 1500; // Animation duration in ms
          const steps = 50;
          const increment = Math.ceil(targetCount / steps);
          const intervalTime = duration / steps;
          
          const counterTimer = setInterval(() => {
            currentCount += increment;
            if (currentCount >= targetCount) {
              valSpan.textContent = targetCount;
              clearInterval(counterTimer);
            } else {
              valSpan.textContent = currentCount;
            }
          }, intervalTime);
        }
        
        counterObserver.unobserve(el);
      }
    });
  }, {
    threshold: 0.4
  });

  statCounters.forEach(counter => counterObserver.observe(counter));
}

// 5. Result Bar Chart Animations
const resultBars = document.querySelectorAll('.bar-fill');

if (resultBars.length > 0) {
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.getAttribute('data-width');
        bar.style.width = `${targetWidth}%`;
        barObserver.unobserve(bar);
      }
    });
  }, {
    threshold: 0.2
  });

  resultBars.forEach(bar => barObserver.observe(bar));
}

// 6. FAQ Accordion Logic
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const trigger = item.querySelector('.faq-trigger');
  const content = item.querySelector('.faq-content');
  
  trigger.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    
    // Close all other accordions first
    faqItems.forEach(otherItem => {
      otherItem.classList.remove('open');
      otherItem.querySelector('.faq-content').style.maxHeight = null;
      otherItem.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
    });
    
    // If it wasn't open, open it
    if (!isOpen) {
      item.classList.add('open');
      content.style.maxHeight = `${content.scrollHeight}px`;
      trigger.setAttribute('aria-expanded', 'true');
    }
  });
});

// 7. Image Error Fallback Gradient Wrapper
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function() {
    this.style.background = 'linear-gradient(135deg, var(--navy-deep), var(--royal))';
    this.style.display = 'flex';
    this.style.alignItems = 'center';
    this.style.justifyContent = 'center';
    this.onerror = null;
  }, { once: true });
});

// 8. Shared Header Scroll Class
const pageHeader = document.getElementById('pageHeader');
if (pageHeader) {
  window.addEventListener('scroll', () => {
    pageHeader.classList.toggle('scrolled', window.scrollY > 40);
  });
}
