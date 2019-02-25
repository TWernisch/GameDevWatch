import React from 'react';

class Header extends React.Component {
	render () {
		return <div className="header">
		<h1>game dev watch</h1>
		<h4>The last place you’ll look for jobs in the gaming industry... probably.</h4>
		<input placeholder="Search for studios, positions, or locations..." className="omniSearch" value={this.state.filterAll} onChange={this.filterAll} />
		<h2>Latest Jobs</h2>
	  </div>
	}
}

export { Header }
