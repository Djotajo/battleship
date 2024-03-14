export default function newNoteForm() {
  return `<dialog id="addNote">
        <form id="noteForm">
            <p>
                <label for="text"></label>
                <div id="caption">Choose your ship</div>
                <button id="shipDirectionButton" class="form-btn">Horizontal</button>
                <div id="text"></div>
            </p>
                <div>
                  <button
                    id="closeBtn"
                    class="form-btn"
                    value="cancel"
                    formmethod="dialog"
                    type="button">
                    Cancel
                  </button>
                  <button id="confirmBtn" class="form-btn" value="default" formmethod="dialog">
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
