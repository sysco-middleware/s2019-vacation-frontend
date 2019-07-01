import React from 'react';
import logo from './logo.svg';
import './App.css';
import VacationForm from './components/vacationForm.js';

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: "hei"
    }
  }



  
  render(){
    return (
      <div className="App">
        <VacationForm/>
        {this.state.name}
      </div>
    );
  }
}
