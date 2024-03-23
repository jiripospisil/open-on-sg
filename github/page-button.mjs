// This is the button on the front page a repository next to Watch, Fork etc.

import { createImage } from "./shared";

export default function () {
  if (document.getElementById("sg-action-button")) {
    return;
  }

  const actions = document.getElementsByClassName("pagehead-actions")[0];

  if (!actions) {
    return;
  }

  const button = document.createElement("button");
  button.id = "sg-action-button";
  button.classList.add("btn", "btn-sm");
  button.appendChild(createImage());
  button.addEventListener("click", onClick);

  const li = document.createElement("li");
  li.appendChild(button);

  actions.prepend(li);
}

function onClick(event) {
  event.preventDefault();

  const info = parseURL(document.URL);
  const branch = info.branch ? `@${info.branch}` : "";
  const toOpen = `https://sourcegraph.com/${info.host}/${info.repo}${branch}`;

  chrome.runtime.sendMessage({
    url: toOpen,
    new_tab: event.metaKey || event.altKey,
  });
}

// https://github.com/jiripospisil/open-on-sg
// https://github.com/jiripospisil/open-on-sg/tree/master
// =>
// https://sourcegraph.com/github.com/jiripospisil/open-on-sg@master
// https://sourcegraph.com/github.com/jiripospisil/open-on-sg@master
function parseURL(url) {
  const parsedURL = new URL(document.URL);
  const match = parsedURL.pathname.match(
    /^\/([a-zA-Z0-9-_.]+)\/([a-zA-Z0-9-_.]+)(?:\/tree\/([a-zA-Z0-9-_.]+))?/,
  );

  if (!match) {
    return;
  }

  return {
    host: parsedURL.host,
    repo: `${match[1]}/${match[2]}`,
    branch: match[3],
  };
}
