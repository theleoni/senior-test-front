import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import DashboardReducer from '../dashboard/dashboardReducer';
import CheckinReducer from '../checkin/checkinReducer';
import HospedeReducer from '../hospede/hospedeReducer';

const rootReducer = combineReducers({
	dashboard: DashboardReducer,
	checkin: CheckinReducer,
	hospede: HospedeReducer,
	form: formReducer,
});

export default rootReducer;
