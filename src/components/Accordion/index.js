import React from "react";
import "./accordion.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export function Accordion({ iconClass = "fas", rows, onChange, openIndices }) {
  // rows= [{label,iconOpen, iconClose, body: ReactElement}]

  return (
    <div className="accordion">
      {rows.map((row, index) => {
        const isOpen = openIndices.includes(index);
        const icon = isOpen
          ? row.iconOpen || "chevron-up"
          : row.iconClose || "chevron-down";
        return (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header" onClick={() => onChange(index)}>
              <span>{row.label}</span>
              <span>
                <FontAwesomeIcon icon={[iconClass, icon]} />
              </span>
            </h2>
            <div
              id="collapseOne"
              //   className={`accordion-collapse ${isOpen ? "show" : ""}`}
              style={{ display: isOpen ? "block" : "none" }}
            >
              <div className="accordion-body">{row.body}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
