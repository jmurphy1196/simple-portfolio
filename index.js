const projectTabs = Array(...document.querySelectorAll(".projects__tab__item"));
const projectCards = Array(...document.querySelectorAll(".project__card"));
const projectClass = "projects__tab__item";
const mobileNavBar = document.querySelector(".navbar__menu-container");
const mobileNavBarMenu = document.querySelector(".mobile_menu");
const mobileNavLinks = Array(...document.querySelectorAll(".mobile-nav-link"));
let mobileNavBarOpen = false;
let activeProjectCard = 0;

console.log(mobileNavLinks);

mobileNavBar.addEventListener("click", () => {
  mobileNavBarOpen = !mobileNavBarOpen;
  console.log(mobileNavBarOpen);
  if (!mobileNavBarOpen) {
    mobileNavBarMenu.style.transform = "translateX(100%)";
  } else {
    mobileNavBarMenu.style.transform = "translateX(0%)";
  }
});

mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileNavBarOpen = !mobileNavBarOpen;
    mobileNavBarMenu.style.transform = "translateX(100%)";
  });
});

projectTabs.forEach((tab, ind) => {
  tab.addEventListener("click", () => {
    console.log(tab);

    const isActive = tab.classList.contains(`${projectClass}--active`);
    activeProjectCard = ind;
    if (!isActive) {
      projectTabs.forEach((pTab) => {
        pTab.classList.remove(`${projectClass}--active`);
      });
      tab.classList.add(`${projectClass}--active`);
      //move project card

      projectCards.forEach((pCard) => {
        const transformPercentage = 100 * activeProjectCard;
        pCard.style.transform = `translateX(-${transformPercentage}%)`;
      });
    }
  });
});
