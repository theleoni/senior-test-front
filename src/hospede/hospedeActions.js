import { initialize } from 'redux-form';

export function setModoTela(modo, registro = {}) {
	return {
		type: 'HOSPEDE_MODO_TELA',
		payload: {
			modo,
			registro
		},
	};
}

export function initForm(registro = {}, formName = 'hospedeForm') {
	return [
		initialize(formName, registro)
	];
}

export function add(registro) {

	return (dispatch, getState) => {

		let id = getState().hospede.ultimoId + 1;
		let lista = getState().hospede.lista;
		lista.push({
			...registro,
			id: id,
			ativo: true,
		});

		dispatch({ type: 'HOSPEDE_ATUALIZAR_ULTIMO_ID', payload: id });
		dispatch({ type: 'HOSPEDE_LISTA_ATUALIZADO', payload: lista });
		dispatch(setModoTela('lista'));
	};
}

export function update(registro) {

	return (dispatch, getState) => {

		let lista = getState().hospede.lista;
		let novaLista = lista.map(item => item.id === registro.id ? registro : item);

		dispatch({ type: 'HOSPEDE_LISTA_ATUALIZADO', payload: novaLista });
		dispatch(setModoTela('lista'));
	};
}

export function remove(registro) {

	return (dispatch, getState) => {

		let lista = getState().hospede.lista;
		let novaLista = lista.map(item => item.id === registro.id ? { ...item, ativo: false } : item);

		dispatch({ type: 'HOSPEDE_LISTA_ATUALIZADO', payload: novaLista });
		dispatch(setModoTela('lista'));
	};
}
