"use strict";

const filterSearchWrapElements = document.querySelectorAll('.filter-search-wrap');
const filterSearchTypeElements = document.querySelectorAll('.filter-search-type');
function isMobile() {
    return window.innerWidth < 767;
}
filterSearchWrapElements.forEach((filterSearchWrapElement) => {
    const titleElement = filterSearchWrapElement.querySelector('.filter-search__title');
    const mobileList = filterSearchWrapElement.querySelector('.mobile-list');

    titleElement.addEventListener('click', () => {
        if (isMobile()) {
            filterSearchWrapElements.forEach((element) => {
                const list = element.querySelector('.mobile-list');
                if (list !== mobileList) {
                    list.style.display = 'none';
                }
            });
            if (mobileList.style.display === 'block') {
                mobileList.style.display = 'none';
            } else {
                mobileList.style.display = 'block';
            }
        }
    });
});

filterSearchTypeElements.forEach((filterSearchTypeElement) => {
    const titleElement = filterSearchTypeElement.querySelector('.filter-search__title');
    const mobileList = filterSearchTypeElement.querySelector('.mobile-list');
    titleElement.addEventListener('click', () => {
        if (isMobile()) {
            filterSearchTypeElements.forEach((element) => {
                const list = element.querySelector('.mobile-list');
                if (list !== mobileList) {
                    list.style.display = 'none';
                }
            });
            if (mobileList.style.display === 'block') {
                mobileList.style.display = 'none';
            } else {
                mobileList.style.display = 'block';
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    if (window.innerWidth < 991) {
        simulateButtonClick();
    }
    window.addEventListener('resize', function() {
        if (window.innerWidth < 991) {
            simulateButtonClick();
        }
    });
    var openButton = document.getElementById('openButton');
    var openButton1 = document.getElementById('openButton1');
    var overlay = document.getElementById('overlay');
    var popup = document.getElementById('popup');
    var closeButton = document.getElementById('closeButton');
    openButton.addEventListener('click', function() {
        overlay.style.display = 'flex';
        popup.style.display = 'block';
    });
    openButton1.addEventListener('click', function() {
        overlay.style.display = 'flex';
        popup.style.display = 'block';
    });
    closeButton.addEventListener('click', function() {
        overlay.style.display = 'none';
        popup.style.display = 'none';
    });
});

function simulateButtonClick() {
    var buttons = document.querySelectorAll('.resources-more');
    buttons.forEach(function(button) {
        button.click();
    });
}
dynamicSlider("role-slider", 1, 1, 2, 1, "", true);
