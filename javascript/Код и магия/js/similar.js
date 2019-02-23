'use strict';

(function () {
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var coatColor;
  var eyesColor;
  var wizards = [];

  var updateWizards = function () {

    var sameCoatWizards = wizards.filter(function (it) {
      // console.log(it);
      // console.log(coatColor)
      return it.colorCoat === coatColor;
    });
    // console.log(wizards);
    // console.log(sameCoatWizards);
    window.render(sameCoatWizards);
  };

  var randomArray = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };


  var wizardElement = document.querySelector('.setup-wizard');

  var wizardCoat = wizardElement.querySelector('.wizard-coat');
  var wizardCoatBackend = document.querySelector('input[name=coat-color]');
  wizardCoat.addEventListener('click', function () {
    var newColor = randomArray(WIZARD_COAT_COLORS);
    wizardCoat.style.fill = newColor;
    wizardCoatBackend.value = newColor;
    coatColor = newColor;
    updateWizards();
  });

  var wizardEyes = wizardElement.querySelector('.wizard-eyes');
  var wizardEyesBackend = document.querySelector('input[name=eyes-color]');
  wizardEyes.addEventListener('click', function () {
    var newColor = randomArray(WIZARD_EYES_COLORS);
    wizardEyes.style.fill = newColor;
    wizardEyesBackend.value = newColor;
    eyesColor = newColor;
    updateWizards();
  });

  var setupFireball = document.querySelector('.setup-fireball-wrap');
  var setupFireballBackend = setupFireball.querySelector('input[name=fireball-color]');
  setupFireball.addEventListener('click', function () {
    var selectColor = randomArray(WIZARD_FIREBALL_COLORS);
    setupFireball.style.background = selectColor;
    setupFireballBackend.value = selectColor;
    updateWizards();
  });

  var successHandler = function (data) {
    wizards = data;
    window.render(wizards);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);
})();
