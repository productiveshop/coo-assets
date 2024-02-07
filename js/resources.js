"use strict";
const checkboxes = document.querySelectorAll('.filter-checkbox');
const resourceDivs = document.querySelectorAll('.resources-content > div');
const paginationItems = document.querySelectorAll('.resources-pagination');
const currentUrl = window.location.href;

function checkQueryParam() {
    const pageUrl = window.location.href;
    if (pageUrl.includes('name=')) {
        const paramName = pageUrl.split('name=')[1].split('&')[0];
        checkboxes.forEach((checkbox) => {
            const input = checkbox.querySelector('input[data-name]');
            if (input) {
                const name = input.getAttribute('data-name');
                resourceDivs.forEach(resourceDiv => {
                    const dataName = resourceDiv.getAttribute('data-name');

                    if (dataName === paramName) {
                        resourceDiv.style.display = 'block';
                    } else {
                        resourceDiv.style.display = 'none';
                    }
                });
                paginationItems.forEach(paginationItem => {
                    const dataName = paginationItem.getAttribute('data-name');
                    if (dataName === paramName) {
                        paginationItem.style.display = 'flex';
                    } else {
                        paginationItem.style.display = 'none';
                    }
                });
                if (paramName === name) {
                    input.checked = true;
                } else {
                    input.checked = false;
                }
            }
        });
    }
}
checkQueryParam();

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', () => {
        const input = checkbox.querySelector('input[data-name]');
        const dataName = input.getAttribute('data-name');
        const curUrl = new OriginalURL(window.location.href);
        const resetButton = document.querySelector('.reset-button');
        curUrl.searchParams.set('name', dataName);
        history.pushState(null, null, curUrl.toString());
        if (input.checked) {
            input.disabled = true;
            checkboxes.forEach(otherCheckbox => {
                if (otherCheckbox === checkbox) {
                    otherCheckbox.querySelector('input').disabled = true;
                }
                if (otherCheckbox !== checkbox) {
                    otherCheckbox.querySelector('input').disabled = false;
                    otherCheckbox.querySelector('input').checked = false;
                }
            });
            const name = checkbox.querySelector('input').getAttribute('name');
            resourceDivs.forEach(resourceDiv => {
                const dataName = resourceDiv.getAttribute('data-name');

                if (dataName === name) {
                    resourceDiv.style.display = 'block';
                } else {
                    resourceDiv.style.display = 'none';
                }
            });
            paginationItems.forEach(paginationItem => {
                const dataName = paginationItem.getAttribute('data-name');
                if (dataName === name) {
                    paginationItem.style.display = 'flex';
                } else {
                    paginationItem.style.display = 'none';
                }
            });
        }
    });
});

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
document.addEventListener("DOMContentLoaded", function() {
    (function() {
        const checkboxes = document.querySelectorAll('.filter-item-checkbox');
        console.log(checkboxes)

        const updateFilterList = (label, isChecked) => {
            const filterWrap = document.querySelector('.filter-wrap');
            let filterList = filterWrap.querySelector('.filter-list');

            if (!filterList) {
                filterList = document.createElement('div');
                filterList.classList.add('filter-list', 'w-dyn-items');
                filterList.setAttribute('role', 'list');
                filterWrap.appendChild(filterList);
            }
            if (isChecked) {
                const listItem = document.createElement('div');
                listItem.classList.add('filter-item', 'w-dyn-item');
                listItem.setAttribute('role', 'listitem');
                listItem.innerHTML = `<a href="#" class="cat-label w-inline-block"><div class="cat-label__text">${label}</div></a>`;

                listItem.addEventListener('click', (e) => {
                    try {
                        const correspondingCheckbox = Array.from(checkboxes).find(checkbox =>
                            checkbox.closest('.filter-item-row').querySelector('.filtet-item-label')?.textContent === label
                        );
                        if (correspondingCheckbox) {
                            triggerClickEvent(correspondingCheckbox);
                            correspondingCheckbox.checked = false;
                        }
                    } finally {
                        filterList.removeChild(e.currentTarget);
                    }
                });
                filterList.appendChild(listItem);
            } else {
                const existingLabel = Array.from(filterList.children).find(child => child.textContent.trim() === label);
                if (existingLabel) {
                    filterList.removeChild(existingLabel);
                }
            }
        };
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const label = e.target.closest('.filter-item-row').querySelector('.filtet-item-label').textContent;
                updateFilterList(label, e.target.checked);
            });
        });
        function triggerClickEvent(checkbox) {
            const event = new Event('click', {
                'bubbles': true,
                'cancelable': true
            });
            checkbox.dispatchEvent(event);
        }
        document.querySelector('.reset-button').addEventListener('click', (e) => document.querySelector('.filter-list').innerHTML = '');
    }());
});

document.querySelectorAll('.resources-nav [href^="/resources/"').forEach((a) => a.href = `${a.href}#latest`);
