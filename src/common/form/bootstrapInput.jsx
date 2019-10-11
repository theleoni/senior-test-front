import React from 'react'
import Form from 'react-bootstrap/Form';

export default props => {
	return (
		<Form.Group controlId={props.name}>
			<Form.Label>{props.label}</Form.Label>
			<Form.Control {...props.input} type={props.type} name={props.name} placeholder={props.placeholder} required={props.required || false} disabled={props.disabled || false} />
		</Form.Group>
	);
}
