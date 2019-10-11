import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Dashboard from '../dashboard/dashboard';
import Hospede from '../hospede/hospede';
import Checkin from '../checkin/checkin';

export default props => (
	<div className='content-wrapper'>
		<Switch>
			<Route exact path='/' component={Dashboard} />
			<Route path='/hospede' component={Hospede} />
			<Route path='/checkin' component={Checkin} />
			<Redirect from='*' to='/' />
		</Switch>
	</div>
);
