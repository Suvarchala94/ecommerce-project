import React, { useContext, useState } from "react";
import "./home.scss";
import { formatCurrency } from "../../utils";
import { AppContext } from "../../appContext";
import ProductsList from "../../components/ProductsList";
export function HomePage() {
  const ctx = React.useContext(AppContext);

  React.useEffect(() => {
    ctx.loadProducts();
  }, [ctx.loadProducts]);
  
  
  
  return (
    <section className="home-page page">
      <div className="banner div">
        <div className="img img-800x400"></div>
      </div>
      <ProductsList products={ctx.products} />
      {/* <div className="products">
        {ctx.products.map((p) => (
          <div className="product">
            <div className="product-img">
              <img src={p.img} alt="" style={{ width: 200, height: 200 }} />
            </div>
            <div className="product-name">{p.name}</div>
            <div
              className="product-price"
              style={{ color: "red" }}
            >{` Price : ${formatCurrency(p.price)}`}</div>
          </div>
        ))}
      </div> */}
    </section>
  );
}
