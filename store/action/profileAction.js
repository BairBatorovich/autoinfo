import { PROFILE_ADD, LIST_ROUTE_ADD, TRANSACTION_ADD, ROUTE_INTER_ADD, MY_ROUTE_ADD, ID_ROUTE_ADD, MY_WAY_ADD, STATIONSGPS_ADD} from '../constants';

//Мобильный номер
export const profileAdd = (profile) => {  
    return {
        type: PROFILE_ADD,
        profile
    } 
};
export const routeAdd = (listroute) => {  
    return {
        type: LIST_ROUTE_ADD,
        listroute
    } 
};
export const transactionAdd = (transaction) => {  
    return {
        type: TRANSACTION_ADD,
        transaction
    } 
};
export const routeInterAdd = (listroute) => {  
    return {
        type: ROUTE_INTER_ADD,
        interroute
    } 
};
export const myRouteAdd = (myRoute) => {  
    return {
        type: MY_ROUTE_ADD,
        myRoute
    } 
};
export const idRouteAdd = (idRoute) => {  
    return {
        type: ID_ROUTE_ADD,
        idRoute
    } 
};
export const myWayAdd = (myWays) => {  
    return {
        type: MY_WAY_ADD,
        myWays
    } 
};
export const stationsGPSADD = (stationsGps) => {  
    return {
        type: STATIONSGPS_ADD,
        stationsGps
    } 
};