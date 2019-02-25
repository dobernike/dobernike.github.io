// 'use strict';

// (function () {
//   var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
//   var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
//   var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

//   var randomArray = function (arr) {
//     return arr[Math.floor(Math.random() * arr.length)];
//   };
//   // var randomArray = function (arr, arr2) {
//   //   if (!arr2) {
//   //     return arr[Math.floor(Math.random() * arr.length)];
//   //   } else {
//   //     var newArr = [randomArray(arr), randomArray(arr2)];

//   //     return (Math.floor(Math.random() * 2) === 0) ? newArr.join(' ') : newArr.reverse().join(' ');
//   //   }
//   // };

//   var setupPlayer = document.querySelector('.setup-player');
//   var setupWizard = setupPlayer.querySelector('.setup-wizard');
//   var wizardCoat = setupWizard.querySelector('.wizard-coat');
//   var wizardCoatBackend = setupPlayer.querySelector('input[name=coat-color]');

//   wizardCoat.addEventListener('click', function () {
//     wizardCoat.style.fill = randomArray(WIZARD_COAT_COLORS);
//     wizardCoatBackend.value = wizardCoat.style.fill;
//   });

//   var wizardEyes = setupWizard.querySelector('.wizard-eyes');
//   var wizardEyesBackend = setupPlayer.querySelector('input[name=eyes-color]');

//   wizardEyes.addEventListener('click', function () {
//     wizardEyes.style.fill = randomArray(WIZARD_EYES_COLORS);
//     wizardEyesBackend.value = wizardEyes.style.fill;
//   });

//   var setupFireball = setupPlayer.querySelector('.setup-fireball-wrap');
//   var setupFireballBackend = setupFireball.querySelector('input[name=fireball-color]');

//   setupFireball.addEventListener('click', function () {
//     var selectColor = randomArray(WIZARD_FIREBALL_COLORS);
//     setupFireball.style.background = selectColor;
//     setupFireballBackend.value = selectColor;
//   });
// })();
