import React from 'react';
import Select from 'react-select';
import '../styling/searchBar.css';
import axios from 'axios';
import _ from 'lodash';



// const tags = [
//   { label: "Norway", value: 1 },
//   { label: "Student", value: 2 },
//   { label: "Oslo", value: 3 },
//   { label: "Personalansvarlig", value: 4 },
//   { label: "Leder", value: 5 },
// ];


export default class SearchBar2 extends React.Component {
    constructor(props){
        super(props)
        this.state = {
           tags: [],
        }
    }

    componentDidMount() {
      this.fetchTags();
    }

    fetchTags = async () => {
      const response = await axios.get(`https://sysco-feri.herokuapp.com/api/user/tags`)
                .catch(error => {
                    
                });

            console.log(response);
            if (response !== null && response !== undefined) {
                if (response.status === 200) {
                  const list = []
                  const tags = response.data
                  _.forEach(tags, (t, i) => {
                    list.push({label: t, value: i})
                  })
                    await this.setState({tags: list})
                } else {
                    console.log("error")
                }
              }
    }

    render(){
      return (
        <div className="SearchBar2">            
            <Select options={this.state.tags} onChange= { (opt, meta) => console.log(opt, meta)}></Select>
        </div>
      );
    }
  }