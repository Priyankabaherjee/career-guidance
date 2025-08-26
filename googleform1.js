 {
    title: "Software Engineer",
    field: "Engineering",
    level: "Graduate",
    tags: ["Programming", "Problem Solving", "Teamwork"],
    description:
      "Software Engineers design, develop, and maintain software applications across industries."
  },
  {
    title: "Data Scientist",
    field: "Management",
    level: "Postgraduate",
    tags: ["Statistics", "Machine Learning", "Data Analysis"],
    description:
      "Data Scientists analyze large datasets to uncover patterns, build predictive models, and guide business decisions."
  },
  {
    title: "Civil Engineer",
    field: "Engineering",
    level: "Graduate",
    tags: ["Construction", "Design", "Infrastructure"],
    description:
      "Civil Engineers design and oversee infrastructure projects such as buildings, bridges, and roads."
  },
  {
    title: "Marketing Manager",
    field: "Management",
    level: "Postgraduate",
    tags: ["Strategy", "Communication", "Creativity"],
    description:
      "Marketing Managers develop and execute campaigns to promote products, build brands, and drive sales."
  }
];

// DOM elements
const grid = document.querySelector(".grid");
const searchInput = document.getElementById("search");
const filterField = document.getElementById("filter-field");
const filterLevel = document.getElementById("filter-level");
const modalBackdrop = document.getElementById("careerModal");
const modalBody = modalBackdrop.querySelector(".modal-body");
const closeModalBtn = modalBackdrop.querySelector(".close");

// Render careers
function renderCareers(list) {
  grid.innerHTML = "";
  if (list.length === 0) {
    grid.innerHTML = `<p>No careers found.</p>`;
    return;
  }
  list.forEach((career) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${career.title}</h3>
      <div class="meta">${career.field} • ${career.level}</div>
      <div class="tags">${career.tags
        .map((t) => `<span class="tag">${t}</span>`)
        .join("")}</div>
      <div class="btn-row">
        <button class="btn primary details-btn">Details</button>
        <button class="btn ghost">Save</button>
      </div>
    `;
    card.querySelector(".details-btn").addEventListener("click", () => {
      openModal(career);
    });
    grid.appendChild(card);
  });
}

// Filter logic
function filterCareers() {
  const search = searchInput.value.toLowerCase();
  const field = filterField.value;
  const level = filterLevel.value;

  const filtered = careers.filter((career) => {
    const matchesSearch =
      career.title.toLowerCase().includes(search) ||
      career.description.toLowerCase().includes(search);

    const matchesField = field ? career.field === field : true;
    const matchesLevel = level ? career.level === level : true;

    return matchesSearch && matchesField && matchesLevel;
  });

  renderCareers(filtered);
}

// Modal open
function openModal(career) {
  modalBody.innerHTML = `
    <h2>${career.title}</h2>
    <p><strong>Field:</strong> ${career.field}</p>
    <p><strong>Level:</strong> ${career.level}</p>
    <p>${career.description}</p>
    <h4>Book an Appointment</h4>
    <form>
      <div class="form-row">
        <input type="text" placeholder="Your Name" required>
        <input type="email" placeholder="Email" required>
      </div>
      <textarea rows="3" placeholder="Message"></textarea>
      <button type="submit" class="btn primary">Submit</button>
    </form>
  `;
  modalBackdrop.classList.add("active");
}

// Modal close
function closeModal() {
  modalBackdrop.classList.remove("active");
}

// Event listeners
searchInput.addEventListener("input", filterCareers);
filterField.addEventListener("change", filterCareers);
filterLevel.addEventListener("change", filterCareers);
closeModalBtn.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) closeModal();
});

// Initial render
renderCareers(careers);
