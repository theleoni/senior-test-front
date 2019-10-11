import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Redirect } from 'react-router';

import Content from '../common/template/content';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Col from 'react-bootstrap/Col';
// import Table from 'react-bootstrap/Table';

import CheckinForm from '../checkin/checkinDashboardForm';

import { setModoTela } from './dashboardActions';
import { setModoTela as setModoTelaHospede, initForm as initFormHospede, add as addHospede } from '../hospede/hospedeActions';
import { setModoTela as setModoTelaCheckin, initForm as initFormCheckin, add as addCheckin } from '../checkin/checkinActions';

class Dashboard extends Component {

	UNSAFE_componentWillMount() {
	}

	render() {

		return (
			<Container>
				{this.getCustomCss()}

				{this.props.modoTela === 'cadastroHospede' ? this.redirectCadastroHospede() : null}

				{this.props.modoTela === 'lista' ? this.lista() : null}

			</Container>
		)
	}

	redirectCadastroHospede() {
		this.props.setModoTela('lista');
		return <Redirect to='/hospede' />;
	}

	getCustomCss() {
		return (
			<style type="text/css">
				{
					`
					.higher-top {
						margin-top: 30px;
					}

					.btn-custom-blue {
						background-color: #337ab8;
						color: #fff;
					}

					.form-row {
						margin-left: 0 !important;
						margin-right: 0 !important;
						padding-top: 8px;
						padding-bottom: 8px;
					}

					.col {
					}

					.form .form-title {
						background-color: #337ab8;
						color: #fff;
					}

					.form .form-title span {
						margin-left: 12px;
						font-size: 18px;
					}

					.form {
						margin-top: 20px;
						border: solid 1px #337ab8;
						border-radius: 6px;
						overflow: hidden;
					}

					.form .form-group {
						padding-left: 12px;
						padding-right: 12px;
						margin-bottom: 0;
					}

					.form .form-group .form-label {
						color: #676969;
					}

					.form .btn-line {
						padding: 12px;
					}

					`
				}
			</style>
		);
	}

	lista() {

		return (
			<Content className='higher-top'>

				<Button variant='custom-blue' onClick={() => {
						this.props.setModoTela('cadastroHospede');
						this.props.setModoTelaHospede('cadastro');
						this.props.initFormHospede({});
					}}>
					Incluir Hóspede
				</Button>

				{this.getFormCheckin()}

			</Content>
		)
	}

	getFormCheckin() {

		this.props.initFormCheckin({}, 'checkinDashboardForm');
		return <CheckinForm cadastrar onSubmit={this.props.addCheckin} />;
	}

	incluirPessoa() {
		return (
			<Container>
				{this.getCustomCss()}
			</Container>
		)
	}
}

const mapStateToProps = state => ({
	modoTela: state.dashboard.modoTela,
});
const mapDispatchToProps = dispatch => bindActionCreators({
	setModoTela,
	setModoTelaHospede, initFormHospede, addHospede,
	setModoTelaCheckin, initFormCheckin, addCheckin,
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
