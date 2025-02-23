import { createContext, useContext, useEffect, useState } from "react";

const MovieContext = createContext();

export function MovieProvider({ children }) {
  // Películas predefinidas
  const initialMovies = [
    {
      id: 1, // Único
      title: 'Stranger Things',
      year: 2016,
      genre: 'Sci-Fi',
      rentPrice: 3.99,
      salePrice: 14.99,
      image: 'https://image.tmdb.org/t/p/w500/xYZHxQyxkp1e2TKgP3NvImZxqG7.jpg'
    },
    {
      id: 2, // Único
      title: 'The Witcher',
      year: 2019,
      genre: 'Fantasy',
      rentPrice: 4.99,
      salePrice: 19.99,
      image: 'https://image.tmdb.org/t/p/w500/zrPpUlehQaBf8YX2NrVrKK8IEpf.jpg'
    },
    {
      id: 3, // Único
      title: 'Breaking Bad',
      year: 2008,
      genre: 'Drama',
      rentPrice: 2.99,
      salePrice: 9.99,
      image: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg'
    }
  ];

  const [movies, setMovies] = useState([]);
  const [cart, setCart] = useState([]);

  // Cargar datos del localStorage o usar películas predefinidas
  useEffect(() => {
    const savedMovies =
      JSON.parse(localStorage.getItem("movies")) || initialMovies;
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setMovies(savedMovies);
    setCart(savedCart);
  }, []);

  // Guardar en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [movies, cart]);

  const addMovie = (movie) => setMovies([...movies, movie]);

  const editMovie = (id, updatedMovie) =>
    setMovies(movies.map((movie) => (movie.id === id ? updatedMovie : movie)));

  const deleteMovie = (id) =>
    setMovies(movies.filter((movie) => movie.id !== id));

  const addToCart = (movie, type, days = 1) => {
    setCart([
      ...cart,
      {
        ...movie,
        type,
        days,
        total: type === "rent" ? movie.rentPrice * days : movie.salePrice,
      },
    ]);
  };

  const removeFromCart = (index) => setCart(cart.filter((_, i) => i !== index));

  return (
    <MovieContext.Provider
      value={{
        movies,
        cart,
        addMovie,
        editMovie,
        deleteMovie,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export const useMovies = () => useContext(MovieContext);
