document.addEventListener('DOMContentLoaded', () => {

    // --- Preload & Initial Animation ---
    window.addEventListener('load', () => {
        document.body.classList.add('is-loaded');
    });

    // --- Sticky Header on Scroll ---
    const header = document.getElementById('site-header');

    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on load to catch initial state
    handleScroll();

    // --- Mobile Navigation Toggle ---
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('is-open');

            // Transform hamburger icon (optional refinement)
            if (!isExpanded) {
                // Open state
                menuToggle.querySelector('.hamburger').style.backgroundColor = 'transparent';
                menuToggle.querySelector('.hamburger').style.setProperty('--pseudo-transform-before', 'rotate(45deg) translate(5px, 5px)');
                menuToggle.querySelector('.hamburger').style.setProperty('--pseudo-transform-after', 'rotate(-45deg) translate(4px, -4px)');
                // We'd need CSS support for these pseudo vars,
                // but a simpler toggle class approach is better:
                menuToggle.classList.add('is-active');
            } else {
                menuToggle.querySelector('.hamburger').style.backgroundColor = '';
                menuToggle.classList.remove('is-active');
            }
        });

        // Close menu when clicking a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('is-open');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.classList.remove('is-active');
                menuToggle.querySelector('.hamburger').style.backgroundColor = '';
            });
        });
    }

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                // Account for fixed header height
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Intersection Observer for Scroll Animations ---
    const fadeUpElements = document.querySelectorAll('.fade-up');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px 0px -10% 0px', // trigger slightly before it comes into view
        threshold: 0.1 // 10% of element must be visible
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeUpElements.forEach(el => {
        fadeObserver.observe(el);
    });

});