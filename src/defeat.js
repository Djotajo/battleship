export default function defeat() {
  const gameOverDialog = document.getElementById("gameOverDialog");
  gameOverDialog.style.backgroundImage = `url(../assets/defeat.jpg)`;
  const gameOverMessage = document.getElementById("gameOverMessage");
  gameOverMessage.innerHTML = "Defeat!";
  gameOverMessage.classList.add("defeat");
}
