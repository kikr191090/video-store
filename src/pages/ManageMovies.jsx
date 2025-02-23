import { useState } from "react";
import { useMovies } from "../context/MovieContext";
import MovieForm from "../components/MovieForm";

export default function ManageMovies() {
  const { movies, addMovie, editMovie, deleteMovie } = useMovies();
  const [editingMovie, setEditingMovie] = useState(null);

  return (
    <div>
      <h1>Administrar Películas</h1>
      <MovieForm
        onSubmit={editingMovie ? editMovie : addMovie}
        initialMovie={editingMovie}
        clearForm={() => setEditingMovie(null)}
      />

      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            {" "}
            {/* key única */}
            <h3>{movie.title}</h3>
            <button onClick={() => setEditingMovie(movie)}>Editar</button>
            <button onClick={() => deleteMovie(movie.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}
