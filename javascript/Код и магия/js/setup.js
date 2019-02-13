'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var randomArray = function (arr, arr2) {
    if (!arr2) {
      return arr[Math.floor(Math.random() * arr.length)];
    } else {
      var newArr = [randomArray(arr), randomArray(arr2)];

      return (Math.floor(Math.random() * 2) === 0) ? newArr.join(' ') : newArr.reverse().join(' ');
    }
  };


  var wizards = [{
    name: randomArray(WIZARD_NAMES, WIZARD_LAST_NAMES),
    coatColor: randomArray(WIZARD_COAT_COLORS),
    eyesColor: randomArray(WIZARD_EYES_COLORS)
  },
  {
    name: randomArray(WIZARD_NAMES, WIZARD_LAST_NAMES),
    coatColor: randomArray(WIZARD_COAT_COLORS),
    eyesColor: randomArray(WIZARD_EYES_COLORS)
  },
  {
    name: randomArray(WIZARD_NAMES, WIZARD_LAST_NAMES),
    coatColor: randomArray(WIZARD_COAT_COLORS),
    eyesColor: randomArray(WIZARD_EYES_COLORS)
  },
  {
    name: randomArray(WIZARD_NAMES, WIZARD_LAST_NAMES),
    coatColor: randomArray(WIZARD_COAT_COLORS),
    eyesColor: randomArray(WIZARD_EYES_COLORS)
  }];

  var similarListElement = document.querySelector('.setup-similar-list');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var addFragment = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(renderWizard(arr[i]));
    }
    similarListElement.appendChild(fragment);
  };

  addFragment(wizards);

  document.querySelector('.setup-similar').classList.remove('hidden');

  var setupPlayer = document.querySelector('.setup-player');
  var setupWizard = setupPlayer.querySelector('.setup-wizard');

  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardCoatBackend = setupPlayer.querySelector('input[name=coat-color]');

  wizardCoat.addEventListener('click', function () {
    wizardCoat.style.fill = randomArray(WIZARD_COAT_COLORS);
    wizardCoatBackend.value = wizardCoat.style.fill;
  });

  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var wizardEyesBackend = setupPlayer.querySelector('input[name=eyes-color]');

  wizardEyes.addEventListener('click', function () {
    wizardEyes.style.fill = randomArray(WIZARD_EYES_COLORS);
    wizardEyesBackend.value = wizardEyes.style.fill;
  });

  var setupFireball = setupPlayer.querySelector('.setup-fireball-wrap');
  var setupFireballBackend = setupFireball.querySelector('input[name=fireball-color]');

  setupFireball.addEventListener('click', function () {
    var selectColor = randomArray(WIZARD_FIREBALL_COLORS);
    setupFireball.style.background = selectColor;
    setupFireballBackend.value = selectColor;
  });
})();

