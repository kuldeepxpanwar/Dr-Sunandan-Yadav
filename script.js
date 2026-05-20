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

const treatmentContent = {
  stone: {
    image: "laparoscopic-surgery-ot.webp",
    title: "Laser and minimally invasive treatment options",
    body:
      "Patients are guided through symptoms, scans, treatment choices, expected recovery, and follow-up prevention so care feels less uncertain.",
    points: ["Technology-led planning", "Recovery-focused surgical approach", "Transparent consultation and follow-up"],
  },
  prostate: {
    image: "prostate-care-doctor.webp",
    title: "Prostate care planned around urinary comfort",
    body:
      "Evaluation covers frequency, weak stream, incomplete emptying, prostate size, medicines, and surgical pathways when needed.",
    points: ["Symptom-first evaluation", "TURP and laser options", "Follow-up for long-term urinary health"],
  },
  robotic: {
    image: "3d-laparoscopy-surgery.webp",
    title: "Robotic and laparoscopic procedure guidance",
    body:
      "Advanced surgical planning is presented in simple steps, from indication and hospital stay to expected recovery milestones.",
    points: ["Minimally invasive expertise", "Lower tissue trauma goals", "Clear pre-operative counselling"],
  },
  andrology: {
    image: "mens-health-awareness.webp",
    title: "Confidential andrology consultation",
    body:
      "Sensitive men's health concerns are handled with privacy, diagnostic clarity, and practical treatment choices.",
    points: ["Erectile dysfunction care", "Male infertility guidance", "Private, respectful consultation"],
  },
};

const setHeaderState = () => {
  header?.classList.toggle("scrolled", window.scrollY > 16);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

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

if (reviewsGrid && !reviewsGrid.querySelector(".reviews-track")) {
  const track = document.createElement("div");
  track.className = "reviews-track";
  const cards = Array.from(reviewsGrid.children);
  cards.forEach((card) => track.appendChild(card));
  cards.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);
  });
  reviewsGrid.appendChild(track);
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
    const content = treatmentContent[tab.dataset.treatment];
    if (!content || !treatmentPanel) return;

    treatmentTabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");

    treatmentPanel.classList.add("is-swapping");
    window.setTimeout(() => {
      treatmentPanel.innerHTML = `
        <img src="${content.image}" alt="${content.title}" />
        <div>
          <h3>${content.title}</h3>
          <p>${content.body}</p>
          <ul>
            ${content.points.map((point) => `<li>${point}</li>`).join("")}
          </ul>
        </div>
      `;
      treatmentPanel.classList.remove("is-swapping");
    }, 170);
  });
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  if (!data.get("concern")) {
    formNote.textContent = "Please select a concern before requesting an appointment.";
    formNote.classList.add("error");
    return;
  }
  const patientName = data.get("name") || "Patient";
  formNote.classList.remove("error");
  formNote.textContent = `Thank you, ${patientName}. Your appointment request is ready for clinic follow-up.`;
  form.reset();
  customSelects.forEach((select) => {
    select.querySelector("input").value = "";
    select.querySelector("button").textContent = "Select concern";
    select.querySelectorAll("[role='option']").forEach((option) => option.removeAttribute("aria-selected"));
  });
});
