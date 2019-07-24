import React, { Component } from "react";
import Job from "./Job";
import { Consumer } from "../../context";

class Jobs extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { jobs } = value;
          return (
            <table>
              <div>
                <thead>
                  <tr>
                    <th style={{ width: "5%" }}>RO #</th>
                    <th style={{ width: "5%" }}>Vehicle</th>
                    <th style={{ width: "10%" }}>Work Requested</th>
                    <th style={{ width: "5%" }}>Parts Status</th>
                    <th style={{ width: "5%" }}>Tech Assigned</th>
                    <th style={{ width: "5%" }}>job Status</th>
                    <th style={{ width: "10%" }}>Promissed By</th>
                  </tr>
                </thead>
                {jobs.map(job => (
                  <Job key={job._id} job={job} />
                ))}
              </div>
            </table>
          );
        }}
      </Consumer>
    );
  }
}

export default Jobs;
