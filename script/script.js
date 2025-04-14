let isNavOpen = false;

    function toggleNav () {
        let openButton = document.getElementsByClassName("openbtn")[0];


        if (isNavOpen) {
            document.getElementById("sidenav").style.width = "0";
            document.getElementById("sidenav").style.padding = "0px";
            openButton.innerHTML = "🡢";
            isNavOpen = false;
        }
        else {
            document.getElementById("sidenav").style.width = "350px";
            document.getElementById("sidenav").style.padding = "60px 5px 100px";
            openButton.innerHTML = "🡠";
            isNavOpen = true;
        }

    }

    async function updateBookChapter (chapterNumber) {
        const busca = await fetch("https://raw.githubusercontent.com/PedroERosa/05_e-reader_PeterPan/refs/heads/main/content/PeterAndWendy_JMBarrie.json");
        const content = await busca.json();
        console.log(content);
        console.log(content.book.chapter[chapterNumber]);
    }


$(document).ready(function() {

    //getContent ();
    updateBookChapter (0);

    //Getscroll percentage of div

    $('#main').on('scroll', function(){
        var scrollDistance = $('#main').scrollTop(),
            contentHeight = $('#main__content').height() + $('#main__content__bottomspacer').height() - 100,
            windowHeight = $(window).height();
    
        var scrollPercent = (scrollDistance / (contentHeight - windowHeight)) * 100;
        
        console.clear();
        console.log(scrollPercent);

        $('.footer__elements__fillbar').css('width', `${scrollPercent}%`);

        if ( scrollPercent == 100 ) {
            //$('.footer__elements__pbar').css('opacity','0');
            //setTimeout(function () {$('.footer__elements__pbar').css('display','none')}, 500);

            //setTimeout(function () {$('.footer__elements__button').css('display','block')}, 1000);
            //setTimeout(function () {$('.footer__elements__button').css('opacity','1')}, 1000);

            $('.footer__elements__pbar').css('display','none');
            $('.footer__elements__button').css('display','block');

        } else {
            //$('.footer__elements__button').css('opacity','0');
            //setTimeout(function () {$('.footer__elements__button').css('display','none')}, 500);

            //setTimeout(function () {$('.footer__elements__pbar').css('display','block')}, 1000);
            //setTimeout(function () {$('.footer__elements__pbar').css('opacity','1')}, 1000);

            $('.footer__elements__button').css('display','none');
            $('.footer__elements__pbar').css('display','block');

        }

        if ( scrollPercent == 0 ) {
            $('.footer__elements__pbar').css('display','none');
        } else if ( scrollPercent < 100 ) {
            $('.footer__elements__pbar').css('display','block');
        }

    })

    //const contentBook = JSON.parse(book);




});