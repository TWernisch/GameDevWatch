import React from "react";
import "./index.css";
import { render } from "react-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from 'match-sorter'
import "./Utils.js";
/* import {LeftFilters} from "./left_filters.js";
 import {Header} from "./header.js";*/
var myRealData = require('./myData.json');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: myRealData,
	  filtered: [],
      filterAll: '',
    };
	
	this.filterAll = this.filterAll.bind(this);
	this.filterToggle = this.filterToggle.bind(this);
  }
  
  onFilteredChange(filtered) {
    /* if (filtered.length > 1 && this.state.filterAll.length) {
      // NOTE: this removes any FILTER ALL filter
      const filterAll = '';
      this.setState({ filtered: filtered.filter((item) => item.id !== 'all'), filterAll })
    }
    else */
      this.setState({ filtered });
  }

  filterAll(e) {
    const { value } = e.target;
    const filterAll = value;
    const filtered = [{ id: 'all', value: filterAll}];
	console.log(filtered);
    // NOTE: this completely clears any COLUMN filters
    this.setState({ filterAll, filtered });
  }
  
  filterToggle(e) {
	  const roleFilter = e.target;
	  if (roleFilter.checked === true) {
	  console.log(roleFilter.value);
	  } else {
		  
	  }
	  
  } 
 
  
  render() {
    const { data } = this.state;
    return (
	<div className="everything">
	  <div className="backgroundWash" />
	  <div className="header">
		<h1>game dev watch</h1>
		<h4>The last place you’ll look for jobs in the gaming industry... probably.</h4>
		<input placeholder="Search for studios, positions, or locations..." className="omniSearch" value={this.state.filterAll} onChange={this.filterAll} />
		<h2>Latest Jobs</h2>
	  </div>
	  <div className="content">
		  <div className="container container_filters">
			<div>
					<div className="roles">
						<h3>roles</h3>
							<input type="checkbox" value="Art / Animation" onChange={this.filterToggle}/>Art / Animation<br/>
							<input type="checkbox" value="Engineering" onChange={this.filterToggle}/>Engineering<br/>
							<input type="checkbox" value="Game Design" onChange={this.filterToggle}/>Game Design
					</div>
					<div className="roles"><h3>locations</h3></div>
					<div className="roles"><h3>studios</h3></div>
			</div>
		  </div>
		  <div className="container container_entries">
				<ReactTable
				  filtered={this.state.filtered}
				  onFilteredChange={this.onFilteredChange.bind(this)}
				  data={data}
				  defaultFilterMethod={(filter, row) =>
					String(row[filter.id]) === filter.value}
				  columns={[
						{
						  Header: "Position",
						  id: "position",
						  accessor: "position",
						  Cell: row => (<div id="position"><a rel="noopener noreferrer" target="_blank" href={row.row.position_url}>{row.value}</a></div>),
							style:{ 'whiteSpace': 'unset'},
							filterMethod: (filter, row) => {
							return row[filter.id].includes(filter.value);
						  }
						},
						{
						  Header: "Role",
						  id: "role",
						  accessor: "role",
						  filterMethod: (filter, row) => {
							return row[filter.id].includes(filter.value);
						  }
						},

						{
						  Header: "Company",
						  id: "company",
						  accessor: "company",
						  Cell: row => (<div><a rel="noopener noreferrer" target="_blank" href={row.row.company_url}>{row.value}</a></div>),
						  style:{ 'whiteSpace': 'unset'},
						  filterMethod: (filter, row) => {
							return row[filter.id].includes(filter.value);
						  }
						
						},	
						{
						  Header: "Location",
						  accessor: "local",
						  filterMethod: (filter, row) => {
							return row[filter.id].includes(filter.value);
						  }
						},
						{
						  Header: "Date",
						  accessor: "postdate",
						  filterMethod: (filter, row) => {
							return row[filter.id].includes(filter.value);
						  },
						  width: 80
						 
						},
						//Even though these are displayed, they need to be called to be made valid?
						{
						  accessor: "company_url",
						  Cell: row => (
							<div/>	),
						  width: 0,
						  resizable: false,
						  sortable: false,
						},
						{
						  accessor: "position_url",
						  Cell: row => (
							<div/>	),
						  width: 0,
						  resizable: false,
						  sortable: false,
						},
						{
						  // NOTE - this is a "filter all" DUMMY column
						  // you can't HIDE it because then it wont FILTER
						  Header: "",
						  id: 'all',
						  width: 0,
						  resizable: false,
						  sortable: false,
						  Filter: () => { },
						  getProps: () => {
							return {
							}
						  },
						  filterMethod: (filter, rows) => {
							// using match-sorter
							const result = matchSorter(rows, filter.value, {
							  keys: [
								"company",
								"position",
								"role",
								"location"
							  ]
							});
							console.log('row[0]:', result[0]);
							return result;
						  },
						  filterAll: true,
						}
					  ]}
				  defaultPageSize={10}
				  loader={true}
				  showPageSizeOptions={false}
				  minRows={0}
				  filterable={false}
				  getTrProps={(state,rowInfo)=>{ 
					return {} 
				  }}
				  className="-striped -highlight"
				/>
			</div>
			</div>
		</div>
    );
  }
}

render(<App />, document.getElementById("root"));
