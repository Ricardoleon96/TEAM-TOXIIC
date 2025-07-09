// Global Variables
let currentSection = 'home';
let isLoading = true;
let particles = [];
let currentVideoIndex = 0;
let videoRotationInterval;

// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const mainNav = document.getElementById('main-nav');
const heroSection = document.getElementById('home');
const backgroundVideos = document.querySelectorAll('.bg-video');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    // Show loading screen
    setTimeout(() => {
        hideLoadingScreen();
        showNavigation();
        initializeScrollEffects();
        initializeParticles();
        initializeComicPanels();
        initializeCommunityEffects();
        initializeSmoothScrolling();
        initializeIntersectionObserver();
        initializeBackgroundVideos();
        handleVideoErrors();
        adaptVideoQuality();
        initializeVideoIntersectionObserver();
    }, 3000);
}

// Loading Screen
function hideLoadingScreen() {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        isLoading = false;
    }, 500);
}

// Navigation
function showNavigation() {
    setTimeout(() => {
        mainNav.classList.remove('nav-hidden');
    }, 500);
}

// Scroll Effects
function initializeScrollEffects() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Hide/show navigation on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            mainNav.classList.add('nav-hidden');
        } else {
            mainNav.classList.remove('nav-hidden');
        }
        
        lastScrollTop = scrollTop;
        
        // Update active section
        updateActiveSection();
        
        // Parallax effects
        if (!isLoading) {
            updateParallax(scrollTop);
        }
    });
}

// Update Active Section
function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = sectionId;
            updateActiveNavLink(sectionId);
        }
    });
}

function updateActiveNavLink(activeSection) {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === activeSection) {
            link.classList.add('active');
        }
    });
}

// Parallax Effects
function updateParallax(scrollTop) {
    const heroBackground = document.querySelector('.hero-background');
    const glitchOverlay = document.querySelector('.glitch-overlay');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrollTop * 0.5}px)`;
    }
    
    if (glitchOverlay) {
        glitchOverlay.style.transform = `translateY(${scrollTop * 0.3}px)`;
    }
}

// Particles System
function initializeParticles() {
    const particleContainer = document.querySelector('.particle-system');
    
    for (let i = 0; i < 20; i++) {
        createParticle(particleContainer);
    }
    
    animateParticles();
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: #39ff14;
        border-radius: 50%;
        opacity: 0;
        pointer-events: none;
    `;
    
    resetParticle(particle);
    container.appendChild(particle);
    particles.push(particle);
}

function resetParticle(particle) {
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.opacity = Math.random() * 0.5 + 0.1;
    particle.animationDuration = Math.random() * 3 + 2 + 's';
}

function animateParticles() {
    particles.forEach((particle, index) => {
        setTimeout(() => {
            particle.style.animation = `float ${particle.animationDuration} ease-in-out infinite`;
        }, index * 200);
    });
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a[data-section]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');
            scrollToSection(targetSection);
        });
    });
}

