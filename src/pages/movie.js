import React, { Component } from 'react';
import axios from 'axios';
import Swiper from 'react-native-swiper'
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View, Image, ScrollView, StatusBar, TouchableOpacity } from 'react-native';

import MovieList from "../components/movie-list";
import { config } from '../components/constant';

import { style } from "../style/base";
import { movie } from "../style/movie";
import { movieDetails } from "../style/movie-details";

import heart from "../assets/images/heart.png";
import loading from "../assets/images/loading.gif";

class Movies extends Component{
    constructor(props){
        super(props);
        this.state = {
			featured: [],
			popular: [],
			recent: [],
			action: [],
			adventure: [],
			loaded: false,
			init: false
		}
	}
	
	loadMoreSection(){
		axios.all([
			axios.get(`${config.API_URL}/list_movies.json?genre=action&sort_by=rating&order_by=desc&limit=${config.RESULT_SIZE}`),
			axios.get(`${config.API_URL}/list_movies.json?genre=adventure&sort_by=rating&order_by=desc&limit=${config.RESULT_SIZE}`)
		])
		.then(axios.spread((popular, recent) => {
			this.setState({
				loaded: true,
				action: popular.data.data.movies,
				adventure: recent.data.data.movies
			})
		}))
	}

	scroll(e){
		let nevent = e.nativeEvent;
        if(nevent.contentSize.height < (nevent.contentOffset.y + nevent.layoutMeasurement.height + 250) && !this.state.notLoaded){
			this.loadMoreSection();
        }
	}

    componentDidMount(){
		axios.all([
			axios.get(`${config.API_URL}/list_movies.json?sort_by=like_count&order_by=desc&limit=10`),
			axios.get(`${config.API_URL}/list_movies.json?sort_by=rating&order_by=desc&limit=${config.RESULT_SIZE}`),
			axios.get(`${config.API_URL}/list_movies.json?sort_by=year&order_by=desc&limit=${config.RESULT_SIZE}`)
		])
		.then(axios.spread((featured, popular, recent) => {
			this.setState({
				featured: featured.data.data.movies,
				popular: popular.data.data.movies,
				recent: recent.data.data.movies,
				init: true
			})
		}))
		.catch((err) => {
			console.log(err);
		})
    }

