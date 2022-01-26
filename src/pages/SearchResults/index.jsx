import React from "react";
import "./search.scss";
import { AppContext } from "../../appContext";
import ProductsList from "../../components/ProductsList";
export function SearchResultsPage() {
  const ctx = React.useContext(AppContext);
  console.log(ctx.searchProducts);
  return (
    <section className="page search-results-page">
      <div className="banner div">
        <div className="img img-800x400"></div>
      </div>
      <ProductsList products={ctx.searchProducts} />
    </section>
  );
}
