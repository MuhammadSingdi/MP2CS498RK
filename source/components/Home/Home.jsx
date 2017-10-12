import React, { Component } from 'react'
import { Button, Header, Image, Modal, Form} from 'semantic-ui-react'
import { BrowserRouter as Router,
          Route,
          Link } from 'react-router-dom'
import axios from 'axios'

import styles from './Home.scss'

const options = [
  { key: 'r', text: 'Rank', value: 'rank' },
  { key: 'p', text: 'Popularity', value: 'popularity' },
]

const optionstwo = [
  { key: 'a', text: 'Ascending', value: 'ascending' },
  { key: 'd', text: 'Descending', value: 'descending' },
]

require('./Home.scss');
// var detail = require('../detail/detail.jsx');
// import detail from '../detail/detail.jsx';

class Home extends Component {
	constructor(props){
		super(props);
		this.state = {text: '', source: '', pics: [], actPics: [], modals: [], sortpar: 'vote_average', sortOrder: 'ascending'};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.addDivs = this.addDivs.bind(this);
		this.show = this.show.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleSortChangetwo = this.handleSortChangetwo.bind(this);
    this.handleSortChangefinal = this.handleSortChangefinal.bind(this);
	}

	handleSubmit(e){
		//e.preventDefault();
		var imagepath = "hye";
		var self = this;
		axios.get('https://api.themoviedb.org/3/search/movie?api_key=aaf2bb0a67bc3163e6e03c5414bc1c79&query=' + this.state.text)
  		.then(function (response) {
    		imagepath = response.data.results[0].poster_path
    	//	self.setState({source: 'https://image.tmdb.org/t/p/w185' + imagepath});
    		self.setState({pics: response.data.results});
    	//	console.log(self.state.pics);
     
    		self.addDivs();
  		})
  		.catch(function (error) {
    		console.log(error);
  		});
 // 	console.log(imagepath);
  		    //		this.setState({source: 'https://image.tmdb.org/t/p/w500' + imagepath});
	}

	handleChange(e) {
    this.setState({ text: e.target.value });
    this.handleSubmit();
  	}

  handleSortChangefinal(){
  //  console.log(value);
  var param = this.state.sortpar;
  console.log(param);
  //this.setState({sortOrder: value});
  if(this.state.sortOrder == "descending"){
    var ghg = this.state.pics.sort(function(a, b){
        if(parseInt(a[param]) > parseInt(b[param]))
            return 1;
        else if(parseInt(a[param]) < parseInt(b[param]))
            return -1;
        else
            return -1;
          });
    this.setState({pics : ghg});
    console.log(this.state.pics);
    this.addDivs();
  }
  else if(this.state.sortOrder == "ascending"){
    var ghg = this.state.pics.sort(function(a, b){
        if(parseInt(a[param]) > parseInt(b[param]))
            return -1;
        else if(parseInt(a[param]) < parseInt(b[param]))
            return 1;
        else
            return 1;
      });
    this.setState({pics : ghg});
       console.log(this.state.pics);
    this.addDivs();
  }
  }

  handleSortChange(value){
    this.setState({sortOrder: value});
    this.handleSortChangefinal();
  }

  handleSortChangetwo(value){
    if(value == "rank"){
      this.setState({sortpar: "vote_average"});
    } else {
      this.setState({sortpar: "popularity"});
    }
    this.handleSortChangefinal();
  }

  	addDivs() {
  		let items = [];
  		let modal = [];
  		for(var i =0; i < this.state.pics.length; i++){
  			var xxx = this.state.pics[i];
  			var self = this;
  			items.push(
  				<div className="item" onClick={(function(i){
     										return function(){
         									self.show(i)
     										}})(i)}>
  				<div className="ui tiny image">
      				<img src={'https://image.tmdb.org/t/p/w185' + this.state.pics[i].poster_path}/>
    			</div>
    			<div className="content"><Link to={`/detail/${self.state.pics[i].id}`}>
    				<div className="header">{this.state.pics[i].title}</div>
    				<div className="description">
    					<p>{this.state.pics[i].overview}</p>
    			</div>
          </Link>
    			</div>
    			</div>
  			)
  		//	document.getElementById("bye2").onclick = this.show(i);
  		}
  		this.setState({actPics: items});
  	}

  	show(i) {
  	 console.log(i);
  	}



    render() {
    return (
    <div>
    <div className="ui tabular menu">
  <a className="item active">
    List
  </a>
  <a className="item"><Link to={'/gallery'}>
    Gallery
    </Link>
  </a>
</div>
      <div>
        <h3>Movies</h3>
        <img src={this.state.source}/>
    <Form>
    <Form.Group widths='equal'>
      <Form.Input onChange = {this.handleChange} placeholder='Movie name'/>
      <Form.Select onChange = {(e, { value }) => this.handleSortChange(value)} options={optionstwo} placeholder='Sort By' />
    </Form.Group>
    <Form.Select onChange = {(e, { value }) => this.handleSortChangetwo(value)} options={options} placeholder='Sort Order' />
  </Form>
      </div>
      <div className="ui link items">
  		{this.state.actPics}
	  </div>
		</div>
    );
  }
}




export default Home
