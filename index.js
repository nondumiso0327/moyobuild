 // Debugging: Check if script is loading
        console.log("Script loaded successfully!");
        
        // Mobile menu toggle - SIMPLIFIED AND CORRECTED
        document.addEventListener('DOMContentLoaded', function() {
            console.log("DOM fully loaded");
            
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const navLinks = document.getElementById('navLinks');
            
            console.log("Mobile button found:", mobileMenuBtn);
            console.log("Nav links found:", navLinks);
            
            // Toggle mobile menu
            mobileMenuBtn.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent event bubbling
                console.log("Menu button clicked!");
                navLinks.classList.toggle('active');
                
                // Change icon
                const icon = mobileMenuBtn.querySelector('i');
                if (navLinks.classList.contains('active')) {
                    icon.className = 'fas fa-times';
                    console.log("Menu opened");
                } else {
                    icon.className = 'fas fa-bars';
                    console.log("Menu closed");
                }
            });
            
            // Close menu when clicking a link
            document.querySelectorAll('#navLinks a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
                    console.log("Menu closed after link click");
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
                }
            });
            
            // Prevent menu from closing when clicking inside it
            navLinks.addEventListener('click', function(e) {
                e.stopPropagation();
            });
            
            // Animated counter for stats
            function animateCounter(element, target, duration) {
                let start = 0;
                const increment = target / (duration / 16); // 60fps
                const timer = setInterval(() => {
                    start += increment;
                    element.textContent = Math.floor(start) + (element.id === 'satisfactionCounter' ? '%' : '+');
                    if (start >= target) {
                        element.textContent = target + (element.id === 'satisfactionCounter' ? '%' : '+');
                        clearInterval(timer);
                    }
                }, 16);
            }
            
            // Initialize counters when in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(document.getElementById('yearsCounter'), 15, 1500);
                        animateCounter(document.getElementById('projectsCounter'), 500, 2000);
                        animateCounter(document.getElementById('satisfactionCounter'), 100, 1800);
                        animateCounter(document.getElementById('teamCounter'), 50, 1600);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(document.querySelector('.stats'));
            
            // Project filtering
            const filterButtons = document.querySelectorAll('.filter-btn');
            const projectCards = document.querySelectorAll('.project-card');
            
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Update active button
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    
                    const filter = button.getAttribute('data-filter');
                    
                    // Filter projects
                    projectCards.forEach(card => {
                        if (filter === 'all' || card.getAttribute('data-category') === filter) {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'scale(1)';
                            }, 10);
                        } else {
                            card.style.opacity = '0';
                            card.style.transform = 'scale(0.8)';
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 300);
                        }
                    });
                });
            });
            
            // Testimonial slider
            const testimonialSlides = document.querySelectorAll('.testimonial-slide');
            const testimonialDots = document.querySelectorAll('.testimonial-dot');
            let currentSlide = 0;
            
            function showSlide(index) {
                // Hide all slides
                testimonialSlides.forEach(slide => slide.classList.remove('active'));
                testimonialDots.forEach(dot => dot.classList.remove('active'));
                
                // Show current slide
                testimonialSlides[index].classList.add('active');
                testimonialDots[index].classList.add('active');
                currentSlide = index;
            }
            
            // Dot click events
            testimonialDots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    showSlide(index);
                });
            });
            
            // Auto-rotate testimonials
            setInterval(() => {
                currentSlide = (currentSlide + 1) % testimonialSlides.length;
                showSlide(currentSlide);
            }, 5000);
            
            // Form submission
            const quoteForm = document.getElementById('quoteForm');
            quoteForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Thank you for your request! We will contact you within 24 hours.');
                quoteForm.reset();
            });
            
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Sticky header on scroll
            window.addEventListener('scroll', () => {
                const header = document.querySelector('header');
                if (window.scrollY > 100) {
                    header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
                    header.style.padding = '0';
                } else {
                    header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
                    header.style.padding = '';
                }
            });
        });