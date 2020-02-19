import initialState from "./state";
import {
    CHANGE_CATEGORY,
    GET_DATA_USER,
    RECEIVED_DATA_USERS,
    SORT_DATA
} from './actions'

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case CHANGE_CATEGORY: {
            return {...state,
                category: payload
            }
        }

        case GET_DATA_USER: {
            return {...state,
                isGettingData: true
            }
        }

        case SORT_DATA: {
            return {...state,
                results: payload
            }
        }

        case RECEIVED_DATA_USERS:
            const temp = state.results.length <= 100 ? state.results.concat(payload.results) : payload.results
            localStorage.setItem('results', JSON.stringify(temp))
            return {...state,
                isGettingData: false,
                results: temp,
                info: payload.info,
                page: (Math.floor(state.results.length / 10) + 2),
                hasMore: state.page === 10
            };

        default:
            return state
    }
}