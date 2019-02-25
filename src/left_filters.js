import React from 'react';

class LeftFilters extends React.Component {
	render () {
		return <div>
					<div class="roles"><h3>roles</h3><input type="checkbox" value="Art / Animation" onChange={this.filterAll}/>Art / Animation</div>
					<div class="roles"><h3>locations</h3></div>
					<div class="roles"><h3>studios</h3></div>
				</div>
	}
}

export { LeftFilters }
