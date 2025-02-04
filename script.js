// Testimonials Data
const testimonials = [
    {
        name: "Илиан Христов",
        role: "Редовен клиент",
        image: "https://lh3.googleusercontent.com/a-/ALV-UjXrLBgnAWdt7BDGEKS5HzmKL8e__Syo64Df0StY9Er51XWn6BY=w75-h75-p-rp-mo-br100",
        quote: "Бил съм в доста фитнес зали през живота ми, но за първи път попадам на фитнес зала в която да получа такова отношение. Момчето, което ме обслужи беше изключително любезно. За първи път посещавам залата и определено ме спечелиха като клиент. Поздравления!",
        rating: 5
    },
    {
        name: "Мария Иванова",
        role: "Фитнес ентусиаст",
        image: "https://lh3.googleusercontent.com/a-/ALV-UjX-hxscZxdRs6-I9OJeDgF-ybqLX0R3KYPJElZDDwxF1gBCq7MJKQ=w75-h75-p-rp-mo-ba3-br100",
        quote: "Страхотно местенце с всички необходими уреди за пълноценна тренировка! Персоналът е изключително мил и любезен. Препоръчвам ги с две ръце!",
        rating: 5
    },
    {
        name: "Георги Петров",
        role: "Редовен клиент",
        image: "https://lh3.googleusercontent.com/a-/ALV-UjX9f9jLg0wzwjdNZH5AmxNOsZvSYaXB0e7bJfi0dGeM17bIvZS8=w75-h75-p-rp-mo-ba3-br100",
        quote: "Моят фитнес от една година. Малки, но класни, услужливи и мили хора, които също не са внушителни. Отлична стойност за парите, особено в щастливите часове. Имам всичко необходимо за моята тренировка. Единственото, за което съжалявам, че написах това ревю, е, че разкрива този малък скъпоценен камък ;)",
        rating: 5
    },
  
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




