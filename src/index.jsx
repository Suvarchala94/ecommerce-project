/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable arrow-body-style */
/* eslint-disable lines-between-class-members */
/* eslint-disable object-curly-newline */
import React from "react";
import ReactDOM from "react-dom";
import "./main.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { AppRoutes } from "./routes";
import { AppContext } from "./appContext";
import { getData, postData, deleteData, uuidv4 } from "./utils";
library.add(fab, fas, far);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      searchProducts: [],
      user: { cart: [], favourites: [], addresses: [] },
      checkOutData: {
        address: null,
        payment: null,
      },
    };
  }

  componentDidMount() {
    const userId = localStorage.getItem("userId") || uuidv4();
    localStorage.setItem("userId", userId);
    this.currentUser(userId);
  }
  
  
  findProducts = async (query) => {
    const searchProducts = await getData(`/api/search?query=${query}`);
    this.setState({ searchProducts });
  };
  
  
  loadProducts = async () => {
    const products = await getData("/api/products");
    this.setState({ products });
  };
  getCurrentUserId = () => {
    return localStorage.getItem("userId");
  };
  currentUser = async (id) => {
    const userId = id || this.getCurrentUserId;
    const user = await getData(`/api/currentUser/${userId}`);
    this.setState({ user });
    return localStorage.getItem("userId");
  };

  onCreateAddress = async (address) => {
    const userId = this.getCurrentUserId();
    const resp = await postData(`/api/users/${userId}/address`, address);
    console.log(resp);
    this.setState((ps) => ({
      user: { ...ps.user, addresses: resp },
    }));
    console.log(this.state.user);
  };

  onSelectAddress = (address) => {
    this.setState((ps) => ({ checkOutData: { ...ps.checkOutData, address } }));
  };
  onSelectPayment = (payment) => {
    this.setState((ps) => ({ checkOutData: { ...ps.checkOutData, payment } }));
  };
  addToCart = async (p) => {
    const userId = this.getCurrentUserId();
    console.log("add To cart---->", p);
    console.log("cart---->", p.inCart);
    // we need userId, product-details, id, qty, price by making API call
    //add this logic to productList comp
    const resp = await postData(`/api/users/${userId}/cart`, p);
    this.setState((ps) => ({ user: { ...ps.user, cart: resp } }));
    console.log("resp-->", p, resp);
  };
  removeFromCart = async (p) => {
    console.log("remove From cart---->", p);
    const userId = this.getCurrentUserId();
    const resp = await deleteData(`/api/users/${userId}/cart/${p.id}`, p);
    this.setState((ps) => ({
      user: { ...ps.user, cart: resp },
    }));

    console.log("remove From Cart-->", resp);
  };
  addToFavourites = async (p) => {
    const userId = this.getCurrentUserId();
    console.log("add To favourites---->", p);
    // we need userId, product-details, id, qty, price by making API call
    //add this logic to productList comp
    const resp = await postData(`/api/users/${userId}/favourites`, p);
    console.log("resp-->", p, resp);
  };
  removeFromFavourites = async (p) => {
    console.log("remove From fav---->", p);
    const userId = this.getCurrentUserId();
    const resp = await deleteData(`/api/users/${userId}/favourites/${p.id}`, p);
    console.log("resp-->", p, resp);
  };

  render() {
    const { products, searchProducts, user, checkOutData } = this.state;
    return (
      <AppContext.Provider
        value={{
          products,
          searchProducts,
          user,
          checkOutData,
          addToCart: this.addToCart,
          removeFromCart: this.removeFromCart,
          addToFavourites: this.addToFavourites,
          removeFromFavourites: this.removeFromFavourites,
          currentUser: this.currentUser,
          getCurrentUserId: this.getCurrentUserId,
          findProducts: this.findProducts,
          loadProducts: this.loadProducts,
          onCreateAddress: this.onCreateAddress,
          onSelectAddress: this.onSelectAddress,
          onSelectPayment: this.onSelectPayment,
        }}
      >
        <AppRoutes />
      </AppContext.Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
