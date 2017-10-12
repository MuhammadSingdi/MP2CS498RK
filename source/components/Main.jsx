import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home/Home.jsx';
import detail from './detail/detail.jsx';
import gallery from './gallery/gallery.jsx';

const Main = () => (
	<main>
		<Switch>
			<Route exact path='/' component={Home}/> 
			<Route path= '/detail/:number' component = {detail}/>
			<Route path= '/gallery' component = {gallery}/>
		</Switch>
	</main>
)

export default Main

