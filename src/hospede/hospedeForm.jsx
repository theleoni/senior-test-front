import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import Content from '../common/template/content';
import Input from '../common/form/bootstrapInput';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { setModoTela } from './hospedeActions';

class HospedeForm extends Component {

	UNSAFE_componentWillMount() {
	}

	render() {

		let readOnly = this.props.excluir ? 'readOnly' : '';
		return (
			<Content className='higher-top'>

				<Form className='form' role='form' onSubmit={this.props.handleSubmit}>

					<Form.Row>
						<Field component={Input} name='nome' label='Nome *' disabled={readOnly} required />
					</Form.Row>

					<Form.Row>
						<Field component={Input} name='documento' label='Documento *' disabled={readOnly} required />
					</Form.Row>

					<Form.Row>
						<Field component={Input} name='telefone' label='Telefone *' disabled={readOnly} required />
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

HospedeForm = reduxForm({form: 'hospedeForm', destroyOnUnmount: false})(HospedeForm);
const mapStateToProps = state => ({
	registro: state.hospede.registro
});
const mapDispatchToProps = dispatch => bindActionCreators({ setModoTela }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(HospedeForm);
