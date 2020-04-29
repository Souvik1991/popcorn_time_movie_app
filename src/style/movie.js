import { StyleSheet } from 'react-native';

export const movie = StyleSheet.create({
    movie: {
        marginRight: 15,
        borderRadius: 10,
        overflow: "hidden",
        width: 150
    },
    details: {
        paddingTop: 5,
        marginBottom: 3,
        borderRadius: 0,
        width: 150
    },
    headingContainer: {
        paddingBottom: 25
    },
    heading: {
        color: '#FFFFFF',
        fontWeight: "700",
        fontSize: 20
    },
    seeAll: {
        color: "rgba(255, 255, 255, 0.7)",
        paddingRight: 13,
        fontSize: 14
    },
    seeAllArrow: {
        position: "absolute",
        right: 0,
        top: 5,
        width: 7,
        height: 7,
        borderLeftWidth: 0,
        borderBottomWidth: 0,
        transform: [{ rotate: '45deg'}]
    },
    moviePoster: {
        width: 150,
        height: 225
    },
    imageCont: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)'
    },
    title: {
        color: '#FFFFFF',
        fontWeight: "700",
        fontSize: 15,
        width: 153,
        marginBottom: 3
    },
    subText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 13,
        marginBottom: 5
    },
    posterGenre: {
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
        borderColor: 'rgba(255, 255, 255, 0.7)',
        width: 'auto'
    },
    heartIcon: {
        width: 15,
        height: 15,
        marginRight: 5
    },
    genreImage: {
        width: 250,
        height: 150
    },
    genreTitle: {
        paddingLeft: 15,
        paddingBottom: 10,
        fontSize: 16,
        // position: "absolute",
        // bottom: 0,
        // left: 0,
        // right: 0
    },
    shadow: {
        top: 0,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0
    }
});