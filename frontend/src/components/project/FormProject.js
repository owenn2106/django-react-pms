import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import "../Modal.css";

import APIService from "../../APIService";

function FormProject(props) {
  const [ProjectName, setProjectName] = useState("");
  const [ProjectDeadline, setProjectDeadline] = useState("");
  const [ProjectDescription, setProjectDescription] = useState("");
  const [ProjectStatus, setProjectStatus] = useState("");
  const [ProjectClient, setProjectClient] = useState("");

  const [clients, setClients] = useState([]);

  const [token, setToken] = useCookies(["loginToken"]);

  useEffect(() => {
    setProjectName(props.ProjectInstance.name);
    setProjectDeadline(props.ProjectInstance.deadline);
    setProjectDescription(props.ProjectInstance.description);
    setProjectStatus(props.ProjectInstance.status);
    setProjectClient(props.ProjectInstance.client);
  }, [props.ProjectInstance]);

  // FETCH THE CLIENTS HERE TO BE RENDERED FOR THE DROPDOWN MENU IN THE FORM
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

  const updateProject = () => {
    APIService.UpdateProject(
      props.ProjectInstance.id,
      {
        name: ProjectName,
        deadline: ProjectDeadline,
        description: ProjectDescription,
        status: ProjectStatus,
        client: ProjectClient,
      },
      token["loginToken"]
    ).then((response) => props.updatedProjects(response));
  };

  const createProject = () => {
    APIService.CreateProject(
      {
        name: ProjectName,
        deadline: ProjectDeadline,
        description: ProjectDescription,
        status: ProjectStatus,
        client: ProjectClient,
      },
      token["loginToken"]
    ).then((response) => props.createdProject(response));
  };

  return (
    <div className="overlay">
      {props.ProjectInstance ? (
        <div className="mb-3 text-light modal-card">
          <button
            onClick={() => props.setProjectInstance(null)}
            className="btn btn-primary close-btn"
          >
            x
          </button>
          <label htmlFor="name" className="form-label">
            Project Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter project's name..."
            value={ProjectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <br />
          <label htmlFor="deadline" className="form-label">
            Project Deadline
          </label>
          <input
            type="date"
            className="form-control"
            id="deadline"
            placeholder="Enter project's deadline..."
            value={ProjectDeadline}
            onChange={(e) => setProjectDeadline(e.target.value)}
          />
          <br />
          <label htmlFor="description" className="form-label">
            Project Description
          </label>
          <textarea
            className="form-control"
            rows="4"
            id="description"
            placeholder="Enter project's name..."
            value={ProjectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
          <br />
          <label htmlFor="status" className="form-label">
            Project Status
          </label>
          <select
            onChange={(e) => setProjectStatus(e.target.value)}
            className="form-select"
            name="status"
            id="status"
          >
            <option value="none" selected disabled hidden>
              Select a Status...
            </option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <br />

          <select
            onChange={(e) => setProjectClient(e.target.value)}
            className="form-select"
            name="client"
            id="client"
          >
            <option value="none" selected disabled hidden>
              Select a Client...
            </option>
            {clients.map((client) => {
              return <option value={client.name}>{client.name}</option>;
            })}
          </select>
          <br />

          {props.ProjectInstance.id ? (
            <button onClick={updateProject} className="btn btn-primary">
              Update Project
            </button>
          ) : (
            <button onClick={createProject} className="btn btn-primary">
              Create Project
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default FormProject;
