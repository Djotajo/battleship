export default function victory() {
  const gameOverDialog = document.getElementById("gameOverDialog");
  gameOverDialog.style.backgroundImage = `url(../assets/victory.jpg)`;
  const gameOverMessage = document.getElementById("gameOverMessage");
  gameOverMessage.innerHTML = "Victory!";
  gameOverMessage.style.color = `green`;
}
