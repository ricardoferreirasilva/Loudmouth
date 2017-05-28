import * as types from '../actions/actionTypes'

const initialState = {
    user: {
        organizations: [],
        photo: ''
    },
    loading: false
}


const authReducer = function(state = initialState, action) {

    switch (action.type) {

        case types.SUCCESS_AUTH:
            return Object.assign({}, state, {
                user: action.userData,
                loading:false
            })
        case types.UPDATE_USER_DATA:
            return Object.assign({}, state, {
                user: action.userData,
                loading: false
            })
        case types.LOADING_USER_DATA:
            return Object.assign({}, state, {
                loading: true
            })

    }

    return state

}

export default authReducer
