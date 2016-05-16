import ReactDOM from "react-dom";
import _ from 'lodash';
import React, {Component} from 'react';

import DarkNavbar from './components/navbar/dark-navbar';
import LightNavbar from './components/navbar/light-navbar';



class App extends Component {

	constructor(props){
		super(props);

		this.state = {
			item : [],
			item2 : null
		};

	}

	render(){

		return (

      <div className="col-lg-12">
        <div className="page-header">
          <h1 id="navbar">Navbar</h1>
        </div>
        <DarkNavbar />
        <LightNavbar />
      </div>

		);
	}
}

/*
take this component's html and put that ish in the DOM
*/

// ReactDOM.render(
// 	<App/>,
// 	document.querySelector('#container')
// );
