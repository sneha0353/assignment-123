import React, { useReducer } from "react"
import {Route,BrowserRouter as Router,Switch} from "react-router-dom"
import Home from "./components/Home"

import Test from "./components/elements/Test"
import { initialState, reducer } from "./context/reducer"
import {Context} from "./context/context";
import Character from "./components/Character"

const App=()=>{

  const [state,dispatch] = useReducer(reducer, initialState);
  return(
    <div className="App">
      <Context.Provider value={{state,dispatch}}>
      <Router>
      <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/get-started" component={Test}/>
      <Route exact path="/character" component={Character}/>
      </Switch>
      </Router>
      </Context.Provider>
    </div>
  )
}

export default App;
