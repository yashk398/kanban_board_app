import '../App.css'
import React from 'react' 
import { Component } from 'react'
import { Container, Row, Col } from'react-bootstrap'
import ViewProjectDetails from './view-project-details';
import TasksForLead from './tasks-for-user';
import GetAllTeamMembers from './getAllTeamMembers';

export default class TeamLeadDash  extends Component{
        constructor(props){
                super(props);
                this.state = {
                        user: this.props.user
                }

                console.log(this.state.user.projectEntity);

        }
        render(){
                return(
                        <div style={{height:"100vh", width:'80%', margin: 'auto'}}>
                                <Row style={{width:'100%', height: '100%', margin: 'auto'}}>
                                        <Col style={{display: 'flex', alignItems:'center', height: '100%', width: '100%'}}>
                                                <ViewProjectDetails id={this.state.user.teamLeaderId}/>
                                        </Col>
                                </Row>
                                <Row style={{width:'100%', height: '100%', margin: 'auto'}}>
                                        <Col id="manage-tasks" style={{display: 'flex', alignItems:'center', height: '100%', width: '100%',}}>
                                                {/* add other services.... */}
                                                <TasksForLead project={this.state.user.projectEntity}></TasksForLead>
                                        </Col>
                                </Row>
                                <Row style={{width:'100%', height: '100%', margin: 'auto'}}>
                                        <Col id="manage-tasks" style={{display: 'flex', alignItems:'center', height: '100%', width: '100%',}}>
                                                {/* add other services.... */}
                                                <GetAllTeamMembers id={this.state.user.projectEntity.projectId}></GetAllTeamMembers>
                                        </Col>
                                </Row>
                        </div>
                );
        }
}