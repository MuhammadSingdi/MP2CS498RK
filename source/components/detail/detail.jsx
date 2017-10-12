import React, { Component } from 'react'
import { Button, icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

import axios from 'axios'

import styles from './detail.scss'

require('./detail.scss');

class detail extends Component {
	constructor(props){
		super(props);
		this.state = {ID : props.match.params.number, text : '', actPics: []};
		this.funcc = this.funcc.bind(this);
		this.addDiv = this.addDiv.bind(this);
		this.doSum = this.doSum.bind(this);
	}

	doSum(){
		//console.log(this.state.ID);
		// console.log(parseInt(this.state.ID)+1);
		var tt = parseInt(this.state.ID)+1;
		  console.log(tt);
		this.funcc(tt);
	}

	doSumm(){
		//console.log(this.state.ID);
		// console.log(parseInt(this.state.ID)+1);
		var tt = parseInt(this.state.ID)-1;
		  console.log(tt);
		this.funcc(tt);
	}


	funcc(index){
		var self = this;
		axios.get('https://api.themoviedb.org/3/movie/' + index + '?api_key=aaf2bb0a67bc3163e6e03c5414bc1c79&query=')
			.then(function (response) {
			//	console.log(response);
				self.setState({text: response.data, ID: index});
				self.addDiv();
			})
			.catch(function (error) {
				self.setState({ID: index});
    		console.log(error);
  		});
	}

	addDiv(){
		let items = [];
		items[0] = (
		<div className="item">
    <a className="ui small image">
      <img src = {'https://image.tmdb.org/t/p/w185' + this.state.text.poster_path}/>
    </a>
    <div className="content">
      <a className="header">{this.state.text.title}</a>
      <div className="description">
        <p>{this.state.text.overview}</p>
        <p>{this.state.text.overview}</p>
      </div>
    </div>
  </div>
  	)
	this.setState({actPics: items});
	}
	
	componentWillMount() {
		{this.funcc(this.props.match.params.number)}
	}


    render() {
    	// {this.funcc(this.props.match.params.number)}
        return(
        	<div>
        	<div id = "carousel">
        	<i onClick={() => this.doSum()} id="rightArrow" className="massive arrow circle outline right icon"></i>
        	<i onClick={() => this.doSumm()} id="leftArrow" className="massive arrow circle outline left icon"></i>
        	</div>
        	<div id = "now" className="ui items">
        		{this.state.actPics}
			</div>
        	</div>
        )
    }
}

detail.propTypes = {
  number: PropTypes.string
};

export default detail