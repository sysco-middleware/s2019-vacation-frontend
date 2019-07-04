import React from 'react';
import './general.css';


export default class Header extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render(){
    return (
      <div className="header">
          <img src="https://haugesundil.no/wp-content/uploads/2017/04/Sysco_logo_RGB-1-e1467987962479.jpg" id="syscoLogo" alt="sysco_Logo"></img>
        <h1>Sysco Vacation Form</h1>
      </div>
    );
  }
}