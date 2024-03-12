export default function gameOver() {
  return `<dialog id="gameOverDialog">
    <div>
        <form id="gameOverForm">
            <p>
                <label for="gameOverContent"></label>
                <h1 id="gameOverMessage">Defeat!</h1>
                <div id="gameOverContent"></div>
            </p>
                <div>
                  <button id="confirmBtnGameOver" class="play-again" value="default" formmethod="dialog">
                    Play again
                  </button>
                </div>
        </form>
        </div>
    </dialog>`;
}
