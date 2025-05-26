const mainContent = document.querySelector(".main__content");
const sideNav = document.querySelector(".sidenav");
const buttonContainter = document.querySelector(".footer__elements__button__container");

let isNavOpen = false;

function toggleNav() {
  let openButton = document.getElementsByClassName("sidenav__openbtn")[0];

  if (isNavOpen) {
    sideNav.style.width = "0";
    sideNav.style.padding = "70px 0px";
    openButton.innerHTML = "🡢";
    isNavOpen = false;
  } else {
    sideNav.style.width = "300px";
    sideNav.style.padding = "70px 5px";
    openButton.innerHTML = "🡠";
    isNavOpen = true;
  }
}

async function book() {
  const search = await fetch(
    "https://raw.githubusercontent.com/PedroERosa/05_e-reader_PeterPan/refs/heads/main/content/PeterAndWendy_JMBarrie.json"
  );
  const content = await search.json();

  function createNav() {
    for (let i = 0 ; i < content.book.chapter.length ; i++) {
      sideNav.innerHTML += `<button onclick='book.createChapter(${i})'>${content.book.chapter[i].chapterNumber} - ${content.book.chapter[i].chapterName}</button>`;
    }
  }

  function createIntro() {
    mainContent.innerHTML = null;

    containerVideos.innerHTML += `<h1>${content.book.bookTitle}</h1>`;
    containerVideos.innerHTML += `<h2>${content.author}</h2>`;

    content.book.intro.forEach((paragraph) => {

      //checa se o paragrafo é imagem, poema/música, subtítulo ou texto normal.
      switch (paragraph.substring(0, 4)) {
        case "!IMG":
          containerVideos.innerHTML += `<img src="./images/${paragraph.substring(5)}" alt="">`;
          break;
        case "!SNG":
          containerVideos.innerHTML += `<p class="song">${paragraph}</p>`;
          break;
        case "!SBT":
          containerVideos.innerHTML += `<h5>${paragraph}</h5>`;
          break;
        default:
          containerVideos.innerHTML += `<p>${paragraph}</p>`;
          break;
      };

      content.book.chapter.forEach((chapter) => {
        containerVideos.innerHTML += `<h3>${chapter.chapterNumber}</h3>`;
        containerVideos.innerHTML += `<h4>${chapter.chapterName}</h4>`;
      });
    });
  };

  function createChapter(chapterNumber) {

    mainContent.innerHTML = null;

    containerVideos.innerHTML += `<h3>${content.book.chapter[chapterNumber].chapterNumber}</h3>`;
    containerVideos.innerHTML += `<h4>${content.book.chapter[chapterNumber].chapterName}</h4>`;
    content.book.chapter[chapterNumber].text.forEach((paragraph) => {

      //checa se o paragrafo é imagem, poema/música, subtítulo ou texto normal.
      if (paragraph.substring(0, 4) == "!IMG") {
        containerVideos.innerHTML += `<img src="./images/${paragraph.substring(5)}" alt="">`;
      } else if (paragraph.substring(0, 4) == "!SNG") {
        containerVideos.innerHTML += `<p class="song">${paragraph}</p>`;
      } else if (paragraph.substring(0, 4) == "!SBT") {
        containerVideos.innerHTML += `<h5>${paragraph}</h5>`;
      } else {
        containerVideos.innerHTML += `<p>${paragraph}</p>`;
      }
    });

    buttonContainter.innerHTML = null;

    buttonContainter.innerHTML += "<button class='footer__elements__button'>HOME</button>";

    if (chapterNumber < content.book.chapter.lenght) {
        buttonContainter.innerHTML += `<button class='footer__elements__button' onclick='book.createChapter(${chapterNumber + 1})'>${content.book.chapter[chapterNumber + 1].chapterNumber} - ${content.book.chapter[chapterNumber + 1].chapterName}</button>`;
    }
    
  }
};

window.onload= mainFunction();

function mainFunction () {
  //Get scroll percentage of div

  const main = document.querySelector('.main');

  const mainContent = document.querySelector('.main__content');

  const footerElementsFillbar = document.querySelector('.footer__elements__fillbar');
  const footerElementsPbar = document.querySelector('.footer__elements__pbar');
  const footerElementsButtons = document.querySelector('.footer__elements__button__container');

  main.addEventListener("scroll", handleScroll);

  function handleScroll () {
    const scrollDistance = main.scrollTop;
    const contentHeight = mainContent.offsetHeight;
    const windowHeight = window.innerHeight;

    var scrollPercent = Math.round((scrollDistance / (contentHeight - windowHeight)) * 100);

    console.clear();
    
    console.log('scrollDistance ' + scrollDistance);
    console.log('contentHeight ' + contentHeight);
    console.log('windowHeight ' + windowHeight);

    console.log(scrollPercent);

    footerElementsFillbar.style.width = `${scrollPercent}%`;

    if (scrollPercent >= 100) {
      footerElementsPbar.style.display = "none";
      footerElementsButtons.style.display = "flex";
    } else {
      footerElementsButtons.style.display = "none";
      footerElementsPbar.style.display = "block";
    }
    
    if (scrollPercent === 0) {
      footerElementsPbar.style.display = "none";
    } else if (scrollPercent < 100) {
      footerElementsPbar.style.display = "block";
    }
  }
};

/*
$(document).ready(function () {

  //Get scroll percentage of div
  $(".main").on("scroll", function () {
    const scrollDistance = $(".main").scrollTop();
    const  contentHeight = $(".main__content").height();
    const  windowHeight = $(window).height();

    var scrollPercent = (scrollDistance / (contentHeight + 200 - windowHeight)) * 100;

    console.clear();
    
    console.log('scrollDistance ' + scrollDistance);
    console.log('contentHeight ' + contentHeight);
    console.log('windowHeight ' + windowHeight);

    console.log(scrollPercent);

    $(".footer__elements__fillbar").css("width", `${scrollPercent}%`);

    if (scrollPercent == 100) {

      $(".footer__elements__pbar").css("display", "none");
      $(".footer__elements__button").css("display", "block");
    } else {

      $(".footer__elements__button").css("display", "none");
      $(".footer__elements__pbar").css("display", "block");
    }

    if (scrollPercent == 0) {
      $(".footer__elements__pbar").css("display", "none");
    } else if (scrollPercent < 100) {
      $(".footer__elements__pbar").css("display", "block");
    }
  });

});
*/