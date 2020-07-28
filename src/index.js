import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import rivers from './geoJSON/rivers'
import features from './geoJSON/features'

mapboxgl.accessToken = 'pk.eyJ1IjoiaGFydmV5cG9va2EiLCJhIjoiY2s3MGYyaDllMWVmdzNubXZwZTVydGJ5NyJ9.bOoi4juLS82_7BMYrGbdeg';

class Application extends React.Component {

    render () {
        return (
            <div>
                <div className='sidebar'>
                    <h1 id='appTitle'>kayapp</h1>
                    <div className='sidebarData'>
                        Longtitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}
                    </div>
                    {this.state.features.length > 0 &&
                        <div className='features'>
                            <h2>Features</h2>
                            {JSON.stringify(features)}
                        </div>
                    }
                </div>
                <div ref={el => this.mapContainer = el} className="mapContainer"/>
            </div>
        )
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });
        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            })
        })
        map.on('load', () => {
            map.addLayer({
            id: 'rivers',
            type: 'line',
            source: {
              type: 'geojson',
              data: rivers
            },
            paint: { }
          });
          map.addLayer({
            id: 'features',
            type: 'circle',
            source: {
              type: 'geojson',
              data: features
            },
            paint: { }
          });
        })
        map.on('move', e => {
            const features = map.queryRenderedFeatures([[0,0], [map.getCanvas().width, map.getCanvas().height]], { layers: ['features'] })
            if (features.length) {
                this.setState({
                    features: features.map(feature => ({
                        name: feature.properties.name
                    }))
                })
            } else {
                this.setState({
                    features: []
                })
            }
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            lng: 5,
            lat: 34,
            zoom: 4,
            features: []
        };
    }


}

ReactDOM.render(<Application />, document.getElementById('app'));