import React from "react";
import { Link, Redirect, RouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppContext } from "../../appContext";
import "./header.scss";
import { useRouteMatch } from "react-router";

function getCartCount(cart) {
  const cartReduce = cart.reduce((a, c) => a + c.qty, 0);
  return cartReduce;
}

export function Header() {
  const [query, setQuery] = React.useState("");
  const ctx = React.useContext(AppContext);

  const { path } = useRouteMatch();

  console.log("match--->", path);
  
  
  
  const onSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      //ToDO : Make an API Call to get the items user is looking
      (async () => {
        await ctx.findProducts(query);
        setQuery("");
      })();
    },
    [query, setQuery, ctx.findProducts]
  );
  
  
  const onChange = React.useCallback((e) => {
    e.preventDefault();
    setQuery(e.target.value);
  });
  console.log(getCartCount(ctx.user.cart));
  if (ctx.searchProducts.length && path !== "/search")
    return <Redirect to="/search" />;
  return (
    <header className="header">
      <div className="search-box">
        <form onSubmit={onSubmit}>
          <span role="none" className="search-icon" onClick={onSubmit}>
            <FontAwesomeIcon className="font" icon={["fas", "search"]} />
          </span>
          <input
            value={query}
            onChange={onChange}
            className="search-box__query"
            type="text"
            placeholder="Search"
          />
        </form>
      </div>
      <div className="items">
        <Link to="/login" className="login">
          Log In
        </Link>
        <Link to="/account" className="account">
          Create Account
        </Link>
        <Link to="/cart" className="cart">
          {`${getCartCount(ctx.user.cart)} Cart`}
        </Link>
      </div>
    </header>
  );
}
