import React, { Fragment, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Jobs from "./components/jobs/Jobs";
import AddJob from "./components/jobs/AddJob";
import EditJob from "./components/jobs/EditJob";
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';
import { Provider } from "./context";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import "./App.css";


function App() {
  useEffect(() => {
    // initalize materialize js
    M.AutoInit();
  });

  return (
    <Provider>
    <Router>
      <Fragment>
        <Navbar />
        
        <div className="col-11">
          <Switch>
          <Route exact path='/' component={Jobs} />
          <Route exact path='/job/add' component={AddJob} />
          <Route exact path='/job/edit/:id' component={EditJob} />
          <Route exact path='/about' component={About} />
          <Route  component={NotFound} />

          </Switch>
        </div>
      </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
