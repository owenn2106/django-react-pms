import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import "./Client.css";

import FormClient from "./FormClient";
import APIService from "../../APIService";
import DetailClient from "./DetailClient";

const Client = () => {
  const [clients, setClients] = useState([]);
  const [token, setToken] = useCookies(["loginToken"]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/client", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["loginToken"]}`,
      },
    })
      .then((response) => response.json())
      .then((response) => setClients(response))
      .catch((error) => console.log(error));
  }, [token]);

  const [ClientInstance, setClientInstance] = useState(null);

  const [ActiveClient, setActiveClient] = useState(null);
  const [ClientProjects, setClientProjects] = useState(null);

  const detailBtn = (client) => {
    setActiveClient(client);
    fetch(`http://127.0.0.1:8000/api/project?client=${client.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["loginToken"]}`,
      },
    })
      .then((response) => response.json())
      .then((response) => setClientProjects(response));
  };

  const editClientBtn = (client) => {
    setClientInstance(client);
  };

  const updatedClient = (client) => {
    const new_client = clients.map((myclient) => {
      if (myclient.id === client.id) {
        return client;
      } else {
        return myclient;
      }
    });

    setClients(new_client);
  };

  const clientNewForm = () => {
    setClientInstance({
      name: "",
      email: "",
      phone: "",
    });
  };

  const createdClient = (client) => {
    const new_client = [...clients, client];
    setClients(new_client);
  };

  const deleteClientBtn = (client) => {
    APIService.DeleteClient(client.id, token["loginToken"])
      .then(() => {
        const new_client = clients.filter((myclient) => {
          if (myclient.id === client.id) {
            return false;
          } else {
            return true;
          }
        });
        setClients(new_client);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container" style={{ padding: "5em 0" }}>
      <div className="d-flex align-items-center justify-content-between">
        <div className="project-header">
          <h1 style={{ color: "burlywood" }}>Your Clients</h1>
        </div>
        <div className="project-header">
          <button className="btn btn-primary btn-sm" onClick={clientNewForm}>
            &#43; Add a new client
          </button>
        </div>
      </div>
      <hr className="bg-light" />
      <div className="card-wrapper d-flex flex-wrap flex-column flex-sm-row">
        {clients.map((client) => {
          return (
            <div key={client.id} className="card col-md-4 m-2 flex-grow-1 ">
              <h3 className="card-header bg-dark border-dark text-white pt-3">
                {client.name}
              </h3>
              <div className="card-body bg-dark text-white">
                <p>Email: {client.email}</p>
                <p>Phone: {client.phone}</p>

                <div className="clients-btn-wrapper">
                  <button
                    onClick={() => detailBtn(client)}
                    className="btn btn-primary btn-sm"
                  >
                    Detail
                  </button>
                  <button
                    onClick={() => editClientBtn(client)}
                    className="btn btn-primary btn-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteClientBtn(client)}
                    className="btn btn-delete btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {ClientInstance ? (
        <FormClient
          ClientInstance={ClientInstance}
          setClientInstance={setClientInstance}
          updatedClient={updatedClient}
          createdClient={createdClient}
        />
      ) : null}

      {ClientProjects ? (
        <DetailClient
          ActiveClient={ActiveClient}
          ClientProjects={ClientProjects}
          setClientProjects={setClientProjects}
        />
      ) : null}
    </div>
  );
};

export default Client;
