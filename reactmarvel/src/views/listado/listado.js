import React from 'react';
// import '../../App.scss';
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import  CardMarvel  from "../../components/card/CardMarvel";
import { getCharacters } from "../../service/services";

class Listado extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            heroes: [],
            loading: true,
            paginaActual: this.props.match.params.page
        };
    }
    componentWillMount() {
        console.log(this.state.paginaActual);
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
                <Container>
                    <Row>
                        <Col><h1>Heroes</h1></Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        {
                            this.state.heroes.map( (heroe) => {
                                console.log(heroe);
                                return (
                                    <CardMarvel  heroe={heroe.id} ></CardMarvel>
                                
                                );
                            })
                        }
                    </Row>
                </Container>
            </div>     
        );
    }
}

export default Listado;