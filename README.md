## Node.js OAuth example

This is an example node application that implements ZOOM OAuth2 API.

In order to run the application:

1. Register your new application on ZOOM, In the "redirect url" field, enter "http://localhost:8080/oauth/redirect". Once you register, you will get a client ID and client secret.
2. Replace the values of the `clientID` and `clientSecret` variables in the [index.js](/index.js) file
3. Install dependencies by executing: `npm install` or `yarn`.
4. Start the server by executing `node index.js`
5. Navigate to http://localhost:8080 on your browser.