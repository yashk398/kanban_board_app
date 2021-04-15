import React, { Component } from 'react';
import TeamLeadService from '../actions/TeamLeadService';
import {Card} from 'react-bootstrap';
import UpdateStatus from './updateStatus';

class ViewProjectDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            teamLeadEntity: {}
        }

    }

    async componentDidMount(){
        console.log(this.state.id);
        TeamLeadService.getProjectByTeamLeadId(this.state.id).then(res =>{
            this.setState({teamLeadEntity:res.data});
            console.log(this.state.teamLeadEntity);

        }

        )

       /* AssessmentService.getAssessmentById(this.state.id).then( res => {
            this.setState({assessment: res.data});
        })*/
    }

    render() {
        return (
               <Card  style={{textAlign: 'left', width: '100%', borderRadius: '1.5em'}}>
                    <h3 className = "text-center mt-4">View Project Details</h3>
                    <Card.Body>
                        <table style={{justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                        <tr>
                            <td>Project Id: </td>
                            <td>{this.state.teamLeadEntity.projectEntity!==undefined?this.state.teamLeadEntity.projectEntity.projectId:null}</td>
                        </tr>
                        <tr>
                            <td>Project Name: </td>
                            <td>{this.state.teamLeadEntity.projectEntity!==undefined?this.state.teamLeadEntity.projectEntity.projectName:null}</td>
                        </tr>
                        <tr>
                            <td>Project Description: </td>
                            <td>{this.state.teamLeadEntity.projectEntity!==undefined?this.state.teamLeadEntity.projectEntity.projectDescription:null}</td>
                        </tr>
                        <tr>
                            <td>Project Status: </td>
                            <td>{this.state.teamLeadEntity.projectEntity!==undefined?<UpdateStatus id={this.state.teamLeadEntity.projectEntity.projectId} status={this.state.teamLeadEntity.projectEntity.projectStatus}/>:null}</td>
                        </tr>
                        <tr>
                            <td>Project Start Date: </td>
                            <td>{this.state.teamLeadEntity.projectEntity!==undefined?this.state.teamLeadEntity.projectEntity.startDate:null}</td>
                        </tr>
                        <tr>
                            <td>Project End Date: </td>
                            <td>{this.state.teamLeadEntity.projectEntity!==undefined?this.state.teamLeadEntity.projectEntity.endDate:null}</td>
                        </tr>
                        <tr>
                            <td>Project password: </td>
                            <td>{this.state.teamLeadEntity.projectEntity!==undefined?this.state.teamLeadEntity.projectEntity.projectPassword:null}</td>
                        </tr>
                        </table>
                    </Card.Body>
               </Card>
        );
    }
}



export default ViewProjectDetails;