import React, { createContext } from "react";
import { CartPage } from "../cart";
import { AppContext } from "../../appContext";

function getFutureDayAfter(afterDays) {
  const today = new Date();
  //some magic
  const futureDay = "afterDays from today";
  return futureDay;
}

export function ConfirmationPage() {
  const ctx = React.useContext(AppContext);
  const { name, addr, addr2, city, pin } = ctx.checkOutData.address;
  const randomDay = [4, 5, 6, 7, 8];
  const dateAfterDay = randomDay[Math.floor(Math.random() * randomDay.length)];
  return (
    <div className="confirmation-page page">
      <h1>Thank You !! Your order has been placed Successfully</h1>
      <h2>
        Your order will be delievered on or before $
        {getFutureDayAfter(dateAfterDay)}
      </h2>
      <div>Order Details : </div>
      <div>
        <CartPage />
      </div>
      <div>
        <h3>Will be Delivered To</h3>
      </div>
      <div>
        {name}, {addr}, {addr2}, {city} - {pin}
      </div>
    </div>
  );
}
