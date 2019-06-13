import React from 'react';
import './single.scss';
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';
import Figure from 'react-bootstrap/Figure';
import Col from 'react-bootstrap/Col';
import Header from '../../components/header';
// eslint-disable-next-line
import { BrowserRouter as Router, Link } from "react-router-dom";
import { getSeriesInfo, getSeriesByCharacters } from "../../service/services";
import { PacmanLoader } from 'react-spinners';
import slugify from '../../helpers/slugify';
class SingleSerie extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            serie: [],
            loading: true,
            idSeries: this.props.match.params.id,
            comics: [],
            stories: [],
            series: [],
            creators: [],
            characters: []
        };
    }
    componentWillMount() {
        getSeriesInfo(this.state.idSeries).then(response => {
            const serie = response.data.results[0];
            console.log(serie);
            const image = serie.thumbnail.path +'/standard_fantastic.'+serie.thumbnail.extension;
            this.setState({
                serie: serie,
                comicImg: image,
                comics: serie.comics.items,
                stories: serie.stories.items,
                series: serie.series,
                creators: serie.creators.items,
                // characters: serie.characters.items,
                loading: false
            });
        });
        getSeriesByCharacters(this.state.idSeries).then(response => {
            const characters = response.data.results;
            // console.log(characters);
            this.setState({
                characters: characters,
                loading: false
            });
        });
    }

    render(){
        return(
            <div className="single">
                <Header titulo={this.state.serie.title} />
                <Container key={this.state.serie.id}>
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
                                        <div className="post__content" dangerouslySetInnerHTML={{__html: this.state.serie.description}}></div>
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
                                    <div className="single-desc-item single-desc-series">
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
                                            alt={this.state.serie.title}
                                            src={this.state.comicImg}
                                            thumbnail={true}
                                        />
                                        <Figure.Caption>
                                            {this.state.serie.title}
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

export default SingleSerie;