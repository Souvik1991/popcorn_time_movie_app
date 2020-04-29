import React, { Component } from 'react';
import axios from 'axios';
import { Picker } from 'react-native-picker-dropdown';
import { Text, Image, View, StatusBar, ScrollView, TouchableOpacity, Dimensions } from 'react-native';

import MovieList from "../components/movie-list";
import { config } from '../components/constant';

import { style } from "../style/base";
import { movie } from "../style/movie";

import loading from "../assets/images/loading.gif";

class GenreMovies extends Component{
    constructor(props){
        super(props);
        this.state = {
            order: this.props.route.params.order,
            genre: this.props.route.params.genre,
            name: this.props.route.params.name,
            movies: [],
            page: 1,
            loading: false,
            hasMore: true,
            width: (Dimensions.get('window').width/2) - 23,
            sortBy: 'rating'
        };
        this.sortByChange = this.sortByChange.bind(this);
    }

    getMovies(){
        if(!this.state.loading && this.state.hasMore){
            this.setState({
                loading: true
            }, () => {
                var link = `${config.API_URL}/list_movies.json?genre=${this.state.genre}&page=${this.state.page}&sort_by=${this.state.sortBy}&order_by=desc&limit=${config.RESULT_SIZE}`;
                if(this.state.order !== undefined) link = `${config.API_URL}/list_movies.json?page=${this.state.page}&sort_by=${this.state.order}&order_by=desc&limit=${config.RESULT_SIZE}`;
                axios.get(link)
                .then((movies) => {
                    this.setState({
                        movies: [...this.state.movies, ...movies.data.data.movies],
                        loading: false,
                        page: this.state.page + 1,
                        hasMore: movies.data.data.movies.length < config.RESULT_SIZE ? false : true
                    })
                })
            })
        }
    }

    sortByChange(sortBy){
        this.setState({
            sortBy: sortBy,
            movies: [],
            page: 1,
            hasMore: true
        }, () => {
            this.getMovies()
        })
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
                                {this.state.order === undefined && 
                                    <View style={style.flexbox}>
                                        <Picker selectedValue={this.state.sortBy} onValueChange={this.sortByChange} mode="dropdown" textStyle={style.pickerText}>
                                            <Picker.Item label="Title" value="title" />
                                            <Picker.Item label="Year" value="year" />
                                            <Picker.Item label="Rating" value="rating" />
                                            <Picker.Item label="Like count" value="like_count" />
                                            <Picker.Item label="Date added" value="date_added" />
                                            <Picker.Item label="Peers" value="peers" />
                                            <Picker.Item label="Seeds" value="seeds" />
                                            <Picker.Item label="Download count" value="download_count" />
                                        </Picker>
                                    </View>
                                }
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
                        {
                            this.state.loading &&
                            <View style={[style.flexboxContainer, style.centerAligned, {marginBottom: 50}]}>
                                <Image source={loading} style={{width: 25, height: 25, marginRight: 10}}/>
                                <Text style={[style.textCenter, style.loadingText]}>Loading...</Text>
                            </View>
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default GenreMovies;