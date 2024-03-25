// This is the button at the end of breadcrumbs.

import { createImage } from "./shared";

export default function () {
  if (document.getElementById("sg-navigation-button")) {
    return;
  }

  const sibling = document.querySelector(
    "button[data-testid='breadcrumb-copy-path-button'",
  );

  if (!sibling) {
    return;
  }

  const parent = sibling.parentElement;

  if (!parent) {
    return;
  }

  const button = document.createElement("button");
  button.id = "sg-navigation-button";
  sibling.classList.forEach((cl) => button.classList.add(cl));
  button.appendChild(createImage());
  button.addEventListener("click", onClick);

  parent.appendChild(button);
}

function onClick(event) {
  event.preventDefault();

  let info = parseURL(document.URL);
  const toOpen =
    `https://sourcegraph.com/${info.host}/${info.repo}@${info.branch}/-/${info.type}/${info.filename}`;

  chrome.runtime.sendMessage({
    url: toOpen,
    new_tab: event.metaKey || event.ctrlKey,
  });
}

// https://github.com/jiripospisil/open-on-sg/tree/master/dir
// https://github.com/jiripospisil/open-on-sg/blob/master/content-script.js
// https://github.com/jiripospisil/open-on-sg/blame/master/content-script.js
// =>
// https://sourcegraph.com/github.com/jiripospisil/open-on-sg@master/-/tree/dir
// https://sourcegraph.com/github.com/jiripospisil/open-on-sg@master/-/blob/content-script.js

function parseURL(url) {
  const parsedURL = new URL(document.URL);
  const match = parsedURL.pathname.match(
    /^\/([a-zA-Z0-9-_.]+)\/([a-zA-Z0-9-_.]+)\/(tree|blob|blame)\/([a-zA-Z0-9-_.]+)\/(.*)+/,
  );

  if (!match) {
    return;
  }

  return {
    host: parsedURL.host,
    repo: `${match[1]}/${match[2]}`,
    type: match[3] == "blame" ? "blob" : match[3],
    branch: match[4],
    filename: match[5],
  };
}
