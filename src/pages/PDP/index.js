import React, { useContext, useState } from "react";
import "./pdp.scss";
import { AppContext } from "../../appContext";
import { formatCurrency } from "../../utils";
//pdp page, show a product image , name, brand, category, color, price,size, action
import { useHistory } from "react-router-dom";

export function PDPPage({ productId }) {
  const ctx = React.useContext(AppContext);
  const product = ctx.products.find(({ id }) => id === productId);
  const cartProduct = ctx.user.cart.find(({ id }) => id === productId);

  const [qty, setQty] = React.useState((cartProduct && cartProduct.qty) || 1);

  const [size, setSize] = React.useState(
    (cartProduct && cartProduct.size) || ""
  );
  const [color, setColor] = React.useState(
    (cartProduct && cartProduct.color) || ""
  );

  console.log("cartProduct......>", cartProduct, size, color, qty);
  React.useEffect(() => {
    if (cartProduct) {
      if (qty === 1 && cartProduct.qty !== qty) setQty(cartProduct.qty);
      if (!size && cartProduct.size !== size) setSize(cartProduct.size);
      if (!color && cartProduct.color !== color) setColor(cartProduct.color);
    }
  }, [cartProduct]);

  const { action } = useHistory();
  console.log(action);
  React.useEffect(() => {
    //if the action is pop then only we will make an API call
    if (action === "POP") ctx.loadProducts();
  }, [ctx.loadProducts, action]);
  // the products are displayed only after we call the loadProducts function otherwise it will throw an error

  return (
    <section className="product-details-page page">
      PDP {productId}
      {product && (
        <div className="product-info">
          <div className="product-image">
            <img
              width="100%"
              height="100%"
              src={product.image}
              alt={product.name}
            />
          </div>
          <div className="product-meta">
            <h2>{product.name}</h2>
            <h4>{product.category}</h4>
            {product.salePrice ? (
              <h4>
                Price: <span>{formatCurrency(product.salePrice)}</span>
                <del style={{ color: "red" }}>
                  {formatCurrency(product.price)}
                </del>
              </h4>
            ) : (
              <h4>Price: {formatCurrency(product.price)}</h4>
            )}
            {product.sizes && (
              <div className="product-sizes">
                size:
                <select value={size} onChange={(e) => setSize(e.target.value)}>
                  {product.sizes.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {product.colors && (
              <div className="product-colors">
                Colors:
                <select
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                >
                  {product.colors.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="product-qty">
              Quantity:
              <select
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6, 7].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="product-actions">
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => {
                  const data = {
                    id: product.id,
                    name: product.name,
                    brand: product.brand,
                    category: product.category,
                    qty,
                    price: product.price,
                    salePrice: product.salePrice,
                  };
                  if (product.sizes && !size) {
                    alert("Please select size");
                  } else {
                    data.size = size;
                  }
                  if (product.colors && !color) {
                    alert("Please select color");
                  } else {
                    data.color = color;
                  }
                  ctx.addToCart(data);
                }}
              >
                Add To Cart
              </button>
              <button
                // disabled={ctx.user.cart.inCart ? false : true}
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  ctx.removeFromCart({ id: product.id });
                }}
              >
                Remove From Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
