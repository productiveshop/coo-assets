const searchClient = algoliasearch('YSD60YYJAO', '51993251f45e4de6fd993859493af585');
let newArray = [];
var initialized = false;

document.addEventListener('DOMContentLoaded', function () {
    if (!initialized) {
        addDivAfterSixthItem();
        setInitialState(['topic-list', 'collectionName-list', 'cloudtechnology-list', 'industry-list'], true);
    } else {
        manageClasses(['topic-list', 'collectionName-list', 'cloudtechnology-list', 'industry-list']);
    }
    const lazyImages = document.querySelectorAll('.ais-Hits-list img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });

    const search = instantsearch({
        indexName: 'resources',
        searchClient,
        searchFunction(helper) {
            ['collectionName', 'cloudtechnology', 'industry', 'topic'].forEach(attribute => {
                if (
                    helper
                        .getRefinements(attribute)
                        .find(refinement => refinement.value === 'All')
                ) {
                    helper.clearRefinements(attribute);
                }
            });

            ['collectionName', 'cloudtechnology', 'industry', 'topic'].forEach(attribute => {
                const container = document.querySelector(`#${attribute}-list`);
                if (
                    helper
                        .getRefinements(attribute)
                        .find(refinement => refinement.value === 'All')
                ) {
                    container.classList.add('all-selected');
                } else {
                    container.classList.remove('all-selected');
                }
            });

            helper.search();
        },
    });

    search.addWidgets([
        instantsearch.widgets.searchBox({
            container: '#searchBox',
            placeholder: 'Search e.g, press release',
        }),

        instantsearch.widgets.clearRefinements({
            container: '#clearRefinements',
            templates: {
                resetLabel: 'Clear filters'
            },
        }),

        instantsearch.widgets.hits({
            container: '#hits',
            templates: {
                item: function (item) {
                    var date = moment(item.date).format("MM/DD/YYYY");
                    return `
            <div class="card">
                <a href="/resources/${item.collectionSlug}/${item.slug}" title="${item.name}" target="_blank" class="card__url"></a>
                <div class="card__img-wrap">
                    <img loading="lazy" alt="${item.name}" src="${item.thumbnail}" class="card__img" width="274px" height="152px" >
                </div>
                <div class="card_content">
                    <div class="card__date">
                        <div class="resources-label">${item.collectionName}</div>
                        <div class="date">${date}</div>
                    </div>
                    <div class="card__title">${item.name}</div>
                </div>
            </div>`;
                },
            },
        }),
        instantsearch.widgets.refinementList({
            container: '#collectionName-list',
            attribute: 'collectionName',
            sortBy: ['name:asc'],
            transformItems: items => {
                return [{
                    value: 'All',
                    label: 'All',
                    highlighted: 'All',
                    isRefined: false
                },
                    ...items,
                ];
            },
        }),

        instantsearch.widgets.refinementList({
            container: '#cloudtechnology-list',
            attribute: 'cloudtechnology',
            sortBy: ['name:asc'],
            operator: 'and',
            limit: 4,
            showMore: true,
            transformItems: items => {
                return [{
                    value: 'All',
                    label: 'All',
                    highlighted: 'All',
                    isRefined: false
                },
                    ...items,
                ];
            },
        }),
        instantsearch.widgets.currentRefinements({
            container: '#current-refinements',
            transformItems: items => {
                newArray = items.map(item => item.refinements).flat();
                updateChips();
                return items;
            }
        }),
        instantsearch.widgets.refinementList({
            container: '#industry-list',
            attribute: 'industry',
            sortBy: ['name:asc'],
            operator: 'and',
            limit: 4,
            showMore: true,
            transformItems: items => {
                return [{
                    value: 'All',
                    label: 'All',
                    highlighted: 'All',
                    isRefined: false
                },
                    ...items,
                ];
            },
        }),
        instantsearch.widgets.refinementList({
            container: '#topic-list',
            attribute: 'topic',
            sortBy: ['name:asc'],
            transformItems: items => {
                return [{
                    value: 'All',
                    label: 'All',
                    highlighted: 'All',
                    isRefined: false
                },
                    ...items,
                ];
            },
        }),

        instantsearch.widgets.pagination({
            container: '#pagination',
            templates: {
                previous: '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="27" viewBox="0 0 26 27" fill="none"><path d="M7.64693 14.1294C7.45167 13.9342 7.45167 13.6176 7.64693 13.4223L10.8289 10.2403C11.0242 10.0451 11.3408 10.0451 11.536 10.2403C11.7313 10.4356 11.7313 10.7522 11.536 10.9475L8.70759 13.7759L11.536 16.6043C11.7313 16.7996 11.7313 17.1162 11.536 17.3114C11.3408 17.5067 11.0242 17.5067 10.8289 17.3114L7.64693 14.1294ZM18.0005 14.2759H8.00049V13.2759H18.0005V14.2759Z" fill="black"/></svg><span>Prev</span>',
                next: '<span>Next</span><svg xmlns="http://www.w3.org/2000/svg" width="26" height="27" viewBox="0 0 26 27" fill="none"><path d="M18.3536 14.1294C18.5488 13.9342 18.5488 13.6176 18.3536 13.4223L15.1716 10.2403C14.9763 10.0451 14.6597 10.0451 14.4645 10.2403C14.2692 10.4356 14.2692 10.7522 14.4645 10.9475L17.2929 13.7759L14.4645 16.6043C14.2692 16.7996 14.2692 17.1162 14.4645 17.3114C14.6597 17.5067 14.9763 17.5067 15.1716 17.3114L18.3536 14.1294ZM8 14.2759H18V13.2759H8V14.2759Z" fill="black"/></svg>'
            },
            scrollTo: '#scroll'
        }),

    ]);


    search.on('render', () => {
        if (!initialized) {
            addDivAfterSixthItem();
        }
        if (initialized) {
            document.querySelector('.section-archive').addEventListener('click', function (e) {
                if (e.target.closest('.reset-button__text')) {
                    setInitialState(['topic-list', 'collectionName-list', 'cloudtechnology-list', 'industry-list'], false);
                    let url = window.location.href;
                    let cleanUrl = url.split('?')[0];
                    window.history.pushState({}, '', cleanUrl);
                }
            });
            manageClasses(['topic-list', 'collectionName-list', 'cloudtechnology-list', 'industry-list']);
        }
    });

    search.start();


    function setInitialState(ids, processSearchParams) {

        function processSearchParamsFunction() {
            const searchParams = new URLSearchParams(window.location.search);
            const processedLists = {};
            let allFound = true;

            searchParams.forEach((value, key) => {

                let listId;
                if (key === 'topic') {
                    listId = 'topic-list';
                } else if (key === 'collectionName') {
                    listId = 'collectionName-list';
                } else if (key === 'cloudtechnology') {
                    listId = 'cloudtechnology-list';
                } else if (key === 'industry') {
                    listId = 'industry-list';
                }

                if (listId) {
                    processedLists[listId] = true;
                    ids = ids.filter(id => id !== listId);

                    const values = value.split(",");
                    values.forEach(value => {
                        const correspondingItem = document.querySelector(`input[value="${value}"]`);
                        if (correspondingItem) {
                            const listItem = correspondingItem.closest('.ais-RefinementList-item');
                            if (listItem) {
                                listItem.classList.add('ais-RefinementList-item--selected');
                                const input = listItem.querySelector('input[type="checkbox"]');
                                if (input && !input.checked) {
                                    input.click();
                                    input.checked = true;
                                }
                            }
                        } else {
                            allFound = false;
                        }
                    });
                }
            });

            return allFound;
        }

        function processIdsFunction() {
            let allFound = true;
            ids.forEach(function (id) {
                let list = document.querySelector(`#${id} .ais-RefinementList-list`);
                if (list) {
                    let firstItem = list.querySelector('.ais-RefinementList-item');
                    if (firstItem) {
                        firstItem.classList.add('ais-RefinementList-item--selected');
                        let firstItemInput = firstItem.querySelector('input[type="checkbox"]');
                        if (firstItemInput) {
                            firstItemInput.checked = true;
                        }
                    } else {
                        allFound = false;
                    }
                } else {
                    allFound = false;
                }
            });

            return allFound;
        }

        const checkExist = setInterval(() => {
            if (processSearchParams) {
                if (processSearchParamsFunction()) {
                    if (processIdsFunction()) {
                        clearInterval(checkExist);
                        initialized = true;
                    }
                }
            } else {
                if (processIdsFunction()) {
                    clearInterval(checkExist);
                    initialized = true;
                }
            }
        }, 1000);
    }

});


function updateUrlParams() {
    let searchParams = new URLSearchParams(window.location.search);
    let newUrl;

    const attributes = [...new Set(newArray.map(item => item.attribute))];
    attributes.forEach(attribute => {
        const values = newArray.filter(item => item.attribute === attribute && item.value !== "All").map(i => i.value);
        if (values.length > 0) {
            searchParams.set(attribute, Array.from(new Set(values)).join(','));
        } else {
            searchParams.delete(attribute);
        }
    });

    if (!attributes || attributes.length === 0) {
        if (initialized) {
            let url = window.location.href;
            newUrl = url.split('?')[0];
        }


    } else {
        newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    }
    window.history.pushState({}, '', newUrl);
}

function updateChips() {
    let chipsContainer = document.getElementById('chips-container');
    let html = newArray.map(item => {
        if (item.label != 'All') {
            return `<span class="ais-CurrentRefinements-category">
                <span class="ais-CurrentRefinements-categoryLabel">${item.label}</span>
                <button class="ais-CurrentRefinements-delete" data-attribute="${item.attribute}" data-value="${item.value}">✕</button>
            </span>`;
        }
    }).join('');

    chipsContainer.innerHTML = html;

    document.querySelectorAll('.ais-CurrentRefinements-delete').forEach(button => {
        button.addEventListener('click', function () {
            let attribute = this.dataset.attribute;
            let value = this.dataset.value;
            let correspondingItem = document.querySelector(`.ais-RefinementList-item input[value="${value}"]`);
            if (correspondingItem) {
                correspondingItem.click();
            }
            newArray = newArray.filter(item => item.value !== value);
            updateChips();
            //updateUrlParams();
        });
        return;
    });

    updateUrlParams();
}

function updateDivAfterSixthItem() {
    const existingDiv = document.querySelector('.cta-resources');
    if (existingDiv) {
        existingDiv.parentNode.removeChild(existingDiv);
    }

    const items = document.querySelectorAll('.ais-Hits-item');
    if (items.length > 0) {
        const newDiv = document.createElement('div');
        newDiv.className = 'cta-resources';

        const p = document.createElement('p');
        p.className = 'cta-resources__title';
        p.textContent = 'Ready to transform your software delivery process?';
        newDiv.appendChild(p);

        const a = document.createElement('a');
        a.href = '#';
        a.textContent = 'View product demos';
        newDiv.appendChild(a);

        const targetIndex = items.length >= 6 ? 5 : items.length - 1;
        items[targetIndex].insertAdjacentElement('afterend', newDiv);
    }
}

function addDivAfterSixthItem() {
    const items = document.querySelectorAll('.ais-Hits-item');
    if (items.length > 6) {
        if (!document.querySelector('.cta-resources')) {
            const newDiv = document.createElement('div');
            newDiv.className = 'cta-resources';

            const p = document.createElement('p');
            p.className = 'cta-resources__title';
            p.textContent = 'Ready to transform your software delivery process?';
            newDiv.appendChild(p);

            const a = document.createElement('a');
            a.href = '#';
            a.textContent = 'View product demos';
            newDiv.appendChild(a);

            items[5].insertAdjacentElement('afterend', newDiv);
        }
    }
}

function manageClasses(ids) {
    updateDivAfterSixthItem();

    const list = document.querySelector(`#${id} .ais-RefinementList-list`);
    list.addEventListener('click', function (event) {
        if (!wasClicked) {
            wasClicked = true;
            list.dataset.clicked = 'true';
        }
        const clickedItem = event.target.closest('.ais-RefinementList-item');
        if (!clickedItem) {
            return;
        }

        const items = list.querySelectorAll('.ais-RefinementList-item');

        manageClickOnFirstItem(items, clickedItem, id);
        updateChips();
    });

}

function addClickListener(id) {
    const list = document.querySelector(`#${id} .ais-RefinementList-list`);
    let wasClicked = list && list.dataset.clicked === 'true';

    if (!list) {
        return;
    }

    list.addEventListener('click', function (event) {
        if (!wasClicked) {
            wasClicked = true;
            list.dataset.clicked = 'true';
        }
        const clickedItem = event.target.closest('.ais-RefinementList-item');
        if (!clickedItem) {
            return;
        }

        const items = list.querySelectorAll('.ais-RefinementList-item');

        manageClickOnFirstItem(items, clickedItem, id);
        updateChips();
    });
}


function manageClickOnFirstItem(items, clickedItem, id) {
    const firstItem = items[0];
    const firstItemInput = firstItem.querySelector('input[type="checkbox"]');
    if (clickedItem === firstItem) {
        items.forEach((item, index) => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            const isSelected = index === 0;

            checkbox.checked = isSelected;
            item.classList.toggle('ais-RefinementList-item--selected', isSelected);
        });

        updateNewArray(items, id);

    } else if (firstItemInput.checked) {
        firstItemInput.checked = false;
        firstItem.classList.remove('ais-RefinementList-item--selected');
        manageClickOnOtherItems(items, clickedItem, firstItem, id);
    } else {
        manageClickOnOtherItems(items, clickedItem, firstItem, id);
    }
}

