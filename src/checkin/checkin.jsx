import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import moment from 'moment';

import Content from '../common/template/content';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

import CheckinForm from './checkinForm';
import { setModoTela, initForm, add, update, remove } from './checkinActions';

class Checkin extends Component {

	UNSAFE_componentWillMount() {
	}

	render() {

		return (
			<Container>
				{this.getCustomCss()}

				{this.props.modoTela === 'cadastro' ? (
					<CheckinForm cadastrar onSubmit={this.props.add} />
				) : null}
				{this.props.modoTela === 'alteracao' ? (
					<CheckinForm alterar onSubmit={this.props.update} />
				) : null}
				{this.props.modoTela === 'exclusao' ? (
					<CheckinForm excluir onSubmit={this.props.remove} />
				) : null}
				{this.props.modoTela === 'lista' ? this.lista() : null}

			</Container>
		)
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

					.btn-custom-blue:hover {
						background-color: #2A689E;
						border-color: #265F91;
						color: #fff;
					}

					.form-row,
					.form-group {
						flex-grow: 1;
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
						this.props.setModoTela('cadastro');
						this.props.initForm({});
					}}>
					<i className="fa fa-plus" aria-hidden="true"></i>
				</Button>

					<Form.Row>
						<Col>
							<Table hover size="sm">
								<thead>
									<tr>
										<th>Hóspede</th>
										<th>Data/Hora Entrada</th>
										<th>Data/Hora Saída</th>
										<th>Adicional Veículo</th>
										<th>Ações</th>
									</tr>
								</thead>
								<tbody>
									{ this.props.lista.filter(item => item.ativo).map(item => {

										let hospede = this.props.listaHospede.filter(hospede => hospede.id === item.idHospede)[0];
										return (
										<tr key={item.id}>
											<td>{hospede.nome}</td>
											<td>{item.dataEntrada && moment(item.dataEntrada).format('DD/MM/YYYY HH:mm')}</td>
											<td>{item.dataSaida && moment(item.dataSaida).format('DD/MM/YYYY HH:mm')}</td>
											<td>{item.adicionalVeiculo ? 'Sim' : 'Não'}</td>
											<td>
												<Button variant='warning' onClick={() => {
														this.props.setModoTela('alteracao', item);
														this.props.initForm(item);
													}}>
													<i className="fa fa-pencil" aria-hidden="true"></i>
												</Button>
												<Button variant='danger' onClick={() => {
														this.props.setModoTela('exclusao', item);
														this.props.initForm(item);
													}}>
													<i className="fa fa-trash" aria-hidden="true"></i>
												</Button>
											</td>
										</tr>
									);
								}) }
								</tbody>
							</Table>
						</Col>
					</Form.Row>

				</Content>
			);
		}
	}

	const mapStateToProps = state => ({
		modoTela: state.checkin.modoTela,
		lista: state.checkin.lista,
		listaHospede: state.hospede.lista,
	});
	const mapDispatchToProps = dispatch => bindActionCreators({ setModoTela, initForm, add, update, remove }, dispatch);
	export default connect(mapStateToProps, mapDispatchToProps)(Checkin);
