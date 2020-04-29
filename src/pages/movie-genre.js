import React, { Component } from 'react';
import axios from 'axios';
import { Text, View, StatusBar, ScrollView, TouchableOpacity, Dimensions } from 'react-native';

import MovieList from "../components/movie-list";
import { config } from '../components/constant';

import { style } from "../style/base";
import { movie } from "../style/movie";

class GenreMovies extends Component{
    constructor(props){
        super(props);
        this.state = {
            genre: this.props.route.params.genre,
            name: this.props.route.params.name,
            movies: [],
            page: 1,
            loading: false,
            width: (Dimensions.get('window').width/2) - 23
        }
    }

    getMovies(){
        if(!this.state.loading){
            this.setState({
                loading: true
            }, () => {
                axios.get(`${config.API_URL}/list_movies.json?genre=${this.state.genre}&page=${this.state.page}&sort_by=rating&order_by=desc&limit=${config.RESULT_SIZE}`)
                .then((movies) => {
                    this.setState({
                        movies: [...this.state.movies, ...movies.data.data.movies],
                        loading: false,
                        page: this.state.page + 1
                    })
                })
            })
        }
    }

    scroll(e){
		let nevent = e.nativeEvent;
        if(nevent.contentSize.height < (nevent.contentOffset.y + nevent.layoutMeasurement.height + 250) && !this.state.loading) this.getMovies();
	}

    componentDidMount(){
        this.getMovies();
    }

    render(){
        return (
            <View style={style.main}>
                <StatusBar backgroundColor="#ffffff" barStyle="light-content" />
                <ScrollView scrollEventThrottle={10} onScroll={(e) => this.scroll(e)}>
                    <View style={[style.flexboxContainer, style.flexColumn]}>
                        {/* Popular movie listing */}
                        <View style={[style.flexbox, style.border, style.sectionBox, {marginTop: 50, marginBottom: 20, paddingBottom: 25}]}>
                            <View style={[style.flexboxContainer, style.verticalMiddle, movie.headingContainer, {paddingBottom: 0}]}>
                                <View style={style.flexbox}>
                                    <Text style={movie.heading}>{this.state.name}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[style.flexboxContainer, style.flexStart, style.flexWrap, {paddingLeft: 15, paddingRight: 15}]}>
                        {
                            this.state.movies.map((el, index) => (
                                <TouchableOpacity style={[style.flexbox, {marginBottom: 15, marginRight: (index % 2 === 0 ? 15 : 0)}]} key={index} onPress={() => {this.props.navigation.navigate('Details', {data: el})}}>
                                    <MovieList data={el} width={this.state.width}/>
                                </TouchableOpacity>
                            ))
                        }
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default GenreMovies;