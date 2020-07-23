"use strict";

(function() {
    var uploadFile = document.querySelector("#upload-file");
    var uploadCancel = document.querySelector("#upload-cancel");
    var effectLevelPin = document.querySelector(".effect-level__pin");
    var editForm = document.querySelector(".img-upload__overlay");
    var scaleSmaller = document.querySelector(".scale__control--smaller");
    var scaleBigger = document.querySelector(".scale__control--bigger");
    var scaleValue = document.querySelector(".scale__control--value");
    var uploadPreview = document.querySelector(".img-upload__preview");
    var uploadEffects = document.querySelector(".img-upload__effects");
    var textHashtags = document.querySelector(".text__hashtags");
    var textComments = document.querySelector(".social__footer-text");
    var body = document.querySelector("body");

    var openPopup = function(modal) {
        modal.classList.remove("hidden");
        body.classList.add("modal-open");
        document.addEventListener("keydown", window.onPopupEscPress);
    };
    var scaleControl = function() {
        var scale = 100;
        scaleValue.value = scale + "%";
        scaleSmaller.addEventListener("click", function() {
            if (scale > 25) {
                scale -= 25;
                var scalePart = scale / 100;
                uploadPreview.style = "transform: scale(" + scalePart + ")";
                scaleValue.value = scale + "%";
            }
        });
        scaleBigger.addEventListener("click", function() {
            if (scale < 100) {
                scale = +scale + +25;
                var scalePart = scale / 100;
                uploadPreview.style = "transform: scale(" + scalePart + ")";
                scaleValue.value = scale + "%";
            }
        });
    };
    var effectControl = function(evt) {
        uploadPreview.classList.remove("effects__preview--chrome");
        uploadPreview.classList.remove("effects__preview--sepia");
        uploadPreview.classList.remove("effects__preview--marvin");
        uploadPreview.classList.remove("effects__preview--phobos");
        uploadPreview.classList.remove("effects__preview--heat");
        uploadPreview.classList.remove("effects__preview--none");
        uploadPreview.classList.add("effects__preview--" + evt.target.value);
    };

    var checkHashtags = function() {
        textHashtags.addEventListener("input", function() {
            var hashTagRe = /^#[a-zа-яA-ZА-Я0-9]{1,19}$/;
            var hashTagsErrorCount = 0;
            var text = textHashtags.value.trim();
            var hashTagsArray = text.split(" ");
            if (text) {
                for (var i = 0; i < hashTagsArray.length; i++) {
                    if (!hashTagRe.test(hashTagsArray[i])) {
                        hashTagsErrorCount++;
                    }
                }
            }
            if (hashTagsErrorCount) {
                textHashtags.setCustomValidity(
                    "Исправьте ошибки в " + hashTagsErrorCount + " хэштеге"
                );
                textHashtags.reportValidity();
            } else if (hashTagsArray.length > 5) {
                textHashtags.setCustomValidity("Не больше 5 хештегов");
                textHashtags.reportValidity();
            } else {
                textHashtags.setCustomValidity("");
            }
        });
    };
    var checkComments = function() {
        textComments.addEventListener("input", function() {
            if (textComments.value.length > 140) {
                textComments.setCustomValidity(
                    "Превышено допустимое количество символов"
                );
                textComments.reportValidity();
            } else {
                textComments.setCustomValidity("");
            }
        });
    };

    uploadFile.addEventListener("change", function() {
        openPopup(editForm);
    });
    uploadCancel.addEventListener("click", function() {
        window.closePopup(editForm);
        uploadFile.value = "";
    });
    effectLevelPin.addEventListener("mouseup", function() {});
    uploadEffects.addEventListener("change", effectControl);
    openPopup(editForm);
    scaleControl();
    checkHashtags();
    checkComments();
})();