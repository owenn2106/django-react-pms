import React from "react";
import styled from "styled-components";
import dateFormat from "dateformat";

const StyledProjectDetail = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.5);

  .project-detail-card {
    background-color: rgb(20, 26, 31);
    width: 1000px;
    padding: 2em 5em;
    position: relative;
  }
`;

const DetailProject = (props) => {
  return (
    <StyledProjectDetail>
      <div className="project-detail-card text-white">
        <div className="project-detail">
          <div className="project-detail-header d-flex align-items-center justify-content-between">
            <h1>Project Details</h1>
            <button
              onClick={() => props.setActiveProject(null)}
              className="btn btn-primary"
            >
              x
            </button>
          </div>
          <hr />
          <h2>{props.ActiveProject.name}</h2>
          <h5>{dateFormat(props.ActiveProject.deadline, "mmmm dS, yyyy")}</h5>
          <h5>{props.ActiveProject.description}</h5>
          <h5>
            <strong>{props.ActiveProject.status}</strong>
          </h5>
        </div>
        <br />
        <br />
        <div className="project-todos">
          <h1>Todos</h1>
          <hr />
          <table className="table text-white">
            <thead>
              <tr>
                <th>Task</th>
                <th>Targetted Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {props.ProjectTodos
                ? props.ProjectTodos.map((todos) => {
                    return (
                      <tr key={todos.id}>
                        <td>{todos.task}</td>
                        <td>
                          {dateFormat(todos.target_time, "mmmm dS, yyyy")}
                        </td>
                        <td>{todos.status}</td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </StyledProjectDetail>
  );
};

export default DetailProject;
