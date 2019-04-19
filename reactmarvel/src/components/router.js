import React from "react";
import '../App.scss';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import  Home  from "../views/home/home";
import Listado from "../views/listado/listado";
import Single from "../views/single/single"
// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.
const routes = [
  {
    path: "/",
    exact: true,
    sidebar: () => <div>home!</div>,
    main: Home
  },
  {
    path: "/heroes/:page",
    sidebar: () => <div>Listado</div>,
    main: Listado
  },
  {
    path: "/heroe/:id",
    sidebar: () => <div>Heroe!</div>,
    main: Single
  }
];

function menuHeroes () {
  return (
    <Router>
        
      <div className="marvelApp">
        <div>
            <nav className="navbar navbar-expand-lg">

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link to="/"><img src="https://upload.wikimedia.org/wikipedia/commons/0/04/MarvelLogo.svg" alt="Marvel App React"/></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/heroes/1">Heroes</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>

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
      </div>
    </Router>
  );
}

export default menuHeroes;
