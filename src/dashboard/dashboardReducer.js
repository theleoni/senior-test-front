const INITIAL_STATE = {
	modoTela: 'lista',
	tipoConsulta: true,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {

		case 'DASHBOARD_TIPO_CONSULTA':
		return {
			...state,
			tipoConsulta: action.payload,
		};

		case 'DASHBOARD_MODO_TELA':
		return {
			...state,
			modoTela: action.payload.modo,
		};

		default:
		return state;
	}
}
