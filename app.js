let today = new Date();

    let options = {
        day: "2-digit",
        month: "long",
        year: "numeric"
    };

    document.getElementById("date").innerText =
        today.toLocaleDateString("en-GB", options);


// DoseWise 

// ---------- 1. ELEMENTS ----------
const doseList = document.getElementById("doseList");
const progress = document.getElementById("progress");
const progressFill = document.getElementById("progressFill");
const addForm = document.getElementById("addForm");
const nameInput = document.getElementById("name");
const doseInput = document.getElementById("dose");
const timeInput = document.getElementById("time");

// ---------- 2. DATA ----------
// Load saved medicines safely. If the data is damaged, start fresh.
function loadMedicines() {
  try {
    const saved = JSON.parse(localStorage.getItem("medicines"));
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    return [];
  }
}

let medicines = loadMedicines();

// ---------- 3. SAVE ----------
function save() {
  try {
    localStorage.setItem("medicines", JSON.stringify(medicines));
  } catch (error) {
    alert("Could not save your data. Your browser storage may be full or blocked.");
  }
}

// ---------- 4. DAILY RESET ----------
// A new day means every dose is "not taken" again.
function resetIfNewDay() {
  const today = new Date().toDateString();
  const lastOpened = localStorage.getItem("lastOpened");

  if (lastOpened !== today) {
    medicines.forEach((med) => {
      med.taken = false;
    });
    localStorage.setItem("lastOpened", today);
    save();
  }
}

// ---------- 5. HELPERS ----------
// Stop user text from being treated as HTML code
function escapeHTML(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Convert "14:00" into { time: "2:00", period: "PM" }
function formatTime(time24) {
  const [hourText, minute] = time24.split(":");
  let hour = Number(hourText);
  const period = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return { time: `${hour}:${minute}`, period };
}

// ---------- 6. RENDER ----------
function render() {
  doseList.innerHTML = "";

  // Empty state
  if (medicines.length === 0) {
    doseList.innerHTML = `
      <div class="empty">
        <div class="empty-icon">💊</div>
        <p>No medicines yet.<br>Add your first one below.</p>
      </div>
    `;
  }

  // Sort by time, earliest first
  medicines.sort((a, b) => a.time.localeCompare(b.time));

  // Build one card for each medicine
  medicines.forEach((med) => {
    const { time, period } = formatTime(med.time);

    const card = document.createElement("article");
    card.className = "dose-card" + (med.taken ? " is-taken" : "");

    card.innerHTML = `
      <div class="card-time">
        <span class="time-value">${time}</span>
        <span class="time-period">${period}</span>
      </div>

      <div class="card-info">
        <h3>${escapeHTML(med.name)}</h3>
        <p>💊 ${escapeHTML(med.dose)}</p>
      </div>

      <div class="card-actions">
        <button class="btn-taken" data-action="toggle" data-id="${med.id}">
          ${med.taken ? "Taken ✓" : "Mark as taken"}
        </button>
        <button class="btn-delete" data-action="delete" data-id="${med.id}"
                aria-label="Delete ${escapeHTML(med.name)}">🗑️</button>
      </div>
    `;

    doseList.appendChild(card);
  });

  // Update progress text and progress bar
  const total = medicines.length;
  const done = medicines.filter((med) => med.taken).length;

  progress.textContent = `${done} of ${total} done`;
  progressFill.style.width = total ? (done / total) * 100 + "%" : "0%";
}

// ---------- 7. ADD A MEDICINE ----------
addForm.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page from reloading

  const name = nameInput.value.trim();
  const dose = doseInput.value.trim();
  const time = timeInput.value;

  // Do not allow empty values
  if (!name || !dose || !time) return;

  medicines.push({
    id: Date.now(), // a unique number for each medicine
    name: name,
    dose: dose,
    time: time,
    taken: false,
  });

  save();
  render();
  addForm.reset();
  nameInput.focus(); // ready for the next medicine
});

// ---------- 8. BUTTON CLICKS ----------
doseList.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const id = Number(button.dataset.id);
  const action = button.dataset.action;

  if (action === "toggle") {
    const med = medicines.find((item) => item.id === id);
    if (med) med.taken = !med.taken;
  }

  if (action === "delete") {
    const med = medicines.find((item) => item.id === id);
    if (med && confirm(`Delete "${med.name}"?`)) {
      medicines = medicines.filter((item) => item.id !== id);
    } else {
      return; // user cancelled, so do nothing
    }
  }

  save();
  render();
});

// ---------- 9. START ----------
resetIfNewDay();
render();