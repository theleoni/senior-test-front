import '../common/template/dependencies';
import React from 'react';
import { HashRouter } from 'react-router-dom';

import Navbar from '../common/template/navbar';
import Footer from '../common/template/footer';

import Routes from './routes';

export default props => (
	<HashRouter>
		<div className='wrapper'>
			<Navbar />
			<Routes />
			<Footer />
		</div>
	</HashRouter>
);