function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Team Filters
function initializeTeamFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const teamMembers = document.querySelectorAll('.team-member');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const game = button.getAttribute('data-game');
            
            // Update active filter
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter team members
            teamMembers.forEach(member => {
                const memberGame = member.getAttribute('data-game');
                
                if (game === 'all' || memberGame === game) {
                    member.style.display = 'block';
                    member.style.opacity = '0';
                    setTimeout(() => {
                        member.style.opacity = '1';
                    }, 100);
                } else {
                    member.style.opacity = '0';
                    setTimeout(() => {
                        member.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Comic Panels & Carousel
function initializeComicPanels() {
    const comicPanels = document.querySelectorAll('.comic-panel');
    const carouselContainer = document.querySelector('.carousel-container');
    const originComic = document.querySelector('.origin-comic');
    
    // Funcionalidad de click en las tarjetas
    comicPanels.forEach(panel => {
        panel.addEventListener('click', () => {
            // Remover active de todas las tarjetas
            comicPanels.forEach(p => p.classList.remove('active'));
            // Agregar active a la tarjeta clickeada
            panel.classList.add('active');
        });
    });
    
    // Control del carrusel con mouse/touch
    if (carouselContainer && originComic) {
        let isMouseDown = false;
        let startX = 0;
        let scrollLeft = 0;
        let animationPaused = false;
        
        // Pausa al hover (ya manejado en CSS, pero reforzamos con JS)
        carouselContainer.addEventListener('mouseenter', () => {
            originComic.style.animationPlayState = 'paused';
            animationPaused = true;
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            if (!isMouseDown) {
                originComic.style.animationPlayState = 'running';
                animationPaused = false;
            }
        });
        
        // Funcionalidad de arrastrar (opcional)
        carouselContainer.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            startX = e.pageX - carouselContainer.offsetLeft;
            scrollLeft = carouselContainer.scrollLeft;
            originComic.style.animationPlayState = 'paused';
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            isMouseDown = false;
            if (!animationPaused) {
                originComic.style.animationPlayState = 'running';
            }
        });
        
        carouselContainer.addEventListener('mouseup', () => {
            isMouseDown = false;
            setTimeout(() => {
                if (!animationPaused) {
                    originComic.style.animationPlayState = 'running';
                }
            }, 500);
        });
        
        carouselContainer.addEventListener('mousemove', (e) => {
            if (!isMouseDown) return;
            e.preventDefault();
            const x = e.pageX - carouselContainer.offsetLeft;
            const walk = (x - startX) * 2;
            carouselContainer.scrollLeft = scrollLeft - walk;
        });
        
        // Soporte para touch (móviles)
        let touchStartX = 0;
        
        carouselContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            originComic.style.animationPlayState = 'paused';
        });
        
        carouselContainer.addEventListener('touchend', () => {
            setTimeout(() => {
                originComic.style.animationPlayState = 'running';
            }, 500);
        });
        
        carouselContainer.addEventListener('touchmove', (e) => {
            if (!touchStartX) return;
            const touchX = e.touches[0].clientX;
            const diffX = touchStartX - touchX;
            carouselContainer.scrollLeft += diffX;
            touchStartX = touchX;
        });
    }
    
    // Auto-rotate individual panel highlight (opcional)
    let currentPanel = 0;
    const uniquePanels = document.querySelectorAll('.comic-panel[data-panel]');
    const panelCount = 5; // Solo los paneles únicos
    
    setInterval(() => {
        // Solo aplicar active a los primeros 5 paneles únicos
        comicPanels.forEach(p => p.classList.remove('active'));
        
        // Encontrar todos los paneles con el mismo data-panel
        const currentDataPanel = (currentPanel % panelCount) + 1;
        const matchingPanels = document.querySelectorAll(`[data-panel="${currentDataPanel}"]`);
        matchingPanels.forEach(panel => panel.classList.add('active'));
        
        currentPanel = (currentPanel + 1) % panelCount;
    }, 4000);
}

// Form Handling
function initializeFormHandling() {
    const joinForm = document.getElementById('join-form');
    const formInputs = joinForm.querySelectorAll('input, textarea, select');
    
    // Add floating label effects
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
    
    // Form submission
    joinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleFormSubmission(joinForm);
    });
}

function showForm(type) {
    const form = document.getElementById('join-form');
    const messageField = document.getElementById('message');
    const gameField = document.getElementById('game');
    
    if (type === 'squad') {
        messageField.placeholder = 'Tell us about your gaming experience, achievements, and what makes you TOXIIC...';
        gameField.style.display = 'block';
    } else {
        messageField.placeholder = 'Describe your partnership proposal, brand, or collaboration idea...';
        gameField.style.display = 'none';
    }
    
    // Smooth scroll to form
    form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Add glow effect
    form.style.boxShadow = '0 0 20px rgba(57, 255, 20, 0.3)';
    setTimeout(() => {
        form.style.boxShadow = 'none';
    }, 2000);
}

function handleFormSubmission(form) {
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.querySelector('span').textContent;
    
    // Show loading state
    submitBtn.querySelector('span').textContent = 'Infecting...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        submitBtn.querySelector('span').textContent = 'Infected Successfully!';
        submitBtn.style.background = '#39ff14';
        submitBtn.style.color = '#0a0a0a';
        
        // Reset form
        setTimeout(() => {
            form.reset();
            submitBtn.querySelector('span').textContent = originalText;
            submitBtn.style.background = 'transparent';
            submitBtn.style.color = '#39ff14';
            submitBtn.disabled = false;
            
            // Remove focused classes
            form.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('focused');
            });
        }, 2000);
    }, 1500);
}

// Intersection Observer for Animations
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                animateSection(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('section-transition');
        observer.observe(section);
    });
}

function animateSection(section) {
    const sectionId = section.getAttribute('id');
    
    switch (sectionId) {
        case 'team':
            animateTeamMembers();
            break;
        case 'merch':
            animateMerchItems();
            break;
        case 'news':
            animateNewsItems();
            break;
        default:
            break;
    }
}

