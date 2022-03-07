import React, { useEffect, useState, useContext } from "react"

import MovieContext from "./Context/movieContext"

import MovieCard from "./MovieCard"

import Select from "react-select"
import ArrowCircleRightIcon from "@heroicons/react/outline/ArrowCircleRightIcon"
import ArrowCircleLeftIcon from "@heroicons/react/outline/ArrowCircleLeftIcon"
import ArrowCircleDownIcon from "@heroicons/react/outline/ArrowCircleDownIcon"
import ViewGridIcon from "@heroicons/react/outline/ViewGridIcon"

const options = [
    { value: 4, label: "4" },
    { value: 8, label: "8" },
    { value: 12, label: "12" }
]

const Movies = () => {
    const movieContext = useContext(MovieContext)
    const {
        movies,
        categories,
        fetchMovies,
        loading,
        fetchCategories
    } = movieContext

    const [isLoading, setIsLoading] = useState(loading)

    const [numSelected, setNumSelected] = useState(12)
    const [moviesInSelected, setMoviesInSelected] = useState([])
    const [movieToDisplay, setMovieToDisplay] = useState(movies)
    const [categoryToDisplay, setCategoryToDisplay] = useState([])

    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)

    const [categoryOptions, setCategoryOptions] = useState([])

    useEffect(() => {
        fetchMovies()
    }, [])

    useEffect(() => {
        setIsLoading(loading)
    }, [loading])

    useEffect(() => {
        fetchCategories()
    }, [movies])

    useEffect(() => {
        setMoviesInSelected(
            movies.filter(
                e =>
                    categoryToDisplay.includes(e.category) ||
                    categoryToDisplay.length === 0
            )
        )
    }, [categoryToDisplay, movies])

    useEffect(() => {
        if (moviesInSelected.length > 0) {
            setMaxPage(Math.ceil(moviesInSelected.length / numSelected))
            if (maxPage < page) {
                setPage(maxPage)
            }
        }
    }, [moviesInSelected, numSelected])

    useEffect(() => {
        setMovieToDisplay(
            moviesInSelected.slice((page - 1) * numSelected, page * numSelected)
        )
    }, [page, categoryToDisplay, numSelected, moviesInSelected])

    useEffect(() => {
        if (movieToDisplay.length === 0 && page > 1) {
            setPage(page - 1)
        }
    }, [movieToDisplay])

    useEffect(() => {
        let cOptions = []
        categories.map(element => {
            cOptions.push({ value: element, label: element })
        })
        setCategoryOptions(cOptions)
    }, [categories])

    const filterFilm = categoriesChoosen => {
        let cChoosen = []
        categoriesChoosen.map(e => {
            cChoosen.push(e.value)
        })
        setCategoryToDisplay(cChoosen)
    }

    return isLoading ? (
        <div>
            <svg class="animate-bounce w-6 h-6 m-auto my-20">
                <ArrowCircleDownIcon />
            </svg>
        </div>
    ) : (
        <div>
            <div class="flex">
                <div class="w-1/8 p-5">
                    <Select
                        defaultValue={{ value: 12, label: 12 }}
                        options={options}
                        onChange={({ value }) => setNumSelected(value)}
                    ></Select>
                </div>
                <div class="flex flex-wrap">
                    {maxPage > 1 ? (
                        <>
                            {page > 1 ? (
                                <ArrowCircleLeftIcon
                                    class="w-7 stroke-stone-600 mx-5"
                                    onClick={() => setPage(page - 1)}
                                />
                            ) : (
                                <ViewGridIcon class="w-7 stroke-stone-600 mx-5" />
                            )}
                            {page < maxPage && (
                                <ArrowCircleRightIcon
                                    class="w-7 stroke-stone-600 mx-5"
                                    onClick={() => setPage(page + 1)}
                                />
                            )}
                        </>
                    ) : null}
                </div>
            </div>
            <div class="p-5">
                <Select
                    defaultValue={[]}
                    isMulti
                    options={categoryOptions}
                    onChange={value => {
                        filterFilm(value)
                    }}
                ></Select>
            </div>
            <div class="grid gap-8 mb-8 md:grid-cols-2 xl:grid-cols-4">
                {movieToDisplay.map(movie => {
                    return <MovieCard movie={movie} key={movie.id} />
                })}
            </div>
        </div>
    )
}

export default Movies
