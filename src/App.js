import React from 'react';
import './App.css';
import VacationForm from './components/vacationForm.js';
import Header from './components/header.js';
import bilde from './uploads/vaca.png';
import Login from './components/login.js';
import Requests from './components/requests.js';


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
        <Header/>
        <Requests/>
        <Login/>
        <VacationForm/>
        <img src={bilde}></img>
      </div>
    );
  }
}
