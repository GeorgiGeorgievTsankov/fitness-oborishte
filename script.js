// Testimonials Data
const testimonials = [
    {
        name: "Мария Иванова",
        role: "Фитнес ентусиаст",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200",
        quote: "Страхотна атмосфера и професионално отношение. Постигнах невероятни резултати за 3 месеца!",
        rating: 5
    },
    {
        name: "Георги Петров",
        role: "Редовен клиент",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200",
        quote: "Най-добрият фитнес в района. Перфектно оборудване и страхотни треньори.",
        rating: 5
    },
    {
        name: "Елена Димитрова",
        role: "Йога практикуващ",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200",
        quote: "Изключително съм доволна от йога класовете. Инструкторите са много внимателни и помагащи.",
        rating: 5
    }
];

// Utility Functions
function createStarRating(rating) {
    const stars = '★'.repeat(rating);
    return `<div class="stars">${stars}</div>`;
}

function createTestimonialCard(testimonial) {
    return `
        <div class="testimonial-card">
            <div class="client-info">
                <img src="${testimonial.image}" alt="${testimonial.name}" class="client-image">
                <div class="client-details">
                    <h3>${testimonial.name}</h3>
                    <p>${testimonial.role}</p>
                </div>
            </div>
            ${createStarRating(testimonial.rating)}
            <p class="quote">"${testimonial.quote}"</p>
        </div>
    `;
}

// Main initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove("active");
            }
        });
    }

    // Carousel Functionality
    const carousel = document.querySelector(".carousel");
    const carouselItems = document.querySelectorAll(".carousel-item");
    const dotsContainer = document.querySelector(".carousel-dots");

    if (carousel && carouselItems.length > 0 && dotsContainer) {
        let currentSlide = 0;

        // Create dots
        carouselItems.forEach((_, index) => {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            if (index === 0) dot.classList.add("active");
            dot.addEventListener("click", () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll(".dot");

        function updateDots() {
            dots.forEach((dot, index) => {
                dot.classList.toggle("active", index === currentSlide);
            });
        }

        function goToSlide(n) {
            currentSlide = n;
            carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
            updateDots();
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % carouselItems.length;
            goToSlide(currentSlide);
        }

        // Auto advance slides
        setInterval(nextSlide, 5000);
    }

    // Testimonials Initialization
    const testimonialsContainer = document.getElementById('testimonials-container');
    if (testimonialsContainer) {
        testimonialsContainer.innerHTML = testimonials.map(createTestimonialCard).join('');
    }

    // Lightbox Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryImages = document.querySelectorAll('.gallery-item img');
    const closeBtn = document.querySelector('.lightbox .close');

    if (lightbox && lightboxImg && galleryImages.length > 0 && closeBtn) {
        galleryImages.forEach(img => {
            img.addEventListener('click', () => {
                lightbox.style.display = 'block';
                lightboxImg.src = img.src;
            });
        });

        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                });
                // Close mobile menu if open
                navLinks?.classList.remove("active");
            }
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    // Add animation to sections
    document.querySelectorAll("section").forEach((section) => {
        section.style.opacity = "0";
        section.style.transform = "translateY(20px)";
        section.style.transition = "all 0.5s ease-out";
        observer.observe(section);
    });
});




