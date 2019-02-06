/* eslint-disable */
const firstNameInput = document.getElementById('firstname');
const lastNameInput = document.getElementById('lastname');
const otherNameInput = document.getElementById('othername');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const passwordInputCheck = document.getElementById('confirm-password');
const phoneNumberInput = document.getElementById('phonenumber');

const alertBox = document.getElementById('alert-div');
const alertBoxCloser = document.getElementById('close-alert');
const alertTextElement = alertBox.querySelector('p');
const alertTitle = alertBox.querySelector('h5');

const signUpButton = document.getElementById('register-btn');

alertBoxCloser.addEventListener('click', () => {
  alertBox.style.display = 'none';
});

const a = () => { alertTextElement.innerText = " ", alertTitle.innerText = " " };
function displayalert() {
  //alertBox.style.display = block;
  setTimeout( a , 5000);
}


function emptyInputFields() {
  lastNameInput.value = '';
  passwordInput.value = '';
  passwordInputCheck.value = '';
  firstNameInput.value = '';
  emailInput.value = '';
}

function verifyRequiredFields() {
  const firstname = firstNameInput.value.trim();
  const lastname = lastNameInput.value.trim();
  const othername = otherNameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const passwordCheck = passwordInputCheck.value.trim();
  const phonenumber = phoneNumberInput.value.trim();

  if (!lastname || !email || !password || !passwordCheck || !firstname || !othername || !phoneNumberInput) {
    alertTextElement.innerText = 'All fields are required. Please fill them all.'
    return displayalert();
  }
  if (!/^.+@.+\..+$/.test(email)) {
    alertTextElement.innerText = 'The email is invalid. Please enter a valid email';
    return displayalert();
  }
  if (password.length <= 5) {
    alertTextElement.innerText = 'Password needs to be at least 6 characters long.'
    return displayalert()
  }
  if (password !== passwordCheck) {
    alertTextElement.innerText = 'Unmatching password. Password needs to match for signup to be complete.'
    return displayalert();
  }
  return { email, password, firstname, lastname, othername,  phonenumber }
}

signUpButton.addEventListener('click', (e) => {
  e.preventDefault();
  const { email, password, firstname, lastname, othername,  phonenumber } = verifyRequiredFields();
  const options = {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({ email, password, firstname, lastname, othername,  phonenumber }),
    headers: {
      'Content-Type': 'application/json',
    }
  }

  fetch('https://politico-app.herokuapp.com/api/v1/auth/signup', options)
    .then(res => res.json())
    .then(res => {
      console.log(res.data[0]);
      sessionStorage.setItem('token', res.data.token);
      sessionStorage.setItem('firstName', res.data.user.firstname);
      alertTitle.innerText = 'User successfully created.'
      alertTextElement.innerText = `You'll be redirected to your home page shortly.`;
      displayalert();
      //emptyInputFields();
      setTimeout(() => {
        if (res.data.user) return window.location = 'http://' + document.location.host + '/UI/views/user/user-dashboard.html';
      }, 2000);
    })
    .catch(err => {
      alertTitle.innerText = 'An error has occured.';
      return displayalert();
    });
});
