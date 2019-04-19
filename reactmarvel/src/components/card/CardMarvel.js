import React from 'react';
import Card from 'react-bootstrap/Card';
import { getCharacterInfo } from "../../service/services";
import Spinner from 'react-bootstrap/Spinner';
import './card.scss';
import { BrowserRouter as Router, Link } from "react-router-dom";
import Col from 'react-bootstrap/Col';

 class CardMarvel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            heroe: [],
            heroeImg: 'https://pbs.twimg.com/profile_images/966379738431459328/d4-iXuRl.jpg',
            loading: true
        };
    }
    componentWillMount(){
        // console.log(this.props);
		getCharacterInfo(this.props.heroe).then( response => {
            const heroe = response.data.results[0];
            const image = heroe.thumbnail.path +'/standard_fantastic.'+heroe.thumbnail.extension;
			// console.log(heroe);
            this.setState({
                heroe: heroe,
                heroeImg: image,
                loading: false
            });
            // console.log(image);
        });
    }
      render(){
          return (
            <Col xs={6} md={4} className="marvelCard">
                <Card >
                    <Card.Img variant="top" alt={this.state.heroe.name} src={this.state.heroeImg} />
                    <Card.Body>
                        <Card.Title><h3>{this.state.heroe.name}</h3></Card.Title>
                        <Card.Text>
                            
                        {this.state.loading ? (
                            <Spinner animation="grow" />
                            ) : (
                                this.state.heroe.description
                        )}
                        </Card.Text>
                            <Router>
                                <Link to={`heroe/${this.state.heroe.id}`}>Saber más</Link>
                            </Router>
                    </Card.Body>
                </Card>
            </Col>
          );
      }
}


export default CardMarvel;
