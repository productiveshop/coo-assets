document.addEventListener('DOMContentLoaded', () => {
    let userInteracted = false;

    const lazyLoadVideo = () => {
        if (!userInteracted) {
            userInteracted = true;
            document.querySelectorAll('.accordion-video-img').forEach(elem => {
                elem.style.display = 'none';
            });

            document.removeEventListener('mousemove', lazyLoadVideo);
            document.removeEventListener('scroll', lazyLoadVideo);
            document.removeEventListener('touchstart', lazyLoadVideo);
            document.removeEventListener('click', lazyLoadVideo);
        }
    };

    var openButton1 = document.getElementById('openButton1');
    var overlay = document.getElementById('overlay');
    var popup = document.getElementById('popup');
    var closeButton = document.getElementById('closeButton');
    openButton1.addEventListener('click', function () {
        overlay.style.display = 'flex';
        popup.style.display = 'block';
    });
    closeButton.addEventListener('click', function () {
        overlay.style.display = 'none';
        popup.style.display = 'none';
    });

    /* Start Show Pop-up */
    function getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
        let results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    function setCookie(name, value, options = {}) {
        options = {
            path: '/',
            ...options
        };

        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }

        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }

        document.cookie = updatedCookie;
    }

    function showPopupIfNeeded() {
        let popup = document.querySelector('.page-pop-up');
        let body = document.querySelector('body');
        let formCookie = getCookie('formData');

        if (!getParameterByName('popup-hide') && !formCookie) {
            popup.style.display = 'flex';
            body.classList.add('overflow-hidden');
        }
    }

    showPopupIfNeeded();
    /* END Show Pop-up */

    /* Start Pardot Form */
    function initializeForm() {
        const form = document.getElementById("pardot-form");

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            e.stopPropagation();

            console.log('function submit');

            const iframe = document.createElement('iframe');
            iframe.name = 'hidden_iframe';
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            console.log('iframe ', iframe);

            form.action = 'https://go.copado.com/l/372431/2024-06-26/6tpcz1';
            form.target = 'hidden_iframe';

            const formData = new FormData(form);
            console.log("Form data:");
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }

            // Save form data to cookies
            let formDataObject = {};
            formData.forEach((value, key) => {
                formDataObject[key] = value;
            });
            setCookie('formData', JSON.stringify(formDataObject), {'max-age': 3600});

            form.submit();
            console.log('form.submit here');

            iframe.onload = () => {
                let currentUrl = window.location.href;
                if (currentUrl.indexOf('?') > -1) {
                    currentUrl += '&popup-hide=';
                } else {
                    currentUrl += '?popup-hide=';
                }
                window.location.href = currentUrl;
            };
        });
    }

    initializeForm();
    /* END Pardot Form */

    setupAccordion(['.accordion1', '.accordion2', '.accordion3']);
    initializeFilters();

    /* Start Accordion */
    function handleAccordion() {
        const accordionList = document.querySelectorAll('.accordion-list-wrap .accordion-list-mobile');

        function deactivateAll(except = null) {
            accordionList.forEach(elem => {
                if (elem !== except) {
                    let parent = elem.parentNode;
                    if (parent && parent.classList.contains('accordion-list-wrap')) {
                        parent.classList.remove('active');
                    }
                }
            });
        }

        accordionList.forEach(elem => {
            elem.addEventListener('click', () => {
                let parent = elem.parentNode;
                if (parent && parent.classList.contains('accordion-list-wrap')) {
                    deactivateAll(elem);
                    parent.classList.toggle('active');
                }
            });
        });

        window.addEventListener('resize', () => deactivateAll());
    }

    handleAccordion();
    /* END Accordion */
});

function setupAccordion(accordionClasses) {
    accordionClasses.forEach(accordionClass => {
        const parentElement = document.querySelector(accordionClass);
        if (!parentElement) return;

        parentElement.addEventListener('click', event => {
            if (event.target.classList.contains('accordion-list__title')) {
                const button = event.target;
                const index = Array.from(parentElement.querySelectorAll('.accordion-list-list .accordion-list__title')).indexOf(button);
                const video = parentElement.querySelectorAll('.accordion-video-wrap .accordion-video-item')[index];

                resetActiveItems(parentElement);
                toggleActive(button, video);
            }
        });
    });
}

function resetActiveItems(parentElement) {
    parentElement.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
}

function toggleActive(button, video) {
    button.classList.add('active');
    video.classList.add('active');
}

function initializeFilters() {
    const filterSearchTypeElements = document.querySelectorAll('.filters-wrap');
    filterSearchTypeElements.forEach((filterElement, index) => {
        const titleElement = filterElement.querySelector('.filter-search__header');
        const contentElement = filterElement.querySelector('.filter-search__content');

        if (index !== 0) {
            contentElement.classList.add('hidden');
        }

        titleElement.addEventListener('click', () => {
            titleElement.classList.toggle('active');
            contentElement.classList.toggle('hidden');
        });
    });

    (function () {
        const checkboxes = document.querySelectorAll('.filter-item-checkbox');

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

        document.querySelector('.reset-button').addEventListener('click', () => {
            const filterList = document.querySelector('.filter-list');
            if (filterList) {
                filterList.innerHTML = '';
            }
        });
    }());
}
