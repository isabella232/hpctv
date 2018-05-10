<template>
  <div class="threejs">
  </div>
</template>

<script>
import { Scene, Color, Group, DirectionalLight, DirectionalLightHelper, HemisphereLight, HemisphereLightHelper, PerspectiveCamera, BoxHelper, BoxGeometry, MeshLambertMaterial, MeshBasicMaterial, Mesh, RingGeometry, WebGLRenderer, TextureLoader, SpriteMaterial, Sprite, EventDispatcher, Vector3, MOUSE, Quaternion, Spherical, Vector2, OrthographicCamera, Raycaster, LinearFilter, AxesHelper } from '../../../node_modules/three/build/three.min.js';
const three = { EventDispatcher, Vector3, MOUSE, Quaternion, Spherical, Vector2, OrthographicCamera, PerspectiveCamera };
const OrbitControls = require('three-orbit-controls')(three);
import axios from 'axios';
import KonamiCode from 'konami-code';
const konami = new KonamiCode();

export default {
  data() {
    return {
      camera: null,
      canvas: null,
      cameraPosition: {
        x: -14.33,
        y: 5.72,
        z: 12.02
      },
      controls: null,
      developerMode: false,
      lights: {
        globalLight: null,
        primaryLight: null
      },
      group: null,
      sprites: null,
      scene: null,
      renderer: null,
      dataSet: [],
      userGroups: [],
      mouse: null,
      mouseDown: false,
      mouseMove: false
    };
  },

  methods: {
    /**
     * Responsible for creating the 3D environment, binding canvas events,
     */
    init() {
      // Environment Setup
      this.scene = new Scene();
      // this.scene.background = new Color(0xe0e0e0);
      this.renderer = this.makeRenderer;
      this.canvas = document.querySelector('.threejs');
      this.canvas.appendChild(this.renderer.domElement);
      this.group = new Group();
      this.sprites = new Group();
      console.log('For 3D debugging, please input Konami Code at any time.');
      konami.listen(() => {
        console.log('Developer mode enabled.');
        this.developerMode = true;
      });
      window.addEventListener('resize', this.onWindowResize);
      this.canvas.addEventListener('mousedown', this.onMouseDown);
      this.canvas.addEventListener('mousemove', this.onMouseMove);
      this.canvas.addEventListener('mouseup', this.onMouseUp);

      // Lights
      this.lights.primaryLight = new DirectionalLight(0x404040, 1, 0, 2);
      const primaryLight = this.lights.primaryLight;
      primaryLight.position.x = 0;
      primaryLight.position.y = 4.72;
      primaryLight.position.z = 15;
      primaryLight.target = this.group;
      this.scene.add(primaryLight);

      this.lights.globalLight = new HemisphereLight(0xffffff, 0xffffff, 0.55);
      const globalLight = this.lights.globalLight;
      globalLight.position.x = 0;
      globalLight.position.y = 20;
      globalLight.position.z = 0;
      globalLight.lookAt(0, 0, 0);
      this.scene.add(globalLight);

      // Camera Setup
      this.camera = new PerspectiveCamera(50, this.getCanvasWidth() / this.getCanvasHeight(), 0.1, 1000);
      // Raycaster is used for determining 2D mouse position on the canvas
      this.raycaster = new Raycaster();
      this.mouse = new Vector2();

      // Keyboard Mouse Controls
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enabled = true;
      this.controls.enableZoom = false;
      this.controls.enablePan = false;
      this.controls.minPolarAngle = 0.4 * Math.PI;
      this.controls.maxPolarAngle = 0.4 * Math.PI;

      this.camera.position.x = this.cameraPosition.x;
      this.camera.position.y = this.cameraPosition.y;
      this.camera.position.z = this.cameraPosition.z;
    },

    /**
     * Removes mouse restrictions for full camera control, adds helpers to the scene for visualising directions and normals of the 3D objects.
     */
    enableDeveloperMode() {
      const worldLightHelper = new HemisphereLightHelper(this.lights.globalLight, 2);
      const sphereSize = 1;
      const mainLightHelper = new DirectionalLightHelper(this.lights.primaryLight, sphereSize);
      const boxHelper = new BoxHelper(this.group);
      const axisHelper = new AxesHelper(this.group);
      this.scene.add(worldLightHelper);
      this.scene.add(mainLightHelper);
      this.scene.add(boxHelper);
      this.scene.add(axisHelper);
      this.controls.enableZoom = true;
      this.controls.enablePan = true;
      this.controls.minPolarAngle = 0;
      this.controls.maxPolarAngle = Math.PI;
      this.controls.update();
    },

    /**
     * Generator function to create a simple Cube geometry.
     * @param {String || Number} color string representation of a color in rgb/hex format or websafe color strings. Hexidecimal representation of color
     * @returns {BoxGeometry}
     */
    makeCube(color) {
      const geometry = new BoxGeometry(1, 5, 1);
      const material = new MeshLambertMaterial({ color, flatShading: false });
      const cube = new Mesh(geometry, material);
      return cube;
    },

    /**
     * Helper function to control a single cube in the array (this.group) of cubes.
     * @param {Number} id the index of the target cube in the array from 0-199.
     * @param {String || Number} color string representation of a color in rgb/hex format or websafe color strings. Hexidecimal representation of color
     */
    updateCube(id, color) {
      const allCubes = this.group.children;
      allCubes[id].material.color.set(color);
    },

    /**
     * Required function by ThreeJS. Do not call directly.
     */
    animate() {
      requestAnimationFrame(this.animate);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    },

    /**
     * Handler for resizing the canvas
     */
    onWindowResize() {
      this.camera.aspect = this.getCanvasWidth() / this.getCanvasHeight();
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.getCanvasWidth(), this.getCanvasHeight());
    },

    /**
     * Handler for mouse up event
     * @param {Event} event - the window event
     */
    onMouseUp(event) {
      if (!this.dragging) {
        if (event.path[0].tagName === 'CANVAS') {
          // make sure all the modals are closed.
          this.$parent.allOff();
          // coordinates in the window
          const mouseX = event.clientX / window.innerWidth * 100;
          const mouseY = event.clientY / window.innerHeight * 100;

          // coordinates in the canvas. This is between -1 and 1.
          this.mouse.x = (event.clientX - this.renderer.domElement.offsetLeft) / this.renderer.domElement.clientWidth * 2 - 1;
          this.mouse.y = -((event.clientY - this.renderer.domElement.offsetTop) / this.renderer.domElement.clientHeight) * 2 + 1;

          this.raycaster.setFromCamera(this.mouse, this.camera);
          let spriteIntersects = this.raycaster.intersectObjects(this.sprites.children);

          if (spriteIntersects.length > 0) {
            // pass the window coordinates and the associated data-set in an event.
            let selectedSprite = spriteIntersects[0].object.name;
            // hide the canvas sprite so that the HTML can take over.
            spriteIntersects[0].object.material.opacity = 0;
            this.$store.commit('renderAllSprites', false);
            // Where are we pulling data from?
            let popupData;
            switch (this.activeTab) {
              case 'facility allocation':
                popupData = this.userGroups.filter(object => {
                  return object.group == selectedSprite;
                });
                break;

              case 'area of study':
                popupData = this.dataSet.filter(object => {
                  return object.group == selectedSprite;
                });
                break;

              default:
                console.error('cannot find suitable data src for modal in onMouseUp event');
                break;
            }

            this.$emit('canvasWasTouched', { mouseX, mouseY, data: popupData[0] });
          }
        }
      }
      this.mouseDown = false;
    },

    /**
     * Handler for mouse down event
     * @param {Event} event - the window event
     */
    onMouseDown(event) {
      this.mouseMove = false;
      this.mouseDown = true;
    },

    /**
     * Handler for mouse move event
     * @param {Event} event - the window event
     */
    onMouseMove(event) {
      this.mouseMove = true;
    },

    /**
     * Used to change the 3D model's data visualization.
     * @param {Object} dataSet - The new Dataset
     * @param {String} tabName - the active tab for which to compute data.
     */
    applyDataSets(dataSet, tabName) {
      this.scene.remove(this.sprites);
      this.sprites = null;
      this.sprites = new Group();

      let activeData = {};
      let colors = [];

      if (tabName === 'facility allocation') {
        activeData = this.userGroups;
        colors = ['#19799c', '#1d8995', '#76bb4f', '#0992c9', '#00ab80', '#09afff'];
      } else if (tabName === 'area of study') {
        activeData = dataSet;
        colors = ['#ffd45e', '#fbb144', '#ffe000', '#f7931d', '#ffeb99', '#f5872c'];
      } else {
        throw new Error('The tab name is not correct');
      }

      let totalCoreHours = 0;
      // get total Core hours for all groups.
      activeData.forEach(group => {
        totalCoreHours += group.data.coreHours;
      });

      let offset = 0;
      // loop through each group in samle data. keeping track of index is important here.
      for (let i = 0; i < activeData.length; i++) {
        const group = activeData[i];
        const userName = activeData[i].group;
        const color = colors[i % colors.length];

        // convert the number of Core Hours to a percentage of the whole.
        group.data.percentage = Math.round(group.data.coreHours / totalCoreHours * 100);

        // now that we have percentages, figure out how many blocks they will take up by doubling their number so that total is out of 200.
        group.data.blocks = { count: group.data.percentage * 2 };
        // then figure out the range of IDs for each block.
        group.data.blocks.start = offset;
        group.data.blocks.end = offset + group.data.blocks.count - 1;

        // find the visual halfway point.
        const mathematical = offset + group.data.blocks.count / 2;
        let visual;
        if (group.data.blocks.count > 10) {
          visual = Math.round(mathematical / 5) * 5;
          // we don't wany multiples of 10, only 5 (to stay in the center of the graph).
          visual = visual % 10 === 0 ? visual - 5 : visual;
        } else {
          visual = mathematical;
        }

        // now set the color for each block in the range.
        for (let i = group.data.blocks.start; i <= group.data.blocks.end; i++) {
          if (i == visual) {
            this.makeSprite(i, userName);
          }
          this.updateCube(i, color);
        }
        offset = group.data.blocks.end + 1;
      }

      this.scene.add(this.sprites);
    },

    /**
     * Creates a circle with plus icon above cubeNumber's position with title of groupname
     * @param {Number} cubeNumber the ID number b/w 0-199 of the cube in the array
     * @param {String} groupName the name that will be assigned to the (+) Icon. This information is used to get the appropriate data from the server.
     */
    makeSprite(cubeNumber, groupName) {
      //create the object
      const spriteMap = new TextureLoader().load('/static/icon/plus-x-icon.svg');
      // next line avoids explicit image texture to be size in base 2 sizes.
      spriteMap.minFilter = LinearFilter;
      const spriteMaterial = new SpriteMaterial({ map: spriteMap, color: 0xbfd600, transparent: true });
      const sprite = new Sprite(spriteMaterial);
      // place it at cubeNumber's position overhead.
      sprite.name = groupName;
      sprite.position.x = this.group.children[cubeNumber].position.x;
      sprite.position.y = 4;
      sprite.position.z = this.group.children[cubeNumber].position.z;

      sprite.translateX(15);
      sprite.translateY(1.5);
      sprite.translateZ(-6);

      this.sprites.add(sprite);
    },

    /**
     * get the width of the canvas. This value will be 100% of it's container
     * @return {number} a number of pixels
     */
    getCanvasWidth() {
      return parseInt(
        getComputedStyle(this.parentContainer)
          .getPropertyValue('width')
          .replace('px', '')
      );
    },

    /**
     * Canvas height is 60% of <main>.
     */
    getCanvasHeight() {
      // getting height from DOM selector is causing a strange issue with canvas height on certain render paths. Instead of getting the value of <main> (which is calculated anway in css), we'll do the calculation here and return the appopriate value.
      return (window.innerHeight - 170) * 0.6; // in live-data.scss -- calc(100vh - 170px);
    }
  },

  computed: {
    makeRenderer() {
      const renderer = new WebGLRenderer({ alpha: true });
      renderer.setSize(this.getCanvasWidth(), this.getCanvasHeight());
      renderer.setClearColor(0x000000, 0);
      return renderer;
    },

    activeTab() {
      return this.$store.state.liveData.activeTab;
    },

    parentContainer() {
      return document.querySelector('.threejs');
    },

    dragging() {
      return this.mouseDown && this.mouseMove;
    },

    vuex() {
      return this.$store.state.liveData;
    },

    apiConfig() {
      return this.$store.state.apiConfig;
    },

    showingAllSprites() {
      return this.vuex.renderAllSprites;
    }
  },

  mounted() {
    this.init();
    // this.enableDeveloperMode();

    // create a 2 dimensional array of polygons.
    for (let x = 0; x < 20; x++) {
      for (let z = 0; z < 10; z++) {
        // default colors for before data loads.
        // const color = `rgb(${0 * z},${121 + z * 5},${124 + x * 3})`;
        const color = 0x888888;
        const cube = this.makeCube(color);

        this.group.add(cube);
        const cubeID = x + z * 10;

        // Spacing between cubes adjusted here.
        cube.position.x = -x * 1.25;
        cube.position.z = z * 1.25;
      }
    }
    this.scene.add(this.group);

    // Move the "center" of the group to the middle of the array
    // May not be true center but will be based on the visual perspective camera.
    this.group.translateX(15);
    this.group.translateY(1.5);
    this.group.translateZ(-6);
    this.camera.lookAt(this.group.children[100].position);

    // Required calls for user interactions.
    this.controls.update();
    this.animate();
  },

  created() {
    // Reach out to the API as soon as possible.

    // get all the AOIG's and loop through them, sending a get request for each group. this may take a while
    const urls = this.vuex.aoigList.map(group => `report/aoiglog/aoig/${group.queryString}?daysAgo=30`);
    axios
      .all(urls.map(endpoint => axios.get(endpoint, this.apiConfig)))
      .then(res => {
        // all responses are now returned in format [{}, {}] so we have to loop through them and get the data we want.
        res.forEach(response => {
          if (response.status === 200) {
            // first have to get the good part of the string. there might be a better way to do this in production.
            const url = response.request.responseURL;
            const prettyName = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('?')).replace(/\%20/g, ' ');

            this.dataSet.push({
              group: prettyName.replace('-', ' '),
              data: response.data
            });
          }
        });
      })
      .then(() => {
        this.applyDataSets(this.dataSet, this.vuex.activeTab);
      });

    // get the facility breakdown.
    axios
      .get('report/projectlog?daysAgo=1', this.apiConfig)
      .then(response => {
        this.userGroups = [];
        let tempGroups = {};

        // now we need to sort the data properly by facility.

        // Make sure that this data is in the same format as the AOIG data.
        response.data.entries.forEach(project => {
          if (tempGroups[project.facility] == undefined) {
            tempGroups[project.facility] = {
              group: project.facility,
              data: {
                coreHours: 0,
                jobs: 0
              }
            };
          } else {
            return;
          }
        });
        // add up the cumulative core hours
        response.data.entries.forEach(project => {
          if (tempGroups.hasOwnProperty(project.facility)) {
            tempGroups[project.facility].data.coreHours += parseInt(project.coreHours);
          }
        });
        // convert to array
        for (const facility in tempGroups) {
          if (tempGroups.hasOwnProperty(facility)) {
            this.userGroups.push(tempGroups[facility]);
            
          }
        }
        this.applyDataSets(this.userGroups, this.activeTab);
      })
      .catch(error => error);
  },

  watch: {
    developerMode(newVal) {
      if (newVal) {
        this.enableDeveloperMode();
      }
    },

    activeTab(newVal) {
      this.applyDataSets(this.dataSet, newVal);
    },

    showingAllSprites(newVal) {
      if (newVal) {
        this.sprites.children.forEach(sprite => {
          // allow the animation to finish before repopulating the sprites
          setTimeout(() => {
            sprite.material.opacity = 1;
          }, 1000);
        });
      }
    }
  }
};
</script>

<style scoped>
input {
  display: block;
}
span {
  display: inline;
}
</style>