    render() {
        return (
            <View style={style.main}>
				<StatusBar backgroundColor="#ffffff" barStyle="light-content" />
				{!this.state.init && 
					<View style={[style.flexboxContainer, style.centerAligned, style.fullHeight]}>
						<Image source={loading} style={{width: 25, height: 25, marginRight: 10}}/>
						<Text style={[style.textCenter, style.loadingText]}>Loading...</Text>
					</View>
				}
                {this.state.init && 
					<ScrollView scrollEventThrottle={16} onScroll={(e) => this.scroll(e)}>
						<Swiper loop={true} style={style.relative} height={380} index={0} autoplay={true} autoplayTimeout={5} dot={<View style={style.dot}/>} activeDot={<View style={style.activeDot} />}>
							{
								this.state.featured.map((el, index) => (
									<TouchableOpacity style={[movieDetails.moviePoster]} key={index} onPress={() => {this.props.navigation.navigate('Details', {data: el})}}>
										<Image source={{uri: el.background_image}} style={[movieDetails.moviePoster]} resizeMode="cover"/>
										<LinearGradient colors={['rgba(49,54,74,0.2)', 'rgba(49,54,74,0.4)', '#31364A']} angle={180} style={[movieDetails.gradiend]}></LinearGradient>
										
										<View style={[style.flexboxContainer, style.flexStart, {position: 'absolute', bottom: 15, left: 15}]}>
											<View style={[movie.movie, movieDetails.selectedMoviePoster, movie.imageCont]}>
												<Image source={{uri: el.medium_cover_image || el.large_cover_image}} style={[movieDetails.selectedMoviePoster]} resizeMode="cover"/>
											</View>
											<View style={[style.flexbox]}>
												<Text style={[movieDetails.title, movieDetails.leftWidth]} numberOfLines={1} ellipsizeMode="tail">{el.title_english || el.title}</Text>
												<Text style={[movie.subText, movieDetails.leftWidth, {marginBottom: 5, fontWeight: "500"}]} numberOfLines={1} ellipsizeMode="tail">{`${el.runtime} mins | ${el.mpa_rating || '-'} | ${el.language}`}</Text>
												<View style={[style.flexboxContainer, style.flexStart, {marginBottom: 5, fontWeight: "500"}]}>
													<Image source={heart} style={movie.heartIcon}/>
													<Text style={[movie.subText]}>{el.rating}</Text>
												</View>
												<View style={[style.flexboxContainer, style.flexStart, style.flexWrap, movieDetails.leftWidth]}>
													{
														el.genres.map((el, index) => (
															<Text style={[movie.subText, style.border, movie.posterGenre, {marginRight: 10, marginBottom: 10, fontWeight: "500"}]} key={index}>{el}</Text>
														))
													}
												</View>
											</View>
										</View>
									</TouchableOpacity>
								))
							}
						</Swiper>

						<View style={[style.flexboxContainer, style.flexColumn]}>
							{/* Popular movie listing */}
							<View style={[style.flexbox, style.border, style.sectionBox, {paddingTop: 0, marginTop: -5}]}>
								<View style={[style.flexboxContainer, style.verticalMiddle, movie.headingContainer]}>
									<View style={style.flexbox}>
										<Text style={movie.heading}>Popular</Text>
									</View>
									<TouchableOpacity style={[style.flexbox, style.relative]} onPress={() => {this.props.navigation.navigate('List', {order: 'rating', name: 'Popular'})}}>
										<Text style={[style.textRight, movie.seeAll]}>See All</Text>
										<View style={[style.border, movie.seeAllArrow]}></View>
									</TouchableOpacity>
								</View>
								<ScrollView horizontal={true} style={style.bothsideOverFlow}>
									<View style={[style.flexboxContainer, {paddingRight: 15}]}>
									{
										this.state.popular.map((el, index) => (
											<TouchableOpacity style={[style.flexbox]} key={index} onPress={() => {this.props.navigation.navigate('Details', {data: el})}}>
												<MovieList data={el}/>
											</TouchableOpacity>
										))
									}
									</View>
								</ScrollView>
							</View>
							
							{/* Genre listing */}
							<View style={[style.flexbox, style.border, style.sectionBox]}>
								<View style={[style.flexboxContainer, style.verticalMiddle, movie.headingContainer]}>
									<View style={style.flexbox}>
										<Text style={movie.heading}>Movie genre</Text>
									</View>
									{/* <TouchableOpacity style={[style.flexbox, style.relative]}>
										<Text style={[style.textRight, movie.seeAll]}>See All</Text>
										<View style={[style.border, movie.seeAllArrow]}></View>
									</TouchableOpacity> */}
								</View>
								<ScrollView horizontal={true} style={style.bothsideOverFlow}>
									<View style={[style.flexboxContainer, {paddingRight: 15}]}>
									{
										config.GENRE.map((el, index) => (
											<TouchableOpacity style={[style.flexbox, style.relative, movie.movie, {width: 'auto'}]} key={index} onPress={() => {this.props.navigation.navigate('List', {genre: el.slug, name: el.name})}}>
												<Image source={{uri: `${config.GENRE_IMAGE_URL}${el.shortName}.jpg`}} style={[movie.genreImage]} resizeMode="cover"/>
												<LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.6)', '#000']} angle={180} style={[style.flexboxContainer, style.fullHeight, movie.shadow]}>
													<View style={[style.flexbox, {justifyContent: "flex-end"}]}>
														<Text style={[movie.title, movie.genreTitle]} numberOfLines={1} >{ el.name }</Text>
													</View>
												</LinearGradient>
											</TouchableOpacity>
										))
									}
									</View>
								</ScrollView>
							</View>

							{/* Recent movie listing */}
							<View style={[style.flexbox, style.border, style.sectionBox]}>
								<View style={[style.flexboxContainer, style.verticalMiddle, movie.headingContainer]}>
									<View style={style.flexbox}>
										<Text style={movie.heading}>Recently released</Text>
									</View>
									<TouchableOpacity style={[style.flexbox, style.relative]} onPress={() => {this.props.navigation.navigate('List', {order: 'year', name: 'Recently released'})}}>
										<Text style={[style.textRight, movie.seeAll]}>See All</Text>
										<View style={[style.border, movie.seeAllArrow]}></View>
									</TouchableOpacity>
								</View>
								<ScrollView horizontal={true} style={style.bothsideOverFlow}>
									<View style={[style.flexboxContainer, {paddingRight: 15}]}>
									{
										this.state.recent.map((el, index) => (
											<TouchableOpacity style={[style.flexbox]} key={index} onPress={() => {this.props.navigation.navigate('Details', {data: el})}}>
												<MovieList data={el}/>
											</TouchableOpacity>
										))
									}
									</View>
								</ScrollView>
							</View>
							
							{this.state.loaded && 
							<View style={{marginBottom: 50}}>
								{/* Recent action movie listing */}
								<View style={[style.flexbox, style.border, style.sectionBox]}>
									<View style={[style.flexboxContainer, style.verticalMiddle, movie.headingContainer]}>
										<View style={style.flexbox}>
											<Text style={movie.heading}>Action movies</Text>
										</View>
										<TouchableOpacity style={[style.flexbox, style.relative]} onPress={() => {this.props.navigation.navigate('List', {genre: 'action', name: 'Action'})}}>
											<Text style={[style.textRight, movie.seeAll]}>See All</Text>
											<View style={[style.border, movie.seeAllArrow]}></View>
										</TouchableOpacity>
									</View>
									<ScrollView horizontal={true} style={style.bothsideOverFlow}>
										<View style={[style.flexboxContainer, {paddingRight: 15}]}>
										{
											this.state.action.map((el, index) => (
												<TouchableOpacity style={[style.flexbox]} key={index} onPress={() => {this.props.navigation.navigate('Details', {data: el})}}>
													<MovieList data={el}/>
												</TouchableOpacity>
											))
										}
										</View>
									</ScrollView>
								</View>

								{/* Recent adventure movie listing */}
								<View style={[style.flexbox, style.border, style.sectionBox, {borderBottomWidth: 0}]}>
									<View style={[style.flexboxContainer, style.verticalMiddle, movie.headingContainer]}>
										<View style={style.flexbox}>
											<Text style={movie.heading}>Adventure movies</Text>
										</View>
										<TouchableOpacity style={[style.flexbox, style.relative]} onPress={() => {this.props.navigation.navigate('List', {genre: 'adventure', name: 'Adventure'})}}>
											<Text style={[style.textRight, movie.seeAll]}>See All</Text>
											<View style={[style.border, movie.seeAllArrow]}></View>
										</TouchableOpacity>
									</View>
									<ScrollView horizontal={true} style={style.bothsideOverFlow}>
										<View style={[style.flexboxContainer, {paddingRight: 15}]}>
										{
											this.state.adventure.map((el, index) => (
												<TouchableOpacity style={[style.flexbox]} key={index} onPress={() => {this.props.navigation.navigate('Details', {data: el})}}>
													<MovieList data={el}/>
												</TouchableOpacity>
											))
										}
										</View>
									</ScrollView>
								</View>
							</View>
							}
							{!this.state.loaded &&
								<View style={[style.flexboxContainer, style.centerAligned, {marginTop: 20, marginBottom: 50}]}>
									<Image source={loading} style={{width: 25, height: 25, marginRight: 10}}/>
									<Text style={[style.textCenter, style.loadingText]}>Loading...</Text>
								</View>
							}
						</View>
					</ScrollView>
				}
            </View>
        )
    }
}

export default Movies;