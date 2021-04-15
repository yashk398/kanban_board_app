 import axios from 'axios';
import React, { useState } from 'react';
import { Container, Form, Jumbotron, Button } from 'react-bootstrap';

function Register(props) {
        
        const [userName, setUserName] = useState();
        const [email, setEmail] = useState();
        const [organization, setOrganization] = useState();
        const [password, setPassword] = useState();

        const saveUserRegister = (e) => {
                e.preventDefault();
                const details = {userId: 0, userName: userName, emailId: email, organisation: organization, password: password}
                console.log(details);
                axios
                  .post("http://localhost:8080/api/kanban_board/createUser", details)
                  .then((response) => {
                    if (response.data !== null ) {
                      alert("User Registered Added successfully, login please.....");
                      console.log(response.data);
                      window.location.pathname="/";
                    } else {
                      alert("Something went wrong : Fail to Register");
                    }
                  });
              };

        return (
                <Container>
                        <Jumbotron  id="register">
                        <h1>Sign up as a user</h1>
                        <hr></hr>
                        <Form>
                                <Form.Group>
                                        <Form.Label>User Name</Form.Label>
                                        <Form.Control size="md" type="text" placeholder="Your User Name" onChange={(event)=>setUserName(event.target.value)}/>
                                        <br></br>
                                        <Form.Label>Email ID</Form.Label>
                                        <Form.Control size="md" type="email" placeholder="Your email address"  onChange={(event)=>setEmail(event.target.value)}/>
                                        <br></br>
                                        <Form.Label>Organization</Form.Label>
                                        <Form.Control size="md" type="text" placeholder="Your Organization  Name"  onChange={(event)=>setOrganization(event.target.value)}/>
                                        <br></br>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control size="md" type="password" placeholder="Create a strong password" onChange={(event)=>setPassword(event.target.value)} />
                                        <br></br>
                                        <Button onClick={(e)=>saveUserRegister(e)}>Register</Button>
                                        <br></br>
                                </Form.Group>
                        </Form>
                        </Jumbotron>
                        <br></br>
                </Container>
        );
}

export default Register;