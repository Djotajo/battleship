export default function firstMove(a, b) {
  Math.random() < 0.5
    ? ((a.turn = true), (b.turn = false))
    : ((a.turn = false), (b.turn = true));
}
