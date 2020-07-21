"use strict";

(function() {
    var body = document.querySelector("body");
    var uploadFile = document.querySelector("#upload-file");
    var modalPopup = document.querySelector(".modal-popup");

    window.closePopup = function(modal) {
        modal.classList.add("hidden");
        body.classList.remove("modal-open");
        document.removeEventListener("keydown", onPopupEscPress);
    };
    window.onPopupEscPress = function(evt) {
        if (evt.key === "Escape") {
            evt.preventDefault();
            window.closePopup(modalPopup);
            uploadFile.value = "";
        }
    };
})();