function animateTeamMembers() {
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach((member, index) => {
        setTimeout(() => {
            member.style.transform = 'translateY(0)';
            member.style.opacity = '1';
        }, index * 200);
    });
}

function animateMerchItems() {
    const merchItems = document.querySelectorAll('.merch-item');
    merchItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transform = 'translateY(0)';
            item.style.opacity = '1';
        }, index * 150);
    });
}

function animateNewsItems() {
    const newsItems = document.querySelectorAll('.news-item');
    newsItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transform = 'translateX(0)';
            item.style.opacity = '1';
        }, index * 200);
    });
}

// Mobile Navigation
function initializeMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('nav-open');
            navToggle.classList.toggle('active');
        });
    }
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals or forms
        const openModals = document.querySelectorAll('.modal.open');
        openModals.forEach(modal => {
            modal.classList.remove('open');
        });
    }
    
    // Arrow key navigation
    if (e.key === 'ArrowDown') {
        navigateToNextSection();
    } else if (e.key === 'ArrowUp') {
        navigateToPrevSection();
    }
});

function navigateToNextSection() {
    const sections = ['home', 'about'];
    const currentIndex = sections.indexOf(currentSection);
    const nextIndex = (currentIndex + 1) % sections.length;
    scrollToSection(sections[nextIndex]);
}

function navigateToPrevSection() {
    const sections = ['home', 'about'];
    const currentIndex = sections.indexOf(currentSection);
    const prevIndex = (currentIndex - 1 + sections.length) % sections.length;
    scrollToSection(sections[prevIndex]);
}

// Performance Optimizations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScrollHandler = debounce(() => {
    updateActiveSection();
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Preload Critical Resources
function preloadImages() {
    const imagesToPreload = [
        // Add any critical images here
    ];
    
    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Social Media Integration
function initializeSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = link.getAttribute('data-platform');
            openSocialPlatform(platform);
        });
    });
}

function openSocialPlatform(platform) {
    const urls = {
        twitch: 'https://twitch.tv/teamtoxiic',
        youtube: 'https://youtube.com/@teamtoxiic',
        twitter: 'https://twitter.com/teamtoxiic',
        discord: 'https://discord.gg/teamtoxiic'
    };
    
    if (urls[platform]) {
        window.open(urls[platform], '_blank');
    }
}

// Error Handling
window.addEventListener('error', (e) => {
    console.error('Website Error:', e.error);
    // Implement error reporting if needed
});

// Analytics Integration (placeholder)
function trackEvent(eventName, properties = {}) {
    // Implement analytics tracking
    console.log('Event:', eventName, properties);
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeMobileNav();
    initializeSocialLinks();
    preloadImages();
    handleMobileVideoPlayback();
    
    // Track page load
    trackEvent('page_load', {
        section: 'home',
        timestamp: Date.now()
    });
});

// Background Videos Management
function initializeBackgroundVideos() {
    const videos = document.querySelectorAll('.bg-video');
    
    if (videos.length === 0) return;
    
    // Ensure first video is active
    videos[0].classList.add('active');
    
    // Start video rotation after initial load
    setTimeout(() => {
        startVideoRotation();
    }, 5000); // Wait 5 seconds before starting rotation
    
    // Add event listeners for video loading
    videos.forEach((video, index) => {
        video.addEventListener('loadeddata', () => {
            console.log(`Video ${index + 1} cargado exitosamente`);
        });
        
        video.addEventListener('error', (e) => {
            console.error(`Error cargando video ${index + 1}:`, e);
            // Hide failed video
            video.style.display = 'none';
        });
        
        // Ensure videos loop seamlessly
        video.addEventListener('ended', () => {
            video.currentTime = 0;
            video.play();
        });
    });
}

function startVideoRotation() {
    const videos = document.querySelectorAll('.bg-video');
    
    if (videos.length <= 1) return; // No need to rotate if only one video
    
    videoRotationInterval = setInterval(() => {
        // Fade out current video
        videos[currentVideoIndex].classList.remove('active');
        
        // Move to next video
        currentVideoIndex = (currentVideoIndex + 1) % videos.length;
        
        // Fade in next video
        setTimeout(() => {
            videos[currentVideoIndex].classList.add('active');
        }, 1000); // Delay to create smooth transition
        
    }, 15000); // Change video every 15 seconds
}

function stopVideoRotation() {
    if (videoRotationInterval) {
        clearInterval(videoRotationInterval);
        videoRotationInterval = null;
    }
}

