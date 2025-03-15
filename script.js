// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true,
    mirror: false,
    offset: 50
  });
  
  // DOM Elements
  const body = document.body;
  const themeToggle = document.getElementById('theme-toggle');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navbar = document.querySelector('.navbar');
  
  // Setup scroll to top button
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.className = 'scroll-top';
  scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(scrollTopBtn);
  
  // Theme Toggle with localStorage
  function toggleTheme() {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('dark-mode', isDark);
    themeToggle.classList.add('theme-switching');
    setTimeout(() => themeToggle.classList.remove('theme-switching'), 500);
  }
  
  // Load saved theme
  if (localStorage.getItem('dark-mode') === 'true') {
    body.classList.add('dark-mode');
  }
  
  // Mobile Navigation with smooth animation
  function toggleNavMenu() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    const isExpanded = navToggle.classList.contains('active');
    navToggle.setAttribute('aria-expanded', isExpanded);
  }
  
  // Smooth Scroll with offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition - headerOffset;
        window.scrollTo({
          top: offsetPosition + window.pageYOffset,
          behavior: 'smooth'
        });
        if (navMenu.classList.contains('active')) {
          toggleNavMenu();
        }
      }
    });
  });
  
  // Navbar hide on scroll down, show on scroll up
  let lastScroll = 0;
  let scrollTimer = null;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    scrollTopBtn.classList.toggle('visible', currentScroll > 300);
    if (currentScroll <= 0) {
      navbar.classList.remove('hidden');
      return;
    }
    if (currentScroll > lastScroll && !navbar.classList.contains('hidden')) {
      navbar.classList.add('hidden');
    } else if (currentScroll < lastScroll && navbar.classList.contains('hidden')) {
      navbar.classList.remove('hidden');
    }
    lastScroll = currentScroll;
    if (scrollTimer !== null) {
      clearTimeout(scrollTimer);
    }
    scrollTimer = setTimeout(() => {
      navbar.classList.remove('hidden');
    }, 150);
  });
  
  // Dynamic Text Animation
  function animateDynamicText() {
    const dynamicText = document.querySelector('.dynamic-text');
    if (!dynamicText) return;
    const text = dynamicText.dataset.text;
    let currentText = '';
    let letterIndex = 0;
    function type() {
      if (letterIndex < text.length) {
        currentText += text[letterIndex];
        dynamicText.textContent = currentText;
        letterIndex++;
        setTimeout(type, 100);
      } else {
        dynamicText.classList.add('typing-done');
      }
    }
    setTimeout(type, 1000);
  }
  
  // Section reveal animation using Intersection Observer
  const revealSection = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  };
  
  const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15
  });
  
  document.querySelectorAll('.categories, .hero, .footer').forEach(section => {
    section.classList.add('reveal-section');
    sectionObserver.observe(section);
  });
  
  // Scroll to top functionality
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Event Listeners
  themeToggle.addEventListener('click', toggleTheme);
  navToggle.addEventListener('click', toggleNavMenu);
  
  // Dropdown Menu for Mobile
  const dropdowns = document.querySelectorAll('.dropdown');
  function toggleDropdown(e) {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      this.classList.toggle('active');
    }
  }
  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', toggleDropdown);
  });
  
  // Initialize animations when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    animateDynamicText();
    document.body.classList.add('content-loaded');
  });