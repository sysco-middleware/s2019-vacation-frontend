import SelectSearch from 'react-select-search'

import React from 'react';
import '../styling/searchBar.css';

const options = [
    {name: 'Sommerstudent', value: 'sommer'},
    {name: 'Ansatt-Oslo', value: 'oslo'},
    {name: 'Personalansvarlig', value: 'personal'},
    {name: 'Ansatt-Haugesund', value: 'haugesund'}
];


export default class SearchBar extends React.Component {
    constructor(props){
      super(props)
      this.state = {

      }
    }
    
    render(){
      return (
        <div className="SearchBar">            
            <SelectSearch options={options}  name="searchField" placeholder="Search" />
        </div>
      );
    }
  }