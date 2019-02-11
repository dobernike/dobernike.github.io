'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

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


var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

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
userDialog.querySelector('.setup-similar').classList.remove('hidden');
