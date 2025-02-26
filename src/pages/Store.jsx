import { useState } from "react";
import { useMovies } from "../context/MovieContext";
import MovieList from "../components/MovieList";
import Cart from "../components/Cart";
import Carousel from "../components/Carousel";
import SearchBar from "../components/SearchBar";

export default function Store() {
  const { movies, cart, addToCart, removeFromCart } = useMovies();
  const [selectedType, setSelectedType] = useState("rent");
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar películas según el término de búsqueda
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Selecciona las primeras 5 películas como destacadas
  const featuredMovies = filteredMovies.slice(0, 5);

  return (
    <div>
      {/* Carrusel de ofertas */}
      <Carousel />

      {/* Buscador */}
      <SearchBar onSearch={setSearchTerm} />

      {/* Sección de películas destacadas */}
      <div className="featured-section">
        <h2>Películas Destacadas</h2>
        <MovieList
          movies={featuredMovies}
          onAction={addToCart}
          actionType={selectedType}
        />
      </div>

      {/* Todas las películas */}
      <div className="content">
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: "20px" }}>
            <button
              onClick={() => setSelectedType("rent")}
              style={{
                marginRight: "10px",
                backgroundColor: selectedType === "rent" ? "#e50914" : "#333",
              }}
            >
              Alquilar
            </button>
            <button
              onClick={() => setSelectedType("buy")}
              style={{
                backgroundColor: selectedType === "buy" ? "#e50914" : "#333",
              }}
            >
              Comprar
            </button>
          </div>
          <MovieList
            movies={filteredMovies}
            onAction={addToCart}
            actionType={selectedType}
          />
        </div>
        <Cart />
      </div>
    </div>
  );
}
