import { useState } from "react";
import { useMovies } from "../context/MovieContext";

export default function MovieList({ onAction, actionType }) {
  const [rentDays, setRentDays] = useState(1);
  const { movies, addToCart } = useMovies();

  const handleAction = (movie, type, days) => {
    addToCart(movie, type, days);
    if (type === "buy") {
      simulatePurchase(movie);
    }
  };

  const simulatePurchase = (movie) => {
    const transactionId = Math.random().toString(36).substr(2, 9);
    const transactionDetails = {
      id: transactionId,
      date: new Date().toLocaleString(),
      movie: movie.title,
      type: "Compra",
      amount: movie.salePrice,
    };

    alert(`¡Compra exitosa!\n
Película: ${movie.title}\n
Total: $${movie.salePrice}\n
ID de transacción: ${transactionId}`);

    console.log("Transacción completada:", transactionDetails);
  };

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <img
            src={
              movie.image || "https://via.placeholder.com/200x300?text=No+Image"
            }
            alt={movie.title}
          />
          <div className="movie-info">
            <h3 className="movie-title">{movie.title}</h3>
            <p className="movie-year">Año: {movie.year}</p>
            <p className="movie-genre">Género: {movie.genre}</p>
            <p className="movie-price">
              {actionType === "rent"
                ? `Alquiler: $${movie.rentPrice}/día`
                : `Venta: $${movie.salePrice}`}
            </p>
            <div className="movie-actions">
              {actionType === "rent" && (
                <select
                  value={rentDays}
                  onChange={(e) => setRentDays(e.target.value)}
                >
                  {[1, 2, 3, 4, 5].map((day) => (
                    <option key={day} value={day}>
                      {day} día(s)
                    </option>
                  ))}
                </select>
              )}
              <button
                onClick={() =>
                  handleAction(movie, actionType, parseInt(rentDays))
                }
              >
                {actionType === "rent" ? "Alquilar" : "Comprar"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
