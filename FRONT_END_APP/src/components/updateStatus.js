import React, { Component } from 'react';
import TeamLeadService from '../actions/TeamLeadService';
import {Button} from 'react-bootstrap'

class UpdateStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:this.props.id?this.props.id:null,
            projectStatus:this.props.status?this.props.status:'NA'
        }
        //this.changeRoleHandler = this.changeRoleHandler.bind(this);
        this.updateUser = this.updateUser.bind(this);
        console.log(this.state.projectStatus);
    }
    componentDidMount() {
    }
    updateUser = (e) => {
        e.preventDefault();
        TeamLeadService.updateStatus(this.state.id,this.state.projectStatus).then((res)=>{
            alert("Project status changed to "+this.state.projectStatus);
        }
        );
    }
    render() {
        return (
            <div>
                <form style={{display: 'flex', alignItems: 'center', margin: 'auto'}}>
                        <input value={this.state.projectStatus} name="projectStatus" type="text" onChange={(event)=>this.setState({projectStatus: event.target.value})}></input>
                        <Button variant="outline-dark"onClick = {this.updateUser} size="sm">Update</Button>
                </form>
            </div>
                );
    }
}

export default UpdateStatus;