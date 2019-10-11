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

import { setModoTela } from './checkinActions';

class CheckinForm extends Component {

	UNSAFE_componentWillMount() {
	}

	render() {

		let readOnly = this.props.excluir ? 'readOnly' : '';
		return (
			<Content className='higher-top'>

				<Form className='form' role='form' onSubmit={this.props.handleSubmit}>

					<Form.Row>
						<Field component={Select} name='idHospede' label='Hóspede *' disabled={readOnly} required list={this.props.listaHospede.filter(item => item.ativo).map(item => ({id:item.id, valor: item.nome}))} />
					</Form.Row>

					<Form.Row>
						<Field component={Input} type='datetime-local' name='dataEntrada' label='Data/Hora Entrada *' disabled={readOnly} required />
					</Form.Row>

					<Form.Row>
						<Field component={Input} type='datetime-local' name='dataSaida' label='Data/Hora Saída' disabled={readOnly} />
					</Form.Row>

					<Form.Row>
						<Field component={Check} name='adicionalVeiculo' label='Possui veículo' disabled={readOnly} />
					</Form.Row>

					<Form.Row className='btn-line'>
						<Button variant='warning' onClick={() => this.props.setModoTela('lista')}>
							<i className="fa fa-chevron-left" aria-hidden="true"></i>
						</Button>

						{this.props.excluir ? (
							<Button type="submit" variant='danger'>
								<i className="fa fa-trash" aria-hidden="true"></i>
							</Button>
						) : (
							<Button type="submit" variant='success'>
								<i className="fa fa-check" aria-hidden="true"></i>
							</Button>
						)}
					</Form.Row>
				</Form>
			</Content>
		)
	}
}

CheckinForm = reduxForm({form: 'checkinForm', destroyOnUnmount: false})(CheckinForm);
const mapStateToProps = state => ({
	registro: state.checkin.registro,
	listaHospede: state.hospede.lista,
});
const mapDispatchToProps = dispatch => bindActionCreators({ setModoTela }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CheckinForm);
