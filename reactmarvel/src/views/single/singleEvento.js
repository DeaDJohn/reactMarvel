import React from 'react';
import './single.scss';
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';
import Figure from 'react-bootstrap/Figure';
import Col from 'react-bootstrap/Col';
import Header from '../../components/header';
// eslint-disable-next-line
import { BrowserRouter as Router, Link } from "react-router-dom";
import { getEventsInfo } from "../../service/services";
import { PacmanLoader } from 'react-spinners';
import slugify from '../../helpers/slugify';
class SingleEvento extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            event: [],
            loading: true,
            idEvents: this.props.match.params.id,
            events: [],
            stories: [],
            series: [],
            events: [],
            creators: [],
            characters: []
        };
    }
    componentWillMount() {
        getEventsInfo(this.state.idEvents).then(response => {
            const event = response.data.results[0];
            console.log(event);
            const image = event.thumbnail.path +'/standard_fantastic.'+event.thumbnail.extension;
            this.setState({
                event: event,
                comicImg: image,
                comics: event.comics,
                stories: event.stories.items,
                series: event.series,
                events: event.events,
                creators: event.creators.items,
                characters: event.characters.items,
                loading: false
            });

        });
    }

    render(){
        return(
            <div className="single">
                <Header titulo={this.state.event.title} />
                <Container key={this.state.event.id}>
                    <Row>
                    {
                        this.state.loading ? ( 
                            <div className = "loader" >
                                <PacmanLoader sizeUnit = { "px" }
                                    size = { 75 }
                                    color = { '#123abc' }
                                    loading = { this.state.loading }
                                />
                            </div>
                        ) : (
                            <React.Fragment>
                                <Col xs={12} md={8} className="single-desc">
                                    {console.log(this.state.comic)}
                                    <div className="single-desc-item single-desc-description">
                                        <h4>Descripción:</h4>
                                        <div className="post__content" dangerouslySetInnerHTML={{__html: this.state.event.description}}></div>
                                    </div>
                                    <div className="single-desc-item single-desc-charcters">
                                        <h4>Personajes:</h4>
                                        <ul>
                                            {
                                                this.state.characters.map((character) => {
                                                    return <li key={slugify(character.name)}><Link to={`/heroe/${character.resourceURI.split("http://gateway.marvel.com/v1/public/characters/").pop()}`}>{character.name}</Link></li>
                                                })
                                            }
                                        </ul>
                                    </div>
                                    <div className="single-desc-item single-desc-stories">
                                        <h4>Historias:</h4>
                                        <ul>
                                            {
                                                this.state.stories.map((story) => {
                                                    console.log(story);
                                                    return <li key={slugify(story.name)}>{story.name} <span>({story.type})</span></li>
                                                })
                                            }
                                        </ul>
                                    </div>
                                    <div className="single-desc-item single-desc-events">
                                        <h4>Eventos:</h4>
                                    </div>
                                    <div className="single-desc-item single-desc-creators">
                                        <h4>Creadores:</h4>
                                        <ul>
                                            {
                                                this.state.creators.map((creador) => {
                                                    return <li key={slugify(creador.name)}>{creador.name} <span>({creador.role})</span></li>
                                                })
                                            }
                                        </ul>
                                    </div>
                                </Col>
                                <Col xs={12} md={4} className="single-info">
                                    <Figure>
                                        <Figure.Image
                                            width={380}
                                            height={380}
                                            alt={this.state.event.title}
                                            src={this.state.comicImg}
                                            thumbnail="true"
                                        />
                                        <Figure.Caption>
                                            {this.state.event.title}
                                        </Figure.Caption>
                                    </Figure>
                                </Col>
                            </React.Fragment>
                        )
                        }
                    </Row>
                </Container>
            </div>     
        );
    }
}

export default SingleEvento;