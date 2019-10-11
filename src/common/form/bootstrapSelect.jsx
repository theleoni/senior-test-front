import React from 'react'
import Form from 'react-bootstrap/Form';

export default props => {
	return (
		<Form.Group controlId={props.name}>
			<Form.Label>{props.label}</Form.Label>
			<Form.Control {...props.input} as="select" name={props.name} placeholder={props.placeholder} required={props.required || false} disabled={props.disabled || false}>
				{ props.list.map(item => <option key={item.id} value={item.id}>{item.valor}</option> ) }
			</Form.Control>
		</Form.Group>
	);
}
