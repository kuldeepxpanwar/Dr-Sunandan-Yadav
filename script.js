const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const revealItems = document.querySelectorAll(".reveal");
const treatmentTabs = document.querySelectorAll("[data-treatment]");
const treatmentPanel = document.querySelector("[data-treatment-panel]");
const form = document.querySelector("[data-form]");
const formNote = document.querySelector("[data-form-note]");
const customSelects = document.querySelectorAll("[data-custom-select]");
const reviewsGrid = document.querySelector(".reviews-grid");

const heroImage = document.querySelector(".hero-media img");

const handleScroll = () => {
  header?.classList.toggle("scrolled", window.scrollY > 16);
  
  if (heroImage) {
    // Subtle parallax effect matching the reference video feel
    heroImage.style.transform = `translateY(${window.scrollY * 0.18}px)`;
  }
};

handleScroll();
window.addEventListener("scroll", handleScroll, { passive: true });

menuButton?.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

mobileMenu?.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    mobileMenu.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => observer.observe(item));

if (reviewsGrid) {
  let autoScrollInterval = setInterval(() => {
    const firstCard = reviewsGrid.querySelector("article");
    if (!firstCard) return;
    
    // Calculate scroll amount (card width + gap)
    const cardWidth = firstCard.offsetWidth + 16; 
    
    // If reached the end, scroll back to start, else scroll next
    if (reviewsGrid.scrollLeft + reviewsGrid.clientWidth >= reviewsGrid.scrollWidth - 10) {
      reviewsGrid.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      reviewsGrid.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  }, 3500);

  const stopAutoScroll = () => {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
      autoScrollInterval = null;
    }
  };

  reviewsGrid.addEventListener("touchstart", stopAutoScroll, { passive: true });
  reviewsGrid.addEventListener("mousedown", stopAutoScroll);
  reviewsGrid.addEventListener("wheel", stopAutoScroll, { passive: true });
}

customSelects.forEach((select) => {
  const button = select.querySelector("button");
  const input = select.querySelector("input");
  const options = select.querySelectorAll("[role='option']");

  button.addEventListener("click", () => {
    const isOpen = select.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      options.forEach((item) => item.removeAttribute("aria-selected"));
      option.setAttribute("aria-selected", "true");
      input.value = option.dataset.value;
      button.textContent = option.dataset.value;
      select.classList.remove("open");
      button.setAttribute("aria-expanded", "false");
    });
  });
});

document.addEventListener("click", (event) => {
  customSelects.forEach((select) => {
    if (!select.contains(event.target)) {
      select.classList.remove("open");
      select.querySelector("button")?.setAttribute("aria-expanded", "false");
    }
  });
});

treatmentTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const targetId = tab.dataset.treatment;
    const targetCard = document.getElementById("tab-" + targetId);
    if (!targetCard) return;

    treatmentTabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");

    const allCards = document.querySelectorAll(".treatment-detail");
    allCards.forEach(card => {
      card.classList.remove("active");
      card.classList.remove("is-swapping");
    });
    
    // Add swap animation
    targetCard.classList.add("is-swapping");
    targetCard.classList.add("active");
    
    window.setTimeout(() => {
      targetCard.classList.remove("is-swapping");
    }, 50);
  });
});



const devTrigger = document.querySelector("[data-dev-trigger]");
const devModal = document.querySelector("[data-dev-modal]");
const devOverlay = document.querySelector("[data-dev-overlay]");
const devCloseBtn = document.querySelector("[data-dev-close]");

const toggleDevModal = (show) => {
  if (!devModal || !devOverlay) return;
  if (show) {
    devModal.classList.add("open");
    devOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  } else {
    devModal.classList.remove("open");
    devOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }
};

devTrigger?.addEventListener("click", () => toggleDevModal(true));
devCloseBtn?.addEventListener("click", () => toggleDevModal(false));
devOverlay?.addEventListener("click", () => toggleDevModal(false));

const countUpElements = document.querySelectorAll(".count-up");
const countObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute("data-target"), 10);
        let start = 1;
        const duration = 2000;
        const stepTime = Math.abs(Math.floor(duration / target));
        
        const timer = setInterval(() => {
          start += target > 100 ? 47 : 1;
          if (start > target) start = target;
          el.textContent = start;
          if (start === target) {
            clearInterval(timer);
          }
        }, stepTime);
        observer.unobserve(el);
      }
    });
  },
  { threshold: 0.5 }
);

countUpElements.forEach((el) => {
  countObserver.observe(el);
});

