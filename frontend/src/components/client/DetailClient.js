import React from "react";
import styled from "styled-components";
import dateFormat from "dateformat";

const StyledClientProject = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.5);

  .client-project-card {
    background-color: rgb(20, 26, 31);
    width: 1000px;
    padding: 2em 5em;
    position: relative;
  }
`;

const DetailClient = (props) => {
  return (
    <StyledClientProject>
      <div className="client-project-card">
        <div className="client-detail text-white">
          <div className="client-detail-header d-flex align-items-center justify-content-between">
            <h1>Client Details</h1>
            <button
              onClick={() => {
                props.setClientProjects(null);
              }}
              className="btn btn-primary"
            >
              x
            </button>
          </div>
          <hr />
          <h2>{props.ActiveClient.name}</h2>
          <h5>{props.ActiveClient.email}</h5>
          <h5>{props.ActiveClient.phone}</h5>
        </div>
        <br />
        <br />
        <div className="client-projects text-white">
          <h1>Projects</h1>
          <hr />
          <table className="table text-white">
            <thead>
              <tr>
                <th>Name</th>
                <th>Deadline</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {props.ClientProjects.map((project) => {
                return (
                  <tr key={project.id}>
                    <td>{project.name}</td>
                    <td>{dateFormat(project.deadline, "mmmm dS, yyyy")}</td>
                    <td>{project.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </StyledClientProject>
  );
};

export default DetailClient;
