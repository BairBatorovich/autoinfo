import { StyleSheet, Dimensions } from 'react-native';
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
// import { getStatusBarHeight } from 'react-native-status-bar-height';
// const heightSB = getStatusBarHeight();

const styles = StyleSheet.create({
    // Авторизация
    login: {
        flexDirection: 'column',
        flex: 1,
    },
    loginInputContainer: {
        width: WIDTH,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginInputView: {
        marginTop: 20,
        width: WIDTH - 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginInputText: {
        fontSize: 16,
        width: WIDTH - 40,
        backgroundColor: '#CEF6D8',
        marginBottom: 10,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center'
    },
    loginRegRecover: {
        width: WIDTH,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginRegRecoverFocus: {
        width: WIDTH,
        height: 160,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginTop: 5,
        width: WIDTH - 40,
        height: 40,
        backgroundColor: '#0080FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonOff: {
        marginTop: 5,
        width: WIDTH - 40,
        height: 40,
        backgroundColor: '#BDBDBD',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    loginRegTextReg: {
        color: '#0080FF',
        fontSize: 16,
    },
    loginRegText: {
        color: 'grey',
        fontSize: 16,
    },
    loginButtonRR: {
        marginBottom: 7
    },
    // Регистрация
    RegInputContainer: {
        width: WIDTH,
        height: HEIGHT,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    //Востановление пароля
    remind: {
        justifyContent: 'center',
        alignItems: "center",
    },
    remindView: {
        width: WIDTH - 40,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: "center",
        marginTop: 10
    },
    //Модальное окно авторизации
    AwesomeAlertContentContainerStyle: {
        alignItems: 'flex-end',
    },
    AwesomeAlertTitleStyle: {
        fontSize: 20,
        color: '#060A0C',
    },
    AwesomeAlertMessageStyle: {
        color: '#060A0C',
        fontSize: 16,
    },
    AwesomeAlertConfirmButtonStyle: {
        width: 50,
        alignItems: 'center',
    },
    AwesomeAlertCancelButtonTextStyle: {
        color: "#E41D32",
    },
    //news
    news: {
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        height: 70,
        width: WIDTH - 30,
        justifyContent: 'center',
        marginVertical: 5,
        marginHorizontal: 2,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    newsDate: {
        marginRight: 10,
        marginLeft: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
    },
    newsDateSize: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    newsDateSize: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    newsVerticalLine: {
        height: 50,
        width: 1,
        borderWidth: 1,
        borderColor: '#E6E6E6',
        marginRight: 10
    },
    newsDescription: {
        flex: 1,
        height: 55,
        justifyContent: 'space-around',
    },
    newsTitleHeader: {
        fontSize: 16,
        color: '#1C1C1C',
        maxHeight: 40,
    },
    newsDescriptionPrice: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold'
    },
    newsScroll: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
    },
    //Новости детальный просмотр
    newsDetailView: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    newsDetail: {
        width: WIDTH - 40,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    newsDetailtitle: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginBottom: 10,
    },
    newsDetailtitleText: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    newsDetailText: {
        fontSize: 16,
    },
    newsDetailDate: {
        fontSize: 14,
        color: 'grey'
    },

    // App Drawer
    drawerView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    drawerLogo: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 10,
    },
    drawerLogoText: {
        color: '#0080FF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    drawerIcon: {
        marginBottom: 10,
    },
    drawerButton: {
        width: WIDTH / 2,
        height: 50,
        backgroundColor: '#0080FF',
        borderRadius: 5,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    drawerExit: {
        width: WIDTH / 2,
        height: 50,
        backgroundColor: '#BDBDBD',
        borderRadius: 5,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    drawerButtonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    //Профиль пользователя
    profileView: {
        height: HEIGHT,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 10,
    },
    profileText: {
        fontSize: 16,
        width: WIDTH - 40,
        backgroundColor: '#CEF6D8',
        marginBottom: 10,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center',
        paddingTop: 3,
        paddingBottom: 3,
    },
    profileRoute: {
        width: WIDTH - 40,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 10
    },
    profileRouteText: {
        fontSize: 16,
        width: WIDTH - 71,
        height: 30,
        backgroundColor: '#CEF6D8',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center',
    },
    profileSelect: {
        height: 250,
        width: WIDTH - 40,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'grey',
        display: 'flex',
    },
    profileSelectTouch: {
        height: 25,
        width: 25,
        justifyContent: 'center',
        backgroundColor: 'blue',
        margin: 2,
    },
    profileButBlock: {
        width: WIDTH - 40,
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    profileButton: {
        width: WIDTH / 2.3,
        height: 40,
        backgroundColor: '#0080FF',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    //Городские маршруты 
    routeUrban: {
        justifyContent: 'center',
        alignItems: "center",
        paddingTop: 5,
        display: 'flex',
        flex: 1,
    },
    routeUrbanText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 5,
    },
    routeUrbanTouch: {
        width: WIDTH - 40,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: "center",
        marginBottom: 5,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
    },
    routeTextId: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    routePrice: {
        color: 'grey',
        fontSize: 20,
    },
    routeConfirmButton: {
        width: 120,
        alignItems: 'center',
    },
    routeUrbanBuy: {
        width: WIDTH - 40,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: "center",
    },
    //Отслеживание
    track: {
        display: 'flex',
        flex: 1,
        justifyContent: "space-around",
        alignItems: 'center',
    },
    trackStatus: {
        display: 'flex',
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
    },
    trackStatusText: {
        color: 'grey',
        fontSize: 24,
    },
    trackStatusText1: {
        color: 'green',
        fontSize: 24,
    },
    trackStatusText2: {
        color: 'red',
        fontSize: 24,
    },
    trackButton1: {
        width: WIDTH - 80,
        height: 120,
        borderRadius: 10,
        backgroundColor: '#0080FF',
        justifyContent: "center",
        alignItems: 'center',
    },
    trackButton2: {
        width: WIDTH - 80,
        height: 120,
        borderRadius: 10,
        backgroundColor: "#E41D32",
        justifyContent: "center",
        alignItems: 'center',
    },
    trackButtonText: {
        color: 'white',
        fontSize: 24,
    },
    trackButtonLog: {
        width: WIDTH - 80,
        height: 30,
        borderRadius: 10,
        marginTop: 20,
        backgroundColor: '#BDBDBD',
        justifyContent: "center",
        alignItems: 'center',
    },
    trackLogText: {
        color: 'white',
        fontSize: 16,
    },
    trackTarif: {
        display: 'flex',
        flex: 1,
        justifyContent: "flex-end",
        alignItems: 'center',
        padding: 5,
    },
    trackTarifText: {
        textAlign: 'center'
    },
    // Изменение карты банковской
    cardEdit: {
        justifyContent: 'center',
        alignItems: "center",
        paddingTop: 10
    },
    cardMonthYear: {
        width: WIDTH - 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
    },
    cardInputDate: {
        fontSize: 16,
        width: WIDTH / 2 - 25,
        backgroundColor: '#CEF6D8',
        marginBottom: 10,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center'
    },
    withdraw: {
        width: WIDTH - 40,
        height: HEIGHT - 40,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    slider: {
        width: WIDTH-40,
    },
    withdrawText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight:'bold',
        textAlign:'center',
    },
    withdrawValue: {
        marginTop: 10,
        fontSize: 26,
        color:'green',
        fontWeight:'bold',
        textAlign:'center',
    },
    //Транзакции
    transaction: {
        width: WIDTH,
        height: 40,
        justifyContent:'center',
        alignItems:'center',
        borderBottomWidth: 1,
        borderBottomColor: '#BDBDBD',
    },
    transactionText: {
        fontSize: 16,
        textAlign: 'center',
        color: 'green'
    },
    transactionTextW: {
        fontSize: 16,
        textAlign: 'center',
        color: 'red'
    },
});

export default styles;