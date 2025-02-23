import { useState } from "react";
import { useMovies } from "../context/MovieContext";
import MovieList from "../components/MovieList";
import Cart from "../components/Cart";
import Carousel from "../components/Carousel";

export default function Store() {
  const { cart, addToCart, removeFromCart } = useMovies();
  const [selectedType, setSelectedType] = useState("rent");

  return (
    <div>
      {/* Carrusel de ofertas */}
      <Carousel />

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
          <MovieList onAction={addToCart} actionType={selectedType} />
        </div>
        <Cart items={cart} onRemove={removeFromCart} />
      </div>
    </div>
  );
}
