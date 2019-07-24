import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Consumer } from "../../context";
import axios from "axios";

class Jobs extends Component {
  onDeleteClick = async (_id, dispatch) => {
    await axios.delete(`/api/jobs/${_id}`);

    dispatch({ type: "DELETE_JOB", payload: _id });
  };

  render() {
    const {
      _id,
      order,
      jobdesc,
      tech,
      parts,
      vehicle,
      status,
      promised,
      priorty
    } = this.props.job;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <table className='table'>
              <tr>
                <td style={{width: '10%'}}>{order}</td>
                <td style={{width: '10%'}}>{vehicle}</td>
                <td style={{width: '20%'}}>{jobdesc}</td>
                <td style={{width: '10%'}}>{parts}</td>
                <td style={{width: '10%'}}>{tech}</td>
                <td style={{width: '10%'}}>{status}</td>
                <td style={{width: '10%'}}>{promised}</td>
                <td style={{width: '1%'}}>{priorty}</td>
                <td style={{width: '1%', color: 'red'}}><i class="fas fa-heartbeat fa-1x"></i></td>
                <td style={{width: '4%'}}>
                  
                  <i
                    className="fas fa-times"
                    style={{ cursor: "pointer", color: "red", float: "right" }}
                    onClick={this.onDeleteClick.bind(this, _id, dispatch)}
                  />
                  <Link to={`job/edit/${_id}`}>
                    <i
                      className="fas fa-edit"
                      style={{
                        cursor: "pointer",
                        float: "right",
                        color: "black",
                        marginRight: "1rem"
                      }}
                    />
                  </Link>
                </td>
              </tr>
            </table>
          );
        }}
      </Consumer>
    );
  }
}

Jobs.propTypes = {
  job: PropTypes.object.isRequired
};

export default Jobs;
