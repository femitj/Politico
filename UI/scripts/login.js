/* eslint-disable */
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const loginButton = document.getElementById('login-btn');
const alertBox = document.getElementById('alert-div');
const alertBoxCloser = document.getElementById('close-alert');
let alertTextElement = alertBox.querySelector('p');
const alertTitle = alertBox.querySelector('h5');



const a = () => { alertTextElement.innerText = " ", alertTitle.innerText = " " };
function displayalert() {
  //alertBox.style.display = block;
  setTimeout( a , 4000);
}



function verifyRequiredFields() {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alertTitle.innerText = 'An error has occured';
    alertTextElement.innerText = 'All fields are required. Please fill them all.'
    return displayalert();
  }

  if (!/^.+@.+\..+$/.test(email)) {
    alertTitle.innerText = 'An error has occured';
    alertTextElement.innerText = 'The email is invalid. Please enter a valid email';
    return displayalert();
  }

  if (password.length <= 5) {
    alertTitle.innerText = 'An error has occured';
    alertTextElement.innerText = 'Password needs to be at least 6 characters long.'
    return displayalert();
  }
  return { email, password }
}

loginButton.addEventListener('click', (e) => {
  e.preventDefault();
  const { email = '', password = '' } = verifyRequiredFields();
   const options = {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({ password, email }),
    headers: {
      'Content-Type': 'application/json',
    }
  }

   fetch('https://politico-app.herokuapp.com/api/v1/auth/login', options)
    .then(res => res.json())
    .then(res => {
      sessionStorage.setItem('userId', res.data.user.id);
      sessionStorage.setItem('token', res.data.token);
      sessionStorage.setItem('firstName', res.data.user.firstname);
      emailInput.value = '';
      passwordInput.value = '';
      setTimeout(() => {
        if (res.data.user.isAdmin) return location.href = '../views/admin/admin.html';
        location.href = '../views/user/user-dashboard.html'
      }, 2500);
    })
    .catch(err => {
      alertTitle.innerText = 'Username or Password does not exist.';
      return displayalert();
    })
});