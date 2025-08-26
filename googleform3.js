
const careers = [
  {
    title: "Software Engineer",
    field: "IT",
    level: "Undergraduate",
    description: "Develops, tests, and maintains software applications.",
    tags: ["Programming", "Problem-solving", "Innovation"],
  },
  {
    title: "Data Scientist",
    field: "IT",
    level: "Postgraduate",
    description: "Analyzes complex data to help make business decisions.",
    tags: ["Machine Learning", "Python", "Statistics"],
  },
  {
    title: "Civil Engineer",
    field: "Engineering",
    level: "Undergraduate",
    description: "Designs and oversees construction of infrastructure projects.",
    tags: ["Construction", "Design", "Math"],
  },
  {
    title: "Doctor",
    field: "Medical",
    level: "Postgraduate",
    description: "Diagnoses and treats illnesses, improves health care.",
    tags: ["Biology", "Compassion", "Research"],
  },
];

// DOM elements
const grid = document.getElementById("careerGrid");
const searchBar = document.getElementById("searchBar");
const filterField = document.getElementById("filterField");
const filterLevel = document.getElementById("filterLevel");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalBody = document.getElementById("modalBody");
const closeModalBtn = document.getElementById("closeModal");

// ===== Render Careers =====
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
        <button class="btn primary">Details</button>
      </div>
    `;
    card.querySelector("button").addEventListener("click", () => {
      openModal(career);
    });
    grid.appendChild(card);
  });
}

// ===== Open Modal =====
function openModal(career) {
  modalBody.innerHTML = `
    <h2>${career.title}</h2>
    <p><strong>Field:</strong> ${career.field}</p>
    <p><strong>Level:</strong> ${career.level}</p>
    <p>${career.description}</p>
    <p><strong>Tags:</strong> ${career.tags.join(", ")}</p>
  `;
  modalBackdrop.classList.add("active");
}

// ===== Close Modal =====
closeModalBtn.addEventListener("click", () => {
  modalBackdrop.classList.remove("active");
});

// ===== Search & Filter =====
function filterCareers() {
  const searchText = searchBar.value.toLowerCase();
  const field = filterField.value;
  const level = filterLevel.value;

  const filtered = careers.filter((c) => {
    return (
      (c.title.toLowerCase().includes(searchText) ||
        c.description.toLowerCase().includes(searchText)) &&
      (field === "" || c.field === field) &&
      (level === "" || c.level === level)
    );
  });

  renderCareers(filtered);
}

searchBar.addEventListener("input", filterCareers);
filterField.addEventListener("change", filterCareers);
filterLevel.addEventListener("change", filterCareers);

// ===== Initial Render =====
renderCareers(careers);
