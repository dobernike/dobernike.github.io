var link = document.querySelector(".button-feedback");

var popup = document.querySelector(".modal-feedback");
var close = popup.querySelector(".modal-close");

var overlay = document.querySelector(".modal-overlay");

var form = popup.querySelector("form");
var username = popup.querySelector("[name=username]");
var email = popup.querySelector("[name=email]");
var text = popup.querySelector("textarea");

link.addEventListener("click", function(evt) {
    evt.preventDefault();
    popup.classList.add("modal-show");
    overlay.classList.add("modal-show");
});

close.addEventListener("click", function(evt) {
    evt.preventDefault();
    popup.classList.remove("modal-show");
    overlay.classList.remove("modal-show");
});

overlay.addEventListener("click", function(evt) {
    evt.preventDefault();
    popup.classList.remove("modal-show");
    overlay.classList.remove("modal-show");
});

window.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 27) {
    if (popup.classList.contains("modal-show")) {
        evt.preventDefault();
        popup.classList.remove("modal-show");
        overlay.classList.remove("modal-show");
    }
}
});

form.addEventListener("submit", function(evt) {
    console.log(username.value);
    console.log(email.value);
    if (!username.value || !email.value || !text.value) {
    evt.preventDefault();
    popup.classList.remove("modal-error");
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add("modal-error");

    username.classList.remove("not-valid");
    email.classList.remove("not-valid");
    text.classList.remove("not-valid");

        if (!username.value) {
            username.classList.add("not-valid");
        }
        if (!email.value) {
            email.classList.add("not-valid");
        }
        if (!text.value) {
            text.classList.add("not-valid");
        }
    }
});