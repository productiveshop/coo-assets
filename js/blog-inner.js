document.addEventListener("DOMContentLoaded", function() {

    //Share buttons

    const urlToShare = window.location.href;
    const twitterButton = document.getElementById("twitter");
    twitterButton.addEventListener("click", function(e) {
        e.preventDefault();
        const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(urlToShare)}`;
        window.open(twitterUrl, "_blank");
    });

    // LinkedIn
    const linkedinButton = document.getElementById("linkedin");
    linkedinButton.addEventListener("click", function(e) {
        e.preventDefault();
        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(urlToShare)}`;
        window.open(linkedinUrl, "_blank");
    });

    // Facebook
    const facebookButton = document.getElementById("facebook");
    facebookButton.addEventListener("click", function(e) {
        e.preventDefault();
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}`;
        window.open(facebookUrl, "_blank");
    });

    function initializeScrollNavigation() {
        const $h2 = document.querySelectorAll('.js-content h2');
        const $nav = document.querySelector(".js-navigation");
        const $navTitle = document.querySelector(".resources-nav__title");
        const $postNavBox = document.querySelector(".nav-box");
        const headerHeight = 90;
        let isScrolling = false;

        $h2.forEach(function (item, i) {
            const top = item.getBoundingClientRect().top;
        });
        console.log($h2)
        if ($h2.length == 0){
            $nav.style.display = "none";
            $navTitle.style.display = "none";
        }

        if ($h2.length > 0) {
            $h2.forEach(function (item, i) {
                item.setAttribute('id', `title-${i}`);
                let link = `<div>${item.innerHTML}</div>`;
                let listItem = document.createElement('li');
                listItem.innerHTML = link;
                $nav.appendChild(listItem);

                listItem.addEventListener('click', function (e) {
                    e.preventDefault();
                    const targetId = `title-${i}`;
                    const targetElement = document.getElementById(targetId);

                    window.scrollTo({
                        top: targetElement.getBoundingClientRect().top + window.scrollY - headerHeight,
                        behavior: 'smooth'
                    });

                    $h2.forEach(function (h2) {
                        h2.classList.remove('active');
                    });


                    item.classList.add('active');
                    listItem.classList.add('active');

                    isScrolling = true;

                    setTimeout(function () {
                        isScrolling = false;
                    }, 300);
                });
            });
        } else {
            $postNavBox.remove();
        }

        window.addEventListener('scroll', function () {
            if (!isScrolling) {
                const $h2 = document.querySelectorAll('.js-content h2');
                let $nav = document.querySelectorAll(".js-navigation li");
                let winScrollTop = window.scrollY + headerHeight + 10;
                let activeIndex = -1;

                $h2.forEach(function (item, i) {
                    let targetRect = item.getBoundingClientRect();
                    let $h2Top = targetRect.top + window.scrollY - headerHeight;

                    if ($h2Top <= winScrollTop) {
                        activeIndex = i;
                    }
                });

                $h2.forEach(function (item, i) {
                    if (i === activeIndex) {
                        item.classList.add('active');
                        $nav[i].classList.add('active');
                    } else {
                        item.classList.remove('active');
                        $nav[i].classList.remove('active');
                    }

                    if (i < activeIndex) {
                        $nav[i].classList.add('done');
                    } else {
                        $nav[i].classList.remove('done');
                    }
                });
            } else {
                isScrolling = false;
            }
        });
    }

    initializeScrollNavigation();

});
function wordCount(val){
    var wom = val.match(/\S+/g);
    return{
        charactersNoSpaces: val.replace(/\s+/g, '').length,
        characters: val.length,
        words: wom ? wom.length: 0,
        lines: val.split(/\r*\n/).length
    }
}
const wordsTime = Math.floor(wordCount($(".resources-content .w-richtext").text()).words/140);
$('.time-to-read').text(wordsTime+' minutes');