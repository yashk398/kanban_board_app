import '../App.css'
import React from 'react' 
import { Component } from 'react'
import { Col, Container, Jumbotron, Row, Button } from'react-bootstrap'
import TasksForUser from './tasks-for-user';
import { Link, Route, Switch } from 'react-router-dom';
import ViewProjectUser from './viewProjectAsUser';
import ListProjects from './ListProjects';
import AddProject from './addProject';

export default class UserDash  extends Component{
        constructor(props){
                super(props);
                this.state = {
                        user: this.props.user, 
                        projectIdSelected: {id: 105}
                }
        }



        render(){
                return(
                        <div style={{height:"100vh", width:'80%', margin: 'auto'}}>
                                <Row style={{width:'100%', height: '100%', margin: 'auto'}}>
                                        <Col style={{display: 'flex', alignItems:'center', height: '100%', width: '100%'}}>
                                        <Jumbotron style={{width: '100%'}}>
                                                                <h1>Welcome, {this.state.user.userName}! Have a nice day.</h1>
                                                                <hr></hr>
                                                                <Button href="#projects">Get Started</Button>
                                        </Jumbotron>
                                        </Col>
                                </Row>
                                {/* <Row style={{width:'100%', height: '100%', margin: 'auto'}}>
                                        <Col  id="projects" style={{display: 'flex', alignItems:'center', justifyContent:'center', height: '100%', width: '100%'}}>
                                                <ViewProjectUser  style={{margin :'auto'}} user={this.state.user}></ViewProjectUser>
                                        </Col>
                                </Row> */}
                                <Row style={{width:'100%', height: '100%', margin: 'auto'}}>
                                        <Col  id="projects" style={{display: 'flex', alignItems:'center', justifyContent:'center', height: '100%', width: '100%'}}>
                                                <ListProjects id={this.state.user.userId}></ListProjects>
                                        </Col>
                                </Row>

                                <Row style={{width:'100%', height: '100%', margin: 'auto'}}>
                                        <Col  id="add-project" style={{display: 'flex', alignItems:'center', justifyContent:'center', height: '100%', width: '100%'}}>
                                                <AddProject user={this.state.user}></AddProject>
                                        </Col>
                                </Row>
                        </div>
                );
        }
}