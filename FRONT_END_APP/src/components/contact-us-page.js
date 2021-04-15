// yet to be designed
import React from 'react';
import {Container, Button, Row, Col, Card} from 'react-bootstrap'

function ContactUs(props) {
        return (
                <Container style={{margin: 'auto', width: '80%'}}>
                        <Row style={{width:'100%', margin:'auto'}}>
                                <h3 style={{color:'white', margin: 'auto', fontStyle: 'italic'}}>Feel Free To Talk To Our Developers</h3>
                        </Row>
                                <hr></hr>
                        <Row style={{width:'100%', margin:'auto'}}>
                                <Col md={4}>
                                        <Card style={{margin: '1em' }}>
                                                <Card.Body>
                                                <Card.Title>Ramya V</Card.Title>
                                                <Card.Text>
                                                Java/React Full Stack Developer
                                                </Card.Text>
                                                <Card.Link><Button variant="primary" href="https://linkedin.com/" target="_blank">LinkedIn</Button> </Card.Link>
                                                <Card.Link><Button variant="dark" href="https://linkedin.com/" target="_blank">Github</Button></Card.Link>
                                                </Card.Body>
                                        </Card>
                                </Col>
                                <Col md={4}>
                                        <Card style={{margin: '1em' }}>
                                                <Card.Body>
                                                <Card.Title>Kshitija Patange</Card.Title>
                                                <Card.Text>
                                                Java/React Full Stack Developer
                                                </Card.Text>
                                                <Card.Link><Button variant="primary" href="https://linkedin.com/" target="_blank">LinkedIn</Button> </Card.Link>
                                                <Card.Link><Button variant="dark" href="https://linkedin.com/" target="_blank">Github</Button></Card.Link>
                                                </Card.Body>
                                        </Card>
                                </Col>
                                <Col md={4}>
                                        <Card style={{margin: '1em' }}>
                                                <Card.Body>
                                                <Card.Title>Bhavana Shinde</Card.Title>
                                                <Card.Text>
                                                Java/React Full Stack Developer
                                                </Card.Text>
                                                <Card.Link><Button variant="primary" href="https://linkedin.com/" target="_blank">LinkedIn</Button> </Card.Link>
                                                <Card.Link><Button variant="dark" href="https://linkedin.com/" target="_blank">Github</Button></Card.Link>
                                                </Card.Body>
                                        </Card>
                                </Col>
                                <Col md={4}>
                                        <Card style={{margin: '1em' }}>
                                                <Card.Body>
                                                <Card.Title>Chandu Malkpurapu</Card.Title>
                                                <Card.Text>
                                                Java/React Full Stack Developer
                                                </Card.Text>
                                                <Card.Link><Button variant="primary" href="https://linkedin.com/" target="_blank">LinkedIn</Button> </Card.Link>
                                                <Card.Link><Button variant="dark" href="https://linkedin.com/" target="_blank">Github</Button></Card.Link>
                                                </Card.Body>
                                        </Card>
                                </Col>
                                <Col md={4}>
                                        <Card style={{margin: '1em' }}>
                                                <Card.Body>
                                                <Card.Title>Pawan Kumar Kasouju</Card.Title>
                                                <Card.Text>
                                                Java/React Full Stack Developer
                                                </Card.Text>
                                                <Card.Link><Button variant="primary" href="https://linkedin.com/" target="_blank">LinkedIn</Button> </Card.Link>
                                                <Card.Link><Button variant="dark" href="https://linkedin.com/" target="_blank">Github</Button></Card.Link>
                                                </Card.Body>
                                        </Card>
                                </Col>
                                <Col md={4}>
                                        <Card style={{  margin: '1em' }}>
                                                <Card.Body>
                                                <Card.Title>Yash Kadam</Card.Title>
                                                <Card.Text>
                                                Java/React Full Stack Developer
                                                </Card.Text>
                                                <Card.Link><Button variant="primary" href="https://linkedin.com/in/yash-kadam/" target="_blank">LinkedIn</Button> </Card.Link>
                                                <Card.Link><Button variant="dark" href="https://github.com/yashk398" target="_blank">Github</Button></Card.Link>
                                                </Card.Body>
                                        </Card>
                                </Col>
                        </Row>
                </Container>
        );
}

export default ContactUs;