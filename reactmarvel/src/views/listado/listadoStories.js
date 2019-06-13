import React from 'react';
// import '../../App.scss';
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Figure from 'react-bootstrap/Figure';
import { getStories } from "../../service/services";
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import Header from '../../components/header';


import Card from 'react-bootstrap/Card';
import { PacmanLoader } from 'react-spinners';
// eslint-disable-next-line
import { BrowserRouter as Router, Link } from "react-router-dom";

class ListadoStories extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stories: [],
            loading: true,
            paginaActual: parseInt(this.props.match.params.page),
            totalcomic: 0
        };
    }
    componentWillMount() {
        // console.log(this.state.paginaActual);
        getStories(this.state.paginaActual).then(response => {
            console.log(response);
            const stories = response.data.results;
            const totalcomic = response.data.total;
            this.setState({
                stories: stories,
                loading: false,
                paginaActual: parseInt(this.props.match.params.page),
                totalcomic
            });
        });
    }

    onChange = (page) => {
        this.setState({
            paginaActual: parseInt(page),
            loading: true,
        });
        getStories(page).then(response => {
            const stories = response.data.results;
            this.setState({
                stories: stories,
                loading: false
            });
        });
    }

    render() {
        return ( 
        <div className = "listado text-center" >
            <Header titulo = "Historias" />
            <Container>
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
                        this.state.stories.map((story) => {
                            return ( 
                                // <Col xs={12}  md={6}  xl={4}
                                //     className = "marvelCard"
                                //     key={story.id}>
                                //     <Card>
                                //     <Card.Img variant = "top"
                                //         alt = { story.title }
                                //         src = { story.thumbnail.path + '/standard_fantastic.jpg' }
                                //     /> 
                                //     <Card.Body>
                                //         <Card.Title> < h3 > { story.title } </h3></Card.Title >
                                //         {/* <Card.Text dangerouslySetInnerHTML = {
                                //             { __html: story.description }
                                //         } >
                                //         </Card.Text> */}

                                //         <Link to = { `/story/${story.id}` }> Saber más </Link>

                                //     </Card.Body> 
                                //     </Card>
                                    
                                // </Col>
                                <Col xs={12}  md={6}  xl={4} className="marvelCard">
                                <Figure className="marvelCard-hover">
                                    <Figure.Image
                                        width={250}
                                        height={250}
                                        alt={story.title}
                                        src="https://upload.wikimedia.org/wikipedia/commons/0/04/MarvelLogo.svg"
                                        
                                    />
                                    <Figure.Caption>
                                        <h2>{story.title}</h2>
                                    </Figure.Caption>
                                    <Link to={`/story/${story.id}`} className="marvelCard-linkImage"></Link>
                                </Figure>
                            </Col>

                            );
                        })
                    )
                } 
                </Row>
                <Row >

                    <Col>
                            <Pagination onChange={this.onChange} pageSize={21}  current={this.state.paginaActual} total={ parseInt(this.state.totalcomic)} />
                        </Col>
                </Row>
            </Container>
        </div>     
        );
    }
}

export default ListadoStories;