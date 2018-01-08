# HPC-TV

> Cheyenne Supercomputer Super-Project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
```

## Application Overview
 This application uses Vue, Vue Router and Vuex.
 ### Vue
 This application complies with official [Vue protocols](https://vuejs.org/v2/api/) and [Priority Level A,B,C Style guide lines](https://vuejs.org/v2/style-guide/).

The root of the application is `/src/App.vue` All other components can be found in `src/components/`.

 ### Vue Router
 The router is responsible for the navigation and url / browser history component of this application. 
 All of the routes are defined in `/src/router/index.js`.
 The router is proxied in each component through `this.$router` and therefore any properties or methods of this object are 'globally' accessible.
 
 Navigation occurs via `<router-link to="">` where the component name is the value for the "to" attribute.

 ### Vuex
Vuex is used as a conveniece to consolidate all of the static  / semi-static data into single files based on the pages to which they belong. You can change the static information in this application by changing the data in `/src/vuex/**.js`.

Additionally, any information within a Vue component on the page that comes from Vuex is proxied via `vuex.<propertyName>`. This makes finding information from vuex easier to isolate when searching source code.