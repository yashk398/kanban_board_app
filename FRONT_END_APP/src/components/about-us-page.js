import React from 'react';
import { Jumbotron, Button, Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ThumbsUp from  '../assets/pexels-thumbs-up.jpg'

function AboutUs(props) {
        return (
                <Container>
                        <Jumbotron>
                                <h1>What is Kanban Board?</h1>
                                <p>
                                This is a simple web app for managing your next team project in your organization. Managing tasks and teams is so easy when everything is planned with a
                                tool fast and informative enough. Kanban Board, also known as Kanban JIRA helps you achieve your goals while being organized with the team.
                                </p>
                                <p style={{fontStyle:'italic'}}><strong>ALL THE BEST FOR YOUR NEXT PROJECT!</strong></p>
                                <hr></hr>
                                <Image style={{width: '30%'}} roundedCircle src={ThumbsUp} alt="https://www.pexels.com/photo/close-up-photo-of-man-wearing-black-suit-jacket-doing-thumbs-up-gesture-684385/"></Image>
                                <hr></hr>
                                <p>Our team worked hard to develop this software. If you have any queries or technical difficulties with the app, feel free to connect with the developers.</p>
                                <p>
                                <Link to="/contact"><Button variant="primary">Our Developers</Button></Link>
                                </p>
                        </Jumbotron>
                </Container>
        );
}

export default AboutUs;