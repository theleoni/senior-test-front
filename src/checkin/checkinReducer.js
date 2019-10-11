const INITIAL_STATE = {
	registro: {},
	modoTela: 'lista',
	ultimoId: 4,
	lista: [
		{
			id: 1,
			idHospede: 1,
			dataEntrada: new Date('2019-10-01T09:52:32.483Z'),
			dataSaida: new Date('2019-10-05T09:52:32.483Z'),
			adicionalVeiculo: false,
			ativo: true,
		},
		{
			id: 2,
			idHospede: 1,
			dataEntrada: new Date('2019-08-01T09:52:32.483Z'),
			dataSaida: new Date('2019-08-05T09:52:32.483Z'),
			adicionalVeiculo: true,
			ativo: true,
		},
		{
			id: 3,
			idHospede: 2,
			dataEntrada: new Date('2019-10-01T09:52:32.483Z'),
			dataSaida: new Date('2019-10-05T09:52:32.483Z'),
			adicionalVeiculo: false,
			ativo: true,
		},
		{
			id: 4,
			idHospede: 2,
			dataEntrada: new Date('2019-08-01T09:52:32.483Z'),
			dataSaida: null,
			adicionalVeiculo: true,
			ativo: true,
		},
	]
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {

		case 'CHECKIN_MODO_TELA':
		return {
			...state,
			modoTela: action.payload.modo,
			registro: action.payload.registro,
		};

		case 'CHECKIN_LISTA_ATUALIZADO':
		return { ...state,
			lista: action.payload
		};

		case 'CHECKIN_ATUALIZAR_ULTIMO_ID':
		return { ...state,
			ultimoId: action.payload
		};

		default:
		return state;
	}
}
