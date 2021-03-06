import React from "react";
import '../App.scss';
import { Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import  Home  from "../views/home/home";
import Listado from "../views/listado/listado";
import ListadoSeries from "../views/listado/listadoSeries";
import ListadoStories from "../views/listado/listadoStories";
import ListadoComics from "../views/listadoComics/listadoComics";
import ListadoEventos from "../views/listadoEventos/listadoEventos";
import Single from "../views/single/single";
import SingleComic from "../views/single/singleComic";
import SingleEvento from "../views/single/singleEvento";
import SingleSerie from "../views/single/singleSerie";
import SingleStory from "../views/single/singleStory";
import Footer from "../components/footer/footer";
// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.
const routes = [
  {
	path: "/",
	exact: true,
	main: Home
  },
  {
	path: "/heroes/:page",
	main: Listado,
	exact: true
  },
  {
	path: "/heroe/:id",
	main: Single,
	exact: true
  },
  {
	path: "/comics/:page",
	main: ListadoComics,
	// exact: true
  },
  {
	path: "/comic/:id",
	main: SingleComic,
	exact: true
  },
  {
	path: "/events/:page",
	main: ListadoEventos,
	exact: true
  },
  {
	path: "/event/:id",
	main: SingleEvento,
	exact: true
  },
  {
	path: "/series/:page",
	main: ListadoSeries,
	exact: true
  },
  {
	path: "/serie/:id",
	main: SingleSerie,
	exact: true
  },
  {
	path: "/stories/:page",
	main: ListadoStories,
	exact: true
  },
  {
	path: "/story/:id",
	main: SingleStory,
	exact: true
  }
];

function menuHeroes () {
  return (
	<Router>
		
	  <div className="marvelApp">
		<div>
			<Navbar bg="primary" variant="dark" expand="lg">
				<Navbar.Brand href="/"><img src="https://upload.wikimedia.org/wikipedia/commons/0/04/MarvelLogo.svg" alt="Marvel App React"/></Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="/heroes/1">Heroes</Nav.Link>
						<Nav.Link href="/comics/1">Comics</Nav.Link>
						<Nav.Link href="/events/1">Eventos</Nav.Link>
						<Nav.Link href="/series/1">Series</Nav.Link>
						<Nav.Link href="/stories/1">Historias</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
		<Switch>
		  {routes.map((route, index) => (
			// Render more <Route>s with the same paths as
			// above, but different components this time.
			<Route
				key={index}
				path={route.path}
				exact={route.exact}
				component={route.main}
			/>
		  ))}
		  </Switch>
	  <Footer />
	  </div>
	</Router>
  );
}

export default menuHeroes;
