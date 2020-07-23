"use strict";
(function() {
    var effectLine = document.querySelector(".effect-level__line");
    var effectPin = effectLine.querySelector(".effect-level__pin");
    var effectDepth = effectLine.querySelector(".effect-level__depth");
    var pinX = effectPin.getBoundingClientRect().left;

    effectPin.addEventListener("mousedown", function(evt) {
        evt.preventDefault();

        var startCoords = {
            x: evt.clientX,
        };

        var dragged = false;

        var onMouseMove = function(moveEvt) {
            moveEvt.preventDefault();

            dragged = true;

            var shift = {
                x: startCoords.x - moveEvt.clientX,
            };

            startCoords = {
                x: moveEvt.clientX,
            };
            if (startCoords.x > pinX - 80 && startCoords.x < pinX + 370) {
                effectPin.style.left = effectPin.offsetLeft - shift.x + "px";
                effectDepth.style.width = effectPin.offsetLeft - shift.x + "px";
            }
        };

        var onMouseUp = function(upEvt) {
            upEvt.preventDefault();

            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);

            if (dragged) {
                var onClickPreventDefault = function(clickEvt) {
                    clickEvt.preventDefault();
                    effectPin.removeEventListener("click", onClickPreventDefault);
                };
                effectPin.addEventListener("click", onClickPreventDefault);
            }
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });
})();