"use strict";

(function() {
    var pictureTemplate = document.querySelector("#picture").content;
    var fragment = document.createDocumentFragment();
    var picturesBlock = document.querySelector(".pictures");

    var createPictures = function(picture) {
        var pictureElement = pictureTemplate.cloneNode(true);

        pictureElement.querySelector(".picture__img").src = picture.url;
        pictureElement.querySelector(".picture__likes").textContent = picture.likes;
        pictureElement.querySelector(".picture__comments").textContent =
            picture.comments.length;

        pictureElement
            .querySelector(".picture__img")
            .addEventListener("click", function() {
                window.fillBigPicture(picture);
            });
        return pictureElement;
    };

    window.addElement = function(renderWay, elementType, block) {
        for (var i = 0; i < elementType.length; i++) {
            fragment.appendChild(renderWay(elementType[i]));
        }
        block.appendChild(fragment);
    };
    var pictures = window.createAvatar(25);
    window.bigPictureComments = pictures[0].comments;
    window.addElement(createPictures, pictures, picturesBlock);
})();
