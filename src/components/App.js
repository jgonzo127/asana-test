import React, { Component } from 'react';
import '../App.css';
import logo from '../logo.png';
import Task from './Task';
import Asana from '../util/Asana';

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
        tasks: [],
        projectId: ''
    }
    this.removeTask = this.removeTask.bind(this);
  }

  componentDidMount() {
    Asana.getAsanaProject().then( (projectId) => {
      Asana.getAsanaTasks().then( (data) => {
          this.setState({ tasks: data, projectId: projectId });
          Asana.setLocation(this.state.projectId);
      })
      
    });
  }
  
  removeTask(id) {
    const tasks = this.state.tasks;
    const newTasks = tasks.filter( (task) => {
      return( task.id !== id );
    });
    this.setState({ tasks: newTasks });
  }

  render() {
    const tasks = this.state.tasks;

    return( 
      <div className="App">
      <img className="App-logo" alt="logo" src={logo}/>
        <div className="task-wrapper">
          {tasks.map( (task) => {
            if( task.name ) {
                return <Task project={this.state.projectId} key={task.id} name={task.name} id={task.id} onRemove={this.removeTask}/>;
              } else {
                return '';
              }
            })
          }
        </div>
      </div>
    );
  }
}


export default App;
