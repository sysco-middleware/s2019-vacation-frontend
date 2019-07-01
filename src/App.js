import React from 'react';
import './App.css';
import VacationForm from './components/vacationForm.js';
import Header from './components/header.js';

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
        <Header/>
        {this.state.name}
      </div>
    );
  }
}
