const projectTabs = Array(...document.querySelectorAll(".projects__tab__item"));
const projectCards = Array(...document.querySelectorAll(".project__card"));
const projectClass = "projects__tab__item";
const mobileNavBar = document.querySelector(".navbar__menu-container");
const mobileNavBarMenu = document.querySelector(".mobile_menu");
const mobileNavLinks = Array(...document.querySelectorAll(".mobile-nav-link"));
let mobileNavBarOpen = false;
let activeProjectCard = 0;

let heroTimeline = gsap.timeline();

let heroImg = gsap.fromTo(
  ".hero__img-container",
  { opacity: 0, y: 100 },
  { duration: 0.8, opacity: 1, y: 0 }
);

let heroText = gsap.fromTo(
  ".hero__content",
  { opacity: 0, x: -25 },
  { duration: 0.5, opacity: 1, x: 0 }
);

let heroBtns = gsap.fromTo(
  ".hero__cta",
  { opacity: 0, y: 50 },
  { duration: 1, opacity: 1, y: 0 }
);

heroTimeline.add(heroImg);
heroTimeline.add(heroText);
heroTimeline.add(heroBtns);

console.log(mobileNavLinks);

const toggleMobileMenu = () => {
  mobileNavBarOpen = !mobileNavBarOpen;
  if (!mobileNavBarOpen) {
    mobileNavBarMenu.style.transform = "translateX(100%)";
  } else {
    mobileNavBarMenu.style.transform = "translateX(0%)";
  }
};

mobileNavBar.addEventListener("click", toggleMobileMenu);

mobileNavLinks.forEach((link) => {
  link.addEventListener("click", toggleMobileMenu);
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

const formData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  text: "",
};

const form = document.querySelector(".contact-me__form");
const inputs = Array(...document.querySelectorAll(".contact-me__form__input"));
const bodyInput = document.querySelector(".contact-me__form__area");
const formButton = document.getElementById("contact-me-submit-btn");

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    formData[input.name] = input.value;
  });
});

bodyInput.addEventListener("input", () => {
  formData.text = bodyInput.value;
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    formButton.innerText = "Sending...";
    formButton.disabled = true;
    const response = await fetch(
      "https://zc4hylmisi7csj7bk3nrzvag7a0wmmbr.lambda-url.us-west-1.on.aws/",
      {
        method: "POST",
        body: JSON.stringify(formData),
        mode: "no-cors",
      }
    );
    formButton.innerText = "Submit";
    formButton.disabled = false;
  } catch (err) {
    console.log(err);
  }

  inputs.forEach((input) => {
    input.value = "";
    formData[input.name] = "";
  });
  bodyInput.value = "";
  formData.text = "";
});
