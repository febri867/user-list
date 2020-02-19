import { fetchGet } from '../../utils/fetchers'

export const GET_DATA_USER = 'GET_DATA_USER'
export const getUsers = (data) => (dispatch, getState) => {
    const { isGettingData, hasMore, page } = getState().app
    console.log(isGettingData, hasMore)
    if (isGettingData || hasMore) return

    dispatch({
        type: GET_DATA_USER,
    })

    const query_param = `?results=10&page=` + page
    fetchGet(query_param)
        .then(response => {
            dispatch(receivedDataUsers(response))
        })
}

export const RECEIVED_DATA_USERS = 'RECEIVED_DATA_USERS'
export const receivedDataUsers = response => dispatch => {

    if(response) {
        dispatch({
            type: RECEIVED_DATA_USERS,
            payload: response
        })
    }

}

export const SORT_DATA = 'SORT_DATA'
export const CHANGE_CATEGORY = 'CHANGE_CATEGORY'
export const changeCategory = response => (dispatch, getState) => {

    let { results } = getState().app

    dispatch({
        type: CHANGE_CATEGORY,
        payload: response
    })

    switch (response) {
        case 'color':
            let red = [], blue  = [], green = []
            results.forEach( e => {
                if(Number(e.dob.age) < 21){
                    red.push(e)
                } else if(Number(e.dob.age) > 56){
                    blue.push(e)
                } else {
                    green.push(e)
                }
            })
            results = green.concat( blue , red)
            break;
        case 'cities':
            results = results.sort((e,f) => {
                return e.location.city.localeCompare(f.location.city);
            });
            console.log(results)
            break;
        default:
            return results
    }

    dispatch({
        type: SORT_DATA,
        payload: results
    })


}

export default {
    getUsers,
    receivedDataUsers,
    changeCategory
}