"use strict";

var MESSAGE_ARRAY = [
    "Всё отлично!",
    "В целом всё неплохо. Но не всё.",
    "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
    "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
    "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
    "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!",
];

var NAMES_ARRAY = [
    "Абайты Бордюр",
    "Абиев Ленин",
    "Абиев Линкор",
    "Багаев Гамлет",
    "Багаев Маяк",
    "Багаев Танк",
    "Баграев Партизан",
    "Базиев Дигорук",
    "Бекоев Француз",
    "Бекузаров Кимерсен",
    "Бекуров Сталин",
    "Бериева Зималетта",
    "Бероева Шоколад",
    "Бесаева Аргентина",
    "Бестаев Гарик",
];

var pictureTemplate = document.querySelector("#picture").content;
var fragment = document.createDocumentFragment();
var picturesBlock = document.querySelector(".pictures");
var bigPicture = document.querySelector(".big-picture");
var body = document.querySelector("body");
var socialComments = bigPicture.querySelector(".social__comments");
var socialComment = socialComments.querySelector(".social__comment");
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

var renderInteger = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

var createComments = function(quantity) {
    var comments = [];
    for (var i = 0; i < quantity; i++) {
        var comment = {
            avatar: "img/avatar-" + renderInteger(1, 7) + ".svg",
            message: MESSAGE_ARRAY[renderInteger(0, MESSAGE_ARRAY.length)],
            name: NAMES_ARRAY[renderInteger(0, NAMES_ARRAY.length)],
        };
        comments.push(comment);
    }
    return comments;
};

var createAvatar = function(quantity) {
    var avatars = [];
    for (var i = 0; i < quantity; i++) {
        var avatarData = {
            url: "photos/" + (i + 1) + ".jpg",
            description: "",
            likes: renderInteger(15, 200),
            comments: createComments(renderInteger(1, 7)),
        };
        avatars.push(avatarData);
    }
    return avatars;
};

var createPictures = function(picture) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector(".picture__img").src = picture.url;
    pictureElement.querySelector(".picture__likes").textContent = picture.likes;
    pictureElement.querySelector(".picture__comments").textContent =
        picture.comments.length;

    return pictureElement;
};

var addElement = function(renderWay, elementType, block) {
    for (var i = 0; i < elementType.length; i++) {
        fragment.appendChild(renderWay(elementType[i]));
    }
    block.appendChild(fragment);
};

var addBigPictureComments = function(bigPictureComment) {
    var commentElement = socialComment.cloneNode(true);

    commentElement.querySelector(".social__picture").src =
        bigPictureComment.avatar;
    commentElement.querySelector(".social__picture").alt = bigPictureComment.name;
    commentElement.querySelector(".social__text").textContent =
        bigPictureComment.message;

    return commentElement;
};
var fillBigPicture = function(pictureData) {
    bigPicture.classList.remove("hidden");
    bigPicture.querySelector(".big-picture__img").src = pictureData.url;
    bigPicture.querySelector(".likes-count").textContent = pictureData.likes;
    bigPicture.querySelector(".comments-count").textContent =
        pictureData.comments.length;
    bigPicture.querySelector(".social__comments").src = pictureData.commentBlock;
    bigPicture.querySelector(".social__caption").src = pictureData.description;
    bigPicture.querySelector(".social__comment-count").classList.add("hidden");
    bigPicture.querySelector(".comments-loader").classList.add("hidden");
    body.classList.add("modal-open");
    addElement(addBigPictureComments, bigPictureComments, socialComments);

    return bigPicture;
};
var openPopup = function() {
    editForm.classList.remove("hidden");
    body.classList.add("modal-open");
    document.addEventListener("keydown", onPopupEscPress);
};
var closePopup = function() {
    editForm.classList.add("hidden");
    body.classList.remove("modal-open");
    document.removeEventListener("keydown", onPopupEscPress);
};
var onPopupEscPress = function(evt) {
    if (evt.key === "Escape") {
        evt.preventDefault();
        closePopup();
        uploadFile.value = "";
    }
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

var pictures = createAvatar(25);
var bigPictureComments = pictures[0].comments;
addElement(createPictures, pictures, picturesBlock);
// fillBigPicture(pictures[0]);
uploadFile.addEventListener("change", function() {
    openPopup();
});
uploadCancel.addEventListener("click", function() {
    closePopup();
    uploadFile.value = "";
});
effectLevelPin.addEventListener("mouseup", function() {});

openPopup();
scaleControl();
uploadEffects.addEventListener("change", effectControl);
checkHashtags();
