import React, { useState, useEffect } from "react";
import dateFormat from "dateformat";
import { useCookies } from "react-cookie";

import "./Project.css";

import FormProject from "./FormProject";
import DetailProject from "./DetailProject";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [token] = useCookies(["loginToken"]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/project", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["loginToken"]}`,
      },
    })
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }, [token]);

  const [ProjectInstance, setProjectInstance] = useState(null);

  const editProjectBtn = (project) => {
    setProjectInstance(project);
  };

  const updatedProjects = (project) => {
    const new_project = projects.map((myproject) => {
      if (myproject.id === project.id) {
        return project;
      } else {
        return myproject;
      }
    });
    setProjects(new_project);
  };

  const projectNewForm = () => {
    setProjectInstance({
      name: "",
      deadline: "",
      description: "",
      status: "",
      client: "",
    });
  };

  const createdProject = (project) => {
    const new_project = [...projects, project];
    setProjects(new_project);
  };

  const [ActiveProject, setActiveProject] = useState();
  const [ProjectTodos, setProjectTodos] = useState();

  const viewProjectDetail = (project) => {
    setActiveProject(project);
    fetch(`http://127.0.0.1:8000/api/todos?project=${project.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["loginToken"]}`,
      },
    })
      .then((response) => response.json())
      .then((response) => setProjectTodos(response));
  };

  return (
    <div style={{ marginTop: "5em" }}>
      <div className="d-flex align-items-center justify-content-between">
        <div className="project-header">
          <h1 style={{ color: "burlywood" }}>Your Exising Projects</h1>
        </div>
        <div className="project-header-btn d-flex">
          <div className="input-group">
            <select className="custom-select" id="inputGroupSelect01">
              <option selected>Filter...</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <button
            className="btn btn-primary btn-sm project-add-btn"
            onClick={projectNewForm}
          >
            &#43; Add a new project
          </button>
        </div>
      </div>

      <hr className="bg-light" />
      <div className="proj-wrapper text-white">
        {projects.map((project) => {
          return (
            <div key={project.id} className="">
              <h3>{project.name}</h3>
              <p>Deadline: {dateFormat(project.deadline, "mmmm dS, yyyy")}</p>
              <p>Description: {project.description}</p>
              <p>Status: {project.status}</p>
              <div className="project-btn-wrapper">
                <button
                  onClick={() => viewProjectDetail(project)}
                  className="btn btn-primary btn-sm"
                >
                  View
                </button>
                <button
                  onClick={() => editProjectBtn(project)}
                  className="btn btn-primary btn-sm mx-3"
                >
                  Update
                </button>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
      {ProjectInstance ? (
        <FormProject
          ProjectInstance={ProjectInstance}
          setProjectInstance={setProjectInstance}
          updatedProjects={updatedProjects}
          createdProject={createdProject}
        />
      ) : null}

      {ActiveProject ? (
        <DetailProject
          ActiveProject={ActiveProject}
          setActiveProject={setActiveProject}
          ProjectTodos={ProjectTodos}
        />
      ) : null}
    </div>
  );
};

export default Project;
