export default function resizr(width, height) {
  const canvas = document.querySelector("canvas");
  const { innerWidth, innerHeight } = window;
  const winRatio = innerWidth / innerHeight;
  const gameRatio = width / height;
  if (winRatio > gameRatio) {
    canvas?.style.width = innerWidth + "px";
  }
}
