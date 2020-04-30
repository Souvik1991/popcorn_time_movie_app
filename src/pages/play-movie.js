import React, { Component } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

import { style } from "../style/base";

class PlayMovie extends Component{
    constructor(props){
        super(props);
        this.state = {
            details: this.props.route.params.data,
            poster: this.props.route.params.data.background_image_original || this.props.route.params.data.background_image,
            hashId: undefined
        };
    }

    findHashId(){
        var webURL = undefined,
            otherURL = undefined;

        for(var i=0; i<this.state.details.torrents.length; i++){
            if(this.state.details.torrents[i].quality === '720p' && this.state.details.torrents[i].type === 'web'){ 
                webURL = this.state.details.torrents[i].hash;
                break;
            }
            else if(this.state.details.torrents[i].quality === '720p') otherURL = this.state.details.torrents[i].hash;
        }
        return webURL || otherURL;
    }

    componentDidMount(){
        // console.log(this.state.details);
        this.setState({
            hashId: this.findHashId()
        })
    }

    render(){
        return (
            <View style={style.main}>
                {this.state.hashId && <WebView source={{ uri: `https://souvik1991.github.io/index.html?tid=${this.state.hashId}&poster=${this.state.poster}` }}></WebView>}
            </View>
        )
    }
}

export default PlayMovie;