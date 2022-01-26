import React from "react";
import "./product.scss";
import { AppContext } from "../../appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils";
// import { useParams } from "react-router-dom";
export default function ProductsList({ products }) {
  const ctx = React.useContext(AppContext);
  // const params = useParams();

  const [fav, setFav] = React.useState(false);
  const changeColor = () => {
    setFav(!fav);
  };

  console.log(ctx.user);
  
  
  
  return (
    <div className="products-list">
      {products.map(
        ({ id, name, image, price, detailsPage, brand, category }) => (
          <div className="product-card" key={id}>
            <div className="product-img">
              <Link to={detailsPage}>
                <img
                  className="img"
                  src={image}
                  alt=""
                  style={{ width: 200, height: 200 }}
                />
              </Link>

              {fav ? (
                <button
                  className="button-fav"
                  type="button"
                  onClick={() => {
                    changeColor();

                    ctx.addToFavourites({
                      id,
                      name,
                      image,
                      price,
                      favourites: true,
                    });
                  }}
                >
                  <FontAwesomeIcon
                    icon={["fas", "heart"]}
                    size="2x"
                    style={{ color: "red" }}
                  />
                </button>
              ) : (
                <button
                  className="button-fav"
                  type="button"
                  onClick={() => {
                    changeColor();
                    ctx.removeFromFavourites({ id, favourites: false });
                  }}
                >
                  <FontAwesomeIcon
                    icon={["far", "heart"]}
                    size="2x"
                    style={{ color: "red" }}
                  />
                </button>
              )}
              {/* <button
              className="button-fav"
              type="button"
              onClick={() => {
                ctx.addToFavourites({ id, name, img, price });
                changeColor();
              }}
            >
              {fav ? (
                <FontAwesomeIcon
                  icon={["far", "heart"]}
                  size="2x"
                  style={{ color: "red" }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={["fas", "heart"]}
                  size="2x"
                  style={{ color: "red" }}
                />
              )}
            </button> */}
            </div>
            <div className="product-name">{name}</div>
            <div
              className="product-price"
              style={{ color: "red" }}
            >{` Price : ${formatCurrency(price)}`}</div>
            <div className="product-action">
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => {
                  ctx.addToCart({
                    id,
                    name,
                    qty: 1,
                    price,
                    inCart: true,
                    brand,
                    category,
                  });
                }}
              >
                Add To Cart
              </button>
              <button
                disabled={ctx.user.cart.inCart ? false : true}
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  ctx.removeFromCart({ id });
                }}
              >
                Remove From Cart
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}
