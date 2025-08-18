// Script JavaScript commun pour toutes les pages

// Fonction pour mettre à jour la navigation active
function updateActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Animation au scroll pour tous les éléments .fade-in
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Effet de parallax léger sur la navigation
function initNavbarEffects() {
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.nav-horizontal');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Smooth scrolling pour les liens internes
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Menu mobile responsive
function initMobileMenu() {
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<span></span><span></span><span></span>';
    
    const navContainer = document.querySelector('.nav-container');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navContainer && navMenu) {
        navContainer.appendChild(menuToggle);
        
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('mobile-active');
            this.classList.toggle('active');
        });
        
        // Fermer le menu quand on clique sur un lien
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('mobile-active');
                menuToggle.classList.remove('active');
            });
        });
    }
}

// Ajouter le CSS pour le menu mobile
function addMobileMenuStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .menu-toggle {
            display: none;
            flex-direction: column;
            gap: 4px;
            cursor: pointer;
            padding: 8px;
        }
        
        .menu-toggle span {
            width: 25px;
            height: 2px;
            background: var(--primary);
            transition: all 0.3s ease;
        }
        
        .menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(6px, 6px);
        }
        
        .menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(6px, -6px);
        }
        
        @media (max-width: 968px) {
            .menu-toggle {
                display: flex;
            }
            
            .nav-menu {
                position: fixed;
                top: 80px;
                left: -100%;
                width: 100%;
                height: calc(100vh - 80px);
                background: var(--white);
                flex-direction: column;
                justify-content: start;
                align-items: center;
                padding-top: 2rem;
                transition: left 0.3s ease;
                box-shadow: 0 2px 20px rgba(0,0,0,0.1);
                z-index: 999;
            }
            
            .nav-menu.mobile-active {
                left: 0;
            }
            
            .nav-menu li {
                margin: 1rem 0;
            }
            
            .nav-menu a {
                font-size: 1.1rem;
                padding: 12px 24px;
            }
        }
    `;
    document.head.appendChild(style);
}

// Gestion des erreurs d'images
function initImageErrorHandling() {
    document.querySelectorAll('img').forEach(img => {
        if (!img.hasAttribute('onerror')) {
            img.addEventListener('error', function() {
                this.style.backgroundColor = '#f0f0f0';
                this.style.display = 'flex';
                this.style.alignItems = 'center';
                this.style.justifyContent = 'center';
                this.style.color = '#999';
                this.style.fontSize = '14px';
                this.alt = 'Image non trouvée';
            });
        }
    });
}

// Performance: Lazy loading des images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Animation de chargement de page
function initPageLoadAnimation() {
    document.addEventListener('DOMContentLoaded', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
}

// Initialisation de tous les scripts
document.addEventListener('DOMContentLoaded', function() {
    updateActiveNav();
    initScrollAnimations();
    initNavbarEffects();
    initSmoothScrolling();
    addMobileMenuStyles();
    initMobileMenu();
    initImageErrorHandling();
    initLazyLoading();
    
    // Analytics et tracking (optionnel)
    console.log('Vianney Hastings Photography - Site chargé avec succès');
});

// Gestion de la compatibilité navigateur
if (!window.IntersectionObserver) {
    // Fallback pour les anciens navigateurs
    document.querySelectorAll('.fade-in').forEach(el => {
        el.classList.add('visible');
    });
}
