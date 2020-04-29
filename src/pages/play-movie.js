import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

class PlayMovie extends Component{
    constructor(props){
        super(props);
        this.state = {
            details: this.props.route.params.data,
            poster: this.props.route.params.data.background_image_original || this.props.route.params.data.background_image,
            loaded: false
        };
        this.onReady = this.onReady.bind(this);
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

    createMagnetUrl(btih){
        var trackers = [
            'udp://glotorrents.pw:6969/announce',
            'udp://tracker.opentrackr.org:1337/announce',
            'udp://torrent.gresille.org:80/announce',
            'udp://tracker.openbittorrent.com:80',
            'udp://tracker.coppersurfer.tk:6969',
            'udp://tracker.leechers-paradise.org:6969',
            'udp://p4p.arenabg.ch:1337',
            'udp://tracker.internetwarriors.net:1337',
            'udp://open.demonii.com:1337/announce'
        ];
        return `magnet:?xt=urn:btih:${btih}&tr=${trackers.join('&tr=')}`
    }

    onReady(data){
        console.log(data);
    }

    componentDidMount(){
        // console.log(this.state.details);
        var hashId = this.findHashId(),
            magnetUrl = this.createMagnetUrl(hashId);
    }

    render(){
        return (
            <>
                <WebView source={{ uri: 'https://souvik1991.github.io/index.html' }}></WebView>
            </>
        )
    }
}

export default PlayMovie;