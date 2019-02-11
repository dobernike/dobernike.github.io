'use strict';

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены', 'как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var DESCRIPTION = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

var randomInteger = function (min, max, double) {
  if (double) {
    var newArr = [randomInteger(min), randomInteger(min)];
    if (newArr[0] !== newArr[1]) {
      return newArr;
    } else {
      var arr = [newArr[0]];
      return arr;
    }
  } else if (max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  } else {
    return min[Math.floor(Math.random() * min.length)];
  }
};

var doPhotosArray = function (arr) {
  for (var i = 0; i < 25; i++) {
    arr[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: randomInteger(15, 200),
      comments: randomInteger(COMMENTS, null, 'double?'),
      description: randomInteger(DESCRIPTION)
    };
  }
};

var photos = [];
doPhotosArray(photos);

var pictures = document.querySelector('.pictures');

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var renderPhoto = function (photo) {
  var photoElement = pictureTemplate.cloneNode(true);

  photoElement.querySelector('img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return photoElement;
};

var addFragment = function (arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPhoto(arr[i]));
  }
  pictures.appendChild(fragment);
};

addFragment(photos);


// var renderBigPhoto = function (photo) {
//   var photoElement = socialComment.cloneNode(true);

//   photoElement.querySelector('img').src = 'img/avatar-' + randomInteger(1, 6) + '.svg';
//   photoElement.querySelector('.social__text').textContent = photo.comments[0];

// console.log(photo.comments[0]);
// var comment = '';
// for (var i = 0; i < photo.comments.length; i++) {
//   comment += '<li class="social__comment social__comment--text"><img class="social__picture" src="img/avatar-' + randomInteger(1, 6) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35"> <p class="social__text">' + photo.comments[i] + '</p></li>';
// }
// console.log(comment);

// var comments = bigPhoto.querySelector('social__comments');
// comments.innerHTML(comment);

//   return photoElement;
// };

var bigPhoto = document.querySelector('.big-picture');

var doBigPhoto = function (photo) {

  bigPhoto.classList.remove('hidden');

  bigPhoto.querySelector('img').src = photo.url;
  bigPhoto.querySelector('.likes-count').textContent = photo.likes;
  bigPhoto.querySelector('.comments-count').textContent = photo.comments.length;
  bigPhoto.querySelector('.social__caption').textContent = photo.description;


  var socialComment = document.querySelectorAll('.social__comment');

  for (var i = 0; i < photo.comments.length; i++) {
    socialComment[i].querySelector('.social__picture').src = 'img/avatar-' + randomInteger(1, 6) + '.svg';
    socialComment[i].querySelector('.social__text').textContent = photo.comments[i];
  }

  return bigPhoto;
};

doBigPhoto(photos[0]);

var hideIt = function (needToHide) {
  needToHide.classList.add('visually-hidden');
};

hideIt(document.querySelector('.social__comment-count'));
hideIt(document.querySelector('.comments-loader'));