// Pause videos when page is not visible (performance optimization)
document.addEventListener('visibilitychange', () => {
    const videos = document.querySelectorAll('.bg-video');
    
    if (document.hidden) {
        videos.forEach(video => {
            video.pause();
        });
        stopVideoRotation();
    } else {            videos.forEach(video => {
                video.play().catch(e => console.log('Reproducción de video falló:', e));
            });
            if (!videoRotationInterval && !isLoading) {
                startVideoRotation();
            }
    }
});

// Handle video playback on mobile devices
function handleMobileVideoPlayback() {
    const videos = document.querySelectorAll('.bg-video');
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // On mobile, show only the first video without autoplay
        videos.forEach((video, index) => {
            if (index === 0) {
                video.poster = 'assets/images/video-poster.jpg'; // Add a poster image if available
                video.removeAttribute('autoplay');
                video.controls = false;
            } else {
                video.style.display = 'none';
            }
        });
        
        // Stop rotation on mobile
        stopVideoRotation();
    }
}

// Enhanced Video Error Handling
function handleVideoErrors() {
    const videos = document.querySelectorAll('.bg-video');
    const videoBackground = document.querySelector('.video-background');
    let loadedVideos = 0;
    let totalVideos = videos.length;
    
    videos.forEach((video, index) => {
        video.addEventListener('loadeddata', () => {
            loadedVideos++;
            console.log(`Video ${index + 1} cargado (${loadedVideos}/${totalVideos})`);
            
            if (loadedVideos === totalVideos) {
                videoBackground.classList.remove('loading');
                console.log('Todos los videos cargados exitosamente');
            }
        });
        
        video.addEventListener('error', (e) => {
            console.error(`Error cargando video ${index + 1}:`, e);
            video.style.display = 'none';
            totalVideos--;
            
            // If no videos can load, show fallback background
            if (totalVideos === 0) {
                document.querySelector('.hero-background').classList.add('video-error');
                videoBackground.style.display = 'none';
            }
        });
        
        // Set loading state
        video.addEventListener('loadstart', () => {
            videoBackground.classList.add('loading');
        });
    });
}

// Video Quality Adaptation
function adaptVideoQuality() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const videos = document.querySelectorAll('.bg-video');
    
    if (connection) {
        // Reduce video quality on slow connections
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            videos.forEach(video => {
                video.style.display = 'none';
            });
            document.querySelector('.hero-background').classList.add('video-error');
        }
        
        // Monitor connection changes
        connection.addEventListener('change', () => {
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                stopVideoRotation();
                videos.forEach(video => video.pause());
            } else {
                videos.forEach(video => video.play().catch(e => console.log('Video play failed:', e)));
                if (!videoRotationInterval) {
                    startVideoRotation();
                }
            }
        });
    }
}

// Video Intersection Observer (pause when not visible)
function initializeVideoIntersectionObserver() {
    const heroSection = document.querySelector('.hero-section');
    const videos = document.querySelectorAll('.bg-video');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Hero is visible, play videos
                videos.forEach(video => {
                    video.play().catch(e => console.log('Video play failed:', e));
                });
                if (!videoRotationInterval) {
                    startVideoRotation();
                }
            } else {
                // Hero is not visible, pause videos for performance
                videos.forEach(video => video.pause());
                stopVideoRotation();
            }
        });
    }, {
        threshold: 0.1
    });
    
    if (heroSection) {
        observer.observe(heroSection);
    }
}

