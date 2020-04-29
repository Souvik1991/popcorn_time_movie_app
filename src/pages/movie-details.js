import React, { Component } from 'react';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View, Image, StatusBar, ScrollView, TouchableOpacity } from 'react-native';

import { config } from '../components/constant';
import MovieList from "../components/movie-list";

import { style } from "../style/base";
import { movie } from "../style/movie";
import { movieDetails } from "../style/movie-details";

import heart from "../assets/images/heart.png";

class MovieDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            details: this.props.route.params.data,
            poster: '',
            loaded: false,
            suggested: []
        }
    }

    componentDidMount(){
        var img = this.state.details.background_image || this.state.details.background_image_original;
        img = img.split('/');
        img[img.length - 1] = 'large-screenshot1.jpg';
        // console.log(img.join('/'));
        // console.log(this.state.details);
        this.setState({
            poster: img.join('/'),
            loaded: true
        }, () => {
            axios.get(`${config.API_URL}/movie_suggestions.json?movie_id=${this.state.details.id}`)
            .then((suggested) => {
                this.setState({
                    suggested: suggested.data.data.movies
                })
            })
        })
    }

    render(){
        return (
            <ScrollView style={style.main}>
                <StatusBar backgroundColor="#ffffff" barStyle="light-content" />
                <View style={[style.flexboxContainer, style.flexColumn, {paddingBottom: 30}]}>
                    <View style={[movieDetails.moviePoster, style.relative]}>
                        {/* <TouchableOpacity style={style.customBack}>
                            <View style={[style.border, style.customBackArrow]}></View>
                        </TouchableOpacity> */}
                        <Image source={{uri: this.state.poster || this.state.details.background_image}} style={[movieDetails.moviePoster]} resizeMode="cover"/>
                        <LinearGradient colors={['rgba(49,54,74,0.2)', 'rgba(49,54,74,0.4)', '#31364A']} angle={180} style={[movieDetails.gradiend, style.flexboxContainer, style.centerAligned, style.flexColumn]}>
                            {this.state.details.yt_trailer_code !== undefined && 
                                <TouchableOpacity style={[style.centerAligned]} onPress={() => {this.props.navigation.push('Trailer', {data: this.state.details.yt_trailer_code})}}>
                                    <View style={[style.border, style.centerAligned, style.fullHeight, movieDetails.playButton]}>
                                        <View style={[style.relative, movieDetails.playTriangle]}></View>
                                    </View>
                                    <Text style={[style.textUppercase, style.textCenter, {marginTop: 10, fontWeight: "700", color: '#FFFFFF', fontSize: 13}]}>View trailer</Text>
                                </TouchableOpacity>
                            }
                        </LinearGradient>
                    </View>

                    <View style={[movieDetails.detailsContainer, style.relative]}>
                        <View style={[style.flexboxContainer, style.flexStart]}>
                            <View style={[movie.movie, movieDetails.selectedMoviePoster, movie.imageCont]}>
                                <Image source={{uri: this.state.details.medium_cover_image || this.state.details.large_cover_image}} style={[movieDetails.selectedMoviePoster]} resizeMode="cover"/>
                            </View>
                            <View style={[style.flexbox]}>
                                <Text style={[movieDetails.title, movieDetails.leftWidth]} numberOfLines={1} ellipsizeMode="tail">{this.state.details.title_english || this.state.details.title}</Text>
                                <Text style={[movieDetails.subText, movieDetails.leftWidth, {marginBottom: 5, fontWeight: "500"}]} numberOfLines={1} ellipsizeMode="tail">{`${this.state.details.runtime} mins | ${this.state.details.mpa_rating || '-'} | ${this.state.details.language}`}</Text>
                                <View style={[style.flexboxContainer, style.flexStart, {marginBottom: 5, fontWeight: "500"}]}>
                                    <Image source={heart} style={movieDetails.heartIcon}/>
                                    <Text style={[movieDetails.subText]}>{this.state.details.rating}</Text>
                                </View>
                                <View style={[style.flexboxContainer, style.flexStart, style.flexWrap, movieDetails.leftWidth]}>
                                    {
                                        this.state.details.genres.map((el, index) => (
                                            <Text style={[movieDetails.subText, style.border, movie.posterGenre, {marginRight: 10, marginBottom: 10, fontWeight: "500"}]} key={index}>{el}</Text>
                                        ))
                                    }
                                </View>
                            </View>
                        </View>
                        <View style={{paddingTop: 15}}>
                            <Text style={movieDetails.description}>{this.state.details.description_full || this.state.details.summary || this.state.details.synopsis}</Text>
                        </View>
                        
                        <TouchableOpacity style={{marginTop: 35}} onPress={() => {this.props.navigation.push('Movie', {data: this.state.details})}}>
                            <LinearGradient colors={['#FE6FA1', '#FF6EA0', '#FD70AF']} angle={180} style={style.btn}>
                                <Text style={[style.btnText, style.textCenter, style.textUppercase]}>Watch Movie</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    <View style={[style.flexbox, style.sectionBox]}>
                        <View style={[style.flexboxContainer, style.verticalMiddle, movie.headingContainer]}>
                            <View style={style.flexbox}>
                                <Text style={movie.heading}>Similar Films</Text>
                            </View>
                        </View>
                        <ScrollView horizontal={true} style={style.bothsideOverFlow}>
                            <View style={[style.flexboxContainer, {paddingRight: 15}]}>
                            {
                                this.state.suggested.map((el, index) => (
                                    <TouchableOpacity style={[style.flexbox]} key={index} onPress={() => {this.props.navigation.push('Details', {data: el})}}>
                                        <MovieList data={el}/>
                                    </TouchableOpacity>
                                ))
                            }
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

export default MovieDetails;