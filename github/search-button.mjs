// This is the button on the search page.

import { createImage } from "./shared";

export default function () {
  if (document.getElementById("sg-search-button")) {
    return;
  }

  const sibling = document.querySelector(
    "div[data-testid='search-sub-header'] div div:last-child button",
  );

  if (!sibling) {
    return;
  }

  const button = document.createElement("button");
  button.id = "sg-search-button";
  sibling.classList.forEach((cl) => button.classList.add(cl));
  button.dataset.size = "small";
  button.appendChild(createImage());
  button.addEventListener("click", onClick);

  const div = document.createElement("div");
  div.appendChild(button);
  sibling.parentElement.classList.forEach((cl) => div.classList.add(cl));

  sibling.parentElement.parentElement.prepend(div);
}

function onClick(event) {
  event.preventDefault();

  const searchTerms = document.querySelector("#qb-input-query")?.textContent;
  const toOpen = parseSearchTerms(searchTerms);

  chrome.runtime.sendMessage({
    url: toOpen,
    new_tab: event.metaKey || event.ctrlKey,
  });
}

function parseSearchTerms(searchTerms) {
  const global = "https://sourcegraph.com/search";

  if (searchTerms === undefined) {
    return global;
  }

  // TODO: This could parse the query properly and translate all the terms into
  // Sourcegraph's equivalents. They are mostly the same but some massaging is
  // required (e.g. for paths).
  const match = searchTerms.match(/repo:([a-zA-Z0-9-_.]+)\/([a-zA-Z0-9-_.]+)/);
  if (!match) {
    return global;
  }

  return `https://sourcegraph.com/github.com/${match[1]}/${match[2]}`;
}
