import React from 'react';
import logo from './logo.svg';
import './App.css';
import Project from "./component/project/Project";
import {ProjectInterface} from "./models/project";

/*
function App() {
  let projects: ProjectInterface[] = [
      {id:1, active:true, deadline:new Date(), name:'test1'},
      {id:2, active:true, deadline:new Date(), name:'test2'}

  ];




  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-dark">
        <div className="navbar-text center">
          Timelogger
        </div>

      </nav>

      <div className="row">
        {projects.map(project =>
            <div className="col-3">
              <Project key={project.id} project={project} />
            </div>
        )}
      </div>
    </div>
  );
}

export default App;
*/



class App extends React.Component {
  projects: ProjectInterface[] = [];

  render() {
    return (
        <div className="App">
          <nav className="navbar navbar-dark bg-dark">
            <div className="navbar-text center">
              Timelogger
            </div>

          </nav>

          {/*{this.projects.map(project =>*/}
          {/*    <Project key={project.id}  />*/}
          {/*    // project={project}*/}
          {/*)}*/}
        </div>
    );
  }
}

