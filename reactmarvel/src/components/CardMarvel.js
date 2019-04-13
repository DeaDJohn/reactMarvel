import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getCharacterInfo, getCharacters } from "../service/services";

 class CardMarvel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            heroe: [],
            heroeImg: 'https://pbs.twimg.com/profile_images/966379738431459328/d4-iXuRl.jpg'
        };
    }
    componentWillMount(){
        console.log(this.props);
		getCharacterInfo(this.props.heroe).then( response => {
            const heroe = response.data.results[0];
            const image = heroe.thumbnail.path +'.'+heroe.thumbnail.extension;
			// console.log(heroe);
            this.setState({
                heroe: heroe,
                heroeImg: image
            });
            console.log(image);
        });
    }
      render(){
          return (
              
                <Card style={{ width: '30%' }} key={this.state.heroe.id}>
                    <Card.Img variant="top" alt={this.state.heroe.name} src={this.state.heroeImg} />
                    <Card.Body>
                        <Card.Title>{this.state.heroe.name}</Card.Title>
                        <Card.Text>
                            {this.state.heroe.description}
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
          );
      }
}


export default CardMarvel;
