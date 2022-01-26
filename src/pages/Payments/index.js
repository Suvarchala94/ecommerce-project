import React from "react";
import { useHistory } from "react-router-dom";
export function PaymentsPage() {
  const { push } = useHistory();
  const onSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      const formData = {};

      for (let field of e.target.elements) {
        if (field.type !== "submit") formData[field.id] = field.value;
      }

      async function save() {
        push("/confirmation");

        console.log("form data------>", formData);
        //   await ctx.onCreateAddress(formData);
        //   setOpenIndices([]);
      }
      save();
    },
    [push]
  );
  return (
    <section className="payments-page page">
      <h3>Payments</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Card Holder Name</label>
          <input id="card-holder" type="text" />
        </div>
        <div>
          <label htmlFor="card-number">Card Number</label>
          <input id="card-number" type="number" />
        </div>
        <div>
          <label htmlFor="cvv">CVV</label>
          <input id="cvv" type="text" maxLength="3" />
        </div>
        <div>
          <label htmlFor="expiry">Expiry</label>
          <input type="date" id="expiy" />
        </div>
        <div>
          <input type="submit" value="pay" />
        </div>
      </form>
    </section>
  );
}
