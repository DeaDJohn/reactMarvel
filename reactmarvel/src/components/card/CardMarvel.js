import React from 'react';
import { getCharacterInfo } from "../../service/services";
import Figure from 'react-bootstrap/Figure';
import './card.scss';
// eslint-disable-next-line
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
			
            this.setState({
                heroe: heroe,
                heroeImg: image,
                loading: false
            });
        });
    }
      render(){
          return (
            <Col xs={12}  md={6}  xl={4} className="marvelCard">
                <Figure className="marvelCard-hover">
                    <Figure.Image
                        width={250}
                        height={250}
                        alt={this.state.heroe.name}
                        src={this.state.heroeImg}
                    />
                    <Figure.Caption>
                        <h2>{this.state.heroe.name}</h2>
                    </Figure.Caption>
                    <Link to={`/heroe/${this.state.heroe.id}`} className="marvelCard-linkImage"></Link>
                </Figure>
            </Col>
          );
      }
}


export default CardMarvel;
