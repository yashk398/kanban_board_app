// YET TO DESIGN
import React from 'react';
import { Jumbotron } from 'react-bootstrap';

function Error(props) {
        return (
                <Jumbotron>
                        <h1>SOMETHING WENT WRONG :(</h1>
                        <h5>User was not logged in it seems : <a href="/">Go back?</a></h5>
                </Jumbotron>
        );
}

export default Error;