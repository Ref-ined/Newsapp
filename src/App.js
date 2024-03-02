import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";


const App = ()=> {
  const pageSize=5
  const apiKey=process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0);
  // console.log(typeof(progress))
    return (
      <Router>
        <div>
          <Navbar />
          <LoadingBar
            height = {3}
            color='#f11946'
            progress={progress}
          />
          <Switch>
            <Route exact path="/"><News 
// @ts-ignore
            setProgress= {setProgress} apiKey={apiKey} key="general" category="general" pageSize={pageSize} /></Route>
            <Route exact path="/business"><News 
// @ts-ignore
            setProgress= {setProgress} apiKey={apiKey} key="business" category="business" pageSize={pageSize} /></Route>
            <Route exact path="/entertainment"><News 
// @ts-ignore
            setProgress= {setProgress} apiKey={apiKey} key="entertainment" category="entertainment" pageSize={pageSize} /></Route>
            <Route exact path="/health"><News 
// @ts-ignore
            setProgress= {setProgress} apiKey={apiKey} key="health" category="health" pageSize={pageSize} /></Route>
            <Route exact path="/science"><News 
// @ts-ignore
            setProgress= {setProgress} apiKey={apiKey} key="science" category="science" pageSize={pageSize} /></Route>
            <Route exact path="/sports"><News 
// @ts-ignore
            setProgress= {setProgress} apiKey={apiKey} key="sports" category="sports" pageSize={pageSize} /></Route>
            <Route exact path="/technology"><News 
// @ts-ignore
            setProgress= {setProgress} apiKey={apiKey} key="technology" category="technology" pageSize={pageSize} /></Route>
          </Switch>
        </div>

      </Router>
    )
  
}

export default App;
