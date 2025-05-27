const main = document.querySelector('.main');

const mainContent = document.querySelector('.main__content');

const footerElementsFillbar = document.querySelector('.footer__elements__fillbar');
const footerElementsPbar = document.querySelector('.footer__elements__pbar');
const footerElementsButtons = document.querySelector('.footer__elements__button__container');

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

const book = {

  content: null,

  async fetchBook() {
    const search = await fetch(
      "https://raw.githubusercontent.com/PedroERosa/05_e-reader_PeterPan/refs/heads/main/content/PeterAndWendy_JMBarrie.json"
    );

    this.content = await search.json();

    this.createNav();
    this.createIntro();
  },

  createNav() {
    sideNav.innerHTML = null;

    sideNav.innerHTML += `<button class="sidenav__chapterbtn" onclick='book.createIntro()'>HOME</button>`;

    for (let i = 0 ; i < this.content.book.chapter.length ; i++) {
      sideNav.innerHTML += `<button class="sidenav__chapterbtn" onclick='book.createChapter(${i})'>${this.content.book.chapter[i].chapterNumber} - ${this.content.book.chapter[i].chapterName}</button>`;
    }
  },

  createIntro() {
    mainContent.innerHTML = null;

     mainContent.innerHTML += `<h1>${this.content.book.bookTitle}</h1>`;
     mainContent.innerHTML += `<h2>${this.content.book.author}</h2>`;

    this.content.book.intro.forEach((paragraph) => {this.writeParagraphs(paragraph)});

    this.content.book.chapter.forEach((chapter) => {
      mainContent.innerHTML += `<h3>${chapter.chapterNumber}</h3>`;
      mainContent.innerHTML += `<h4>${chapter.chapterName}</h4>`;
   });

   buttonContainter.innerHTML = null;

   buttonContainter.innerHTML += `<button class='footer__elements__button' onclick='book.createChapter(0)'>${this.content.book.chapter[0].chapterNumber} - ${this.content.book.chapter[0].chapterName}</button>`;
  },

  createChapter (chapterNumber) {

    mainContent.innerHTML = null;

    mainContent.innerHTML += `<h3>${this.content.book.chapter[chapterNumber].chapterNumber}</h3>`;
    mainContent.innerHTML += `<h4>${this.content.book.chapter[chapterNumber].chapterName}</h4>`;
    this.content.book.chapter[chapterNumber].text.forEach((paragraph) => {this.writeParagraphs(paragraph)});

    buttonContainter.innerHTML = null;

    buttonContainter.innerHTML += "<button class='footer__elements__button' onclick='book.createIntro()'>HOME</button>";

    if (chapterNumber < this.content.book.chapter.length) {
        buttonContainter.innerHTML += `<button class='footer__elements__button' onclick='book.createChapter(${chapterNumber + 1})'>${this.content.book.chapter[chapterNumber + 1].chapterNumber} - ${this.content.book.chapter[chapterNumber + 1].chapterName}</button>`;
    }
    
    main.scrollTop = 0;
    handleScroll ();
  },

  writeParagraphs (p) {
    //checa se o paragrafo é imagem, poema/música, subtítulo ou texto normal.
    if (p.substring(0, 4) == "!IMG") {
      mainContent.innerHTML += `<img src="./images/${p.substring(5)}" alt="">`;
   } else if (p.substring(0, 4) == "!SNG") {
      mainContent.innerHTML += `<p class="song">${p.substring(5)}</p>`;
   } else if (p.substring(0, 4) == "!SBT") {
      mainContent.innerHTML += `<h5>${p.substring(5)}</h5>`;
   } else {
      mainContent.innerHTML += `<p>${p}</p>`;
   }
  }

}

window.onload= mainFunction();

function mainFunction () {
  //Get scroll percentage of div

  book.fetchBook();
  //book.createNav();
  //book.createIntro();

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