import React from "react";
import '../App.scss';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import  Home  from "../views/home/home";

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
    path: "/heroes",
    sidebar: () => <div>bubblegum!</div>,
    main: () => <h2>Bubblegum</h2>
  },
  {
    path: "/shoelaces",
    sidebar: () => <div>shoelaces!</div>,
    main: () => <h2>Shoelaces</h2>
  }
];

function menuHeroes () {
  return (
    <Router>
        
      <div class="marvelApp">
        <div>
            <nav class="navbar navbar-expand-lg">

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <Link to="/">Home</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/heroes">Heroes</Link>
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
