import { createContext, useContext, useEffect, useState } from "react";

const MovieContext = createContext();

export function MovieProvider({ children }) {
  // Películas predefinidas
  const initialMovies = [
    {
      id: 1, // Único
      title: "Stranger Things",
      year: 2016,
      genre: "Sci-Fi",
      director: "The Duffer Brothers",
      description:"Un grupo de amigos se enfrenta a fenómenos sobrenaturales en su pequeño pueblo.",
      trailerUrl: "https://www.youtube.com/watch?v=b9EkMc79ZSU",
      rentPrice: 3.99,
      salePrice: 14.99,
      image:"https://image.tmdb.org/t/p/w1280/uOOtwVbSr4QDjAGIifLDwpb2Pdl.jpg",
    },
    {
      id: 2, // Único
      title: "The Witcher",
      year: 2019,
      genre: "Fantasy",
      director: "Lauren Schmidt Hissrich",
      description:"Geralt de Rivia, un cazador de monstruos, lucha por encontrar su lugar en un mundo donde las personas suelen ser más malvadas que las bestías.",
      trailerUrl: "https://www.youtube.com/watch?v=ETY44yszyNc",
      rentPrice: 4.99,
      salePrice: 19.99,
      image: "https://image.tmdb.org/t/p/w500/zrPpUlehQaBf8YX2NrVrKK8IEpf.jpg",
    },
    {
      id: 3, // Único
      title: "Breaking Bad",
      year: 2008,
      genre: "Drama",
      director: "Vince Gilligan",
      description: "Un profesor de química con cáncer se convierte en fabricante de metanfetaminas para asegurar el futuro de su familia.",
      trailerUrl: "https://www.youtube.com/watch?v=HhesaQXLuRY",
      rentPrice: 2.99,
      salePrice: 9.99,
      image: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    },
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
