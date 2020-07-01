# Kayapp

Hacky POC experimenting with geojson.

# Rough Idea

- Use OSM data for countries, regions, rivers, features
- Add own data about rivers, river sections, features, hazards and store as geojson (Django?)
- Feed data back to OSM. Maybe using whitewater properties?

# Rough process

- Get sample river data from either OSM/https://overpass-turbo.eu
- Load into https://geojson.io
- Remove features
- Add into array (currently hardcoded)

# Thoughts on how to manage the data

- OSM has continent, country, region, river...and some features
- features appear to be tourist/waterfall, some other stuff
- not specific to kayaking...

# Useful resources

- https://stackoverflow.com/questions/38483868/leaflet-js-draw-line-along-rivers-between-two-points
- https://leafletjs.com/examples/quick-start/
- https://leafletjs.com/examples/geojson/

- https://geojson.io/