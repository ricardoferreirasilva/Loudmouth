var OAuth = require('oauth')
var uuid = require('uuid')

// Application configuration
//fk5xTsVubbqN4r4fhXJXV1q  secret
//5a4acd2d-3395-4584-9b0c-8ac1dab7d6fd client id

var credentials = {
  authority: 'https://login.microsoftonline.com/common',
  authorize_endpoint: '/oauth2/v2.0/authorize',
  token_endpoint: '/oauth2/v2.0/token',
  client_id: '5a4acd2d-3395-4584-9b0c-8ac1dab7d6fd',
  client_secret: 'fk5xTsVubbqN4r4fhXJXV1q',
  redirect_uri: 'http://localhost/',
  scope: 'User.Read'
}

/**
 * Generate a fully formed uri to use for authentication based on the supplied resource argument
 * @return {string} a fully formed uri with which authentication can be completed
 */

function getAuthUrl() {
  return credentials.authority + credentials.authorize_endpoint +
    '?client_id=' + credentials.client_id +
    '&response_type=code' +
    '&redirect_uri=' + credentials.redirect_uri +
    '&scope=' + credentials.scope +
    '&response_mode=query' +
    '&nonce=' + uuid.v4() +
    '&state=abcd'
}

/**
 * Gets a token for a given resource.
 * @param {string} code An authorization code returned from a client.
 * @param {AcquireTokenCallback} callback The callback function.
 */
function getTokenFromCode(code, callback) {
  var OAuth2 = OAuth.OAuth2
  var oauth2 = new OAuth2(
    credentials.client_id,
    credentials.client_secret,
    credentials.authority,
    credentials.authorize_endpoint,
    credentials.token_endpoint
  )

  oauth2.getOAuthAccessToken(
    code,
    {
      grant_type: 'authorization_code',
      redirect_uri: credentials.redirect_uri,
      response_mode: 'form_post',
      nonce: uuid.v4(),
      state: 'abcd'
    },
    function (e, accessToken, refreshToken) {
      callback(e, accessToken, refreshToken)
    }
  )
}


/**
 * Gets a new access token via a previously issued refresh token.
 * @param {string} refreshToken A refresh token returned in a token response
 *                       from a previous result of an authentication flow.
 * @param {AcquireTokenCallback} callback The callback function.
 */
function getTokenFromRefreshToken(refreshToken, callback) {
  var OAuth2 = OAuth.OAuth2
  var oauth2 = new OAuth2(
    credentials.client_id,
    credentials.client_secret,
    credentials.authority,
    credentials.authorize_endpoint,
    credentials.token_endpoint
  )

  oauth2.getOAuthAccessToken(
    refreshToken,
    {
      grant_type: 'refresh_token',
      redirect_uri: credentials.redirect_uri,
      response_mode: 'form_post',
      nonce: uuid.v4(),
      state: 'abcd'
    },
    function (e, accessToken) {
      callback(e, accessToken)
    }
  )
}

exports.credentials = credentials
exports.getAuthUrl = getAuthUrl
exports.getTokenFromCode = getTokenFromCode
exports.getTokenFromRefreshToken = getTokenFromRefreshToken
exports.ACCESS_TOKEN_CACHE_KEY = 'ACCESS_TOKEN_CACHE_KEY'
exports.REFRESH_TOKEN_CACHE_KEY = 'REFRESH_TOKEN_CACHE_KEY'
