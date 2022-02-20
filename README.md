# global-journey

A Vue web app to track contributions to a journey across the world.

*This project is not entirely complete and is no longer maintained. Release v0.2.2 is the final public.*

## Description

global-journey is a web application written in Vue.js (with Vuex and Vue Router) to keep track of and visualise cumulative journeys, as were common in the first COVID-19 lockdown; for example, students at a school each running 10km of the distance from the school to Tokyo.

Entered data is stored in the web browser's `localStorage`, so is retained between visits.

Unfortunately, due to time constraints, the project is unfinished, but is a useful proof-of-concept, and was an interesting exercise in learning new web technologies.

Forking and future development of the project would be welcome.

### Features

+ Automatic calculation of journey distance (using a Great Circle algorithm)
+ Live and dynamic map showing start location, end location, current position, and the path taken
+ Live reverse geocoding to find the name (e.g. country) of the current position 
+ Add and remove 250km contributions
+ Customisable units (from miles, km, or nm)
+ Customisable journey start and end locations
+ Percentage covered indication
+ Success message when 100% of the journey has been compelted
+ Fully responsive design (using Bulma CSS)
+ Automatic delpoyment to production with GitHub Actions

### Desirable future features

+ Customisable contribution lengths and contributor names
+ Statistics page, showing most prolific contributors
+ Ability to export map and contributions list

## Commands

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Copyright and licensing

This project is Copyright (c) 2021 tti0, and is licensed under the MIT License.

Map data is Copyright (c) [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors.

Reverse geocoding data is from [OpenCageData](https://opencagedata.com/credits).