function manageClickOnOtherItems(items, clickedItem, firstItem, id) {
    const firstItemInput = firstItem.querySelector('input[type="checkbox"]');
    firstItemInput.checked = false;
    firstItem.classList.remove('ais-RefinementList-item--selected');
    clickedItem.classList.toggle('ais-RefinementList-item--selected');

    const isChecked = clickedItem.classList.contains('ais-RefinementList-item--selected');
    clickedItem.querySelector('input[type="checkbox"]').checked = isChecked;

    updateNewArray(items, id);

    checkIfNoItemsSelected(items, firstItem, firstItemInput);
}

function checkIfNoItemsSelected(items, firstItem, firstItemInput) {
    console.log('no items')
    const checkedItems = Array.from(items).filter((item, index) => {
        return item.querySelector('input[type="checkbox"]').checked && index !== 0;
    });

    if (checkedItems.length === 0) {
        firstItemInput.checked = true;
        firstItem.classList.add('ais-RefinementList-item--selected');
        items.forEach((item, index) => {
            if (index !== 0) {
                let checkbox = item.querySelector('input[type="checkbox"]');
                checkbox.checked = false;
            }
        });
    }
}

function updateNewArray(items, id) {
    newArray = Array.from(items)
        .filter(item => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            const label = item.querySelector('.ais-RefinementList-labelText');
            return checkbox !== null && label !== null && checkbox.checked;
        })
        .map(item => {
            return {
                attribute: id.replace('-list', ''),
                value: item.querySelector('input[type="checkbox"]').value,
                label: item.querySelector('.ais-RefinementList-labelText').textContent
            };
        });
}
