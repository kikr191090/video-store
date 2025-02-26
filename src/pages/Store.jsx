import { useState } from "react";
import { useMovies } from "../context/MovieContext";
import MovieList from "../components/MovieList";
import Cart from "../components/Cart";
import Carousel from "../components/Carousel";

export default function Store() {
  const { movies,cart, addToCart, removeFromCart } = useMovies();
  const [selectedType, setSelectedType] = useState("rent");

  // Selecciona las Primeras 5 peliculas como destacadas
  const featuredMovies = movies.slice(0, 5);



  return (
    <div>
      {/* Carrusel de ofertas */}
      <Carousel />

      {/* Seccion de peliculas destacadas */}
      <div className="featured-section">
        <h2>Peliculas Destacadas</h2>
        <MovieList
          movies={featuredMovies}
          onAction={addToCart}
          actionType={selectedType}
        />
      </div>

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
            movies={movies}
            onAction={addToCart}
            actionType={selectedType}
          />
        </div>
        <Cart  />
      </div>
    </div>
  );
}
