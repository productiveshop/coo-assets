Promise.all([
    import('https://cdn.skypack.dev/@splidejs/splide@2.4.21')
]).then(([SplideModule]) => {
    const Splide = SplideModule.default;

    new Splide('#feature-resources', {
        type: 'loop',
        height: '20rem',
        perPage: 1,
        perMove: 1,
        autoplay: true,
        interval: 3000,
    }).mount();
}).catch(error => console.error('Error loading Splide:', error));


document.addEventListener("DOMContentLoaded", function(){
    const filterSearchTypeElements = document.querySelectorAll('.filter-search-wrap');

    filterSearchTypeElements.forEach((filterSearchTypeElement, index) => {
        const titleElement = filterSearchTypeElement.querySelector('.filter-search__header');
        const contentElement = filterSearchTypeElement.querySelector('.filter-search__content');

        // Remove 'active' class and hide '.filter-search__content' from all except the first
        if (index !== 0) {
            titleElement.classList.remove('active');
            contentElement.classList.add('hidden');
        }

        titleElement.addEventListener('click', () => {
            titleElement.classList.toggle('active');
            contentElement.classList.toggle('hidden');
        });
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