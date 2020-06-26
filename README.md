# Kayapp

Hacky POC experimenting with geojson.

# Rough Idea

- Use OSM data for countries, regions, rivers, features
- Add own data about rivers, river sections, features, hazards and store as geojson (Django?)
- Feed data back to OSM. Maybe using whitewater properties?

# Rough process

- Get sample river data from either OSM or https://overpass-turbo.eu
- Save file
- Load into map (currently hardcoded)
- Do stuff with it

# Useful resources

- https://stackoverflow.com/questions/38483868/leaflet-js-draw-line-along-rivers-between-two-points
- https://leafletjs.com/examples/quick-start/
- https://leafletjs.com/examples/geojson/
