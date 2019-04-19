import React from 'react';
// import '../../App.scss';
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import  CardMarvel  from "../../components/card/CardMarvel";
import { getCharacters } from "../../service/services";
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

import Header from '../../components/header';

import { PacmanLoader } from 'react-spinners';

class Listado extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            heroes: [],
            loading: true,
            paginaActual: 1,
            totalHeroe: 0
        };
    }
    componentWillMount() {
        // console.log(this.state.paginaActual);
        getCharacters(this.state.paginaActual).then(response => {
            const heroes = response.data.results;
            const totalHeroe = response.data.total;
            this.setState({
                heroes: heroes,
                loading: false,
                paginaActual: this.props.match.params.page,
                totalHeroe
            });
        });
    }

    onChange = (page) => {
        console.log(page);
        this.setState({
            paginaActual: page,
        });
        getCharacters(this.state.paginaActual).then(response => {
            const heroes = response.data.results;
            this.setState({
                heroes: heroes,
                loading: false
            });
        });
      }

    render(){
        return(
            <div className="listado text-center">
                <Header titulo="Heroes" />
                <Container>
                    <Row>
                    {this.state.loading ? (
                        <div className="loader">
                            <PacmanLoader
                                sizeUnit={"px"}
                                size={75}
                                color={'#123abc'}
                                loading={this.state.loading}
                            />
                        </div>
                        ) : (
                            this.state.heroes.map( (heroe) => {
                                return (
                                    <CardMarvel key={heroe.id} heroe={heroe.id} ></CardMarvel>
                                
                                );
                            })
                    )}
                    </Row>
                    <Row>
                        <Col>
                            <Pagination onChange={this.onChange} current={this.state.paginaActual} total={this.state.totalHeroe / 21} />
                        </Col>
                    </Row>
                </Container>
            </div>     
        );
    }
}

export default Listado;