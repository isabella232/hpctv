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

In order to connect to the Cheyenne API, you must create a file in `/static/env/host.js` and set this variable:  `var hpctvhost = 'https://yourhost.edu/v1/'`. This file is not commited to version control. For dev and staging environments, use the following host: `var hpctvhost = 'https://private-08983-hpctv.apiary-mock.com/v1/'`

### Vue Router
The router is responsible for the navigation and url / browser history component of this application. 
All of the routes are defined in `/src/router/index.js`.
The router is proxied in each component through `this.$router` and therefore any properties or methods of this object are 'globally' accessible.

Navigation occurs via `<router-link to="">` where the component name is the value for the "to" attribute.

### Vuex
Vuex is used as a conveniece to consolidate all of the static  / semi-static data into single files based on the pages to which they belong. You can change the static information in this application by changing the data in `/src/vuex/**.js`.

Additionally, any information within a Vue component on the page that comes from Vuex is proxied via `vuex.<propertyName>`. This makes finding information from vuex easier to isolate when searching source code.

## Table of Contents

1. [Global Components](#global-components)
    - [General Architecture](#general-architecture)
    - [Dock Nav](#dock-nav)
    - [Side Nav](#side-nav)

1. [Homepage](#homepage)
    - [Splash Page](#splash)

1. [Specs](#specs)
    - [Small Modal](#specs-small-modal)
    - [Slide up Modal (Glossary)](#specs-glossary)

1. [Live Data](#live-data)
    - Now Running / Total Run (Stat Cards)
    - 3D Graph (Three)
    - Line Graph (Live Chart)
    - Glosary (Slide Up Modal)

1. Projects
    - Project Log (Slide Up Modal)
        - Table (TableComponent)
    - Individual Project View
        -  Carousel (Vue Carousel)



## <a name="#global-components">Global Components</a>
### <a name="#general-architecture">General Architecture</a>
All styles are imported and scoped on a component level except for those in `src/scss/global.scss`.

All scripts are self contained within their components. If a script needs to access other components or a global variable, it will use Vuex generally.

Assets such as fonts, videos, images and icons are all stored in `/static`.

The app is initilaized first through `src/vuex/store.js`. In this file you will find constructor objects for the general settings of the app including the API host and authentication (for pre-release versions). All Component or page level global settings are merged into this file from `import` statements at the top. Any copy changes or image assets that need to be swapped can be changed by modifying the source code for the given module in the `store` folder. Details on the locations and purposes of each module is included in it's section.

`main.js` is the entry point for the application. This file does not contain much, and generally should not be modified.

`App.vue` is the root component, and all of the pages are rendered inside this component's `<router-view>` tag. This is where you may modify the footer of the site as well. If a page transition is desired, it is defined in the watch object of this component.

### <a name="#dock-nav">Dock Nav</a>
The dock nav component has no props and no methods. It is simply a nav list that pairs routes with components. On mobile it will determine if the 	&#9776; icon is open. 
### <a name="#side-nav">Side Nav</a>
The Side Nav component is how the user can flip from screen to screen without using the Dock Nav. none of the methods should be called directly. 

## <a name="#homepage">Homepage</a>
The copy in this section lives in `/src/vuex/home.js` as `introPanel:{mainHeader, body}`.
### <a name="#splash">Splash Page</a>
The splash page contains a quote and a button. The state of this button is stored in Vuex as `/home.js`. By tracking the state of the button, we can make sure that when the user returns to the home screen that they do not see the quote again, only the introduction.
      

## <a name="#specs">Specs</a>
The Specs page contains an image of Cheyenne that has pinpoints placed at specific X,Y coordinates relative to the image size. At this point, a button will be placed. When the button is clicked, the modal will open. 
#### Methods
`allOff() -> void`

Called by the child components to make sure only one modal is on at a time.
### <a name="specs-small-modal"> Small Modal </a>
#### Props
`:data` { Object }

    {
    x: Number - the X position relative to the image coordinates for the button.
    y: Number - the Y position relative to the image coordinates for the button.
    modalData: {
      title: String ,
      subtitle: String,
      body: String | Template Literal,
      media: String - Path or URL to asset
    }
  }

#### Methods
`toggle() -> void`

Toggles the visibility of the sender modal. Emits an event to the parent to turn all modals off first.


### <a name="#specs-glossary"> Glossary (Slide Up Modal) </a>
#### Props
`title` { String } - The name that appears on the tab.

### Slot
`HTML` - any content that you want to appear INSIDE the slide up modal goes in a slot like this:

    <slide-up-modal :title="Title on the Tab">
      <!-- your content here -->
    </slide-up-modal>

### Watchers
`legendIsOpen({any})`
  
  This watcher is specifically to make sure that if the slide up modal is initialized directly via a hash route, that when the modal is closed, it removes the hash from the URL.


## <a name="#live-data">Live Data</a>