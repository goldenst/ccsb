import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
//import uuid from "uuid";
import axios from "axios";

class EditJob extends Component {
  state = {
    order: "",
    vehicle: '',
    jobdesc: "",
    parts: "",
    tech: "",
    status: "",
    promised: "",
    priorty: "",
    errors: {}
  };

  async componentDidMount(){
      const { id } = this.props.match.params;
      const res = await axios.get(`/api/jobs/${id}`)

      const job = res.data;

      this.setState({
        order: job.order,
        vehicle: job.vehicle,
        jobdesc: job.jobdesc,
        parts: job.parts,
        tech: job.tech,
        status: job.status,
        promised: job.promised,
        priorty: job.priorty
      })
  }

  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    const {
      order,
      vehicle,
      jobdesc,
      parts,
      tech,
      status,
      promised,
      priorty
    } = this.state;

    // chec errors
    if (order === "") {
      this.setState({ errors: { order: "Ro is Required" } });
      return;
    }

    if (jobdesc === "") {
      this.setState({ errors: { jobesc: "Work requested is Required" } });
      return;
    }

    const updJob = {
      order,
      vehicle,
      jobdesc,
      parts,
      tech,
      status,
      promised,
      priorty
    }

    const { id } = this.props.match.params;

    const res = await axios.put(`/api/jobs/${id}`, updJob)

    dispatch({ type: 'UPDATE_JOB', payload: res.data})

    // clear state
    this.setState({
      order: "",
      vehicle: '',
      jobdesc: "",
      parts: "",
      tech: "",
      status: "",
      promised: "",
      priorty: "",
      errors: {}
    });

    this.props.history.push("/");
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const {
      order,
      vehicle,
      jobdesc,
      parts,
      tech,
      status,
      promised,
      priorty,
      errors
    } = this.state;

    

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className='container form '>
            <div className="card mb-3 addform">
              <div className="card-header">EditJob</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Order #"
                    name="order"
                    placeholder="Enter Ro#"
                    value={order}
                    onChange={this.onChange}
                    error={errors.order}
                    required
                  />
                  <TextInputGroup
                    label="Vehicle"
                    name="vehicle"
                    placeholder="Enter vehicle description"
                    value={vehicle}
                    onChange={this.onChange}
                    error={errors.vehicle}
                    required
                  />
                  <TextInputGroup
                    label="Job Desc"
                    name="jobdesc"
                    placeholder="Enter Job description"
                    value={jobdesc}
                    onChange={this.onChange}
                    error={errors.jobdesc}
                    required
                  />
                  <TextInputGroup
                    label="Parts"
                    name="parts"
                    placeholder="Enter Parts Status"
                    value={parts}
                    onChange={this.onChange}
                  />
                  <TextInputGroup
                    label="tech"
                    name="tech"
                    placeholder="Enter Tech"
                    value={tech}
                    onChange={this.onChange}
                  />
                  <TextInputGroup
                    label="Status"
                    name="status"
                    placeholder="Enter Job Status"
                    value={status}
                    onChange={this.onChange}
                  />
                  <TextInputGroup
                    label="Promised"
                    name="promised"
                    placeholder="Enter Promised By"
                    value={promised}
                    onChange={this.onChange}
                  />
                  <TextInputGroup
                    label="Priorty"
                    name="priorty"
                    placeholder="Enter Priorty"
                    value={priorty}
                    onChange={this.onChange}
                  />

                  <input
                    type="submit"
                    value="Update Job"
                    className="btn btn-blue btn-block"
                  />
                </form>
              </div>
            </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default EditJob;
