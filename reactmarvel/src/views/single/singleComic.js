import React from 'react';
import './single.scss';
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from '../../components/header';

import { getComicInfo, getCreatorsByUrl } from "../../service/services";
import { PacmanLoader } from 'react-spinners';

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
            creators: []
        };
    }
    componentWillMount() {
        getComicInfo(this.state.idComic).then(response => {
            const comic = response.data.results[0];
            console.log(comic)
            const image = comic.thumbnail.path +'/standard_fantastic.'+comic.thumbnail.extension;
            this.setState({
                comic: comic,
                comicImg: image,
                comics: comic.comics,
                stories: comic.stories,
                series: comic.series,
                events: comic.events,
                loading: false
            });
            // this.state.comic.creators.items.map((items) => {
                // getCreatorsByUrl(items.resourceURI).then(response =>{
                //     console.log(response.data.results[0])
                // })
            // })
            // getCreatorsByUrl();
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
                                    </div>
                                    <div className="single-desc-item single-desc-stories">
                                        <h4>Historias:</h4>
                                    </div>
                                    <div className="single-desc-item single-desc-events">
                                        <h4>Eventos:</h4>
                                    </div>
                                    <div className="single-desc-item single-desc-creators">
                                        <h4>Creadores:</h4>
                                        {
                                            this.state.creators.map((creador) => {

                                            })
                                        }
                                    </div>
                                </Col>
                                <Col xs={12} md={4} className="single-info">
                                    <img src={this.state.comicImg} alt={this.state.comic.title}/>
                                    <h3>{this.state.comic.title}</h3>
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