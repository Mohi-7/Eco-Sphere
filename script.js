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
  
  
    // Load saved bottles count
    const savedBottles = localStorage.getItem('totalBottles');
    if (savedBottles) {
      totalBottles = parseInt(savedBottles);
      document.getElementById('total-bottles').textContent = totalBottles;
      document.getElementById('trees-saved').textContent = (totalBottles * IMPACT_RATES.treesPerBottle).toFixed(2);
      document.getElementById('co2-saved').textContent = (totalBottles * IMPACT_RATES.co2PerBottle).toFixed(2);
      updateAchievements();
    }
  });
  
  
  // Blog Filter Functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const blogCards = document.querySelectorAll('.blog-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
  
      const category = button.dataset.category;
  
      blogCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.5s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  
  // Newsletter Form
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]').value;
      // Here you would typically send this to your backend
      alert('Thank you for subscribing! We\'ll keep you updated.');
      newsletterForm.reset();
    });
  }
  
  // Add a fade-in animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
  
  
  // Impact Counter Functionality
  let totalBottles = 0;
  const IMPACT_RATES = {
    treesPerBottle: 0.0001, // Approximate impact
    co2PerBottle: 0.0825    // kg of CO2 per bottle
  };
  
  const ACHIEVEMENTS = {
    starter: 10,
    warrior: 100,
    guardian: 1000
  };
  
  function updateImpact() {
    const input = document.getElementById('bottles-saved');
    const newBottles = parseInt(input.value) || 0;
    if (newBottles < 0) return;
  
    totalBottles += newBottles;
    input.value = 0;
  
    // Update counters with animation
    animateCounter('total-bottles', totalBottles);
    animateCounter('trees-saved', (totalBottles * IMPACT_RATES.treesPerBottle).toFixed(2));
    animateCounter('co2-saved', (totalBottles * IMPACT_RATES.co2PerBottle).toFixed(2));
  
    // Check and update achievements
    updateAchievements();
  
    // Save to localStorage
    localStorage.setItem('totalBottles', totalBottles);
  }
  
  function animateCounter(elementId, finalValue) {
    const element = document.getElementById(elementId);
    const startValue = parseFloat(element.textContent);
    const duration = 1000; // 1 second animation
    const steps = 60;
    const increment = (finalValue - startValue) / steps;
    let currentStep = 0;
  
    const animation = setInterval(() => {
      currentStep++;
      const currentValue = startValue + (increment * currentStep);
      element.textContent = Number(currentValue).toFixed(2);
  
      if (currentStep >= steps) {
        clearInterval(animation);
        element.textContent = finalValue;
      }
    }, duration / steps);
  }
  
  function updateAchievements() {
    // Update badge classes based on total bottles
    document.getElementById('starter-badge').classList.toggle('locked', totalBottles < ACHIEVEMENTS.starter);
    document.getElementById('green-warrior').classList.toggle('locked', totalBottles < ACHIEVEMENTS.warrior);
    document.getElementById('earth-guardian').classList.toggle('locked', totalBottles < ACHIEVEMENTS.guardian);
  
    // Show achievement notification if milestone reached
    checkAndNotifyAchievement();
  }
  
  function checkAndNotifyAchievement() {
    const milestones = {
      [ACHIEVEMENTS.starter]: 'Eco Starter',
      [ACHIEVEMENTS.warrior]: 'Green Warrior',
      [ACHIEVEMENTS.guardian]: 'Earth Guardian'
    };
  
    Object.entries(milestones).forEach(([bottles, title]) => {
      if (totalBottles >= parseInt(bottles) && !localStorage.getItem(`achievement_${bottles}`)) {
        showAchievementNotification(title);
        localStorage.setItem(`achievement_${bottles}`, 'true');
      }
    });
  }
  
  function showAchievementNotification(achievement) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
      <i class="fas fa-award"></i>
      <p>Achievement Unlocked: ${achievement}!</p>
    `;
    document.body.appendChild(notification);
  
    setTimeout(() => {
      notification.classList.add('show');
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    }, 100);
  }
  
  
  // Add achievement notification styles
  const achievementStyles = document.createElement('style');
  achievementStyles.textContent = `
    .achievement-notification {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: var(--primary-color);
      color: white;
      padding: 1rem 2rem;
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      transform: translateX(120%);
      transition: transform 0.3s ease;
      z-index: 1000;
      box-shadow: var(--shadow);
    }
  
    .achievement-notification.show {
      transform: translateX(0);
    }
  
    .achievement-notification i {
      font-size: 1.5rem;
    }
  `;
  document.head.appendChild(achievementStyles);

  // Signup/Login Functionality
const signupBtn = document.getElementById('signupBtn');
const loginBtn = document.getElementById('loginBtn');
const authForm = document.getElementById('authForm');
const authMessage = document.getElementById('authMessage');

if (signupBtn && loginBtn && authForm && authMessage) {
  signupBtn.addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const rollNo = document.getElementById('rollNo').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (name && rollNo && email && password) {
      const user = { name, rollNo, email, password };
      localStorage.setItem('user', JSON.stringify(user));
      authMessage.textContent = 'Sign up successful! You can now log in.';
      authMessage.style.color = 'green';
      // authForm.reset();
    } else {
      authMessage.textContent = 'Please fill in all fields.';
      authMessage.style.color = 'red';
    }
  });

  loginBtn.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      authMessage.textContent = 'Login successful! Redirecting to profile...';
      authMessage.style.color = 'green';
      setTimeout(() => {
        window.location.href = 'profile.html';
      }, 1000);
    } else {
      authMessage.textContent = 'Invalid email or password.';
      authMessage.style.color = 'red';
    }
  });
}