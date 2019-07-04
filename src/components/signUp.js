import React from 'react';
import './general.css';
import SignUpForm from './signUpForm.js';


export default class signUp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        return (
            <div className="signUp">
                <div>
                    <SignUpForm/>
                </div>
            </div>
        );
    }
}