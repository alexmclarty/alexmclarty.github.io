import { rivers } from './rivers.js';
import { features } from './features.js';


mapboxgl.accessToken = 'pk.eyJ1IjoiaGFydmV5cG9va2EiLCJhIjoiY2tleWJqMzk2MDlmdDJ6bzIzMDlybjN4ayJ9.f7NOdQXcl0gJCMJhYvRz8w';
var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/light-v10', // stylesheet location
  center: [-1.8676757812500002, 54.55972074357376], // starting position
  zoom: 8 // starting zoom
});

map.on('load', function () {
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

map.on('style.load', () => {
  map.on('mousemove', e => {
  const features = map.queryRenderedFeatures([[0,0], [map.getCanvas().width, map.getCanvas().height]], { layers: ['features'] })
  let content = ''
  if (features.length) {
    content += '<h2>Features</h2><ul>'
    features.map(feature => content += `<li>${feature.properties.name || ''} grade ${feature.properties.grade} ${feature.properties.featureType}</li>`)
    content += '</ul>'
  }
  document.getElementById('features').innerHTML = content
})
})
