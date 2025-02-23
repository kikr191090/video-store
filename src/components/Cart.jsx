/* eslint-disable react/prop-types */
export default function Cart({ items, onRemove }) {
  return (
    <div className="cart">
      <h2>Carrito de Compras</h2>
      {items.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          {items.map((item, index) => (
            <div key={index} className="cart-item">
              <h4>{item.title}</h4>
              <p>Tipo: {item.type === "rent" ? "Alquiler" : "Venta"}</p>
              {item.type === "rent" && <p>Días: {item.days}</p>}
              <p>Total: ${item.total}</p>
              <button onClick={() => onRemove(index)}>Eliminar</button>
            </div>
          ))}
          <h3>Total: ${items.reduce((sum, item) => sum + item.total, 0)}</h3>
        </>
      )}
    </div>
  );
}
