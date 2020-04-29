import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

import { style } from "../style/base";
import { movie } from "../style/movie";

import heart from "../assets/images/heart.png";

class MovieList extends Component{
    constructor(props){
        super(props);
        this.state = {
            el: this.props.data
        }
    }

    render(){
        return (
            <>
                <View style={[movie.movie, movie.imageCont]}>
                    <Image source={{uri: this.state.el.medium_cover_image || this.state.el.large_cover_image}} style={[movie.moviePoster]} resizeMode="cover"/>
                </View>
                <View style={[movie.movie, movie.details]}>
                    <Text style={[movie.title]} numberOfLines={1} ellipsizeMode="tail">{this.state.el.title_english || this.state.el.title}</Text>
                    <Text style={movie.subText} numberOfLines={1} ellipsizeMode="tail">{`${this.state.el.runtime} mins | ${this.state.el.mpa_rating || '-'} | ${this.state.el.language}`}</Text>
                    <View style={[style.flexboxContainer, style.verticalMiddle]}>
                        <View style={[style.flexbox, style.flexboxContainer]}>
                            {this.state.el.genres.length > 0 && <Text style={[movie.subText, style.border, movie.posterGenre]}>{this.state.el.genres[0]}</Text>}
                        </View>
                        <View style={[style.flexbox, style.flexboxContainer, style.flexEnd]}>
                            <Image source={heart} style={movie.heartIcon}/>
                            <Text style={[movie.subText, style.textRight]}>{this.state.el.rating}</Text>
                        </View>
                    </View>
                </View>
            </>
        )
    }
}

export default MovieList;