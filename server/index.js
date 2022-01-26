/* eslint-disable no-var */
/* eslint-disable linebreak-style */

const express = require("express");
var bodyParser = require("body-parser");
const path = require("path");

const { readDB, writeDB } = require("./utils");
// const cors = require("cors");
// parse application/x-www-form-urlencoded
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// app.use(cors());

                      
app.get("/products", async (req, res) => {
  try {
    const { products } = await readDB();
    return res.send(products);
  } catch {
    return res.send({ message: "Something went wrong" });
  }
});


app.get("/currentUser/:userId", async (req, res) => {
  try {

    const {
      carts = {},
      favourites = {},
      orders = {},
      profiles = {},
      addresses = {},
    } = await readDB();
    const { userId } = req.params;
    return res.send({
      cart: carts[userId] || [],
      profile: profiles[userId] || [],
      favourite: favourites[userId] || [],
      orders: orders[userId] || [],
      addresses: addresses[userId] || [],
    });
  } catch {
    return res.send({ message: "Something went wrong" });
  }
});


app.post("/users/:userId/cart", async (req, res) => {
  const product = req.body;
  const { userId } = req.params;
  try {
    const oldData = await readDB();
    const { carts = {} } = oldData;
    if (Array.isArray(carts[userId])) {
      let existingItem = false;
      const userCart = carts[userId].map((item) => {
        if (item.id === product.id) {
          item.qty += product.qty;
          existingItem = true;
        }
        return item;
      });
      carts[userId] = existingItem
        ? [...userCart]
        : [...carts[userId], product];
    } else {
      carts[userId] = [product];
    }
    await writeDB({ ...oldData, carts });
    return res.send(carts[userId]);
  } catch {
    return res.send({ message: "Something went wrong" });
  }
});


app.post("/users/:userId/address", async (req, res) => {
  const address = req.body;
  const { userId } = req.params;
  try {
    const oldData = await readDB();
    const { addresses = {} } = oldData;
    // if (Array.isArray(carts[userId])) {
    //   let existingItem = false;
    //   const userAddresses = addresses[userId].map((item) => {
    //     if (item.id === address.id) {
    //       item.qty += address.qty;
    //       existingItem = true;
    //     }
    //     return item;
    //   });
    //   addresses[userId] = existingItem
    //     ? [...userAddresses]
    //     : [...addresses[userId], address];
    // } else {
    //   addresses[userId] = [address];
    // }
    addresses[userId] = addresses[userId]
      ? [...addresses[userId], address]
      : [address];
    await writeDB({ ...oldData, addresses });
    return res.send(addresses[userId]);
  } catch {
    return res.send({ message: "Something went wrong" });
  }
});


app.delete("/users/:userId/cart/:itemId", async (req, res) => {
  // const product = req.body;
  const { userId, itemId } = req.params;
  try {
    const oldData = await readDB();
    const { carts = {} } = oldData;

    const updateCart = carts[userId].filter((item) => item.id !== itemId);

    carts[userId] = updateCart;
    await writeDB({ ...oldData, carts });
    console.log(carts[userId]);
    return res.send(carts[userId]);
  } catch (e) {
    console.log(e);
    return res.send({ message: "Something went wrong" });
  }
});


app.post("/users/:userId/favourites", async (req, res) => {
  const product = req.body;
  const { userId } = req.params;
  try {
    const oldData = await readDB();
    const { favourites = {} } = oldData;
    if (Array.isArray(favourites[userId])) {
      let existingItem = false;
      const userFav = favourites[userId].map((item) => {
        if (item.id === product.id) {
          item.qty += product.qty;
          existingItem = true;
        }
        return item;
      });
      favourites[userId] = existingItem
        ? [...userFav]
        : [...favourites[userId], product];
    } else {
      favourites[userId] = [product];
    }
    await writeDB({ ...oldData, favourites });
    return res.send(favourites[userId]);
  } catch (e) {
    return res.send({ message: "Something went wrong" });
  }
});



app.delete("/users/:userId/favourites/:itemId", async (req, res) => {
  // const product = req.body;
  const { userId, itemId } = req.params;
  try {
    const oldData = await readDB();
    const { favourites = {} } = oldData;

    const updateFav = favourites[userId].filter((item) => item.id !== itemId);
    favourites[userId] = updateFav;

    await writeDB({ ...oldData, favourites });
    return res.send(favourites[userId]);
  } catch {
    return res.send({ message: "Something went wrong" });
  }
});


app.get("/search", async (req, res) => {
  const { query } = req.query;
  try {
    const db = await readDB();
    const products = db.products.filter(
      (p) => p.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
    return res.send(products);
  } catch {
    return res.send({ message: "Something went wrong" });
  }
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(3001, () => {
  console.log("server is running at 3001");
});
