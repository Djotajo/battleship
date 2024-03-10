export default function gameOver() {
  return `<dialog id="gameOverDialog">
        <form id="gameOverForm">
            <p>
                <label for="gameOverContent"></label>
                <div id="gameOverMessage">Choose your ship</div>
                <div id="gameOverContent"></div>
            </p>
                <div>
                  <button
                    id="closeBtnGameOver"
                    value="cancel"
                    formmethod="dialog"
                    type="button">
                    Cancel
                  </button>
                  <button id="confirmBtnGameOver" value="default" formmethod="dialog">
                    Confirm
                  </button>
                </div>
        </form>
    </dialog>`;
}
