import React, { Component } from 'react';
import { observer, Provider, Observer } from 'mobx-react';

import Notes from './notes';
import Store from './mobx_store';

const store = new Store();

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			notes : true
		};
	}

	render() {
		return (
			<div className="App row">
				<div className="col-12 mt-3">
					<Provider store={store}>
						<Notes />
					</Provider>
				</div>
			</div>
		);
	}
}

export default App;