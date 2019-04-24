import React from 'react';
import './single.scss';
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Header from '../../components/header';

import { getComicInfo } from "../../service/services";

class SingleComic extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            comic: [],
            loading: true,
            idComic: this.props.match.params.id,
            comics: [],
            stories: [],
            series: [],
            events: [],
        };
    }
    componentWillMount() {
        console.log(this.state.idComic);
        getComicInfo(this.state.idComic).then(response => {
            const comic = response.data.results[0];
            const image = comic.thumbnail.path +'/standard_fantastic.'+comic.thumbnail.extension;
            console.log(comic);
            this.setState({
                comic: comic,
                comicImg: image,
                comics: comic.comics,
                stories: comic.stories,
                series: comic.series,
                events: comic.events,
                loading: false
            });
        });
    }

    render(){
        return(
            <div className="single">
                <Header titulo={this.state.comic.title} />
                <Container key={this.state.comic.id}>
                    <Row>
                        <Col xs={12} md={8} className="single-desc">
                            <Accordion defaultActiveKey="0">
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                            Comics
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            Aqui va a venir el listado de comics de {this.state.comic.title}
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                        Historias
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="1">
                                        <Card.Body>
                                            Aqui va a venir el listado de historias de {this.state.comic.title}
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                        Eventos
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="2">
                                        <Card.Body>
                                            Aqui va a venir el listado de eventos de {this.state.comic.title}
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="3">
                                        Series
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="3">
                                        <Card.Body>
                                            Aqui va a venir el listado de series de {this.state.comic.title}
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </Col>
                        <Col xs={12} md={4} className="single-info">
                            <img src={this.state.comicImg} alt={this.state.comic.title}/>
                            <h1>{this.state.comic.title}</h1>
                            <p>{this.state.comic.description}</p>
                            {/* <p>
                                <strong>Comics: </strong>{this.state.comics.available}<br/>
                                <strong>Historias: </strong>{this.state.stories.available}<br/>
                                <strong>Eventos: </strong>{this.state.events.available}<br/>
                                <strong>Series: </strong>{this.state.series.available}<br/>
                            </p> */}
                        </Col>
                    </Row>
                </Container>
            </div>     
        );
    }
}

export default SingleComic;