'use strict';

(function () {
  var LINE_START = 0;
  var LINE_END = 450;
  var scalePinProcent = 100;


  var pin = document.querySelector('.effect-level__pin');
  var lineDepth = document.querySelector('.effect-level__depth');

  var procentIt = function(value) {
    scalePinProcent = Math.floor((value / 450) * 100);
    return scalePinProcent;
  };

  pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoord = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      console.log(scalePinProcent);



      var shift = {
        // x: moveEvt.clientX
        x: moveEvt.clientX - startCoord.x
      };

      startCoord = {
        x: moveEvt.clientX
      };

      var calc = (pin.offsetLeft + shift.x);

      if (calc >= LINE_START && calc <= LINE_END) {
        pin.style.left = calc + 'px';
        lineDepth.style.width = calc + 'px';

        scalePinProcent = procentIt(calc);
      }
    };

    var onMouseup = function (upEvt) {
      upEvt.preventDefault();

      pin.removeEventListener('mousemove', onMouseMove);
      pin.removeEventListener('mouseup', onMouseup);
    };

    pin.addEventListener('mousemove', onMouseMove);
    pin.addEventListener('mouseup', onMouseup);
  });

  window.slider = {
    pinProcent: scalePinProcent
  };
})();
