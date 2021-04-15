import '../App.css'
import React from 'react' 
import { Component } from 'react'
import { Card, Container, Row, Col, Button, Jumbotron       } from'react-bootstrap'
import Tasks from './tasks';
import { Switch, Route, Link } from 'react-router-dom';
import TeamMembers from './TeamMembers';
import TeamMemberWorkStatus from './TeamMemberWorkStatus';
import TeamLeaders from './TeamLeadView';

export default class TeamMemberDash  extends Component{
        constructor(props){
                super(props);
                this.state = {
                        user: this.props.user,
                        tasks : null
                }
                }
 

        render(){
                return(
                        <div style={{height:'80%', margin: 'auto', width: '100%', padding:'5em'}} className="team-member-dash">
                                        <Row style={{color:'#cecece', height: '10%', margin: 0, textAlign: "left", width: "100%", alignItems: 'center'}}>
                                                <Col md={10}><h3>Welcome, {this.state.user!==null?this.state.user.teamMemberName:null}</h3></Col>
                                                <Col style={{textAlign: "right"}} md={2}><h5>Employee ID : {this.state.user!==null?this.state.user.employeeId:null}</h5></Col>
                                        </Row>
                                        <br></br>
                                        <Row style={{color:'#cecece', height: '5em', width: "100%", margin: 'auto', backgroundColor: "#1580cf"}}>
                                                <Col><h5>Your current tasks</h5></Col>
                                        </Row>
                                        <br></br>
                                        <Tasks user={this.state.user}></Tasks>
                                        <Row style={{width:'100%'}}>
                                                <Col >
                                                        <Card style={{textAlign:'left'}}>
                                                                <Card.Body>
                                                                        <Card.Title><strong> Current Project : {this.state.user!==null?this.state.user.projectEntity.projectName:null}</strong></Card.Title>
                                                                        <h5>Project Description : {this.state.user!==null?this.state.user.projectEntity.projectDescription:null}</h5>
                                                                        <h5>Project Manager : {this.state.user!==null?this.state.user.projectEntity.userEntity.userName:null}</h5>
                                                                        <h5 >Start Date : {this.state.user!==null?this.state.user.projectEntity.startDate:null} </h5>
                                                                        <h5 >End Date : {this.state.user!==null?this.state.user.projectEntity.endDate:null} </h5>
                                                                        <Card.Link href={'mailto:'+this.state.user.projectEntity.userEntity.emailId+'?subject= assistance request from '+this.state.user.employeeId}>Need Help?</Card.Link>
                                                                </Card.Body>
                                                        </Card>
                                                        <br></br>
                                                        <Row style={{color:'#cecece', height: '5em', width: "100%", margin: 'auto'}}>
                                                                <Col>   
                                                                                <TeamMemberWorkStatus id={this.state.user.teamMemberId}></TeamMemberWorkStatus>
                                                                </Col>
                                                        </Row>
                                                        <br></br><br></br><br></br><br></br>
                                                </Col>
                                                <Col>
                                                        <Jumbotron>
                                                        <TeamMembers className="body-props" projectId={this.state.user.projectEntity.projectId}></TeamMembers>
                                                        <br></br>
                                                        <TeamLeaders className="body-props" projectId={this.state.user.projectEntity.projectId}></TeamLeaders>
                                                        </Jumbotron>
                                                </Col>
                                        </Row>
                                
                        </div>
                );
        }
}