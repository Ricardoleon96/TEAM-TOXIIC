// Global Variables
let currentSection = 'home';
let isLoading = true;
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
        initializeComicPanels();
        initializeSmoothScrolling();
        initializeIntersectionObserver();
        initializeBackgroundVideos();
        handleVideoErrors();
        adaptVideoQuality();
        initializeVideoIntersectionObserver();
        initializeProductVariations();
        initializeMobileNavigation(); // Add this line
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
    // Navigation is now always visible - no special behavior needed
    // Keep function for compatibility but remove nav-hidden logic
}

// Scroll Effects
function initializeScrollEffects() {
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
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

// Comic Panels & Carousel
function initializeComicPanels() {
    const comicCarousel = document.getElementById('comic-carousel');
    const comicPanels = document.querySelectorAll('.comic-panel');
    
    if (!comicCarousel) return;
    
    // Funcionalidad de click en las tarjetas
    comicPanels.forEach(panel => {
        panel.addEventListener('click', () => {
            // Remover active de todas las tarjetas
            comicPanels.forEach(p => p.classList.remove('active'));
            // Agregar active a la tarjeta clickeada
            panel.classList.add('active');
        });
    });
    
    // Control del carrusel con hover para pausar/reanudar
    comicCarousel.addEventListener('mouseenter', () => {
        comicCarousel.style.animationPlayState = 'paused';
    });
    
    comicCarousel.addEventListener('mouseleave', () => {
        comicCarousel.style.animationPlayState = 'running';
    });
    
    // Auto-highlight de paneles individuales
    let currentPanel = 0;
    const totalPanels = 6; // Total de paneles únicos
    
    setInterval(() => {
        // Remover active de todos los paneles
        comicPanels.forEach(p => p.classList.remove('active'));
        
        // Agregar active al panel actual (considerando duplicados)
        const currentDataPanel = (currentPanel % totalPanels) + 1;
        const matchingPanels = document.querySelectorAll(`[data-panel="${currentDataPanel}"]`);
        matchingPanels.forEach(panel => panel.classList.add('active'));
        
        currentPanel = (currentPanel + 1) % totalPanels;
    }, 3000); // Cambiar cada 3 segundos
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

// Mobile Navigation Toggle
function initializeMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-links a');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close mobile menu when clicking on a link
        navLinkItems.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
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
});

// Analytics Integration (placeholder)
function trackEvent(eventName, properties = {}) {
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
    } else {
        videos.forEach(video => {
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

// Product Variations and Auto-rotation
function initializeProductVariations() {
    const productCards = document.querySelectorAll('.product-card[data-variations]');
    const shopSection = document.querySelector('.shop-section');
    
    let productData = []; // Store product card data
    let isShopVisible = false;
    
    // Prepare product card data
    productCards.forEach((card, cardIndex) => {
        const variations = JSON.parse(card.getAttribute('data-variations'));
        const productImage = card.querySelector('.product-photo');
        const dots = card.querySelectorAll('.dot');
        
        if (variations.length <= 1) return; // Skip single-variation products
        
        // Only allow auto-rotation for featured product (left card)
        const isFeaturedProduct = card.classList.contains('featured-product');
        
        productData.push({
            card,
            variations,
            productImage,
            dots,
            currentIndex: 0,
            autoRotateInterval: null,
            cardIndex,
            canAutoRotate: isFeaturedProduct // Only featured product can auto-rotate
        });
        
        // Initialize first image and dots (but don't start rotation yet)
        updateProductImage(productData[productData.length - 1]);
    });
    
    // Start auto-rotation for a specific product
    function startAutoRotation(productInfo) {
        if (productInfo.autoRotateInterval) return; // Already running
        
        productInfo.autoRotateInterval = setInterval(() => {
            productInfo.currentIndex = (productInfo.currentIndex + 1) % productInfo.variations.length;
            updateProductImage(productInfo);
        }, 10000); // Change image every 10 seconds
    }
    
    // Stop auto-rotation for a specific product
    function stopAutoRotation(productInfo) {
        if (productInfo.autoRotateInterval) {
            clearInterval(productInfo.autoRotateInterval);
            productInfo.autoRotateInterval = null;
        }
    }
    
    // Start all auto-rotations
    function startAllRotations() {
        productData.forEach(productInfo => {
            if (productInfo.variations.length > 1 && productInfo.canAutoRotate) {
                startAutoRotation(productInfo);
            }
        });
    }
    
    // Stop all auto-rotations
    function stopAllRotations() {
        productData.forEach(productInfo => {
            stopAutoRotation(productInfo);
        });
    }
    
    // Update product image and dots
    function updateProductImage(productInfo) {
        const { variations, currentIndex, productImage, dots, card } = productInfo;
        const newImageSrc = `assets/Shop/${variations[currentIndex]}`;
        
        // Add transitioning class for enhanced animation
        card.classList.add('transitioning');
        
        // Create smooth crossfade transition
        productImage.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        productImage.style.opacity = '0';
        
        setTimeout(() => {
            productImage.src = newImageSrc;
            
            // Wait for image to load before fading in
            productImage.onload = () => {
                productImage.style.opacity = '1';
                
                // Update active dot with smooth animation
                dots.forEach((dot, index) => {
                    dot.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                    dot.classList.toggle('active', index === currentIndex);
                });
                
                // Remove transitioning class after animation
                setTimeout(() => {
                    card.classList.remove('transitioning');
                }, 400);
            };
            
            // Fallback in case onload doesn't fire
            setTimeout(() => {
                if (productImage.style.opacity === '0') {
                    productImage.style.opacity = '1';
                    card.classList.remove('transitioning');
                }
            }, 200);
            
        }, 400); // Half of the fade duration
    }
    
    // Handle dot clicks for all products
    productData.forEach(productInfo => {
        productInfo.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                productInfo.currentIndex = index;
                updateProductImage(productInfo);
                stopAutoRotation(productInfo);
                
                // Restart auto-rotation after 5 seconds of inactivity (only if shop is visible and can auto-rotate)
                setTimeout(() => {
                    if (isShopVisible && productInfo.canAutoRotate) {
                        startAutoRotation(productInfo);
                    }
                }, 5000);
            });
        });
    });
    
    // Intersection Observer for shop section
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Shop section is visible, start auto-rotation
                isShopVisible = true;
                startAllRotations();
            } else {
                // Shop section is not visible, stop auto-rotation
                isShopVisible = false;
                stopAllRotations();
            }
        });
    }, {
        threshold: 0.1 // Start when 10% of shop section is visible
    });
    
    // Observe the shop section
    if (shopSection) {
        observer.observe(shopSection);
    }
    
    // Fallback: Start rotation after 5 seconds if shop section exists
    setTimeout(() => {
        if (shopSection && productData.length > 0) {
            isShopVisible = true;
            startAllRotations();
        }
    }, 5000);
}

// Initialize product variations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait for images to load before initializing variations
    setTimeout(() => {
        initializeProductVariations();
    }, 1000);
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