// Community Rolling Gallery Effects
function initializeCommunityEffects() {
    const galleryTrack = document.getElementById('galleryTrack');
    
    if (!galleryTrack) return;
    
    let currentIndex = 0;
    const cards = galleryTrack.children;
    const cardCount = cards.length;
    
    // Duplicate cards for infinite scroll effect
    function duplicateCards() {
        // Clone all cards and append them to create seamless loop
        for (let i = 0; i < cardCount; i++) {
            const clone = cards[i].cloneNode(true);
            galleryTrack.appendChild(clone);
        }
    }
    
    // Initialize infinite scroll
    duplicateCards();
    
    // Enhanced hover effects for rolling cards
    const rollingCards = document.querySelectorAll('.rolling-card');
    
    rollingCards.forEach(card => {
        const glitchOverlay = card.querySelector('.glitch-overlay');
        const socialIcons = card.querySelectorAll('.social-icon');
        const pixelAvatar = card.querySelector('.pixel-avatar');
        
        card.addEventListener('mouseenter', () => {
            // Pause animation on hover
            if (isPlaying) {
                galleryTrack.style.animationPlayState = 'paused';
            }
            
            // Add pixel flicker effect
            card.style.animation = 'pixelFlicker 0.15s ease-in-out 2';
            
            // Randomize glitch effect timing
            if (glitchOverlay) {
                glitchOverlay.style.animationDelay = Math.random() * 0.5 + 's';
            }
            
            // Avatar glow effect
            if (pixelAvatar) {
                pixelAvatar.style.filter = 'brightness(1.2) drop-shadow(0 0 15px #B2FD4B)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            // Resume animation
            if (isPlaying) {
                galleryTrack.style.animationPlayState = 'running';
            }
            
            card.style.animation = '';
            
            if (pixelAvatar) {
                pixelAvatar.style.filter = '';
            }
        });
        
        // Social icon hover effects
        socialIcons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.filter = 'brightness(1.5) drop-shadow(0 0 8px #B2FD4B)';
                icon.style.borderColor = '#39ff14';
            });
            
            icon.addEventListener('mouseleave', () => {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.filter = 'brightness(1)';
                icon.style.borderColor = '#B2FD4B';
            });
        });
    });
    
    // Random avatar glitch effects
    function triggerRandomGlitch() {
        const avatars = document.querySelectorAll('.rolling-card .pixel-avatar');
        const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
        
        if (randomAvatar) {
            const originalFilter = randomAvatar.style.filter;
            randomAvatar.style.filter = 'hue-rotate(90deg) saturate(2) brightness(1.3)';
            randomAvatar.style.transform = 'scale(1.05)';
            
            setTimeout(() => {
                randomAvatar.style.filter = originalFilter;
                randomAvatar.style.transform = '';
            }, 300);
        }
    }
    
    // Trigger random glitches every 4-7 seconds
    setInterval(triggerRandomGlitch, Math.random() * 3000 + 4000);
    
    // Touch/swipe support for mobile
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    
    galleryTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    galleryTrack.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // Only trigger swipe if horizontal movement is greater than vertical
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Swipe left - next card
                currentIndex = (currentIndex + 1) % cardCount;
                slideToIndex(currentIndex);
            } else {
                // Swipe right - previous card
                currentIndex = currentIndex > 0 ? currentIndex - 1 : cardCount - 1;
                slideToIndex(currentIndex);
            }
        }
    });
}

// Add pixel flicker animation
const pixelStyle = document.createElement('style');
pixelStyle.textContent = `
    @keyframes pixelFlicker {
        0%, 100% { filter: brightness(1); }
        25% { filter: brightness(1.1) hue-rotate(10deg); }
        50% { filter: brightness(0.9) hue-rotate(-5deg); }
        75% { filter: brightness(1.05) hue-rotate(5deg); }
    }
`;
document.head.appendChild(pixelStyle);

// Utility Functions
function addGlitchEffect(element, duration = 1000) {
    element.style.animation = `glitch ${duration}ms ease-in-out`;
    setTimeout(() => {
        element.style.animation = '';
    }, duration);
}

function createToxicTrail(x, y) {
    const trail = document.createElement('div');
    trail.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        background: #39ff14;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: fadeOut 0.5s ease-out forwards;
    `;
    
    document.body.appendChild(trail);
    
    setTimeout(() => {
        trail.remove();
    }, 500);
}

// Add toxic trail to cursor movement (optional)
let lastTrailTime = 0;
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTrailTime > 50) { // Throttle trail creation
        createToxicTrail(e.clientX, e.clientY);
        lastTrailTime = now;
    }
});

// Easter Eggs
let clickCount = 0;
document.querySelector('.footer-logo').addEventListener('click', () => {
    clickCount++;
    if (clickCount === 5) {
        document.body.classList.add('hyper-toxic');
        setTimeout(() => {
            document.body.classList.remove('hyper-toxic');
            clickCount = 0;
        }, 3000);
    }
});

// Add some CSS for the easter egg
const style = document.createElement('style');
style.textContent = `
    .hyper-toxic {
        animation: hyperGlow 0.1s ease-in-out infinite !important;
    }
    
    @keyframes hyperGlow {
        0% { filter: hue-rotate(0deg) saturate(1); }
        25% { filter: hue-rotate(90deg) saturate(1.5); }
        50% { filter: hue-rotate(180deg) saturate(2); }
        75% { filter: hue-rotate(270deg) saturate(1.5); }
        100% { filter: hue-rotate(360deg) saturate(1); }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0); }
    }
    
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
`;
document.head.appendChild(style);
