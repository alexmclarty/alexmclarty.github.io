# Kayapp

Hacky POC experimenting with GeoJSON.

# Rough Idea

- Use OSM data for countries, regions, rivers
- Add own data about RiverSections, RiverFeatures, Hazards and store as geojson.
- Feed data back to OSM. Maybe using whitewater properties?

# Rough process

- Get river data from OSM/https://overpass-turbo.eu
- Load into https://geojson.io
- Remove features
- Add Feature properties to GeoJSON
- Add into array (currently hardcoded)

## Getting data

https://overpass-turbo.eu has  cryptic syntax.

This Python script uses Nomanatim to get a boundary: 

https://github.com/KaartGroup/localModelScripts/tree/master/get_country_boundary




# TODO

- Data
    - Country (UK)
    - All Regions
    - Two Rivers
    - RiverSections
    - RiverFeatures (added as GeoJSON properties?)
- UI
    - Display
        - Country
        - Region
        - River
        - RiverSection
        - Features
    - Click RiverFeature and see properties
    - Click River and see RiverFeatures
    - Click RiverSection and see RiverFeatures
    - Search for RiverFeatures by properties
        - grade
        - name?
        - FeatureType?
        - river
     - associations between RiverFeature, River and RiverSection
        - @relations?
    - Icons for RiverFeatures
        - Rapid
        - Waterfall
        - Access
        - Egress
        - Hazard

# Longer term TODO

- River levels
    - Poll EA API to get river levels
    - Store somewhere (time series?)
    - Use CEH catchment area data, overlay for river
    - Display weather information for catchment area
    - User journal
    - Check-in
        - Duration
        - Difficulty
        - River level calibration
- Weather
- Catchment
    - si

# Assumptions

- Most users won't want to add features.
- Most users will want to view Rivers, RiverSections and RiverFeatures.
- You'd need an approval process for adding features if users wanted to do this:
    - duplicates
    - mistakes
    - spam

# Useful resources

- https://stackoverflow.com/questions/38483868/leaflet-js-draw-line-along-rivers-between-two-points
- https://leafletjs.com/examples/quick-start/
- https://leafletjs.com/examples/geojson/
- https://geojson.io/ or https://geojson.net