// WhatsApp Booking Integration
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    
    if (!formData.get("concern")) {
      if (formNote) {
        formNote.textContent = "Please select a concern before requesting an appointment.";
        formNote.classList.add("error");
      }
      return;
    }
    
    if (formNote) {
      formNote.classList.remove("error");
      formNote.textContent = "Details are used only for consultation coordination.";
    }

    const name = formData.get("name");
    const phone = formData.get("phone");
    const concern = formData.get("concern") || "General Consultation";
    const location = formData.get("location") || "Pratap Nagar clinic";
    
    const message = `Hello Dr. Sunandan Yadav's Clinic,
    
I would like to request an appointment.
*Patient Name:* ${name}
*Phone:* ${phone}
*Concern:* ${concern}
*Preferred Location:* ${location}

Please let me know the available time slots.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "919001700762";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, "_blank");
    
    const submitBtn = form.querySelector("button[type='submit']");
    if (submitBtn) {
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Redirecting to WhatsApp...";
      submitBtn.style.backgroundColor = "#25D366";
      submitBtn.style.borderColor = "#25D366";
      
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.backgroundColor = "";
        submitBtn.style.borderColor = "";
        form.reset();
        const customSelectBtn = form.querySelector("[data-custom-select] button");
        if (customSelectBtn) {
          customSelectBtn.textContent = "Select concern";
        }
      }, 3000);
    }
  });
}

// Blog Slider Navigation
const blogGrid = document.getElementById("blogGrid");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

if (blogGrid && prevBtn && nextBtn) {
  const getScrollAmount = () => {
    const card = blogGrid.querySelector(".blog-card");
    // scroll by one card width + gap
    return card ? card.offsetWidth + 24 : 350; 
  };

  prevBtn.addEventListener("click", () => {
    blogGrid.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    blogGrid.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
  });
}

// Universal Native Carousel Pagination Logic
document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll('[data-carousel-container]');
  
  carousels.forEach(carouselWrapper => {
    const grid = carouselWrapper.querySelector('.scroll-grid');
    const indicatorsWrap = carouselWrapper.querySelector('.native-carousel-indicators');
    
    if (grid && indicatorsWrap) {
      // Find all cards inside this specific grid
      const cards = grid.children;
      const indicators = indicatorsWrap.querySelectorAll('.indicator');
      
      if (cards.length > 0 && indicators.length > 0) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const index = Array.from(cards).indexOf(entry.target);
              if (index !== -1 && indicators[index]) {
                indicators.forEach(ind => ind.classList.remove('active'));
                indicators[index].classList.add('active');
              }
            }
          });
        }, {
          root: grid,
          threshold: 0.5
        });

        Array.from(cards).forEach(card => observer.observe(card));
      }
    }
  });
});

// Dynamic Pagination Dots for Mobile Scroll-Snap Grids
const paginationGrids = document.querySelectorAll(".service-grid, .reviews-grid, .blog-grid, .clinical-grid, .why-grid, .treatment-carousel");

paginationGrids.forEach(grid => {
  const cards = Array.from(grid.children);
  if (cards.length <= 1) return;

  const dotsContainer = document.createElement("div");
  dotsContainer.className = "pagination-dots";
  dotsContainer.setAttribute("aria-hidden", "true");
  
  cards.forEach((card, index) => {
    const dot = document.createElement("span");
    dot.className = index === 0 ? "dot active" : "dot";
    dot.addEventListener("click", () => {
      card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    });
    dotsContainer.appendChild(dot);
  });

  // Insert after the grid
  grid.parentNode.insertBefore(dotsContainer, grid.nextSibling);

  const dotObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = cards.indexOf(entry.target);
        if (index !== -1) {
          Array.from(dotsContainer.children).forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
          });
        }
      }
    });
  }, {
    root: grid,
    threshold: 0.6
  });

  cards.forEach(card => dotObserver.observe(card));
});

// Dynamic Copyright Year
const currentYearSpan = document.getElementById("current-year");
if (currentYearSpan) {
  currentYearSpan.textContent = new Date().getFullYear();
}

// RIRS Image Slideshow Auto-Rotation
document.addEventListener('DOMContentLoaded', () => {
  const rirsSlides = document.querySelectorAll('.rirs-frame-slideshow img');
  
  if (rirsSlides.length > 0) {
    let currentSlide = 0;
    
    setInterval(() => {
      // Remove active from current
      rirsSlides[currentSlide].classList.remove('active');
      
      // Move to next
      currentSlide = (currentSlide + 1) % rirsSlides.length;
      
      // Add active to new
      rirsSlides[currentSlide].classList.add('active');
    }, 4000); // 4 seconds
  }
});
