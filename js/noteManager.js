const noteForm = document.getElementById("noteForm");
const notesGrid = document.getElementById("notesGrid");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sortSelect");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

searchInput.addEventListener("input", () => {
  const searchText = searchInput.value.toLowerCase();
  document.querySelectorAll(".note-card").forEach((card) => {
    const titleEl = card.querySelector(".title h3");
    const contentEl = card.querySelector(".content p");

    const titleText = titleEl.textContent;
    const contentText = contentEl.textContent;

    if (!searchText) {
      card.style.display = "block";
      titleEl.innerHTML = escapeHTML(titleText);
      contentEl.innerHTML = escapeHTML(contentText);
      return;
    }

    const match =
      titleText.toLowerCase().includes(searchText) ||
      contentText.toLowerCase().includes(searchText);

    if (match) {
      card.style.display = "block";
      titleEl.innerHTML = highlightText(titleText, searchText);
      contentEl.innerHTML = highlightText(contentText, searchText);
    } else {
      card.style.display = "none";
    }
  });
});

function highlightText(text, search) {
  if (!search) return escapeHTML(text);

  const regex = new RegExp(`${search}`, "gi");
  return escapeHTML(text).replace(regex, `<mark>${search}</mark>`);
}

function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function createNoteCard() {
  notesGrid.innerHTML = "";

  notes.forEach((note, index) => {
    const card = document.createElement("div");
    card.className = "note-card";

    card.innerHTML = `
    <div class="title">
      <h3>${note.title}</h3>
       <button class="delete-btn">&times;</button>
     </div>

     ${
       note.image
         ? `
      <div class="note-image">
        <img src="${note.image}" alt="" />
      </div>
      `
         : ""
     }

    <div class="content">
      <p>${note.content}</p>
    </div>
    <div class="tags">
      <p class="tag-name">${note.noteTag}</p>
      <p class="date-time">${formDate(note.date)}</p>
    </div>

  `;
    notesGrid.appendChild(card);
  });
}

createNoteCard();

noteForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(noteForm);
  const newNote = Object.fromEntries(formData.entries());

  newNote.date = new Date().toISOString();

  notes.push(newNote);
  localStorage.setItem("notes", JSON.stringify(notes));
  createNoteCard();

  noteForm.reset();
});

function formDate(isoString) {
  return new Date(isoString).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

sortSelect.addEventListener("change", () => {
  const value = sortSelect.value;

  if (value === "recent") {
    notes.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (value === "first") {
    notes.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (value === "az") {
    notes.sort((a, b) => a.title.localeCompare(b.title));
  } else if (value === "za") {
    notes.sort((a, b) => b.title.localeCompare(a.title));
  }

  createNoteCard();
});
