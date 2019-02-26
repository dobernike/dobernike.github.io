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

        sortedArray = [];

        if (first === filterPopular) {
          sortedArray = arr.slice();
        }

        if (first === filterNew) {
          while (sortedArray.length < 10) {
            var result = Math.floor(Math.random() * arr.length);
            if (sortedArray.indexOf(arr[result]) === -1) {
              sortedArray.push(arr[result]);
            }
          }
        }

        if (first === filterDiscussed) {
          sortedArray = arr.slice();
          sortedArray.sort(function (a, b) {
            return b.comments.length - a.comments.length;
          });
        }

        window.render(sortedArray);
      });
    };

    addEventToFilterBtn(filterPopular, filterNew, filterDiscussed, photoArray);
    addEventToFilterBtn(filterNew, filterPopular, filterDiscussed, photoArray);
    addEventToFilterBtn(filterDiscussed, filterNew, filterPopular, photoArray);

    return sortedArray;
  };
})();
