import React from 'react';
import './single.scss';
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';
import Figure from 'react-bootstrap/Figure';
import Col from 'react-bootstrap/Col';
import Header from '../../components/header';
// eslint-disable-next-line
import { BrowserRouter as Router, Link } from "react-router-dom";
import { getEventsInfo, getEventsByCharacters } from "../../service/services";
import { PacmanLoader } from 'react-spinners';
import slugify from '../../helpers/slugify';
class SingleEvento extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            event: [],
            loading: true,
            idEvents: this.props.match.params.id,
            comics: [],
            stories: [],
            series: [],
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
                comics: event.comics.items,
                stories: event.stories.items,
                series: event.series,
                events: event.events,
                creators: event.creators.items,
                // characters: event.characters.items,
                loading: false
            });
        });
        getEventsByCharacters(this.state.idEvents).then(response => {
            const characters = response.data.results;
            console.log(response);
            this.setState({
                characters: characters,
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
                                        <Row>
                                            {
                                                this.state.characters.map((character) => {
                                                    console.log(character);
                                                    let image = character.thumbnail.path +'/standard_fantastic.'+character.thumbnail.extension;
                                                    return <Col xs={12}  md={6} className="marvelCard" key={slugify(character.name)}>
                                                                <Figure className="marvelCard-hover">
                                                                    <Figure.Image
                                                                        width={250}
                                                                        height={250}
                                                                        alt={character.name}
                                                                        src={image}
                                                                    />
                                                                    <Figure.Caption>
                                                                        <h2>{character.name}</h2>
                                                                    </Figure.Caption>
                                                                    <Link to={`/heroe/${character.id}`} className="marvelCard-linkImage"></Link>
                                                                </Figure>
                                                            </Col>
                                                })
                                            }
                                        </Row>
                                    </div>
                                    <div className="single-desc-item single-desc-stories">
                                        <h4>Historias:</h4>
                                        <ul>
                                            {
                                                this.state.stories.map((story) => {
                                                    return <li key={slugify(story.name)}><Link to={`/story/${story.resourceURI.split("http://gateway.marvel.com/v1/public/stories/").pop()}`}>{story.name}</Link></li>
                                                })
                                            }
                                        </ul>
                                    </div>
                                    <div className="single-desc-item single-desc-events">
                                        <h4>Comics:</h4>
                                        <ul>
                                            {
                                                this.state.comics.map((comic) => {
                                                    return <li key={slugify(comic.name)}><Link to={`/comic/${comic.resourceURI.split("http://gateway.marvel.com/v1/public/comics/").pop()}`}>{comic.name}</Link></li>
                                                })
                                            }
                                        </ul>
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
                                            thumbnail={true}
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