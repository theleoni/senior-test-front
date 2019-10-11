const INITIAL_STATE = {
	registro: {},
	modoTela: 'lista',
	ultimoId: 3,
	lista: [
		{
			id: 1,
			nome: 'Fulano',
			documento: '143242',
			telefone: '11 99188 7777',
			ativo: true,
		},
		{
			id: 2,
			nome: 'Beltrano',
			documento: '123423',
			telefone: '12 92188 2222',
			ativo: true,
		},
		{
			id: 3,
			nome: 'Ciclano',
			documento: '53526',
			telefone: '12 99677 2222',
			ativo: true,
		},
	]
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {

		case 'HOSPEDE_MODO_TELA':
		return {
			...state,
			modoTela: action.payload.modo,
			registro: action.payload.registro,
		};

		case 'HOSPEDE_LISTA_ATUALIZADO':
		return { ...state,
			lista: action.payload
		};

		case 'HOSPEDE_ATUALIZAR_ULTIMO_ID':
		return { ...state,
			ultimoId: action.payload
		};

		default:
		return state;
	}
}
