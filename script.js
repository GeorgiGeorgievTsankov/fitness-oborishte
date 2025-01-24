// Mobile Menu Toggle
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove("active");
  }
});

// Carousel Functionality
const carousel = document.querySelector(".carousel");
const carouselItems = document.querySelectorAll(".carousel-item");
const dotsContainer = document.querySelector(".carousel-dots");
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
      navLinks.classList.remove("active");
    }
  });
});

// Parallax Effect
window.addEventListener("scroll", () => {
  const parallax = document.querySelector(".parallax");
  const scrolled = window.pageYOffset;
  parallax.style.backgroundPositionY = `${scrolled * 0.5}px`;
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

// Gallery Filtering
if (document.querySelector(".gallery-filters")) {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      galleryItems.forEach((item) => {
        if (
          filterValue === "all" ||
          item.getAttribute("data-category") === filterValue
        ) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
}


