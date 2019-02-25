'use strict';

(function () {
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var coatColor;
  var eyesColor;
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return 1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.render(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));

    // var sameCoatAndEyesWizards = wizards.filter(function (it) {
    //   return it.colorCoat === coatColor && it.colorEyes === eyesColor;
    // });

    // var sameCoatWizards = wizards.filter(function (it) {
    //   return it.colorCoat === coatColor;
    // });
    // var sameEyesWizards = wizards.filter(function (it) {
    //   return it.colorEyes === eyesColor;
    // });

    // var filteredWizards = sameCoatAndEyesWizards;
    // filteredWizards = filteredWizards.concat(sameCoatWizards);
    // filteredWizards = filteredWizards.concat(sameEyesWizards);
    // filteredWizards = filteredWizards.concat(wizards);

    // var uniqueWizards = filteredWizards.filter(function (it, i) {
    //   // console.log('filter: ' + filteredWizards.indexOf(it) + '  index: ' + i);
    //   return filteredWizards.indexOf(it) === i;
    // });

    // window.render(uniqueWizards);
    // window.render(sameCoatWizards.concat(sameEyesWizards).concat(wizards));
  };

  var randomArray = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };


  var wizardElement = document.querySelector('.setup-wizard');


  var wizardCoat = wizardElement.querySelector('.wizard-coat');
  var wizardCoatBackend = document.querySelector('input[name=coat-color]');

  coatColor = wizardCoat.style.fill;

  window.wizard.onCoatChange = function (color) {
    coatColor = color;
    updateWizards();
  };

  wizardCoat.addEventListener('click', function () {
    var newColor = randomArray(WIZARD_COAT_COLORS);
    wizardCoat.style.fill = newColor;
    wizardCoatBackend.value = newColor;
    coatColor = newColor;
    window.debounce(updateWizards);
  });

  var wizardEyes = wizardElement.querySelector('.wizard-eyes');
  var wizardEyesBackend = document.querySelector('input[name=eyes-color]');

  eyesColor = wizardEyes.style.fill;
  if (wizardEyes.style.fill === '') {
    eyesColor = 'black';
  }


  wizardEyes.addEventListener('click', function () {
    var newColor = randomArray(WIZARD_EYES_COLORS);
    wizardEyes.style.fill = newColor;
    wizardEyesBackend.value = newColor;
    eyesColor = newColor;
    window.debounce(updateWizards);
  });

  var setupFireball = document.querySelector('.setup-fireball-wrap');
  var setupFireballBackend = setupFireball.querySelector('input[name=fireball-color]');
  setupFireball.addEventListener('click', function () {
    var selectColor = randomArray(WIZARD_FIREBALL_COLORS);
    setupFireball.style.background = selectColor;
    setupFireballBackend.value = selectColor;
    // updateWizards();
  });

  var successHandler = function (data) {
    wizards = data;
    // window.render(wizards);
    updateWizards();
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
