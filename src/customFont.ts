import berkelium from "./css/fonts/berkelium/berkelium.ttf";

export default function customFont() {
  const style = document.createElement("link");
  const content = `
@font-face {
  font-family: "Berkelium";
  font-style: normal;
  font-weight: 400;
  src: "url(${berkelium})";
}
	`;

  style.innerHTML = content;
  document.head.appendChild(style);
}
