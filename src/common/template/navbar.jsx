import React from 'react';
import { Link } from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

export default props => (
	<div>
		<style type="text/css">
			{
				`
				.navbar-greenish {
					background-color: #3b9480;
				}
				.nav-link {
					color: #fff;
				}
				.nav-link:hover {
					color: #d8d8d8;
				}
				`
			}
		</style>
		<Navbar expand="lg" variant="greenish">
			<Container>
				<Link to='/' className='navbar-brand'>
					<img src="https://www.senior.com.br/wp-content/themes/senior-2019/content/assets/images/logo-senior.svg" alt="logo Senior" className="navbar-brand-img"/>
				</Link>

				<Nav className="mr-auto">
					<Link to='hospede' className='nav-link'> Hóspede </Link>
					<Link to='checkin' className='nav-link'> Check in </Link>
				</Nav>

			</Container>
		</Navbar>
	</div>
);
