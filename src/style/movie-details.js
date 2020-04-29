import { StyleSheet, Dimensions } from 'react-native';

export const movieDetails = StyleSheet.create({
    moviePoster: {
        height: 350
    },
    gradiend: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    playButton: {
        width: 55,
        height: 55,
        borderRadius: 50,
        borderWidth: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
    },
    playTriangle: {
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderTopWidth: 13,
        borderTopColor: 'rgba(0, 0, 0, 0.0)',
        borderBottomWidth: 13,
        borderBottomColor: 'rgba(0, 0, 0, 0.0)',
        borderLeftWidth: 18,
        borderLeftColor: '#FFFFFF',
        right: -3
    },
    detailsContainer: {
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: -80,
        marginBottom: 20
    },
    selectedMoviePoster: {
        width: 120,
        height: 180
    },
    subText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 14,
        marginBottom: 10
    },
    heartIcon: {
        width: 17,
        height: 17,
        marginRight: 10
    },
    title: {
        fontWeight: "700",
        fontSize: 22,
        color: '#FFFFFF',
        marginBottom: 5
    },
    leftWidth: {
        width: Dimensions.get('window').width - 160
    },
    description: {
        color: '#FFFFFF', 
        fontSize: 14, 
        fontWeight: "400", 
        lineHeight: 20
    }
});