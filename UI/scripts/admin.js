/* eslint-disable */
const logoutButton = document.getElementById('log-out');
const allEditButtons = document.querySelectorAll('.edit-btn');
const allDeleteButtons = document.querySelectorAll('.delete-btn');

const partyForm = document.getElementById('party-form')
const partyFormData = document.forms.namedItem('partyForm')
const partyTable = document.querySelector('#party-list')

const alertBox = document.getElementById('alert-div');
const alertBoxCloser = document.getElementById('close-alert');
const alertTextElement = alertBox.querySelector('p');
const alertTitle = alertBox.querySelector('h3');

const nameInput = document.getElementById('name');
const hqAddressInput = document.getElementById('hqAddress');
const logoUrlInput = document.getElementById('logo-input');
const createPartyBtn = document.getElementById('submitInput');


const a = () => { alertTextElement.innerText = " ", alertTitle.innerText = " " };
function displayalert() {
  //alertBox.style.display = block;
  setTimeout( a , 5000);
}

function checkName() {
  alertTitle.innerText = 'An error occured';
  alertTextElement.innerText = 'Name not provided';
  displayalert();
}

function checkForHqAddress() {
  alertTitle.innerText = 'An error occured';
  alertTextElement.innerText = 'Hq Address not provided.';
  displayalert();
}

function checkForLogoUrl() {
  alertTitle.innerText = 'An error occured';
  alertTextElement.innerText = 'Logo Url not provided.';
  displayalert();
}

function partyFormCheck() {
  const name = nameInput.value.trim();
  const hqAddress = hqAddressInput.value.trim();
  const logourl = logoUrlInput.value.trim();

  if (!name) return checkName();
  if (!hqAddress) return checkForHqAddress();
  if (!logourl) return checkForLogoUrl();

  return { name, hqAddress, logourl }
}

  partyForm.addEventListener('submit', (e) => {
  e.preventDefault()

  //const { name = '', hqAddress = '', logourl = '' } = partyFormCheck();
  const data = new FormData(partyFormData);
  /* partyForm.append('name', name);
  partyForm.append('hqAddress', hqAddress);
  partyForm.append('logoUrl', logoUrl);
 */
  const options = {
    method: 'POST',
    mode: 'cors',
    //body: JSON.stringify({ name, hqAddress, logourl }),
    headers: {
      //'Content-Type': 'application/json',
      'x-access-token': sessionStorage.getItem('token')
    },
    body: data,
  }

  fetch(`${url}parties`, options)
  .then(resHandler)
  //.then(res => res.json())
  .then(res => {
    console.log(res.data);
    if (res.data) {
    alertTitle.innerText = 'Party successfully created';
    alertTextElement.innerText = ''
    displayalert();
    }
  })
  .catch(err => {
    console.log(err);
  });
});

// get all parties
window.onload = () => {
    //showLoader();
    const options = {
      method: 'GET',
      mode: 'cors',
      headers: {
        //'Content-Type': 'application/json',
        'x-access-token': sessionStorage.getItem('token')
      }
    }

  fetch(`${url}parties`, options)
  .then(resHandler)
  .then((res) => {
    console.log(res.data)
    partyTable.innerHTML = res.data.map((party) => {
      let output = '';
      return output += `<tr class="party-id" key=${party.party_id}>
                        <td id='logo1'>${partylogo(party.logourl)}</td>
                        <td class="party-name">${party.name}</td>
                        <td class="party-location">${party.hqaddress}</td>
                        <td class="edit"><i class="fas fa-pen"></i></td>
                        <td class="delete" key=${party.party_id}><i class="fas fa-trash"></i></td>        
              </tr>`
    })
  })
  .catch(err => {
    alertTitle.innerText = 'An error has occured';
    displayalert();
  });
}

const partylogo = (logoUrl) => {
  if (logoUrl === 'logo123'){
      return 'No logo'
  }
  return `<img src="${url}/images/${logoUrl}"></img>`
}


/* function deleteParty(){
  return confirm('Are you sure you want to delete?')
}
function deleteOffice(){
  return confirm('Are you sure you want to delete?')
} */

