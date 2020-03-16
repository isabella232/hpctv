# HPC-TV

[Cheyenne Supercomputer Project](https://hpctv.ucar.edu)

HPC-TV is a VueJS app that is served from AWS S3. Data from SAM is pushed to the app nightly via a CircleCI job.

## Develop and Build

First, pull in data from SAM. To do this locally you must set the SAM API username and password, then run:

```bash
bash ./get-sam-data.sh
```

This will populate the ./data directory with 13 JSON files containing HPC data from the SAM API.

Next, build the app:

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader), and the Application Overview below.

## Deploy to staging and production environments

Deployment to AWS S3 occurs via the "hpctv-deployment" AWS Codepipeline. The pipleline contains two build stages separated by a manual approval. To trigger the pipeline, commit changes to this repo and push to the master branch on GitHub. This will trigger the first build stage.

The first build stage of the pipeline will:

* install npm
* build the application
* add the latest git hash as a comment to the bottom of index.html
* push the code up to the S3 bucket at hpctv-test.ucar.edu

At this point, you can access the [staging site](https://hpctv-test.ucar.edu) before promoting to production.

To promote the build to production, manually approve the pipeline to copy the code from the staging S3 bucket into the production S3 bucket. This production build will also invalidate the Cloudfront cache.

## HPC Data

A CircleCI job runs nightly to fetch updated Cheyenne accounting data from SAM. Updated data is synced to the staging and production S3 buckets.

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

### Axios
Axios is a promised based HTTP library and is used for all external resource calls in this application. It has a global configuration object that can be modified in `/src/vuex/store.js` as the `apiConfig` object. Generally this should not be modified.


### Autoplay Functionality
 For non interactive displays (I.E. Televisions) the app comes with autoplay functionality built into every component. Autoplay is activated by clicking or tapping on the NCAR/UCAR logo 5 times. The screen will briefly flash blue when autoplay is activated. To disable this feature, you repeat the same action. Upon disabling the feature, it's a good idea to refresh your browser window, as some of the scripting may have modified the behavior of some components.

#### Using Autoplay
Whether or not autoplay is enabled is stored inside Vuex. All components will listen for a change on this property, and when triggered it will begin a sequence of actions defined in a method called `beginAutoplay()`;

to script these actions you write a function inside beginAutoplay() called `automate()`. This function accepts an array of objects `Array<Object>` in the following format:

        {delay: Number, trigger: callback Function}

`delay` is the number of milliseconds it takes FROM WHEN THE PREVIOUS ACTION FINISHES before `trigger()` is fired. 

Example Usage:

    beginAutoplay(){
        this.automate([
            {
                delay: 1000,
                trigger(){
                    console.log('I will run after 1 second.');
                }
            },

            {
                delay: 2000,
                trigger(){
                    console.log('I will run after 3 seconds.');
                }
            },
        ])
    }

## Table of Contents

1. [Global Components](#global-components)
    - [General Architecture](#general-architecture)
    - [Dock Nav](#dock-nav)
    - [Side Nav](#side-nav)

1. [Homepage](#homepage)
    - [Splash Page](#splash)

1. [Specs](#specs)
    - [Small Modal](#specs-small-modal)
    - [Glossary (Slide Up Modal)](#specs-glossary)

1. [Live Data](#live-data)
    - [Now Running / Total Run (Stat Cards)](#now-running)
    - [3D Graph (Three)](#three)
    - [Line Graph (Line Chart)](#line-chart)
    - [Glosary (Slide Up Modal)](#live-data-glossary)

1. [Projects](#projects)
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

#### Slot
`HTML` - any content that you want to appear INSIDE the slide up modal goes in a slot like this:

    <slide-up-modal :title="Title on the Tab">
      <!-- your content here -->
    </slide-up-modal>

#### Watchers
`legendIsOpen({any})`
  
  This watcher is specifically to make sure that if the slide up modal is initialized directly via a hash route, that when the modal is closed, it removes the hash from the URL.

#### Content

All editable content for the glossary can be found in `/src/vuex/specs.js` in the `glossary` Object.

    {
      title: String,
      subtitle: String (optional),
      definition: String || template literal
    }


## <a name="#live-data">Live Data</a>
The Live Data page is the page that handles nearly all of the API calls. Some of these calls live in the `created()` hook of this component and are passed as props to their respective components.
### <a name="#now-running">Now Running / Total Run (Stat Card)</a>
Each of the Stat cards displays data from the API which is passed as a prop.
#### Props
`cardData` : {Object}

       cardData: {
          statName: String - the display name of the card,
          iconPath: String (optional) - path to an icon displayed on left,
          statNumber: Number || String - the data point associated with statName
         }

#### Filters
`numFormatter(num: {Number}) -> String`

Used to adjust the notation of larger numbers. e.g. (100,000 => 100k).
All numbers from the API should be passed through this function. Returns string formatted with commas for numbers less than 49000. For numbers over 49000, returns a string with a suffix denoting the order of magnitude (i,e. K for thousand, M for million, B for billion, T for trillion).

### <a name="three">3D Graph (Three)</a>
This is by far the most complex component in the app. It uses a library called [Three.js](https://threejs.org/docs/index.html) to render the data vizualization. all the data for the graph comes directly from the API and should not be entered manually. 

To enable developer mode, type the Konami code at any point on the Live-data page. 

`↑ ↑ ↓ ↓ ← → ← → b a`

If entered correctly, you will see a yellow box around the scene. This disables the lock on the orbit controls as well as displays bounding boxes and object normals for the objects in the scene including lights. Refreshing the page will disable this mode.

Due to the nature of working with Three JS there is a lot of boiler plate code in this component. The lifecycle of the app kicks off in the `created()` hook where the app reaches out to the API to get data as quickly as possible.

#### Methods

` init()`

Responsible for creating the 3D environment, binding canvas events,


` enableDeveloperMode()`

Removes mouse restrictions for full camera control, adds helpers to the scene for visualising directions and normals of the 3D objects.


` makeCube(color) ⇒ BoxGeometry`

Generator function to create a simple Cube geometry.

| Param | Type | Description |
| --- | --- | --- |
| color | String \| Number | string representation of a color in rgb/hex format or websafe color strings. Hexidecimal representation of color |

` updateCube(id, color)`

Helper function to control a single cube in the array (this.group) of cubes.



| Param | Type | Description |
| --- | --- | --- |
| id | Number | the index of the target cube in the array from 0-199. |
| color | String \| Number | string representation of a color in rgb/hex format or websafe color strings. Hexidecimal representation of color |

` animate()`

Required function by ThreeJS. Do not call directly.


` onWindowResize()`

Handler for resizing the canvas


` onMouseUp(event)`

Handler for mouse up event



| Param | Type | Description |
| --- | --- | --- |
| event | Event | the window event |

` onMouseDown(event)`

Handler for mouse down event



| Param | Type | Description |
| --- | --- | --- |
| event | Event | the window event |

` onMouseMove(event)`

Handler for mouse move event



| Param | Type | Description |
| --- | --- | --- |
| event | Event | the window event |

` applyDataSets(dataSet, tabName)`

Used to change the 3D model's data visualization. Also emits an event to pass data to the modal in the parent component.



| Param | Type | Description |
| --- | --- | --- |
| dataSet | Array\<Object> | The new Dataset |
| tabName | String | the active tab for which to compute data. |

        dataset:[
            {
                data: {
                    coreHours: Number
                    jobs: Number
                    projects: Number
                },
                group: String - the name of the organization or facility.
            },
            {...}, {...}
        ]

` makeSprite(cubeNumber, groupName)`

Creates a circle with plus icon above cubeNumber's position with title of groupname



| Param | Type | Description |
| --- | --- | --- |
| cubeNumber | Number | the ID number b/w 0-199 of the cube in the array |
| groupName | String | the name that will be assigned to the (+) Icon. This information is used to get the appropriate data from the server. |

` getCanvasWidth() ⇒ number`

get the width of the canvas. This value will be 100% of it's container


**Returns**: number - a number of pixels

` getCanvasHeight()`

Canvas height is 60% of `<main>`



### <a name="line-chart">Line Chart</a>
_This component is an open source project that has been modified and extendedbased on [Vue-ChartJS](http://vue-chartjs.org/#/home)_

The line chart is reponsible for displaying data from the API as well. This data does not work in staging or dev environments for some reason. All data is passed as a prop. See official documentation for detailed desctipyions. The modifcations to this component are strictly for responsive Data as well as non-default settings.


### <a name="#live-data-glossary">Glossary (Slide up Modal)</a>
This component is identical to [this one](#specs-glossary).


## <a name="#projects">Projects</a>
This page is the most likely to contain updatable content in the future. All of the editable regions will be defined below. All editable content can be found in `/src/vuex/projects.js`.

### Project Modal (Big Modal)
This is the modal window to display the project information.
#### Props
`data` : {Object} - comes directly from Vuex in this format:

    {
      name: String - short name for the icon on main page,
      longProjectName: String - long name for the modal header,
      area: String (optional) - Area of Study,
      heroImage: String - path to image used for main page. must be square aspect ratio,
      projectLead: {
        name:  String,
        organizationName:  String,
        twitter: String,
        thumbnail:  String - path to headshot,
        shortBio:  String | template literal
      },
      statData: [
          // See Stat Card for more info
        {
          statName: String ,
          statNumber: String ,
          iconPath: String 
        }
      ],
      mainContent: [
          // Each of these object will become it's own slide.
        {
          title: String,
          body: String or template literal for HTML,
          media: String - path to media (any img format or mp4 video)
        },
        {...}, {...}
      ]
    }

#### Methods
`handleExitTap()`

Sends an event to the parent to close the modal

`isImage(filepath : String) -> Bool`

Returns if argument has common image file extension

`isVideo(filepath: String) -> Bool`

returns if argument has common video file extension



### ProjectLog (Table Component / Slide Up Modal)
This is the same slide up modal used in other areas of the app, but this time, it has another component in its slot. The data for this comes from the API and should not be edited directly.

The table is an open source program from [Vue Table Component](https://github.com/spatie/vue-table-component). Please see the readme on this github page for more information.