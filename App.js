import 'react-native-gesture-handler';
import React from 'react';
import { AppLoading } from 'expo';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';

import Movies from "./src/pages/movie";
import Trailers from "./src/pages/trailer";
import PlayMovie from "./src/pages/play-movie";
import MovieDetails from "./src/pages/movie-details";

const Stack = createStackNavigator();

export default class AppContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isReady: false
		}
	}

	loadFonts(){
		return Font.loadAsync({
			'Roboto': require('./src/assets/fonts/Roboto-Regular.ttf'),
			'Roboto Medium': require('./src/assets/fonts/Roboto-Medium.ttf'),
			'Roboto Bold': require('./src/assets/fonts/Roboto-Bold.ttf')
		});
	}

	// componentDidMount(){
	// 	console.log(1);
	// }

	render(){
		if (!this.state.isReady) return (<AppLoading startAsync={this.loadFonts} onFinish={() => this.setState({isReady: true})}/>);
		else{
			return(
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen name="Movies" component={Movies} options={{headerShown: false}}/>
						<Stack.Screen name="Details" component={MovieDetails} options={{headerShown: false}}/>
						<Stack.Screen name="Trailer" component={Trailers} options={{headerShown: false}}/>
						<Stack.Screen name="Movie" component={PlayMovie} options={{headerShown: false}}/>
					</Stack.Navigator>
				</NavigationContainer>
			)
		}
	}
}

