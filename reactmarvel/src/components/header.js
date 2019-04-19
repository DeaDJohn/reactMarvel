import React from 'react';
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            heroe: [],
            heroeBg: 'http://www.digitaltrends.com/wp-content/uploads/2011/07/avengers-assemble.jpg',
        };
    }
    render(){
        return(
            <div className="pageHeader" style={{backgroundImage: `url(${this.state.heroeBg})`}}>
                <Container className="text-center">
                    <Row>
                        <Col><h1>{this.props.titulo}</h1></Col>
                    </Row>
                </Container>
            </div>
        );
    }
}