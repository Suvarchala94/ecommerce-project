import React from "react";
import "./form.scss";
export function AccountPage() {
  return (
    <div>
      <form className="form">
        <label for="UserName">UserName</label>
        <input type="text" placeholder="UserName" />
        <label for="Password">Password</label>
        <input type="text" placeholder="Password" />
        <label for="Email ID">E-mail Id</label>
        <input type="text" placeholder="E-mail Id" />
        <label for="City">City</label>
        <input type="text" placeholder="City" />
        <label for="City">Country</label>
        <input type="text" placeholder="Country" />
      </form>
    </div>
  );
}
