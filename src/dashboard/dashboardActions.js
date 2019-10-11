import { initialize } from 'redux-form';

export function setModoTela(modo, registro = {}) {
	return {
		type: 'DASHBOARD_MODO_TELA',
		payload: {
			modo,
			registro
		},
	};
}

export function setTipoConsulta(isAindaPresente) {
	return {
		type: 'DASHBOARD_TIPO_CONSULTA',
		payload: isAindaPresente,
	};
}

export function initForm(registro = {}, formName = 'dashboardForm') {
	return [
		initialize(formName, registro)
	];
}
