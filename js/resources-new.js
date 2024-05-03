Promise.all([
    import('https://cdn.skypack.dev/@splidejs/splide@2.4.21')
]).then(([SplideModule]) => {
    const Splide = SplideModule.default;

    new Splide('#example-grid', {
        type: 'loop',
        height: '20rem',
        perPage: 1,
        perMove: 1,
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
            console.log('click');

            titleElement.classList.toggle('active');
            contentElement.classList.toggle('hidden');
        });
    });
});
