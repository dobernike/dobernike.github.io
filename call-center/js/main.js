var buttonContract = document.getElementById("button-search");
var searchDiv = document.getElementsByClassName('info-user-search-div')[0];
var buttonNew = document.getElementById("button-new");
var newAddDiv = document.getElementsByClassName('registration-new-user')[0];
var infoUserList = document.querySelector('.info-user-list');

buttonContract.onclick = function () {
    hideShow(searchDiv, newAddDiv);
};

buttonNew.onclick = function () {
    hideShow(newAddDiv, searchDiv);

};

var buttonBack = document.getElementsByClassName('button-back')[0];
var infoList = document.getElementsByClassName('info-firm-list')[0];
var infoPageList = document.getElementsByClassName('info-firm-inner-list')[0];

for (var i = 0; i < infoList.children.length; i++) {
    var infoItem = infoList.children[i];

    infoItem.onclick = (function (index) {
        return function () {
            var infoPageItem = infoPageList.children[index + 1];
            infoList.classList.add('hidden');
            infoPageItem.classList.remove('hidden');
            infoPageList.classList.remove('hidden');

            buttonBack.onclick = function () {
                infoPageList.classList.add('hidden');
                infoPageItem.classList.add('hidden');
                infoList.classList.remove('hidden');
            };
        };
    })(i);
}

function hideShow(div, div2) {
    if (div.classList.contains('hidden') && div2.classList.contains('hidden')) {
        div.classList.remove('hidden');
        infoUserList.classList.add('hidden');
    } else {
        div.classList.add('hidden');
        div2.classList.add('hidden');
        infoUserList.classList.remove('hidden');
    }
}