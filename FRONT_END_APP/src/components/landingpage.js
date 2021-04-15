import '../App.css';
import React from 'react' 
import {Switch, Route, Link, useHistory} from 'react-router-dom'
import {Navbar, Nav, Button, Form, Row, Col, Jumbotron} from 'react-bootstrap'
import { Component } from 'react'
import UserDash from './user-dashboard';
import TeamLeadDash from './team-lead-dashboard';
import TeamMemberDash from './team-member-dashboard';
import Error from './something-went-wrong-page';
import ContactUs from './contact-us-page';
import AboutUs from './about-us-page';
import TeamLeadService from '../actions/TeamLeadService';
import TeamMemberService from '../actions/TeamMemberService';
import UserService from '../actions/UserService';
import ViewProjectUser from './viewProjectAsUser';
import Register from './register';


export default class LandingPage extends Component{

        constructor(props){
                super(props);
                this.state = {
                        user: null,//this.props.user, //Just replace this.props.user with some {id: <random-number>}, it is just the JSON which you'd get when API returns user/team member object.
                        loginID: null,
                        password: null,
                        history: this.props.hist,
                        loginType: 'user'//You may change this to 'team lead' or 'team member' in pre-login development purpose....this will redirect you to the desired dashboard page...[also flip the value of user above, as mentioned in the comments.]
                }
                this.loginIDChanged = this.loginIDChanged.bind(this);
                this.loginTypeChanged = this.loginTypeChanged.bind(this);
                this.passwordChanged = this.passwordChanged.bind(this);
                this.loginSubmit = this.loginSubmit.bind(this);
        }

        loginTypeChanged(event){
                // call this method to fetch password as user types in text box
                let loginTypeFetched = event.target.value;
                this.setState({loginType: loginTypeFetched});
        }

        loginIDChanged(event){
                // call this method to fetch user id as user types in text box
                let loginIDFetched = event.target.value;
                this.setState({loginID: loginIDFetched});
        }

