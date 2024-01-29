export default function newNoteForm(gameboard) {
  let original = document.querySelector("#player1");
  let copy = original.cloneNode(true);
  return `<dialog id="addNote">
        <form id="noteForm">
            <p>
                <label for="text">Text</label>
                <div id="text"></div>
            </p>
                <div>
                  <button
                    id="closeBtn"
                    value="cancel"
                    formmethod="dialog"
                    type="button">
                    Cancel
                  </button>
                  <button id="confirmBtn" value="default" formmethod="dialog">
                    Confirm
                  </button>
                </div>
        </form>
    </dialog>
  
        <p>
        <label for="showDialog" id="showDialogLabel">
            </label>
          </p>`;
}

// // Form and dialog

// closeBtn.addEventListener("click", () => {
//   addNote.close();
//   noteForm.reset();
// });

// confirmBtn.addEventListener("click", (event) => {
//   const formCheck = document.getElementById("noteForm").checkValidity();
//   if (!formCheck) {
//     document.getElementById("noteForm").reportValidity();
//   } else {
//     event.preventDefault();
//     // const note = new newNote(title.value, text.value);
//     const note = new newNote(text.value);
//     newNoteToStorage(note);
//     // refresh();
//     addNote.close();
//   }
//   noteForm.reset();
//   render(notesDisplay());
// });
