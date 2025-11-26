import React from "react";
import {useRoutes} from "react-router";
import { routes } from './APPRouteV6';

const App = (...props) => {
	console.log('App props:', props);
	const element = useRoutes(routes);
	return element;
}

export default App;