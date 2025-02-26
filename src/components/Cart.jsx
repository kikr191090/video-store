import { useMovies } from "../context/MovieContext";

export default function Cart() {
  const { cart, removeFromCart, checkout } = useMovies();

  // Calcular el total sumando todos los items del carrito
  const total = cart.reduce((sum, item) => sum + item.total, 0);

  // Redondear el total a dos decimales
  const roundedTotal = Math.round(total * 100) / 100;

  return (
    <div className="cart">
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={`${item.id}-${item.type}`} className="cart-item">
              <h4>{item.title}</h4>
              <p>Tipo: {item.type === "rent" ? "Alquiler" : "Venta"}</p>
              {item.type === "rent" && <p>Días: {item.days}</p>}
              <p>Total: ${item.total.toFixed(2)}</p>
              <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
            </div>
          ))}
          <h3>Total: ${roundedTotal.toFixed(2)}</h3>
          <button onClick={checkout} className="checkout-button">
            Finalizar Compra
          </button>
        </>
      )}
    </div>
  );
}
