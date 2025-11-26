import loadable from '@loadable/component';
import React from 'react';

const HomePage = loadable(() =>
	import(/* webpackChunkName: "HomePage", webpackMode: "lazy" */ './Home')
);

const AboutPage = loadable(() =>
	import(/* webpackChunkName: "AboutPage", webpackMode: "lazy" */ './About')
);

export const routes = [
    {
        path: '/',
        element: <HomePage />
    },
    {   
        path: '/about',
        element: <AboutPage />
    }
]