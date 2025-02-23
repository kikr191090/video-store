import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { MovieProvider } from "./context/MovieContext";
import Store from "./pages/Store";
import ManageMovies from "./pages/ManageMovies";

export default function App() {
  return (
    <MovieProvider>
      <BrowserRouter>
        {/* Menú de navegación */}
        <nav>
          <div className="logo">Video Store</div>
          <div>
            <Link to="/">Tienda</Link>
            <Link to="/manage">Administrar Películas</Link>
          </div>
        </nav>

        {/* Contenido principal */}
        <Routes>
          <Route path="/" element={<Store />} />
          <Route path="/manage" element={<ManageMovies />} />
        </Routes>

        {/* Pie de página */}
        <footer>
          <p>Todos los derechos reservados &copy; {new Date().getFullYear()}</p>
        </footer>
      </BrowserRouter>
    </MovieProvider>
  );
}
