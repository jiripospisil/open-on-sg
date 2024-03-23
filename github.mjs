import injectNavigationButton from "./github/navigation-button";
import injectPageButton from "./github/page-button";

document.addEventListener("soft-nav:render", injectNavigationButton);
injectNavigationButton();

document.addEventListener("soft-nav:render", injectPageButton);
injectPageButton();
