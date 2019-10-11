import { initialize } from 'redux-form';

export function setModoTela(modo, registro = {}) {
	return {
		type: 'CHECKIN_MODO_TELA',
		payload: {
			modo,
			registro
		},
	};
}

export function initForm(registro = {}, formName = 'checkinForm') {
	return [
		initialize(formName, registro)
	];
}

export function add(registro) {

	return (dispatch, getState) => {

		let id = getState().checkin.ultimoId + 1;
		let lista = getState().checkin.lista;
		lista.push({
			...registro,
			id: id,
			idHospede: (registro.idHospede && parseInt(registro.idHospede)) || registro.idHospede,
			dataEntrada: new Date(registro.dataEntrada),
			dataSaida: (registro.dataSaida && new Date(registro.dataSaida)) || null,
			adicionalVeiculo: registro.adicionalVeiculo || false,
			ativo: true,
		});

		dispatch({ type: 'CHECKIN_ATUALIZAR_ULTIMO_ID', payload: id });
		dispatch({ type: 'CHECKIN_LISTA_ATUALIZADO', payload: lista });
		dispatch(setModoTela('lista'));
		dispatch(initForm({}, 'checkinDashboardForm'));
	};
}

export function update(registro) {

	return (dispatch, getState) => {

		let lista = getState().checkin.lista;
		let novaLista = lista.map(item => item.id === registro.id ? registro : item);

		dispatch({ type: 'CHECKIN_LISTA_ATUALIZADO', payload: novaLista });
		dispatch(setModoTela('lista'));
	};
}

export function remove(registro) {

	return (dispatch, getState) => {

		let lista = getState().checkin.lista;
		let novaLista = lista.map(item => item.id === registro.id ? { ...item, ativo: false } : item);

		dispatch({ type: 'CHECKIN_LISTA_ATUALIZADO', payload: novaLista });
		dispatch(setModoTela('lista'));
	};
}
