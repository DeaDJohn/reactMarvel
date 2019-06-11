import React from 'react';
import './single.scss';
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Header from '../../components/header';
// eslint-disable-next-line
import { BrowserRouter as Router, Link } from "react-router-dom";

import { getCharacterInfo, getComicsByCharacters, getSeriesByCharacters, getStoriesByCharacters, getEventsByCharacters } from "../../service/services";

class Single extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            heroe: [],
            loading: true,
            idHeroe: this.props.match.params.id,
            comics: [],
            stories: [],
            series: [],
            events: [],
            comicList: [],
            seriesList: [],
            storiesList: [],
            eventsList:[]
        };
    }
    componentWillMount() {
        // console.log(this.state.idHeroe);
        getCharacterInfo(this.state.idHeroe).then(response => {
            const heroe = response.data.results[0];
            const image = heroe.thumbnail.path +'/standard_fantastic.'+heroe.thumbnail.extension;
            console.log(heroe);
            this.setState({
                heroe: heroe,
                heroeImg: image,
                comics: heroe.comics,
                stories: heroe.stories,
                series: heroe.series,
                events: heroe.events,
                loading: false,
            });
            getComicsByCharacters(this.state.idHeroe).then(response => {
                // console.log(response.data.results);
                this.setState({
                    comicList: response.data.results,
                });
            });
            getStoriesByCharacters(this.state.idHeroe).then(response => {
                // console.log(response.data.results);
                this.setState({
                    storiesList: response.data.results,
                });
            });
            getSeriesByCharacters(this.state.idHeroe).then(response => {
                // console.log(response.data.results);
                this.setState({
                    seriesList: response.data.results,
                });
            });
            getEventsByCharacters(this.state.idHeroe).then(response => {
                // console.log(response.data.results);
                this.setState({
                    eventsList: response.data.results,
                });
            });
            
        });
    }

    render(){
        return(
            <div className="single">
                <Header titulo={this.state.heroe.name} />
                <Container key={this.state.heroe.id}>
                    <Row>
                        <Col xs={12} md={8} className="single-desc">
                            <Accordion >
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                            Comics
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body className="single-body-comics">
                                            <ul className="list-group list-group-flush">
                                            {
                                                this.state.comicList.map( (comics) => {
                                                        // console.log(comics);
                                                    return <li key={comics.id} className="list-group-item"><Link to={`/comic/${comics.id}`} className="alert-link">{comics.title}</Link></li>
                                                })
                                            }
                                            </ul>
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
                                        <Card.Body className="single-body-stories">
                                        <ul className="list-group list-group-flush">
                                            {
                                                this.state.storiesList.map( (stories) => {
                                                        // console.log(stories);
                                                    return <li key={stories.id} className="list-group-item"><Link to={`/comic/${stories.id}`} className="alert-link">{stories.title}</Link></li>
                                                })
                                            }
                                            </ul>
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
                                        <Card.Body className="single-body-events">
                                        <ul className="list-group list-group-flush">
                                            {
                                                this.state.eventsList.map( (events) => {
                                                        console.log(events);
                                                    return <li key={events.id} className="list-group-item"><Link to={`/comic/${events.id}`} className="alert-link">{events.title}</Link></li>
                                                })
                                            }
                                            </ul>
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
                                        <ul className="list-group list-group-flush">
                                            {
                                                this.state.seriesList.map( (series) => {
                                                        console.log(series);
                                                    return <li key={series.id} className="list-group-item"><Link to={`/comic/${series.id}`} className="alert-link">{series.title}</Link></li>
                                                })
                                            }
                                            </ul>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </Col>
                        <Col xs={12} md={4} className="single-info">
                            <img src={this.state.heroeImg} alt={this.state.heroe.name}/>
                            <h1>{this.state.heroe.name}</h1>
                            <p>{this.state.heroe.description}</p>
                            <ul className="list-group">
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    Comics:
                                    <span className="badge badge-primary badge-pill">{this.state.comics.available}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    Historias:
                                    <span className="badge badge-primary badge-pill">{this.state.stories.available}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    Eventos:
                                    <span className="badge badge-primary badge-pill">{this.state.events.available}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    Series:
                                    <span className="badge badge-primary badge-pill">{this.state.series.available}</span>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </div>     
        );
    }
}

export default Single;