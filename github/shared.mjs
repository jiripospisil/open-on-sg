export function createImage() {
  const img = document.createElement("img");
  img.src = chrome.runtime.getURL("sourcegraph-mark.svg");
  img.style = "width: 16px; height: 20px; float: left;";

  return img;
}
