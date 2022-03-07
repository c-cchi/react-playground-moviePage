import React, { useReducer } from "react"
import MovieContext from "./movieContext"
import MovieReducer from "./movieReducer"
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

import { movies$ } from "../moviesAPI"

const MovieState = props => {
    const initialState = {
        movies: [],
        loading: true,
        error: null,
        categories: []
    }

    const [state, dispatch] = useReducer(MovieReducer, initialState)

    const fetchMovies = async () => {
        dispatch({
            type: FETCH_MOVIES
        })
        try {
            let response = await movies$
            dispatch({
                type: FETCH_MOVIES_SUCCESS,
                payload: response
            })
        } catch (err) {
            dispatch({
                type: FETCH_MOVIES_FAILURE,
                payload: err.toString()
            })
        }
    }

    const likeMovie = id => {
        dispatch({
            type: LIKE_MOVIE,
            payload: id
        })
    }

    const unlikeMovie = id => {
        dispatch({
            type: UNLIKE_MOVIE,
            payload: id
        })
    }

    const dislikeMovie = id => {
        dispatch({
            type: DISLIKE_MOVIE,
            payload: id
        })
    }

    const undislikeMovie = id => {
        dispatch({
            type: UNDISLIKE_MOVIE,
            payload: id
        })
    }

    const deleteMovie = movies => {
        dispatch({
            type: DELETE_MOVIE,
            payload: movies
        })
    }

    const fetchCategories = () => {
        let categories = []
        for (let i = 0; i < state.movies.length; i++) {
            if (!categories.includes(state.movies[i].category)) {
                categories.push(state.movies[i].category)
            }
        }
        dispatch({
            type: FETCH_CATEGORIES,
            payload: categories
        })
    }

    return (
        <MovieContext.Provider
            value={{
                movies: state.movies,
                loading: state.loading,
                categories: state.categories,
                fetchMovies,
                likeMovie,
                unlikeMovie,
                dislikeMovie,
                undislikeMovie,
                deleteMovie,
                fetchCategories
            }}
        >
            {props.children}
        </MovieContext.Provider>
    )
}

export default MovieState
