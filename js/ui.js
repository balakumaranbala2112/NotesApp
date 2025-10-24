const deleteBtn = document.querySelectorAll(".delete-btn");
const modalContainer = document.getElementById("modalContainer");
const cancelDelete = document.getElementById("cancelDelete");
const confirmDelete = document.getElementById("confirmDelete");
const attachmentInput = document.getElementById("attachment");
const newNoteBtn = document.getElementById("newNoteBtn");
const modalContainerForNewNote = document.getElementById(
  "modalContainerForNewNote"
);
const closeNotesModal = document.getElementById("closeNotesModal");

deleteBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    modalContainer.classList.add("active");
  });
});

cancelDelete.addEventListener("click", (ev) => {
  modalContainer.classList.remove("active");
  noteToDeleteIndex = null;
});

notesGrid.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    noteToDeleteIndex = e.target.dataset.index;

    modalContainer.classList.add("active");
  }
});

confirmDelete.addEventListener("click", (e) => {
  if (noteToDeleteIndex !== null) {
    notes.splice(noteToDeleteIndex, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    createNoteCard();
    modalContainer.classList.remove("active");
    noteToDeleteIndex = null;
  }
});

// New-Note Modal Scripts

newNoteBtn.addEventListener("click", (e) => {
  modalContainerForNewNote.classList.add("active");
});

closeNotesModal.addEventListener("click", (e) => {
  modalContainerForNewNote.classList.remove("active");
});

closeNotesModal.addEventListener("click", (e) => {
  if (e.target === modalContainerForNewNote) {
    modalContainerForNewNote.classList.remove("active");
  }
});


