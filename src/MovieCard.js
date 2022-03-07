import React, { useContext } from "react"
import Ratio from "./Ratio"
import ThumbUpIcon from "@heroicons/react/outline/ThumbUpIcon"
import ThumbDownIcon from "@heroicons/react/outline/ThumbDownIcon"
import XIcon from "@heroicons/react/outline/XIcon"

import ThumbUpSolidIcon from "@heroicons/react/solid/ThumbUpIcon"
import ThumbDownSolidIcon from "@heroicons/react/solid/ThumbDownIcon"

import MovieContext from "./Context/movieContext"

const MovieCard = ({ movie }) => {
    const movieContext = useContext(MovieContext)
    const {
        movies,
        likeMovie,
        unlikeMovie,
        dislikeMovie,
        undislikeMovie,
        deleteMovie
    } = movieContext

    const ratio = (movie.likes / (movie.likes + movie.dislikes)) * 100

    const deleteItem = id => {
        const filteredMovies = movies.filter(element => element.id !== id)
        deleteMovie(filteredMovies)
    }

    return (
        <div
            key={movie.id}
            class="content-center justify-center flex-1 rounded drop-shadow-lg"
        >
            <div>
                <XIcon
                    class="w-5 stroke-stone-400"
                    onClick={() => {
                        deleteItem(movie.id)
                    }}
                />
                <img
                    class="object-cover min-h-full rounded"
                    src={`/images/${movie.id}.jpeg`}
                    alt={movie.id}
                />
            </div>
            <div class="flex flex-wrap mt-4 w-full justify-end">
                {movie.disliked === true ? (
                    <ThumbDownSolidIcon
                        class="w-5 stroke-stone-400 mx-5"
                        onClick={() => {
                            undislikeMovie(movie.id)
                        }}
                    />
                ) : (
                    <ThumbDownIcon
                        class="w-5 stroke-stone-400 mx-5"
                        onClick={() => {
                            !movie.liked && dislikeMovie(movie.id)
                        }}
                    />
                )}
                {movie.liked === true ? (
                    <ThumbUpSolidIcon
                        class="w-5 stroke-stone-400 mx-5"
                        onClick={() => {
                            unlikeMovie(movie.id)
                        }}
                    />
                ) : (
                    <ThumbUpIcon
                        class="w-5 stroke-stone-400 mx-5"
                        onClick={() => {
                            !movie.disliked && likeMovie(movie.id)
                        }}
                    />
                )}
            </div>
            <div class="p-2">
                <div>
                    <p class="text-3xl font-bold text-stone-800">
                        {movie.title}
                    </p>
                    <p class="font-mono text-xs float-right text-stone-400">
                        {movie.category}
                    </p>
                </div>
                <Ratio ratio={ratio} />
            </div>
        </div>
    )
}

export default MovieCard
