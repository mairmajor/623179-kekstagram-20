"use strict";

(function() {
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

    window.createAvatar = function(quantity) {
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
})();
