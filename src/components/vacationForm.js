import React from 'react';

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: "hei"
    }
  }

  runner = () => {
    const list = []
    for(let i =0; i<=12; i++){
      list[i] = i
    }
    return list
  }

  
  render(){
    return (
      <div className="App">
        <h1>Legg inn dine ferieønsker!</h1>
        <div class="box"></div>
        <button>Send inn ferieønsker!</button>
        {this.state.name}
        <ul>
        {this.runner().map(o => (<li>{o}</li>))}
        </ul>
      </div>
    );
  }
}