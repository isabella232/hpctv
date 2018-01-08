<template>
  <div class="threejs">
  </div>
</template>

<script>
import * as three from 'three';
import OrbitControls from 'orbit-controls-es6';
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
      scene: null,
      renderer: null,
      dataSet: [
        {
          user: 1,
          allocation: 49
        },
        {
          user: 2,
          allocation: 26
        },
        {
          user: 3,
          allocation: 25
        }
      ],
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
      this.scene = new three.Scene();
      // this.scene.background = new three.Color(0xe0e0e0);
      this.renderer = this.makeRenderer;
      this.canvas = document.querySelector('.threejs');
      this.canvas.appendChild(this.renderer.domElement);
      this.group = new three.Group();
      console.log('For 3D debugging, please input Konami Code at any time.');
      konami.listen(() => {
        console.log('Developer mode enabled.');
        this.developerMode = true;
      });
      this.canvas.addEventListener('resize', this.onWindowResize);
      this.canvas.addEventListener('mousedown', this.onMouseDown);
      this.canvas.addEventListener('mousemove', this.onMouseMove);
      this.canvas.addEventListener('mouseup', this.onMouseUp);

      // Lights
      this.lights.primaryLight = new three.DirectionalLight(0x404040, 1, 0, 2);
      const primaryLight = this.lights.primaryLight;
      primaryLight.position.x = 0;
      primaryLight.position.y = 4.72;
      primaryLight.position.z = 15;
      primaryLight.target = this.group;
      this.scene.add(primaryLight);

      this.lights.globalLight = new three.HemisphereLight(0xffffff, 0xffffff, 0.55);
      const globalLight = this.lights.globalLight;
      globalLight.position.x = 0;
      globalLight.position.y = 20;
      globalLight.position.z = 0;
      globalLight.lookAt(0, 0, 0);
      this.scene.add(globalLight);

      // Camera Setup
      this.camera = new three.PerspectiveCamera(50, this.canvasWidth / this.canvasHeight, 0.1, 1000);

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
      const worldLightHelper = new three.HemisphereLightHelper(this.lights.globalLight, 2);
      const sphereSize = 1;
      const mainLightHelper = new three.DirectionalLightHelper(this.lights.primaryLight, sphereSize);
      const boxHelper = new three.BoxHelper(this.group);
      this.scene.add(worldLightHelper);
      this.scene.add(mainLightHelper);
      this.scene.add(boxHelper);
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
      const geometry = new three.BoxGeometry(1, 5, 1);
      const material = new three.MeshLambertMaterial({ color, flatShading: false });
      const cube = new three.Mesh(geometry, material);
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
      this.camera.aspect = this.canvasWidth / this.canvasHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(this.canvasWidth, this.canvasHeight);
    },

    /**
      * Handler for mouse up event
      * @param {Event} event - the window event
      */
    onMouseUp(event) {
      console.log('mouseup');
      if (!this.dragging) {
        if (event.path[0].tagName === 'CANVAS') {
          const mouseX = event.clientX / window.innerWidth * 100;
          const mouseY = event.clientY / window.innerHeight * 100;
          console.log('mouseX ', mouseX);
          console.log('mouseY', mouseY);
          console.log('inside canvas');
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
      console.log('mousedown');
      this.mouseMove = false;
      this.mouseDown = true;
    },

    /**
      * Handler for mouse move event
      * @param {Event} event - the window event
      */
    onMouseMove(event) {
      console.log('mousemove');
      this.mouseMove = true;
    },

    /**
      * Used to change the 3D model's data visualization.
      * @param {Obejct} dataSet - The new Dataset
      */
    applyDataSets(dataSet) {
      // const user1 = dataSet[0];
      // const user2 = dataSet[1];
      // const user3 = dataSet[2];

      // for (let i = 0; i < user1.allocation * 2; i++) {
      //   this.updateCube(i, 0, 0xff0000, 0);
      // }

      // for (let i = 0; i < user2.allocation * 2; i++) {
      //   this.updateCube(i, 0, 0x00ff00, 100);
      // }

      // for (let i = 0; i < user3.allocation * 2; i++) {
      //   this.updateCube(i, 0, 0x0000ff, user1.allocation * 2 + user2.allocation * 2);
      // }

      // keep track of consecutive blocks already colored.
      let offset = 0;
      // dummy array of colors.
      const colors = [0xff0000, 0x00ff00, 0x0000ff];
      for (let i = 0; i < dataSet.length; i++) {
        // each object in data set
        const user = dataSet[i];
        const color = colors[i];

        // either at the beginning or somewhere in the middle. each block is .5% so allocation number is doubled.
        offset += i > 0 ? dataSet[i - 1].allocation * 2 : 0;

        for (let j = 0; j < user.allocation * 2; j++) {
          // loop through each cube in range and recolor it.
          this.updateCube(j, 0, color, offset);
        }
      }
    },

    /**
      * Generator function. Creates a new + image on the origin of each new break in the dataSet.
      * @param {String || Number} color string representation of a color in rgb/hex format or websafe color strings. Hexidecimal representation of color
      */
    makeCircle(color) {
      const geometry = new three.RingGeometry(0.55, 0.75, 32);
      const material = new three.MeshBasicMaterial({ color });
      const disc = new three.Mesh(geometry, material);
      return disc;
    }
  },

  computed: {
    makeRenderer() {
      const renderer = new three.WebGLRenderer({ alpha: true });
      renderer.setSize(window.innerWidth * 0.5695, 450);
      renderer.setClearColor(0x000000, 0);
      return renderer;
    },

    colorScheme() {
      return this.$store.state.liveData.colorScheme;
    },

    canvasWidth() {
      return getComputedStyle(this.parentContainer)
        .getPropertyValue('width')
        .replace('px', '');
    },

    canvasHeight() {
      return 450;
    },

    parentContainer() {
      return document.querySelector('.threejs');
    },

    dragging() {
      return this.mouseDown && this.mouseMove;
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

    // this.applyDataSets(this.dataSet);

    const spriteMap = new three.TextureLoader().load('/static/icon/plus-x-icon.svg');
    const spriteMaterial = new three.SpriteMaterial({ map: spriteMap, color: 0xbfd600 });
    const sprite = new three.Sprite(spriteMaterial);
    sprite.position.x = this.group.children[50].position.x;
    sprite.position.y = 4.5;
    sprite.position.z = this.group.children[50].position.z;
    this.scene.add(sprite);

    // Required calls for user interactions.
    this.controls.update();
    this.animate();
  },

  watch: {
    developerMode(newVal) {
      if (newVal) {
        this.enableDeveloperMode();
      }
    },
    colorScheme(newVal) {
      // The array of cubes is essentially a pixel grid. With the nested loop below we can control each cube indiviually.
      for (let x = 0; x < 10; x++) {
        for (let z = 0; z < 20; z++) {
          const color = newVal === 'warm' ? `rgb(${175 + z * 5},${120 + x * 3},${2 * z})` : `rgb(${2 * z},${175 + z * 5},${120 + x * 3})`;
          this.updateCube(x, z, color);
        }
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
