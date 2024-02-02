document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('[fs-cmsprevnext-element="list"]').style.display = 'none';
    const listItems = Array.prototype.slice.call(document.querySelectorAll('[fs-cmsprevnext-element="list"] [role="listitem"]'));
    if (listItems.length === 1) {
        document.querySelector('.dark-hero').style.marginTop = '0';
        document.querySelector('[fs-cmsprevnext-element="previous"]').style.display = 'none';
        document.querySelector('[fs-cmsprevnext-element="next"]').style.display = 'none';
        document.querySelector('.prev-next-buttons').style.display = 'none';
        document.querySelector('.prev-next-button__url').style.display = 'none';

    }
    const currentURL = window.location.href;
    const index = Math.max(0, listItems.findIndex((listItem) => {
        const listItemURL = listItem.querySelector('a.prev-next-button__url').href;
        return listItemURL.replace(/#$/, '').toLowerCase() === currentURL.replace(/#$/, '').toLowerCase();
    }));

    if (index > 0) {
        document.querySelector('[fs-cmsprevnext-element="previous"]').appendChild(listItems[index - 1]);
        document.querySelector('[fs-cmsprevnext-element="previous-empty"]').style.display = 'none';
    } else {
        document.querySelector('[fs-cmsprevnext-element="previous"]').style.display = 'none';
        document.querySelector('[fs-cmsprevnext-element="previous-empty"]').style.display = 'flex';
    }
    if (index < listItems.length - 1) {
        document.querySelector('[fs-cmsprevnext-element="next"]').appendChild(listItems[index + 1]);
        document.querySelector('[fs-cmsprevnext-element="next-empty"]').style.display = 'none';
    } else {
        document.querySelector('[fs-cmsprevnext-element="next"]').style.display = 'none';
        document.querySelector('[fs-cmsprevnext-element="next-empty"]').style.display = 'flex';
    }
});