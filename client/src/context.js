import React, { Component } from "react";
import axios from "axios";

const Context = React.createContext();

// actions
const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_JOB":
      return {
        ...state,
        jobs: state.jobs.filter(job => job._id !== action.payload)
      };
    case "ADD_JOB":
      return {
        ...state,
        jobs: [action.payload, ...state.jobs]
      };
    case "UPDATE_JOB":
      return {
        ...state,
        jobs: state.jobs.map(job =>
          job._id === action.payload._id ? (job = action.payload) : job
        )
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    jobs: [],

    dispatch: action => {
      this.setState(state => reducer(state, action));
    }
  };

  async componentDidMount() {
    const res = await axios.get("/api/jobs");

    this.setState({ jobs: res.data });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
