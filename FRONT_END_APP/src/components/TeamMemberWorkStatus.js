import { useState } from 'react';
import React from 'react'
import { ProgressBar } from 'react-bootstrap'

const axios = require('axios').default;

class TeamMemberWorkStatus extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      teamMembers: null,
      input: 5
    };
  }


  componentDidMount() {
    axios.put('http://localhost:8080/api/kanban_board/viewWorkStatus/'+this.state.id).then((response) => {
      this.setState({ teamMembers: response.data.teamMemberEntity })
      console.log(response.data, "Hi");
    });
  }

  render() {
     
    return (
      <div>
        <div style={{backgroundColor: '#252525',  padding: '1em'}} >
          <h2>My Work Status</h2>
          <button class="btn btn-primary btn-sm" onClick={()=>this.componentDidMount()}>🔄</button>
          <p>your work status dependends on your tasks</p>
          <ProgressBar  style={{height: '1em'}} now={this.state.teamMembers?this.state.teamMembers.workStatus:null}/>
          <div>{this.state.teamMembers?this.state.teamMembers.workStatus:null}%</div>
        </div>

      </div>
    );
  }
}

export default TeamMemberWorkStatus