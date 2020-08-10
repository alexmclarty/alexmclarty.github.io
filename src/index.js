import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Link
} from "react-router-dom";
import mapboxgl from 'mapbox-gl';
import rivers from './geoJSON/rivers'
import features from './geoJSON/features'

mapboxgl.accessToken = 'pk.eyJ1IjoiaGFydmV5cG9va2EiLCJhIjoiY2tkN2Y2c2Z1MDU2ZTJybXN3c2U2OHdjMiJ9.FE28Hzh1Rxb79x1vKr1WpA';

// prop drilling?
// redux as an alternative. clever global state management.
// apollo graphql has global state management tooz.

function RiverList(props) {
    // filter data based on:
    // "name": "River Tees",
    // "type": "waterway",
    // "waterway": "river",
    const rivers = props?.rivers?.filter(river => river.properties.type === 'waterway')
    return (
        <div className='riverListContainer'>
            <h2>Rivers</h2>
            <ul>
                {/*TODO key={river?.properties?.@id}*/}
                {rivers?.map((river, key) => <River river={river}/>)}

            </ul>
        </div>
    )
}

function FeatureList(props) {
    if (props.features.length > 0) {
        return (
            <div className='featureListContainer'>
                <h2>Features</h2>
                <ul>
                    {
                        props.features.map((feature, key) => <Feature feature={feature} key={feature.properties.id}/>)
                    }
                </ul>
            </div>
        )
    } else {
        return null
    }
}

function River(props) {
    return (
        <li className='river'>
            {props?.river?.properties?.name}
        </li>
    )
}

function Feature(props) {
    // use redux to get the feature?
    let { featureId } = useParams();
    console.log(featureId)
    return (
      <li className='feature'>
          <Link to={`/feature/${props?.feature?.properties?.id}`}>{props?.feature?.properties?.name} Grade {props?.feature?.properties?.grade} {props?.feature?.properties?.featureType}</Link>
      </li>
  );
}

class Application extends React.Component {

    render () {
        return (
            <Router>
                <div>
                    <div className='sidebar'>
                        <h1 id='appTitle'>kayapp</h1>
                        <div className='mapMetadata'>
                            Longtitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}
                        </div>
                        <Switch>
                            <Route path='/feature/:featureId'>
                                {(props) => {
                                    console.log(props)
                                    return null
                                }}
                                {/*<Feature feature={this.state.features.filter(feature => feature?.properties?.id == featureId)}/>*/}
                            </Route>
                            <Route path="/">
                                <div>
                                    <RiverList rivers={this.state.rivers}/>
                                </div>
                                <div>
                                    {this.state.zoom >= 8 && <FeatureList features={this.state.features}/>}
                                </div>
                            </Route>
                        </Switch>
                    </div>
                    <div ref={el => this.mapContainer = el} className="mapContainer"/>
                </div>
            </Router>
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
            console.log('features from map', features)
            const renderedFeatures = features.length ? features : []
            this.setState({features: renderedFeatures})

            const rivers = map.queryRenderedFeatures([[0,0], [map.getCanvas().width, map.getCanvas().height]], { layers: ['rivers'] })
            const renderedRivers = rivers.length ? rivers : []
            this.setState({rivers: renderedRivers})

        })
    }

    constructor(props) {
        super(props);
        this.state = {
            lng: -1.61,
            lat: 54.6,
            zoom: 6,
            features: []
        };
    }


}

ReactDOM.render(<Application />, document.getElementById('app'));