console.log("Hello World!");

const myName = "Yunbin Bae";
const h1 = document.querySelector('.heading-primary');
console.log(myName);
console.log(h1);

// h1.textContent = myName;
// h1.style.backgroundColor = 'red';
// h1.style.padding = "5rem";

// h1.addEventListener("click", function () {
//   h1.textContent = myName;
//   h1.style.backgroundColor = "red";
//   h1.style.padding = "5rem";
// });
  

///////////////////////////////////////////////////////////
// set current year
const yearEl = document.querySelector('.year');
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;


///////////////////////////////////////////////////////////
// Make mobile navigation work
const btnNavEl = document.querySelector('.btn-mobile-nav');
const headerEl = document.querySelector('.header');

btnNavEl.addEventListener('click', function () {
  headerEl.classList.toggle('nav-open');
  // toggle = both add & remove 
});

///////////////////////////////////////////////////////////
// Smooth scrolling animation

// anchor element with only link property (can use psuedo element!)
const allLinks = document.querySelectorAll('a:link');
// function 괄호 안에 들어가는 건 내가 임의로 지정한 것. css/index에서 link element와 무관 => give a name!! 
allLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const href = link.getAttribute('href');
    // Scroll back to top (로고 클릭시 유용!)
    if (href === "#") window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    // Scroll to other links
    if (href !== "#" && href.startsWith('#')) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }
    // Close Mobile Navigation
    if (link.classList.contains('main-nav-link'))
      headerEl.classList.toggle('nav-open');
  });
});

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
// always include this in JS file!
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

///////////////////////////////////////////////////////
// Sticky navigation

const sectionHeroEl = document.querySelector(".section-hero");
// const obs = new IntersectionObserver(function (){},{})

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0]; // the very first entry (array)

    if (ent.isIntersecting === false) { // !==
      // document.querySelector(".header").classList.add("sticky");
      document.body.classList.add("sticky");
    }
    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // In the viewport
    // & we will have the event as soon as 0 % of root is inside of the viewport
    root: null, // (null = viewport)
    threshold: 0,
    rootMargin: "-80px", // margin of the section-hero section should be px; rem does not work // string !! // 80px 은 여기서 navigation bar의 height=8rem였기 때문
  }
);

obs.observe(sectionHeroEl);


// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js
