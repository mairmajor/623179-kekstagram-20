"use strict";

(function() {
    var bigPicture = document.querySelector(".big-picture");
    var body = document.querySelector("body");
    var socialComments = bigPicture.querySelector(".social__comments");
    var socialComment = socialComments.querySelector(".social__comment");
    var pictureCancel = document.querySelector("#picture-cancel");

    var addBigPictureComments = function(bigPictureComment) {
        var commentElement = socialComment.cloneNode(true);

        commentElement.querySelector(".social__picture").src =
            bigPictureComment.avatar;
        commentElement.querySelector(".social__picture").alt =
            bigPictureComment.name;
        commentElement.querySelector(".social__text").textContent =
            bigPictureComment.message;

        return commentElement;
    };
    window.fillBigPicture = function(pictureData) {
        bigPicture.classList.remove("hidden");
        bigPicture.querySelector(".big-picture__img").src = pictureData.url;
        bigPicture.querySelector(".likes-count").textContent = pictureData.likes;
        bigPicture.querySelector(".comments-count").textContent =
            pictureData.comments.length;
        bigPicture.querySelector(".social__comments").src =
            pictureData.commentBlock;
        bigPicture.querySelector(".social__caption").src = pictureData.description;
        bigPicture.querySelector(".social__comment-count").classList.add("hidden");
        bigPicture.querySelector(".comments-loader").classList.add("hidden");
        body.classList.add("modal-open");
        addElement(
            addBigPictureComments,
            window.bigPictureComments,
            socialComments
        );

        return bigPicture;
    };

    pictureCancel.addEventListener("click", function() {
        window.closePopup(bigPicture);
    });
})();
