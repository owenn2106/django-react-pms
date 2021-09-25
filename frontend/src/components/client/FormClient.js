import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import "../Modal.css";

import APIService from "../../APIService";

function FormClient(props) {
  const [ClientName, setClientName] = useState("");
  const [ClientEmail, setClientEmail] = useState("");
  const [ClientPhone, setClientPhone] = useState("");

  const [token] = useCookies(["loginToken"]);

  useEffect(() => {
    setClientName(props.ClientInstance.name);
    setClientEmail(props.ClientInstance.email);
    setClientPhone(props.ClientInstance.phone);
  }, [props.ClientInstance]);

  const updateClient = () => {
    APIService.UpdateClient(
      props.ClientInstance.id,
      {
        name: ClientName,
        email: ClientEmail,
        phone: ClientPhone,
      },
      token["loginToken"]
    )
      .then((response) => props.updatedClient(response))
      .then(props.setClientInstance(null));
  };

  const createClient = () => {
    APIService.CreateClient(
      {
        name: ClientName,
        email: ClientEmail,
        phone: ClientPhone,
      },
      token["loginToken"]
    )
      .then((response) => props.createdClient(response))
      .then(props.setClientInstance(null));
  };

  return (
    <div className="overlay">
      {props.ClientInstance ? (
        <div className="mb-3 modal-card">
          <button
            onClick={() => props.setClientInstance(null)}
            className="btn btn-primary close-btn"
          >
            x
          </button>
          <div className="modal-header">
            <h4 className="modal-title text-white">Client Form</h4>
          </div>
          <br />
          <label htmlFor="name" className="form-label text-light">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter client's name..."
            value={ClientName}
            onChange={(e) => setClientName(e.target.value)}
          />
          <br />
          <label htmlFor="email" className="form-label text-light">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder="Enter client's email..."
            value={ClientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
          />
          <br />
          <label htmlFor="phone" className="form-label text-light">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            placeholder="Enter client's phone..."
            value={ClientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
          />
          <br />

          {props.ClientInstance.id ? (
            <button onClick={updateClient} className="btn btn-primary">
              Update Client
            </button>
          ) : (
            <button onClick={createClient} className="btn btn-primary">
              Create Client
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default FormClient;
