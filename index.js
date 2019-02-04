const express = require('express')

const axios = require('axios')

// You should change this by environmental variables
const clientID = 'sS_zf3PDSzGvK6c7STCvQA'
const clientSecret = 'RbhwvsN0zrRNwbCbgW3AM0hOlShOCrLN'
const grantType = 'authorization_code'
const redirectUri = 'https://823ba4a6.ngrok.io/oauth/redirect' // This is a demo url change this by your real API url

const app = express()
app.use(express.static(__dirname + '/public'))

app.get('/oauth/redirect', (req, res) => {
  let user = '';
  const requestToken = req.query.code
  const auth = "Basic " + new Buffer.from(clientID + ":" + clientSecret).toString("base64");
  axios({
    method: 'post',

    url: `https://zoom.us/oauth/token?grant_type=${grantType}&code=${requestToken}&redirect_uri=${redirectUri}`,
    headers: {
      accept: 'application/json',
      "Authorization" : auth,
    }
  }).then((response) => {
    const accessToken = response.data.access_token
    console.log('ZOOM response', response.data);

    // This is how you query the ZOOM user API
    axios({
      method: 'get',
      url: 'https://zoom.us/v2/users/me',
      headers: {
        accept: 'application/json',
        "Authorization" : `Bearer ${accessToken}`,
      }
    }).then(response => {

      user = `${response.data.first_name}-${response.data.last_name}`
        res.redirect(`/welcome.html?user=${user}`)
    })


  }).catch((error) => {
    console.log(error);
  })
})

app.listen(8080)
