'use strict';

(function () {

  window.showFilter = function (photoArray) {
    var imgFilters = document.querySelector('.img-filters');
    imgFilters.classList.remove('img-filters--inactive');

    var filterPopular = imgFilters.querySelector('#filter-popular');
    var filterNew = imgFilters.querySelector('#filter-new');
    var filterDiscussed = imgFilters.querySelector('#filter-discussed');
    var sortedArray = photoArray;
    var addEventToFilterBtn = function (first, second, third, arr) {
      first.addEventListener('click', function () {
        first.classList.add('img-filters__button--active');
        second.classList.remove('img-filters__button--active');
        third.classList.remove('img-filters__button--active');

        if (first === filterPopular) {
          sortedArray = arr;
        }
        if (first === filterNew) {
          sortedArray = [];
          arr.forEach(function (it) {
            var result = Math.floor(Math.random() * arr.length);
            if (sortedArray.indexOf(result)) {
              sortedArray.push(result);
            }
          });
        }
        if (first === filterDiscussed) {
          sortedArray = [];
          sortedArray.sort(); // need to end sort;
        }
      });
    };

    addEventToFilterBtn(filterPopular, filterNew, filterDiscussed, photoArray);
    addEventToFilterBtn(filterNew, filterPopular, filterDiscussed, photoArray);
    addEventToFilterBtn(filterDiscussed, filterNew, filterPopular, photoArray);

    return photoArray;
  };
})();
