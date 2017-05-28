import https from 'https'

import authConfig from './auth.config'
import {
    push
} from 'react-router-redux'
import store from '../store'
import {
    authSuccess,
    loadingUserData
} from '../actions/authActions'
import {
    remote
} from 'electron'
import {toastr} from 'react-redux-toastr'

/**
 * Opens new window for office 365 authentication
 */
function openAuthPage() {
    let authWindow = new remote.BrowserWindow({
      parent: remote.getCurrentWindow(),
        autoHideMenuBar: true,
        frame: false,
        height: 600,
        show: false,
        webPreferences: {
            nodeIntegration: false
        },
        width: 800
    })

    authWindow.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
        let params = parseQueryString(newUrl)
        store.dispatch(loadingUserData())
        authWindow.close()
        if (params.code !== undefined) {
            authConfig.getTokenFromCode(params.code, function(e, accessToken, refreshToken) {
                if (e === null) {
                    // cache the refresh token in a cookie and go back to index
                    localStorage.setItem(authConfig.ACCESS_TOKEN_CACHE_KEY, accessToken)
                    localStorage.setItem(authConfig.REFRESH_TOKEN_CACHE_KEY, refreshToken)
                    loadUserData(accessToken).then(() => {
                        toastr.success('Quaerere', 'Bem vindo!')
                        store.dispatch(push('/homepage'))
                    }).catch(() => {
                        logout()
                    })
                } else {
                    store.dispatch(push('/'))
                    toastr.error('Erro de login', JSON.parse(e.data).error_description)
                }
            })
        }
    })

    authWindow.on('closed', () => {
        authWindow = null
    })
    authWindow.loadURL(authConfig.getAuthUrl())
    authWindow.show()
}

/**
 * Loads all user data from the Microsoft Graph application
 * @param  {string} accessToken token returned from login
 */
function loadUserData(accessToken) {
    return new Promise((resolve, reject) => {
        var basicUserData = getUserData(accessToken)
        var userOrganization = getUserOrganization(accessToken)
        var userPhoto = getUserPhoto(accessToken)
        Promise.all([basicUserData, userOrganization, userPhoto]).then(values => {
            values[0].organizations = values[1].value //assign organization to user
            values[0].photo = values[2] // assign user photo
            store.dispatch(authSuccess(values[0]))
            resolve()
        }).catch(error => {
            reject()
            toastr.error('Erro de login', error)
        })
    })
}
/**
 * Helper funtion to make https requests to the GraphAPI
 * @param  {JSON} options https configuration
 * @param  {function} resolve promise resolve function
 * @param  {function} reject  promise reject function
 */
function httpGraphAPI(options, resolve, reject) {
    https.get(options, function(response) {
        var body = ''
        response.on('data', function(d) {
            body += d
        })
        response.on('end', function() {
            var error
            if (response.statusCode === 200) {
                resolve(JSON.parse(body))
            } else {
                error = new Error()
                error.code = response.statusCode
                error.message = response.statusMessage
                // The error body sometimes includes an empty space
                // before the first character, remove it or it causes an error.
                body = body.trim()
                error.innerError = JSON.parse(body).error
                reject(error)
            }
        })
    }).on('error', function(e) {
        reject(e)
    })
}

/**
 * Loads basic user data from GraphAPI
 * @param  {string} accessToken token returned from login
 */
function getUserData(accessToken) {
    return new Promise((resolve, reject) => {
        var options = {
            host: 'graph.microsoft.com',
            path: '/v1.0/me',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + accessToken
            }
        }
        httpGraphAPI(options, resolve, reject)
    })
}

/**
 * Loads user organizations from GraphAPI
 * @param  {string} accessToken token returned from login
 */
function getUserOrganization(accessToken) {
    return new Promise((resolve, reject) => {
        var options = {
            host: 'graph.microsoft.com',
            path: '/v1.0/organization',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + accessToken
            }
        }
        httpGraphAPI(options, resolve, reject)
    })
}

/**
 * Loads user photo from GraphAPI
 * @param  {string} accessToken token returned from login
 */
function getUserPhoto(accessToken) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest()
        request.open('GET', 'https://graph.microsoft.com/v1.0/me/photo/$value')
        request.setRequestHeader('Authorization', 'Bearer ' + accessToken)
        request.responseType = 'blob'
        request.onload = function() {
            if (request.readyState === 4 && request.status === 200) {
                let reader = new FileReader()
                reader.onload = () => {
                    resolve(reader.result)
                }

                reader.readAsDataURL(request.response)
            } else if (request.status === 404) {
                resolve(require('../resources/images/avatar.png'))
            } else {
                reject('error')
            }
        }

        request.send(null)
    })
}

/**
 * Remove current user tokens
 */
function logout() {
    localStorage.removeItem(authConfig.ACCESS_TOKEN_CACHE_KEY)
    localStorage.removeItem(authConfig.REFRESH_TOKEN_CACHE_KEY)
    store.dispatch(push('/landingPage'))
}

/**
 * Verify if user is already authenticated
 * @return {promise}
 */
function isUserAuthenticated() {
    return new Promise((resolve, reject) => {
        var token = localStorage.getItem(authConfig.ACCESS_TOKEN_CACHE_KEY)
        if (token === null) {
            reject()
        }
        getUserData(token).then((data) => {
            if (data.id != undefined) {
                resolve()
            } else {
                reject()
            }
        }).catch((err) => {
            reject(err)
        })
    })
}

/**
 * Helper function to parse login response
 * @param  {string} url url input
 * @return {json}     parsed url
 */
function parseQueryString(url) {
    let params = {}
    let queryString = ''

    if (url.search('#') !== -1) {
        queryString = url.substring(url.search('#') + 1)
    } else {
        queryString = url.substring(url.indexOf('?') + 1)
    }

    let a = queryString.split('&')
    for (let i = 0; i < a.length; i++) {
        let b = a[i].split('=')
        params[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '')
    }

    return params
}

exports.logout = logout
exports.parseQueryString = parseQueryString
exports.isUserAuthenticated = isUserAuthenticated
exports.loadUserData = loadUserData
exports.openAuthPage = openAuthPage
