import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

//free-code-camp
import "./footer.scss";
export function Footer() {
  return (
    <footer className="footer">
      <div className="row">
        <div className="col">
          <FontAwesomeIcon icon={["fab", "jedi-order"]} size="10x" />
        </div>
        <div className="col">
          <h3>NEWSLETTER</h3>
          <div>
            <em>
              Subscribe for exclusive offers, special events and a good tall
              fish tale or two.
            </em>
          </div>
        </div>
        <div className="col">
          <h3>LINKS</h3>
          <div className="div">
            <Link to="/shop">Shop</Link>
          </div>
          <div className="div">
            <Link to="/aboutus"> AboutUs</Link>
          </div>
          <div className="div">
            <Link to="/shipping">Shipping Terms</Link>
          </div>
          <div className="div">
            <Link to="/privacy">Privacy</Link>
          </div>
          <div className="div">
            <Link to="/returns">Returns</Link>
          </div>
        </div>
        <div className="col">
          <h3>GET IN TOUCH ContactUS</h3>
          <Link to="/returns">
            <b>info@mollyjogger.com</b>
          </Link>
        </div>
      </div>
      <div className="row payments">
        <div>
          <h3>Accepted Payments</h3>
        </div>
        <div>
          <FontAwesomeIcon
            icon={["fab", "cc-amex"]}
            size="2x"
            style={{ color: "blue" }}
          />
          <FontAwesomeIcon
            icon={["fab", "cc-discover"]}
            size="2x"
            style={{ color: "#d5f545" }}
          />
          <FontAwesomeIcon
            icon={["fab", "cc-visa"]}
            size="2x"
            style={{ color: "blue" }}
          />
          <FontAwesomeIcon
            icon={["fab", "cc-paypal"]}
            size="2x"
            style={{ color: "orange" }}
          />
          <FontAwesomeIcon
            icon={["fab", "cc-mastercard"]}
            size="2x"
            style={{ color: "maroon" }}
          />
          <FontAwesomeIcon
            icon={["fab", "cc-diners-club"]}
            size="2x"
            style={{ color: "#cf0fcf" }}
          />
        </div>
      </div>
    </footer>
  );
}
