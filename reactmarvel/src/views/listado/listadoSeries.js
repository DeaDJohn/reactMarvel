import React from 'react';
// import '../../App.scss';
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Figure from 'react-bootstrap/Figure';
import { getSeries } from "../../service/services";
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import Header from '../../components/header';

import slugify from '../../helpers/slugify';
import { PacmanLoader } from 'react-spinners';
// eslint-disable-next-line
import { BrowserRouter as Router, Link } from "react-router-dom";

class ListadoSeries extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            series: [],
            loading: true,
            paginaActual: parseInt(this.props.match.params.page),
            totalcomic: 0
        };
    }
    componentWillMount() {
        // console.log(this.state.paginaActual);
        getSeries(this.state.paginaActual).then(response => {
            console.log(response);
            const series = response.data.results;
            const totalcomic = response.data.total;
            this.setState({
                series: series,
                loading: false,
                paginaActual: parseInt(this.props.match.params.page),
                totalcomic
            });
        });
    }

    onChange = (page) => {
        this.props.history.push('/series/'+ page);
        this.setState({
            paginaActual: parseInt(page),
            loading: true,
        });
        getSeries(page).then(response => {
            const series = response.data.results;
            this.setState({
                series: series,
                loading: false
            });
        });
    }

    render() {
        return ( 
        <div className = "listado text-center" >
            <Header titulo = "Series" />
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
                        this.state.series.map((serie) => {
                            return ( 
                                <Col xs={12}  md={6}  xl={4} className="marvelCard" key={slugify(serie.title)}>
                                    <Figure className="marvelCard-hover">
                                        <Figure.Image
                                            width={250}
                                            height={250}
                                            alt={serie.title}
                                            src={serie.thumbnail.path + '/standard_fantastic.jpg'}
                                            
                                        />
                                        <Figure.Caption>
                                            <h2>{serie.title}</h2>
                                        </Figure.Caption>
                                        <Link to={`/serie/${serie.id}`} className="marvelCard-linkImage"></Link>
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

export default ListadoSeries;