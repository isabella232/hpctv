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
     * @param {Number} x
     * @param {Number} y
     * @param {String || Number} color string representation of a color in rgb/hex format or websafe color strings. Hexidecimal representation of color
     * @param {Number} [offset=0] - Number of cubes by which to offset the other parameters
     */
    updateCube(x, z, color, offset = 0) {
      const allCubes = this.group.children;
      const id = x + z * 10 + offset;

      // condition to account for any rounding errors
      if (id <= 199) {
        allCubes[id].material.color.set(color);
      } else {
        console.log(id);
      }
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
      console.log('window resize');

      this.camera.aspect = this.getCanvasWidth() / this.getCanvasHeight();
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(this.getCanvasWidth(), this.getCanvasHeight());
    },

    /**
     * Handler for mouse up event
     * @param {Event} event - the window event
     */
    onMouseUp(event) {
      // console.log('mouseup');
      if (!this.dragging) {
        if (event.path[0].tagName === 'CANVAS') {
          const mouseX = event.clientX / window.innerWidth * 100;
          const mouseY = event.clientY / window.innerHeight * 100;
          // console.log('mouseX ', mouseX);
          // console.log('mouseY', mouseY);
          // console.log('inside canvas');
          this.mouse.x = event.clientX / this.renderer.domElement.width;
          this.mouse.y = event.clientY / this.renderer.domElement.height;

          this.raycaster.setFromCamera(this.mouse, this.camera);

          let intersects = this.raycaster.intersectObjects(this.group.children);

          if (intersects.length > 0) {
            console.log('found intersection');
            intersects[0].object.material.color.setHex(0xf5f5f5);
          }

          this.$emit('canvasWasTouched', { mouseX, mouseY });
        }
      }
      this.mouseDown = false;
    },

    /**
     * Handler for mouse down event
     * @param {Event} event - the window event
     */
    onMouseDown(event) {
      // console.log('mousedown');
      this.mouseMove = false;
      this.mouseDown = true;
    },

    /**
     * Handler for mouse move event
     * @param {Event} event - the window event
     */
    onMouseMove(event) {
      // console.log('mousemove');
      this.mouseMove = true;
    },

    /**
     * Used to change the 3D model's data visualization.
     * @param {Obejct} dataSet - The new Dataset
     * @param {String} tabName - the active tab for which to compute data.
     */
    applyDataSets(dataSet, tabName) {
      let activeData = {};
      let colors = [];

      if (tabName === 'user allocation') {
        activeData = this.vuex.userAllocation;
        colors = ['#19799c', '#1d8995', '#76bb4f', '#0992c9', '#00ab80', '#09afff'];
      } else if (tabName === 'area of study') {
        activeData = dataSet;
        colors = ['#ffeb99', '#ffd45e', '#fbb144', '#ffe000', '#f7931d', '#f5872c'];
      } else {
        throw new Error('The tab name is not correct');
      }

      // get totals first
      let totalCoreHours = 0;

      activeData.forEach(set => {
        totalCoreHours += set.data.coreHours;
      });

      // convert each of these to a percentage of the whole set, rounded to nearest .5.
      activeData.forEach(set => {
        set.data.percentages = {
          // to decimal -> to percentage -> to .5
          coreHours: Math.round(set.data.coreHours / totalCoreHours * 100 * 2) / 2
        };
      });

      // keep track of consecutive blocks already colored.
      let offset = 0;

      for (let i = 0; i < activeData.length; i++) {
        // each object in data set
        const user = activeData[i].group;
        const color = colors[i];
        console.log(user, i);

        // this.makeSprite(offset);

        // create a block either at the beginning or somewhere in the middle. each block is .5% so allocation number is doubled.
        offset += i > 0 ? activeData[i - 1].data.percentages.coreHours * 2 : 0;

        // loop through the other axis.
        for (let j = 0; j < activeData[i].data.percentages.coreHours * 2; j++) {
          // recolor each cube in the range.
          this.updateCube(j, 0, color, offset);
        }
      }
    },

    /**
     * Generator function. Creates a new + image on the origin of each new break in the dataSet.
     * @param {String || Number} color string representation of a color in rgb/hex format or websafe color strings. Hexidecimal representation of color
     */
    makeCircle(color) {
      const geometry = new RingGeometry(0.55, 0.75, 32);
      const material = new MeshBasicMaterial({ color });
      const disc = new Mesh(geometry, material);
      return disc;
    },

    makeSprite(cubeNumber) {
      //create the object
      const spriteMap = new TextureLoader().load('/static/icon/plus-x-icon.svg');
      // next line avoids explicit image texture to be size in base 2 sizes.
      spriteMap.minFilter = LinearFilter;
      const spriteMaterial = new SpriteMaterial({ map: spriteMap, color: 0xbfd600 });
      const sprite = new Sprite(spriteMaterial);
      // place it at cubeNumber's position overhead.

      sprite.position.x = this.group.children[cubeNumber].position.x;
      sprite.position.y = 4.5;
      sprite.position.z = this.group.children[cubeNumber].position.z;

      sprite.translateX(15);
      sprite.translateY(1.5);
      sprite.translateZ(-6);

      this.scene.add(sprite);
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
      const main = document.querySelector('main');
      return (
        parseInt(
          getComputedStyle(main)
            .getPropertyValue('height')
            .replace('px', '')
        ) * 0.6
      );
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
    }
  },

  mounted() {
    this.init();
    // this.enableDeveloperMode();

    // create a 3 dimensional array of polygons.
    for (let x = 0; x < 20; x++) {
      for (let z = 0; z < 10; z++) {
        const color = `rgb(${2 * z},${175 + z * 5},${120 + x * 3})`;
        const cube = this.makeCube(color);

        this.group.add(cube);
        this.updateCube(z, x, color);
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
    // const urls = this.vuex.aoigList.map(group => `/static/${group.queryString.replace(/\%20/g, '-').toLowerCase()}.json`);
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
  },

  watch: {
    developerMode(newVal) {
      if (newVal) {
        this.enableDeveloperMode();
      }
    },
    activeTab(newVal) {
      console.log('tab changed to', newVal);
      this.applyDataSets(this.dataSet, newVal);
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
