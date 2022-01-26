import React from "react";
import { Accordion } from "../../../components/Accordion";
// import "./delivery.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppContext } from "../../../appContext";
import { useHistory } from "react-router-dom";
function AddressForm({ onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-field">
        <label htmlFor="name">Name:</label>
        <input id="name" type="text" />
      </div>
      <div className="form-field">
        <label htmlFor="addr">Address Ln 1:</label>
        <input id="addr" type="text" />
      </div>
      <div className="form-field">
        <label htmlFor="addr2">Address ln 2:</label>
        <input id="addr2" type="text" />
      </div>
      <div className="form-field">
        <label htmlFor="city">City:</label>
        <input id="city" type="text" />
      </div>
      <div className="form-field">
        <label htmlFor="Pin">Pin:</label>
        <input id="pin" type="text" maxLength="6" />
      </div>
      <div className="form-field">
        <label htmlFor="save">Save:</label>
        <input id="save" type="submit" />
      </div>
    </form>
  );
}

function mapAddressToAccordionCell(cell) {
  if (cell) {
    return {
      key: cell.name,
      label: cell.name,
      body: (
        <div>
          <h3>{cell.name}</h3>
          <p>
            {[cell.addr, cell.addr2, cell.city].join(", ")} - {cell.pin}
          </p>
        </div>
      ),
    };
  }
}
export function DeliveryPage() {
  const ctx = React.useContext(AppContext);
  const [openIndices, setOpenIndices] = React.useState([]);
  const { push } = useHistory();
  const addresses = ctx.user.addresses ? ctx.user.addresses : [];
  console.log("checkOutDATA.....>", ctx.checkOutData);
  const onChange = React.useCallback(
    (itemIndex) => {
      setOpenIndices((ps) => (ps.includes(itemIndex) ? [] : [itemIndex]));
    },
    [addresses]
  );
  const onSubmit = React.useCallback((e) => {
    e.preventDefault();
    const formData = {};

    for (let field of e.target.elements) {
      if (field.type !== "submit") formData[field.id] = field.value;
    }

    async function save() {
      await ctx.onCreateAddress(formData);
      setOpenIndices([]);
    }
    save();
  }, []);
  React.useEffect(() => {
    if (openIndices.length) {
      ctx.onSelectAddress(addresses[openIndices[0]]);
    }
  }, [ctx.onSelectAddress, openIndices]);

  const disabled = !openIndices.length;
  return (
    <div className="delivery-Page page">
      Delivery
      <Accordion
        openIndices={openIndices}
        iconClass="fas"
        onChange={onChange}
        rows={[
          ...addresses.map(mapAddressToAccordionCell),
          {
            id: "addNewAddress",

            label: "Add new Address",
            body: <AddressForm onSubmit={onSubmit} />,
          },
        ]}
      />
      <button
        disabled={disabled}
        style={{ cursor: disabled ? "not-allowed" : "pointer" }}
        type="button"
        onClick={() => {
          console.log("It should go to payments page");
          push("/payments");
        }}
      >
        Pay Now
      </button>
    </div>
  );
}
