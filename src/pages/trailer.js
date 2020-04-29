import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { View, TouchableOpacity } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

import { style } from "../style/base";

class Trailers extends Component{
    constructor(props){
        super(props);
        this.state = {
            playing: true,
            videoId: this.props.route.params.data
        }
    }

    render() {
        var width = Dimensions.get('window').width,
            height = Dimensions.get('window').height;
        if(width > height){
            var tmp = width;
            width = height;
            height = tmp;
        }
        return (
            <View style={[style.main, style.relative, {backgroundColor: '#000000', height: height, width: width}]}>
                <TouchableOpacity style={style.customBack} onPress={() => {this.props.navigation.pop()}}>
                    <View style={[style.border, style.customBackArrow]}></View>
                </TouchableOpacity>
                <View style={[style.flexboxContainer, style.verticalMiddle, style.fullHeight]}>
                    <View style={[style.flexbox]}>
                        <YoutubePlayer 
                            height={width*(9/16)}
                            width={width}
                            videoId={this.state.videoId} 
                            play={this.state.playing}
                            playbackRate={1}
                            playerParams={{
                                rel: 0
                            }}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

export default Trailers;