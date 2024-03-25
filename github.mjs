import injectNavigationButton from "./github/navigation-button";
import injectPageButton from "./github/page-button";
import injectSearchButton from "./github/search-button";

document.addEventListener("soft-nav:render", injectNavigationButton);
injectNavigationButton();

document.addEventListener("soft-nav:render", injectPageButton);
injectPageButton();

document.addEventListener("soft-nav:render", injectSearchButton);
injectSearchButton();
