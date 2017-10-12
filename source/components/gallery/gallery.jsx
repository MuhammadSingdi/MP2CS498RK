
import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


import axios from 'axios'
import styles from './gallery.scss'

class gallery extends Component {
	constructor(props){
		super(props);
		this.state = {pics: [], actPics: [], activeItem: '878'};
		this.funcc = this.funcc.bind(this);
		this.addDivs = this.addDivs.bind(this);
	}

	funcc(genreID){
		var self = this;
		axios.get('https://api.themoviedb.org/3/genre/' + genreID + '/movies?api_key=aaf2bb0a67bc3163e6e03c5414bc1c79&query=&language=en')
  		.then(function (response) {
    	//	self.setState({source: 'https://image.tmdb.org/t/p/w185' + imagepath});
    		self.setState({pics: response.data.results, activeItem: genreID});
    	//	console.log(self.state.pics);
     
    		self.addDivs();
  		})
  		.catch(function (error) {
    		console.log(error);
  		});
	}

addDivs() {
  		let items = [];

  		for(var i =0; i < this.state.pics.length; i++){
  			var self = this;
  			if(this.state.pics[i].poster_path != null){
  			items.push(
  				<div className="four wide column">
  				<div><Link to={`/detail/${self.state.pics[i].id}`}>
      				<img src={'https://image.tmdb.org/t/p/w300' + this.state.pics[i].poster_path}/>
      			</Link>
    			</div>
    			</div>
  			)
  		}
  			else
  				items.push(
  					<div className="four wide column">
  				<div><Link to={`/detail/${self.state.pics[i].id}`}>
      				<img src={'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Pictogram_voting_question.svg/220px-Pictogram_voting_question.svg.png'}/>
      			</Link>
    			</div>
    			</div>
  				)
  		//	document.getElementById("bye2").onclick = this.show(i);
  		}
  		this.setState({actPics: items});
  	}


	componentWillMount() {
		{this.funcc('878')}
	}

  handleChangefour(name){
    if(name == "Science Fiction"){
      this.funcc('878');
    }
    if(name == "Romance"){
      this.funcc('10749');
    }
    if(name == "Comedy"){
      this.funcc('35');
    }
  }




    render() {
        return(
        	<div>
          <div className="ui tabular menu">
  <a className="item"><Link to={'/'}>
    List
    </Link>
  </a>
  <a className="item active">
    Gallery
  </a>
</div>
        	<Menu color='blue' widths={3}>
        <Menu.Item name='Science Fiction' active={this.state.activeItem === '878' } onClick={(e, { name }) => this.handleChangefour(name)} />
        <Menu.Item name='Romance' active={this.state.activeItem === '10749'} onClick={(e, { name }) => this.handleChangefour(name)} />
        <Menu.Item name='Comedy' active={this.state.activeItem === '35'} onClick={(e, { name }) => this.handleChangefour(name)} />
      </Menu>
        	<div className="ui grid">
        		{this.state.actPics}
        	</div>
        	</div>
        )
    }
}

export default gallery