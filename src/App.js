import "./App.css"
import React from "react"
import Movies from "./Movies"
import MovieState from "./Context/movieState"

const App = () => {
    return (
        <MovieState>
            <Movies />
        </MovieState>
    )
}

export default App
