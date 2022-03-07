import {
    FETCH_MOVIES,
    FETCH_MOVIES_SUCCESS,
    FETCH_MOVIES_FAILURE,
    LIKE_MOVIE,
    UNLIKE_MOVIE,
    DISLIKE_MOVIE,
    UNDISLIKE_MOVIE,
    DELETE_MOVIE,
    FETCH_CATEGORIES
} from "./actionType"

export default (state, action) => {
    let newState
    switch (action.type) {
        case FETCH_MOVIES:
            return {
                ...state,
                loading: true
            }
        case FETCH_MOVIES_SUCCESS:
            return {
                ...state,
                loading: false,
                movies: action.payload
            }
        case FETCH_MOVIES_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            }
        case LIKE_MOVIE:
            newState = state.movies.map(obj => {
                if (obj.id === action.payload) {
                    obj.likes += 1
                    obj.liked = true
                }
                return obj
            })
            return {
                ...state,
                movies: newState
            }
        case UNLIKE_MOVIE:
            newState = state.movies.map(obj => {
                if (obj.id === action.payload) {
                    obj.likes -= 1
                    obj.liked = false
                }
                return obj
            })
            return {
                ...state,
                movies: newState
            }
        case DISLIKE_MOVIE:
            newState = state.movies.map(obj => {
                if (obj.id === action.payload) {
                    obj.dislikes += 1
                    obj.disliked = true
                }
                return obj
            })
            return {
                ...state,
                movies: newState
            }
        case UNDISLIKE_MOVIE:
            newState = state.movies.map(obj => {
                if (obj.id === action.payload) {
                    obj.dislikes -= 1
                    obj.disliked = false
                }
                return obj
            })
            return {
                ...state,
                movies: newState
            }
        case DELETE_MOVIE:
            return {
                ...state,
                movies: action.payload
            }
        case FETCH_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
    }
}
