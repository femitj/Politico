window.onload = () => {
  //showLoader();
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-auth': sessionStorage.getItem('token')
    }
  }

  fetch(`${url}user/incidents`, options)
    .then(handleResponse)
    .then(res => {
      listOfAllIncidents = res.data;
      filteredList = listOfAllIncidents.reverse();
      updateView(filteredList);
      loader.style.display = 'none';
    })
    .catch(err => {
      notificationTitle.innerText = 'An errorhas occured';
      notificationTextElement.innerText = err.error.error;
      displayNotification();
    });
}



// get all parties
document.getElementById('party-tab').addEventListener('click', () => {

  fetchFunc.getData(`${url}/parties`)
  .then((res) => {
      if(!res.data.length){
          partyTable.innerHTML = `<h1>No Parties</h1>`
      } else {
          partyTable.innerHTML = res.data.map((party) => {
          return `<tr class="party-item" key=${party.id}>
                  <td  contenteditable="true" class="editPartyName">${party.name}</td>
                  <td>${party.hqaddress}</td>
                  <td class="party-logo">${partylogo(party.logourl)}</td>
                  <td class="edit-party"><i class="fas fa-pen"></i></td>
                  <td class="delete-party" key=${party.id}><i class="fas fa-trash"></i></td>
                  </tr>
              `
      }).join(' ')
      }
  })
  .then(() => {
      setTimeout(() => {
          addDeleteFunction()
          addEditFunction()
      }, 500)
  })
  .catch(err => err);
})

const partylogo = (logoUrl) => {
  if (logoUrl === 'logo123'){
      return 'No logo'
  }
  return `<img src="${url}/images/${logoUrl}"></img>`
}









function afterSuccessDelete(res) {
  sessionStorage.removeItem('incident')
  sessionStorage.removeItem('type');
  deletePromptDiv.style.display = 'none';
  notificationTitle.innerText = 'The report has been successfully deleted.';
  notificationTextElement.innerText = `The ${res.data.type} report with ID: ${res.data.id} has been deleted.`;
  displayNotification();
  setTimeout(() => {
    notificationBox.style.display = 'none';
    deletePromptDiv.style.display = 'none';
  }, 2000);
}

function deleteIncident(id, type) {
  showLoader();
  const options = {
    method: 'DELETE',
    body: JSON.stringify({ type, id }),
    headers: {
      'Content-Type': 'application/json',
      'x-auth': sessionStorage.getItem('token')
    }
  }

  fetch(`${apiVersion}incident/delete`, options)
    .then(handleResponse)
    .then(res => afterSuccessfulDelete(res))
    .catch(err => {
      notificationTitle.innerText = 'An error has occured.';
      notificationTextElement.innerText = err.error.error;
      deletePromptDiv.style.display = 'none';
      displayNotification();
    })
}

deleteReportBtn.addEventListener('click', () => {
  const id = sessionStorage.getItem('incident');
  const type = sessionStorage.getItem('type');
  deleteIncident(id, type);
});
