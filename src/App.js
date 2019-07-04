import './App.css';
import Router from './router.js';


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }

  
  render(){
    return (
      <div className="App">

        <VacationForm/>
        {this.state.name}

        <Router/>

      </div>
    );
  }
}
