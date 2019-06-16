import React from 'react';
// import '../../App.scss';
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Figure from 'react-bootstrap/Figure';
import { getEvents } from "../../service/services";
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import Header from '../../components/header';

import { PacmanLoader } from 'react-spinners';
// eslint-disable-next-line
import { BrowserRouter as Router, Link } from "react-router-dom";

class ListadoEventos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            events: [],
            loading: true,
            paginaActual: parseInt(this.props.match.params.page),
            totalcomic: 0
        };
    }
    componentWillMount() {
        // console.log(this.state.paginaActual);
        getEvents(this.state.paginaActual).then(response => {
            console.log(response);
            const events = response.data.results;
            const totalcomic = response.data.total;
            this.setState({
                events: events,
                loading: false,
                paginaActual: parseInt(this.props.match.params.page),
                totalcomic
            });
        });
    }

    onChange = (page) => {
        this.props.history.push('/events/'+ page);
        this.setState({
            paginaActual: parseInt(page),
            loading: true,
        });
        getEvents(page).then(response => {
            const events = response.data.results;
            this.setState({
                events: events,
                loading: false
            });
        });
    }

    render() {
        return ( 
        <div className = "listado text-center" >
            <Header titulo = "Eventos" />
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
                        this.state.events.map((event) => {
                            return ( 
                                <Col xs={12}  md={6}  xl={4} className="marvelCard">
                                    <Figure className="marvelCard-hover">
                                        <Figure.Image
                                            width={250}
                                            height={250}
                                            alt={event.title}
                                            src={event.thumbnail.path + '/standard_fantastic.jpg'}
                                            
                                        />
                                        <Figure.Caption>
                                            <h2>{event.title}</h2>
                                        </Figure.Caption>
                                        <Link to={`/event/${event.id}`} className="marvelCard-linkImage"></Link>
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

export default ListadoEventos;