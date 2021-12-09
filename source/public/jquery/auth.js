const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const username = $('.auth-form .usernameInput');
const errorUsername = $("#val-username-error");
const errorPassword = $("#val-password-error");
const password = $(".auth-form .passwordInput");
const signInBtn = $(".auth-form .sign-in-btn");
function isMinLength(value, min) {
    return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} ký tự`;
}
function isRequired(value) {
    return value ? undefined : 'Vui lòng nhập trường này';
}
// input: child element => input username or input password 
// expected output: parent that match selector => form-group
function getParent(element, selector) {
    while (element.parentElement) {

        if (element.parentElement.matches(selector)) {
            return element.parentElement;
        }
        element = element.parentElement;
    }
}

function disableBtn(btn){
    if(!btn.classList.contains("disabled")){
        btn.classList.add("disabled");
    }
}
function enableBtn(btn){

    if(!getParent(password,'.form-group').classList.contains("invalid") && !getParent(username,'.form-group').classList.contains("invalid") ){
        btn.classList.remove("disabled");
    }
}

username.onblur = function () {
    const errorMsg = isRequired(username.value);
    if (errorMsg) {
        errorUsername.innerText = errorMsg;
        const formGroup = getParent(username, ".form-group");
        formGroup.classList.add("invalid");
        disableBtn(signInBtn);
    }
    else {
        errorUsername.innerText = '';
        const formGroup = getParent(username, ".form-group");
        formGroup.classList.remove("invalid");
        enableBtn(signInBtn);
    }
}

username.oninput = function () {
    errorUsername.innerText = '';
    const formGroup = getParent(username, ".form-group");
    formGroup.classList.remove("invalid");
    enableBtn(signInBtn);
}

password.onblur = function () {
    const errorMsg = isRequired(password.value);
    if (errorMsg) {
        errorPassword.innerText = errorMsg;
        const formGroup = getParent(password, ".form-group");
        formGroup.classList.add("invalid");
        disableBtn(signInBtn);
    }
    else {
        errorPassword.innerText = '';
        const formGroup = getParent(password, ".form-group");
        formGroup.classList.remove("invalid");
        enableBtn(signInBtn);
    }
}

password.oninput = function () {
    const errMinMsg = isMinLength(password.value,5);
    if (errMinMsg) {
        errorPassword.innerText = errMinMsg;
        const formGroup = getParent(password, ".form-group");
        formGroup.classList.add("invalid");
        disableBtn(signInBtn);
    }
    else {
        errorPassword.innerText = '';
        const formGroup = getParent(password, ".form-group");
        formGroup.classList.remove("invalid");
        enableBtn(signInBtn);
    }
}


