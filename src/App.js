import React, { useState } from "react";
import { Route } from "react-router-dom";
import data from "./data";

// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

// Context
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";

function App() {
  const [products] = useState(data);
  const [cart, setCart] = useState([]);

  const addItem = item => {
    const newItem = { ...item, id: Date.now() };
    setCart([...cart, newItem]);
  };

  const removeItem = id => {
    setCart(
      cart.filter(item => {
        return item.id !== id;
      })
    );
  };

  console.log(cart);

  return (
    <div className="App">
      <CartContext.Provider value={{ cart, removeItem }}>
        <Navigation />

        {/* Routes */}
        <ProductContext.Provider value={{ products, addItem }}>
          <Route exact path="/" component={Products} />
        </ProductContext.Provider>

        <Route path="/cart" component={ShoppingCart} />
      </CartContext.Provider>
    </div>
  );
}

export default App;
