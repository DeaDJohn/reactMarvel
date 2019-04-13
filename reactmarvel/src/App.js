import React, { Component } from 'react';
import './App.scss';
import Carousel from 'react-bootstrap/Carousel';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'

import { getCharacterInfo, getCharacters } from "./service/services";

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			spiderman: null,
		};
	}
	componentWillMount(){
		var spiderman = getCharacterInfo(1009610).then( response => response.data.results);
		this.setState({
			spiderman: spiderman
		});
		console.log(this.state.spiderman);
	}
	render() {
		return (
			<div className="App">
				<header>
					
				</header>
				<Carousel fade={true}>
					<Carousel.Item>
						<img
						className="d-block w-100"
						src="http://www.cinefagos.es/wp-content/uploads/2015/04/Marvel.jpg"
						alt="First slide"
						/>
						<Carousel.Caption>
						<h2>Bienvenido a la App de Marvel</h2>
						<h4>Que mejor manera de aprender react que con los superheroes preferidos</h4>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<img
						className="d-block w-100"
						src="https://hipertextual.com/files/2019/02/hipertextual-escena-post-creditos-capitana-marvel-conectada-con-avengers-4endgame-2019678495-4096x2304.jpg"
						alt="Third slide"
						/>

						<Carousel.Caption>
						<h2>Bienvenido a la App de Marvel</h2>
						<h4>Que mejor manera de aprender react que con los superheroes preferidos</h4>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<img
						className="d-block w-100"
						src="https://img-cdn.hipertextual.com/files/2019/03/hipertextual-nuevo-spoiler-avengers-endgame-adelanta-batalla-monumental-2019674741.jpg?strip=all&lossy=1&quality=60&ssl=1"
						alt="Third slide"
						/>

						<Carousel.Caption>
						<h2>Bienvenido a la App de Marvel</h2>
						<h4>Que mejor manera de aprender react que con los superheroes preferidos</h4>
						</Carousel.Caption>
					</Carousel.Item>
					</Carousel>
				<Jumbotron fluid>
						<Container>
							<h1>Aprendiendo React</h1>
							<p>
								Pues nada que estoy aprendiendo a desarrollar en ReactJs y se me ha ocurrido hacerlo con la tematica marvel
							</p>
						</Container>
					</Jumbotron>
					<Container>
						<Row className="justify-content-between">
							<Card style={{ width: '30%' }}>
								<Card.Img variant="top" src="https://as00.epimg.net/showroom/imagenes/2018/04/25/portada/1524648118_060761_1524649708_noticia_normal.jpg" />
								<Card.Body>
									<Card.Title>Card Title</Card.Title>
									<Card.Text>
										Some quick example text to build on the card title and make up the bulk of
										the card's content.
									</Card.Text>
									<Button variant="primary">Go somewhere</Button>
								</Card.Body>
							</Card>
							<Card style={{ width: '30%' }}>
								<Card.Img variant="top" src="https://as00.epimg.net/showroom/imagenes/2018/04/25/portada/1524648118_060761_1524649708_noticia_normal.jpg" />
								<Card.Body>
									<Card.Title>Card Title</Card.Title>
									<Card.Text>
										Some quick example text to build on the card title and make up the bulk of
										the card's content.
									</Card.Text>
									<Button variant="primary">Go somewhere</Button>
								</Card.Body>
							</Card>
							<Card style={{ width: '30%' }}>
								<Card.Img variant="top" src="https://as00.epimg.net/showroom/imagenes/2018/04/25/portada/1524648118_060761_1524649708_noticia_normal.jpg" />
								<Card.Body>
									<Card.Title>Card Title</Card.Title>
									<Card.Text>
										Some quick example text to build on the card title and make up the bulk of
										the card's content.
									</Card.Text>
									<Button variant="primary">Go somewhere</Button>
								</Card.Body>
							</Card>
						</Row>
					</Container>
			</div>
		);
	}
}

export default App;
