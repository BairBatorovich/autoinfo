import { PROFILE_ADD, LIST_ROUTE_ADD, TRANSACTION_ADD, ROUTE_INTER_ADD, MY_ROUTE_ADD, ID_ROUTE_ADD, MY_WAY_ADD, STATIONSGPS_ADD } from '../constants';

const defaultState = {
    profile: {},
    listroute: [],
    transaction: [],
    interroute: [],
    myRoute: [],
    idRoute: '',
    myWays: [],
    stationsGps: {active:false, way:false},
};

const profileReducer = (state = defaultState, action) => {
    switch (action.type) {
        case PROFILE_ADD:
            return {
                ...state,
                profile: action.profile
            }
        case LIST_ROUTE_ADD:
            return {
                ...state,
                listroute: action.listroute
            }
        case TRANSACTION_ADD:
            return {
                ...state,
                transaction: action.transaction
            }
        case ROUTE_INTER_ADD:
            return {
                ...state,
                interroute: action.interroute
            }
        case MY_ROUTE_ADD:
            return {
                ...state,
                myRoute: action.myRoute
            }
        case ID_ROUTE_ADD:
            return {
                ...state,
                idRoute: action.idRoute
            }
        case MY_WAY_ADD:
            return {
                ...state,
                myWays: action.myWays
            }
        case STATIONSGPS_ADD:
            return {
                ...state,
                stationsGps: action.stationsGps
            }
        default: {
            return state
        }
    }
};

export default profileReducer;