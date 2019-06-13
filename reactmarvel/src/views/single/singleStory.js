import React from 'react';
import './single.scss';
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';
import Figure from 'react-bootstrap/Figure';
import Col from 'react-bootstrap/Col';
import Header from '../../components/header';
// eslint-disable-next-line
import { BrowserRouter as Router, Link } from "react-router-dom";
import { getStoriesInfo } from "../../service/services";
import { PacmanLoader } from 'react-spinners';
import slugify from '../../helpers/slugify';
class SingleStory extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            story: [],
            loading: true,
            idstorys: this.props.match.params.id,
            comics: [],
            stories: [],
            storys: [],
            creators: [],
            characters: []
        };
    }
    componentWillMount() {
        getStoriesInfo(this.state.idstorys).then(response => {
            const story = response.data.results[0];
            console.log(story);
            let image ="";
            if (story.thumbnail  !== null){
                 image = story.thumbnail.path +'/standard_fantastic.'+story.thumbnail.extension;
            }else{
                image = "https://upload.wikimedia.org/wikipedia/commons/0/04/MarvelLogo.svg";
            }
            this.setState({
                story: story,
                comicImg: image,
                comics: story.comics.items,
                series: story.series.items,
                // storys: story.storys,
                creators: story.creators.items,
                characters: story.characters.items,
                loading: false
            });

        });
    }

    render(){
        return(
            <div className="single">
                <Header titulo={this.state.story.title} />
                <Container key={this.state.story.id}>
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
                                        <div className="post__content" dangerouslySetInnerHTML={{__html: this.state.story.description}}></div>
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
                                        <h4>Series:</h4>
                                        <ul>
                                            {
                                                this.state.series.map((serie) => {
                                                    return <li key={slugify(serie.name)}><Link to={`/serie/${serie.resourceURI.split("http://gateway.marvel.com/v1/public/series/").pop()}`}>{serie.name}</Link></li>
                                                })
                                            }
                                        </ul>
                                    </div>
                                    <div className="single-desc-item single-desc-storys">
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
                                            alt={this.state.story.title}
                                            src={this.state.comicImg}
                                            thumbnail={true}
                                        />
                                        <Figure.Caption>
                                            {this.state.story.title}
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

export default SingleStory;