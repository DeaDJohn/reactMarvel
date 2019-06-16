import React from 'react';
// import '../../App.scss';
import Carousel from 'react-bootstrap/Carousel';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';
import  CardMarvel  from "../../components/card/CardMarvel";

class Home extends React.Component {

    render(){
        return(
            <div>
                <Carousel fade={true}>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="../../assets/marvel-compressor.jpeg"
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
                        src="../../assets/capitana_marvel.jpg"
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
                <Container className="home-destacados">
                    <Row className="justify-content-between">
                        <CardMarvel heroe="1009610" ></CardMarvel>
                        <CardMarvel heroe="1009220" ></CardMarvel>
                        <CardMarvel heroe="1009368" ></CardMarvel>
                    </Row>
                </Container>
            </div>     
        );
    }
}

export default Home;