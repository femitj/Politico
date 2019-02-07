//const url = 'https://politico-app.herokuapp.com/api/v1/';
const url = 'http://localhost:8080/api/v1/';

function resHandler(res) {
  return res.json().then(data => {
    if (res.ok) {
      return data;
    } else {
      let error = Object.assign({}, res, {
        error: data
      });
      return Promise.reject(error);
    }
  });
}

function requestOptions(req, body, token) {
  const options = {
    method: req,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    }
  }
}