import React from "react";
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaLinkedin, FaTwitterSquare } from "react-icons/fa";

export default class Footer extends React.Component {

    render(){
        return(
            <footer>
                <Container>
                    <Row>
                        <Col>
                            <ul>
                                <li>
                                    <strong>Puedes seguirme en:</strong>
                                </li>
                                <li>
                                    <a href="https://twitter.com/juanjo_dev" target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin></FaLinkedin> Twitter</a>
                                </li>
                                <li>
                                    <a href="https://www.linkedin.com/in/juanjofb/" target="_blank" rel="noopener noreferrer">
                                    <FaTwitterSquare></FaTwitterSquare> Linkedin</a>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </footer>
        );
    }
}