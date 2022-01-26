import React from "react";
import { AppContext } from "../../appContext";
import { formatCurrency } from "../../utils";
//pdp page, show a product image , name, brand, category, color, price,size, action
import { Redirect, useHistory } from "react-router-dom";
import "./cart.scss";
import { Link } from "react-router-dom";
//id, name, category, brand , size, color, price, action
const tableHeader = [
  "  ",
  "name",
  "category",
  "brand",
  "size",
  "color",
  "price",
  "action",
];
export function CartPage() {
  const ctx = React.useContext(AppContext);
  const { cart } = ctx.user;
  if (cart.length === 0) return <Redirect to="/" />;

  const cartTotal = cart.reduce((total, { price, salePrice, qty }) => {
    if (salePrice) {
      const items = salePrice * qty;
      total += items;
    } else {
      const items = price * qty;

      total += items;
    }
    return total;
  }, 0.0);

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th></th>
            {tableHeader.map((h) => (
              <th>{`${h[0].toUpperCase()}${h.slice(1)}`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cart.map((r, i) => (
            <tr>
              <th>{i + 1}</th>
              {tableHeader.map((h) => {
                if (h === "action") {
                  return (
                    <div>
                      <button>Remove From Cart</button>
                      <button>Add To Fav</button>
                    </div>
                  );
                }
                if (h === "price" && r.salePrice)
                  return (
                    <th>
                      <span>{formatCurrency(r.salePrice)}</span>
                      <del style={{ color: "red" }}>
                        {formatCurrency(r.price)}
                      </del>
                    </th>
                  );
                return <th>{r[h] || ""}</th>;
              })}
            </tr>
          ))}
          <tr>
            <th colSpan={7}>CartTotal</th>
            <th colSpan={1}>{formatCurrency(cartTotal)}</th>
            <th>
              <Link to="/delivery" style={{ background: "gray" }}>
                Check Out
              </Link>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