        passwordChanged(event){
                // call this method to fetch password as user types in text box
                let passwordFetched = event.target.value;
                this.setState({password: passwordFetched});
        }

        
        async loginSubmit(e){
                e.preventDefault();
                // check loginType [default 'user']
                //if user : call action with api to userLogin
                //else other cases.....
                let type = this.state.loginType;
                if(type==='user'){
                        //call action javascript class/fn for user login api and store response user entity in this.state.user
                       const  loginCreds = { emailId : this.state.loginID, password: this.state.password}
                        UserService.userLogin(loginCreds).then(res=>{
                                if(res.data.userEntity!==null){
                                         this.setState({user: res.data.userEntity});
                                         console.log(this.state.user);
                                         alert("logged in as "+this.state.loginType);
                                         this.state.history.push("/user-portal");
                                }
                                else{
                                        alert("Something went wrong : Check credentials");
                                }
                         });
                }
                else if(type==='team member'){
                        //call action javascript class/fn for team member login api and store response user entity in this.state.user 
                        TeamMemberService.teamMemberLogin(this.state.loginID, this.state.password).then(res=>{
                                console.log(res.data);
                                if(res.data.teamMemberEntity!==null){
                                         this.setState({user: res.data.teamMemberEntity});
                                         console.log(this.state.user);
                                         alert("logged in as "+this.state.loginType);
                                         this.state.history.push("/team-member-portal");
                                }
                                else{
                                        alert("Something went wrong : Check credentials");
                                }
                         });
                }
                else if(type==='team lead'){
                        TeamLeadService.teamLeadLogin(this.state.loginID, this.state.password).then(res=>{
                               if(res.data.projectEntity!==null){
                                        this.setState({user: res.data});
                                        console.log(this.state.user);
                                        alert("logged in as "+this.state.loginType);console.log(this.state.user);
                                        this.state.history.push("/team-lead-portal");
                               }
                               else{
                                       alert("Something went wrong : Check credentials");
                               }
                        });
                        //call action javascript class/fn for team lead login api and store response user entity in this.state.user
                } 
                // IMPORTANT : Once you fetch from API and check data here, make sure you set this.state.user as the user JSON fetched from the API "Example : this.setState({user: fetchedUserFromActionClass})"
        }
        render(){
                return(
                        <div className="landing-page">
                                <div className="nav-props">
                                <Navbar  variant="dark" id="custom-navbar" expand="lg" fixed="top">
                                        <Navbar.Brand href="/" className="logo-font">Kanban Board</Navbar.Brand>
                                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                        <Navbar.Collapse id="basic-navbar-nav">
                                                <Nav className="ml-auto" activeKey={window.location.pathname} defaultActiveKey="/">
                                                <Nav.Link onClick={()=>this.state.user?this.state.loginType==='user'?this.state.history.push('/user-portal'):this.state.loginType==='team lead'?this.state.history.push('/team-lead-portal'):this.state.loginType==='team member'?this.state.history.push('/team-member-portal'):this.state.history.push('/'):this.state.history.push('/')}>Home</Nav.Link>
                                                {/* OTHER OPTIONS */}
                                                {this.state.user&&this.state.loginType==="user"?<Nav.Link href="#projects">Projects</Nav.Link>:null}
                                                {this.state.user&&this.state.loginType==="user"?<Nav.Link href="#add-project">Add Project</Nav.Link>:null}

                                                {this.state.user&&this.state.loginType==="team lead"?<Nav.Link href="#manage-tasks">Manage Tasks</Nav.Link>:null}
                                                

                                                <Nav.Link href="/contact">Contact Us</Nav.Link>
                                                <Nav.Link href="/about-us">About</Nav.Link>
                                                {this.state.user?<Nav.Link onClick={()=>{
                                                        this.setState({user: null})
                                                        this.state.history.push('/');
                                                        }}>Sign out</Nav.Link>:null}
                                                </Nav>
                                        </Navbar.Collapse>
                                </Navbar>
                                </div>
                                <Switch>
                                        <Route path="/" exact>
                                        <div className="body-props">
                                                {this.state.user===null?
                                                <Row >
                                                        <Col md={5}>
                                                                <Jumbotron>
                                                                        <h3>Please login to continue</h3>
                                                                        <br></br>
                                                                        <Form>
                                                                                {this.state.loginType==='user'?
                                                                                <Form.Group controlId="formBasicEmail">
                                                                                        <Form.Label>{this.state.loginType==='user'?'EMail ID':'Project ID'}</Form.Label>
                                                                                        <Form.Control type="email" placeholder="Enter email id" onChange={this.loginIDChanged}/>
                                                                                        <Form.Text className="text-muted">
                                                                                        We'll never share your email id with anyone else.
                                                                                        </Form.Text>
                                                                                </Form.Group>:
                                                                                <Form.Group controlId="formBasicEmail">
                                                                                        <Form.Label>Employee ID</Form.Label>
                                                                                        <Form.Control type="number" placeholder="Employee ID" onChange={this.loginIDChanged}/>
                                                                                        <Form.Text className="text-muted">
                                                                                        Please enter your numeric employee id.
                                                                                        </Form.Text>
                                                                                </Form.Group>
                                                                                }

                                                                                <Form.Group controlId="formBasicPassword">
                                                                                        <Form.Label>{this.state.loginType==='user'?"Password":"Project Password"}</Form.Label>
                                                                                        <Form.Control type="password" placeholder={this.state.loginType==='user'?"Password":"Project Password"} onChange={this.passwordChanged} />
                                                                                </Form.Group>
                                                                                <Form.Group controlId="ControlSelect">
                                                                                        <Form.Label>Type of user login</Form.Label>
                                                                                        <Form.Control as="select" onChange={this.loginTypeChanged} defaultValue={this.state.loginType}>
                                                                                                <option value="user">User</option>
                                                                                                <option value="team lead">Team Lead</option>
                                                                                                <option value="team member">Team Member</option>
                                                                                        </Form.Control>
                                                                                </Form.Group>
                                                                                <Button variant="primary" type="submit" onClick={this.loginSubmit}>
                                                                                Login
                                                                                </Button>
                                                                                <br></br>
                                                                                <a href="/register">Register as a user?</a>
                                                                        </Form>
                                                                </Jumbotron>
                                                        </Col>
                                                        <Col md={7}>
                                                                <Jumbotron id="blur-bck">
                                                                        <h1>Welcome aboard</h1>
                                                                        <p>
                                                                        Hello there! Welcome to Kanban board. This is a web app to make organizing your project with your team easier. Click <strong>Learn More</strong> below to understand better....
                                                                        </p>
                                                                        <p>
                                                                        <Button variant="light" href="/about-us">Learn more</Button>
                                                                        </p>
                                                                </Jumbotron>
                                                        </Col>
                                                </Row>:null}
                                        </div>
                                        
                                        </Route>
                                                        <Route path="/user-portal" exact>
                                                        {this.state.user?this.state.loginType==='user'&&this.state.user.userId!==undefined?
                                                        <UserDash user={this.state.user} hist={this.state.history}></UserDash>:null:
                                                        <Error></Error>}
                                                        </Route>

                                                        <Route path="/team-lead-portal" exact>
                                                        {this.state.user?this.state.loginType==='team lead'&&this.state.user.teamLeaderId!==undefined?
                                                        <TeamLeadDash user={this.state.user} hist={this.state.history}></TeamLeadDash>:null:
                                                        <Error></Error>}
                                                        </Route>

                                                        <Route path="/team-member-portal" exact>
                                                        {this.state.user?this.state.loginType==="team member"&&this.state.user.teamMemberId!==undefined?
                                                        <TeamMemberDash user={this.state.user} hist={this.state.history}></TeamMemberDash>:null:
                                                        <Error></Error>}
                                                        </Route>
                                                        <Route path="error" exact>
                                                        <Error></Error>
                                                        </Route>        

                                        <Route path="/contact" exact>
                                                <ContactUs style={{marginTop: '5em'}}></ContactUs>      
                                        </Route>
                                        <Route path="/about-us" exact>
                                                <AboutUs style={{marginTop: '5em'}}></AboutUs>      
                                        </Route>
                                        <Route path="/register" exact>
                                                <Register style={{marginTop: '5em'}}></Register>      
                                         </Route>
                                </Switch>
                        </div>
                );
        }
}