import ReactDOM from "react-dom";
import _ from 'lodash';
import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import PlayerTable from './containers/radial-chart/player-table';
import RadialChart from './containers/radial-chart/radial-chart';


import reducers from './reducers';

const store = createStore(reducers);


// import DarkNavbar from './components/navbar/dark-navbar';
// import LightNavbar from './components/navbar/light-navbar';

class App extends Component {

	constructor(props){
		super(props);

		// this.state = {
		// 	item : [],
		// 	item2 : null
		// };

	}



}

/*
take this component's html and put that ish in the DOM
*/

ReactDOM.render(
	<Provider store={store}>
		<PlayerTable />
	</Provider>,
	document.querySelector('.player-table-container')
);

ReactDOM.render(
	<Provider store={store}>
		<RadialChart />
	</Provider>,
	document.querySelector('.radial-chart-container')
);
//
// ReactDOM.render(
// 	<DarkNavbar />,
// 	document.querySelector('.react-container-2')
// );
