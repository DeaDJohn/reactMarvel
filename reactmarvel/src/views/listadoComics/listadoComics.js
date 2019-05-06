import React from 'react';
// import '../../App.scss';
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getComics } from "../../service/services";
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import Header from '../../components/header';


import Card from 'react-bootstrap/Card';
import { PacmanLoader } from 'react-spinners';
// eslint-disable-next-line
import { BrowserRouter as Router, Link } from "react-router-dom";

class ListadoComics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            comics: [],
            loading: true,
            paginaActual: parseInt(this.props.match.params.page),
            totalcomic: 0
        };
    }
    componentWillMount() {
        // console.log(this.state.paginaActual);
        getComics(this.state.paginaActual).then(response => {
            const comics = response.data.results;
            const totalcomic = response.data.total;
            this.setState({
                comics: comics,
                loading: false,
                paginaActual: parseInt(this.props.match.params.page),
                totalcomic
            });
        });
    }

    onChange = (page) => {
        this.setState({
            loading: true,
        });
        getComics(page).then(response => {
            const comics = response.data.results;
            this.setState({
                comics: comics,
                loading: false
            });
        });
    }

    render() {
        return ( 
        <div className = "listado text-center" >
            <Header titulo = "Comics" />
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
                        this.state.comics.map((comic) => {
                            return ( 
                                <Col xs = { 12 }
                                    sm = { 6 }
                                    md = { 4 }
                                    className = "marvelCard"
                                    key={comic.id}>
                                    <Card>
                                    <Card.Img variant = "top"
                                        alt = { comic.title }
                                        src = { comic.thumbnail.path + '/standard_fantastic.jpg' }
                                    /> 
                                    <Card.Body>
                                        <Card.Title> < h3 > { comic.title } </h3></Card.Title >
                                        {/* <Card.Text dangerouslySetInnerHTML = {
                                            { __html: comic.description }
                                        } >
                                        </Card.Text> */}

                                        <Link to = { `/comic/${comic.id}` }> Saber más </Link>

                                    </Card.Body> 
                                    </Card>
                                </Col>

                            );
                        })
                    )
                } 
                </Row>
                <Row >
                    <Col>
                        <Pagination onChange = { this.onChange }
                            current = { this.state.paginaActual }
                            total = { this.state.totalcomic / 21 }
                        />
                    </Col>
                </Row>
            </Container>
        </div>     
        );
    }
}

export default ListadoComics;