import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import Content from '../common/template/content';
import Input from '../common/form/bootstrapInput';
import Check from '../common/form/bootstrapCheck';
import Select from '../common/form/bootstrapSelect';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

import { setTipoConsulta } from '../dashboard/dashboardActions';
import { initForm, setModoTela } from './checkinActions';

class CheckinDashboardForm extends Component {

	UNSAFE_componentWillMount() {
	}

	render() {

		let readOnly = this.props.excluir ? 'readOnly' : '';
		return (
			<Content className='higher-top'>

				<Form className='form' role='form' onSubmit={this.props.handleSubmit}>
					<Form.Row className='form-title'>
						<Col>
							<span>Novo check in</span>
						</Col>
					</Form.Row>

					<div className='form-content'>
						<Form.Row>
							<Col>
								<Field component={Input} type='datetime-local' name='dataEntrada' label='Data/Hora Entrada *' disabled={readOnly} required />
							</Col>

							<Col>
								<Field component={Input} type='datetime-local' name='dataSaida' label='Data/Hora Saída' disabled={readOnly} />
							</Col>
						</Form.Row>

						<Form.Row>
							<Col>
								<Field component={Select} name='idHospede' label='Hóspede *' disabled={readOnly} required list={this.props.listaHospede.filter(item => item.ativo).map(item => ({id:item.id, valor: item.nome}))} />
							</Col>

							<Col>
								<Field component={Check} name='adicionalVeiculo' label='Possui veículo' disabled={readOnly} />
							</Col>
						</Form.Row>

						<Form.Row className='btn-line'>
							<Button type="submit" variant='custom-blue'> Salvar </Button>
						</Form.Row>

					</div>

				</Form>

				<Form className='form'>
					<Form.Row className='form-title'>
						<Col>
							<span>Consultas</span>
						</Col>
					</Form.Row>

					<div className='form-content'>
						<Form.Row>
							<Col>
								<Form.Group>
									<Form.Label>Filtar por:</Form.Label>
								</Form.Group>
								<fieldset>
									<Form.Group>
										<Form.Check inline
											type="radio"
											label="Pessoas ainda presente"
											name="consultaFiltoTipo"
											id="consultaFiltoTipo1"
											checked={this.props.tipoConsulta}
											onChange={evt => this.props.setTipoConsulta(true)}
											/>
										<Form.Check inline
											type="radio"
											label="Pessoas que já deixaram o hotel"
											name="consultaFiltoTipo"
											id="formHorizontalRadios2"
											checked={!this.props.tipoConsulta}
											onChange={evt => this.props.setTipoConsulta(false)}
											/>
									</Form.Group>
								</fieldset>
							</Col>
						</Form.Row>

						<Form.Row>
							<Col>
								<Table hover size="sm">
									<thead>
										<tr>
											<th>Nome</th>
											<th>Documento</th>
											<th>Valor gasto (R$)</th>
										</tr>
									</thead>
									<tbody>
										{ this.getListaPorFiltro().map(item => {

											let hospede = this.props.listaHospede.filter(hospede => hospede.id === item.idHospede)[0];
											return (
												<tr key={item.id}>
													<td>{hospede.nome}</td>
													<td>{hospede.documento}</td>
													<td>{this.calcularValorTotal(item)}</td>
												</tr>
											);
										}) }
									</tbody>
								</Table>
							</Col>
						</Form.Row>

					</div>

				</Form>

			</Content>
		)
	}

	getListaPorFiltro() {

		let listaHospede = this.props.listaHospede;
		let listaCheckin = this.props.listaCheckin;

		if (this.props.tipoConsulta) {
			listaHospede = listaHospede.filter(hospede => {

				let checkins = listaCheckin.filter(checkin => checkin.dataEntrada && checkin.idHospede === hospede.id);
				let checkinsAberto = checkins.filter(checkin => !checkin.dataSaida);
				return checkins.length && checkinsAberto.length;
			});
		} else {
			listaHospede = listaHospede.filter(hospede => {

				let checkins = listaCheckin.filter(checkin => checkin.dataEntrada && checkin.idHospede === hospede.id);
				let checkinsAberto = checkins.filter(checkin => !checkin.dataSaida);
				return checkins.length && !checkinsAberto.length;
			});
		}

		let listaTmp = [];
		listaHospede.forEach(hospede => {

			listaCheckin.filter(checkin => checkin.idHospede === hospede.id)
			.sort((a, b) => {
				let dataA = new Date(a.dataEntrada);
				let dataB = new Date(b.dataEntrada);
				if (dataA.getTime() < dataB.getTime()) return 1;
				if (dataB.getTime() > dataA.getTime()) return -1;
				return 0;
			}).forEach(checkin => listaTmp.push(checkin));
		});

		return listaTmp;
	}

	beetweenDates(startDate, endDate) {
		var dates = [],
		currentDate = startDate,
		addDays = function(days) {
			var date = new Date(this.valueOf());
			date.setDate(date.getDate() + days);
			return date;
		};
		while (currentDate <= endDate) {
			dates.push(currentDate);
			currentDate = addDays.call(currentDate, 1);
		}
		return dates;
	};

	calcularValorTotal(checkin) {

		let valorTotalReais = 0;
		if (checkin.dataEntrada && checkin.dataSaida) {

			let dataEntrada = new Date(checkin.dataEntrada);
			let dataSaida = new Date(checkin.dataSaida);
			if (dataSaida.getHours() > 16 || (dataSaida.getHours() === 16 && dataSaida.getMinutes() > 30)) {
				dataSaida.setDate(dataSaida.getDate() + 1);
			}
			valorTotalReais = this.beetweenDates(dataEntrada, dataSaida).reduce((total, data) => {

				let valorDiaria = 0;
				if (data.getDay() >= 1 && data.getDay() <= 5) { // dia de semana
					valorDiaria += 120;
					if (checkin.adicionalVeiculo) {
						valorDiaria += 15;
					}
				} else { // final de semana
					valorDiaria += 150;
					if (checkin.adicionalVeiculo) {
						valorDiaria += 20;
					}
				}
				return total + valorDiaria;
			}, 0);
		}

		return valorTotalReais;
	}
}

CheckinDashboardForm = reduxForm({form: 'checkinDashboardForm', destroyOnUnmount: false})(CheckinDashboardForm);
const mapStateToProps = state => ({
	tipoConsulta: state.dashboard.tipoConsulta,
	registro: state.checkin.registro,
	listaHospede: state.hospede.lista,
	listaCheckin: state.checkin.lista,
});
const mapDispatchToProps = dispatch => bindActionCreators({
	setTipoConsulta,
	initForm, setModoTela
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CheckinDashboardForm);
