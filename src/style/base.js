import { StyleSheet, Dimensions } from 'react-native';

export const style = StyleSheet.create({
    main: {
        backgroundColor: '#31364A',
        height: '100%'
    },
    textCenter: {
        textAlign: "center"
    },
    textUppercase: {
        textTransform: "uppercase"
    },
    textLeft: {
        textAlign: "left"
    },
    textRight: {
        textAlign: "right"
    },
    flexboxContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between'
    },
    flexWrap: {
        flexWrap: 'wrap'
    },
    flexColumn: {
        flexDirection: 'column'
    },
    centerAligned: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    verticalMiddle: {
        alignItems: 'center'
    },
    flexbox: {
        flexGrow: 1,
        alignSelf: 'auto'
    },
    flexStart: {
        justifyContent: 'flex-start',
        alignSelf: 'flex-start'
    },
    flexEnd: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end'
    },
    alignEnd: {
        alignSelf: 'flex-end'
    },
    fullHeight: {
        height: '100%'
    },
    full: {
        width: '100%'
    },
    half: {
        width: '50%'
    },
    oneThird: {
        width: '33.333%'
    },
    twoThird:{
        width: '66.667%'
    },
    threeFourth: {
        width: "75%"
    },
    oneFourth: {
        width: '25%'
    },
    relative: {
        position: "relative"
    },
    border: {
        borderColor: '#ececec',
        borderWidth: 1,
        borderStyle: "solid"    
    },
    sectionBox: {
        marginLeft: 15,
        marginRight: 15,
        paddingTop: 20,
        paddingBottom: 20,
        borderColor: 'rgba(255, 255, 255, 0.6)',
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0
    },
    bothsideOverFlow: {
        marginLeft: -15, 
        marginRight: -15,
        paddingLeft: 15
    },
    btn: {
        paddingTop: 13,
        paddingBottom: 13,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10
    },
    btnText: {
        color: '#FFFFFF',
        fontWeight: "700"
    },
    dot: {
        backgroundColor: 'rgba(0, 0, 0, .2)', 
        width: 8, 
        height: 8,
        borderRadius: 4, 
        marginLeft: 3, 
        marginRight: 3, 
        marginTop: 5
    },
    activeDot: {
        backgroundColor: 'rgba(255, 255, 255, .7)', 
        width: 8, 
        height: 8, 
        borderRadius: 4, 
        marginLeft: 3, 
        marginRight: 3, 
        marginTop: 5
    },
    customBack: {
        position: 'absolute',
        top: 40,
        padding: 20,
        width: 100,
        height: 70,
        zIndex: 100,
        // backgroundColor: 'red'
    },
    customBackArrow: {
        width: 15,
        height: 15,
        borderWidth: 2,
        borderLeftWidth: 0,
        borderBottomWidth: 0,
        transform: [{ rotate: '-135deg'}]
    }
})