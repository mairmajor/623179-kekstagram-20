"use strict";
(function() {
    var effectLine = document.querySelector(".effect-level__line");
    var effectPin = effectLine.querySelector(".effect-level__pin");
    var effectDepth = effectLine.querySelector(".effect-level__depth");

    var effectLineWidth = effectLine.offsetWidth;
    effectPin.style.cssText = `position: absolute; left: ${
    effectLineWidth / 2
  }px`;
    effectDepth.style.width = `${effectLineWidth / 2}px`;

    var getPositionPin = effectPin.getBoundingClientRect().left;
    var getPositionLine = effectLine.getBoundingClientRect().left;

    effectPin.addEventListener("mousedown", function(evt) {
        evt.preventDefault();

        var shiftX = evt.clientX - getPositionPin;
        var effectChrome = document.querySelector(
            ".img-upload__preview.effects__preview--chrome"
        );
        var effectSepia = document.querySelector(
            ".img-upload__preview.effects__preview--sepia"
        );
        var effectMarvin = document.querySelector(
            ".img-upload__preview.effects__preview--marvin"
        );
        var effectPhobos = document.querySelector(
            ".img-upload__preview.effects__preview--phobos"
        );
        var effectHeat = document.querySelector(
            ".img-upload__preview.effects__preview--heat"
        );

        if (effectChrome) {
            effectChrome.style.filter = "grayscale(0.5)";
        } else if (effectSepia) {
            effectSepia.style.filter = "sepia(0.5)";
        } else if (effectMarvin) {
            effectMarvin.style.filter = "invert(50%)";
        } else if (effectPhobos) {
            effectPhobos.style.filter = "blur(1.5px)";
        } else {
            effectHeat.style.filter = "brightness(1.5)";
        }

        var onMouseMove = function(moveEvt) {
            moveEvt.preventDefault();

            var newLeft = moveEvt.clientX - shiftX - getPositionLine;

            if (newLeft < 0) {
                newLeft = 0;
            }

            var rightEdge = effectLine.offsetWidth;

            if (newLeft > rightEdge) {
                newLeft = rightEdge;
            }

            effectPin.style.left = newLeft + "px";
            effectDepth.style.width = newLeft + "px";

            if (effectChrome) {
                effectChrome.style.filter = `grayscale(${newLeft / rightEdge})`;
            } else if (effectSepia) {
                effectSepia.style.filter = `sepia(${newLeft / rightEdge})`;
            } else if (effectMarvin) {
                effectMarvin.style.filter = `invert(${newLeft / rightEdge})`;
            } else if (effectPhobos) {
                effectPhobos.style.filter = `blur(${newLeft / rightEdge})`;
            } else {
                effectHeat.style.filter = `brightness(${newLeft / rightEdge})`;
            }
        };

        var onMouseUp = function(upEvt) {
            upEvt.preventDefault();

            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });
})();
