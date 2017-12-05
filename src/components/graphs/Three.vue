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
      canvaswidth: '80%',
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
      renderer: null
    };
  },

  methods: {
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
      this.camera = new three.PerspectiveCamera(50, window.innerWidth * 0.6 / 450, 0.1, 1000);

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

    enableDeveloperMode() {
      const worldLightHelper = new three.HemisphereLightHelper(this.lights.globalLight, 2);
      const sphereSize = 1;
      const mainLightHelper = new three.DirectionalLightHelper(this.lights.primaryLight, sphereSize);
      const boxHelper = new three.BoxHelper(this.group);
      this.scene.add(worldLightHelper);
      this.scene.add(mainLightHelper);
      this.scene.add(boxHelper);
    },

    makeCube(color) {
      const geometry = new three.BoxGeometry(1, 5, 1);
      const material = new three.MeshLambertMaterial({ color, flatShading: false });
      const cube = new three.Mesh(geometry, material);
      return cube;
    },

    animate() {
      requestAnimationFrame(this.animate);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    }
  },
  computed: {
    makeRenderer() {
      const renderer = new three.WebGLRenderer({ alpha: true });
      renderer.setSize(window.innerWidth * 0.6, 450);
      renderer.setClearColor(0x000000, 0);
      return renderer;
    },

    makeLight() {}
  },

  mounted() {
    this.init();

    // create a 3 dimensional array of polygons.
    for (let x = 0; x < 20; x++) {
      for (let z = 0; z < 8; z++) {
        // const color = `rgb(${175 + x + x * 2},${z * 20},${5 * z + z * 2})`;
        const color = `rgb(${5 * z + z * 2}, ${150 + x + x * 2}, ${z * 25})`;
        const cube = this.makeCube(color);
        this.group.add(cube);
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

    // console.log(this.group.id);
    // const loopcube = this.group.getObjectById(9);
    // console.log(loopcube);
    // loopcube.material.color.set(0xff0000);
    // this.group.getObjectById(99).material.color.set(0x888888);

    // Required calls for user interactions.
    this.controls.update();
    this.animate();
  },
  watch: {
    developerMode(newVal) {
      if (newVal) {
        this.enableDeveloperMode();
      }
    }
  }
};
</script>

<style scoped>
canvas {
  border: solid 1px red;
}
input {
  display: block;
}
span {
  display: inline;
}
</style>
