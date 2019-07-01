import React from 'react';


export default class Header extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render(){
    return (
      <div className="header">
          <img src="../uploads/sysco.png"></img>
        <h1>Sysco Vacation Form</h1>
    
      </div>
    );
  }
}