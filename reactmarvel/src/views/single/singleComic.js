import React from 'react';
import './single.scss';
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';
import Figure from 'react-bootstrap/Figure';
import Col from 'react-bootstrap/Col';
import Header from '../../components/header';
// eslint-disable-next-line
import { BrowserRouter as Router, Link } from "react-router-dom";
import { getComicInfo, getComicsByCharacters } from "../../service/services";
import { PacmanLoader } from 'react-spinners';
import slugify from '../../helpers/slugify';
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
            creators: [],
            characters: []
        };
    }
    componentWillMount() {
        getComicInfo(this.state.idComic).then(response => {
            const comic = response.data.results[0];
            console.log(comic);
            const image = comic.thumbnail.path +'/standard_fantastic.'+comic.thumbnail.extension;
            this.setState({
                comic: comic,
                comicImg: image,
                comics: comic.comics,
                stories: comic.stories.items,
                series: comic.series.items,
                events: comic.events.items,
                creators: comic.creators.items,
                loading: false
            });
        });
        getComicsByCharacters(this.state.idComic).then(response => {
            const characters = response.data.results;
            console.log(response);
            this.setState({
                characters: characters,
                loading: false
            });
        });
    }
    // componentDidUpdate(prevState){

    //     console.log(this.state.comic.creators);
    //     if (this.state.comic.creators.available > 0 && (prevState.comic.creators.collectionURI !== this.state.comic.creators.collectionURI)){
    //         getCreatorsByUrl(this.state.comic.creators.collectionURI).then(response =>{
    //             console.log(response.data.results[0])
    //             this.setState({
    //                 creators: response.data.results
    //             });
    //         })
    //     } 
    // }
    render(){
        return(
            <div className="single">
                <Header titulo={this.state.comic.title} />
                <Container key={this.state.comic.id}>
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
                                        <div className="post__content" dangerouslySetInnerHTML={{__html: this.state.comic.description}}></div>
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
                                                    console.log(story);
                                                    return <li key={slugify(story.name)}><Link to={`/story/${story.resourceURI.split("http://gateway.marvel.com/v1/public/stories/").pop()}`}>{story.name}</Link></li>
                                                })
                                            }
                                        </ul>
                                    </div>
                                    <div className="single-desc-item single-desc-events">
                                        <h4>Eventos:</h4>
                                        <ul>
                                            {
                                                this.state.events.map((event) => {
                                                    console.log(event);
                                                    return <li key={slugify(event.name)}><Link to={`/event/${event.resourceURI.split("http://gateway.marvel.com/v1/public/events/").pop()}`}>{event.name}</Link></li>
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
                                            alt={this.state.comic.title}
                                            src={this.state.comicImg}
                                            thumbnail={true}
                                        />
                                        <Figure.Caption>
                                            {this.state.comic.title}
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

export default SingleComic;