import { useState, useEffect } from "react";

export default function MovieForm({ onSubmit, initialMovie, clearForm }) {
  const [movie, setMovie] = useState({
    id: Date.now(),
    title: "",
    year: new Date().getFullYear(),
    genre: "",
    director: "",
    description: "",
    trailerUrl: "",
    rentPrice: 0,
    salePrice: 0,
    image: null,
  });

  useEffect(() => {
    if (initialMovie) setMovie(initialMovie);
  }, [initialMovie]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMovie({ ...movie, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(movie.id, movie);
    clearForm?.();
    setMovie({
      id: Date.now(),
      title: "",
      year: new Date().getFullYear(),
      genre: "",
      director: "",
      description: "",
      trailerUrl: "",
      rentPrice: 0,
      salePrice: 0,
      image: null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="movie-form">
      <div className="form-group">
        <label>Título:</label>
        <input
          type="text"
          value={movie.title}
          onChange={(e) => setMovie({ ...movie, title: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label>Año:</label>
        <input
          type="number"
          value={movie.year}
          onChange={(e) => setMovie({ ...movie, year: e.target.value })}
          min="1900"
          max={new Date().getFullYear()}
          required
        />
      </div>

      <div className="form-group">
        <label>Género:</label>
        <input
          type="text"
          value={movie.genre}
          onChange={(e) => setMovie({ ...movie, genre: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label>Director:</label>
        <input
          type="text"
          value={movie.director}
          onChange={(e) => setMovie({ ...movie, director: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label>Descripción:</label>
        <textarea
          value={movie.description}
          onChange={(e) => setMovie({ ...movie, description: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label>URL del Trailer:</label>
        <input
          type="url"
          value={movie.trailerUrl}
          onChange={(e) => setMovie({ ...movie, trailerUrl: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label>Precio alquiler:</label>
        <input
          type="number"
          value={movie.rentPrice}
          onChange={(e) => setMovie({ ...movie, rentPrice: e.target.value })}
          min="0"
          step="0.01"
          required
        />
      </div>

      <div className="form-group">
        <label>Precio venta:</label>
        <input
          type="number"
          value={movie.salePrice}
          onChange={(e) => setMovie({ ...movie, salePrice: e.target.value })}
          min="0"
          step="0.01"
          required
        />
      </div>

      <div className="form-group">
        <label>Imagen:</label>
        <input type="file" onChange={handleImageChange} accept="image/*" />
        {movie.image && (
          <img src={movie.image} alt="Vista previa" className="image-preview" />
        )}
      </div>

      <button type="submit">
        {initialMovie ? "Actualizar" : "Agregar"} Película
      </button>
    </form>
  );
}
