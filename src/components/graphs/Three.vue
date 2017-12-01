<template>
  <div class="threejs">
  </div>
</template>

<script>
import * as three from 'three';
import OrbitControls from 'orbit-controls-es6';

export default {
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      canvas: null,
      controls: null,
      group: null,
      position: {
        x: 18.33,
        y: 4.72,
        z: 13.02
      }
    };
  },

  methods: {
    makeCube(color) {
      const geometry = new three.BoxGeometry(1, 5, 1);
      const material = new three.MeshLambertMaterial({ color, flatShading: false });
      const cube = new three.Mesh(geometry, material);
      return cube;
    },

    init() {
      this.scene = new three.Scene();
      this.scene.background = new three.Color(0xe0e0e0);
      this.camera = new three.PerspectiveCamera(50, window.innerWidth * 0.8 / 400, 0.1, 1000);
      this.renderer = this.makeRenderer;
      this.canvas = document.querySelector('.threejs');
      this.canvas.appendChild(this.renderer.domElement);
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enabled = true;
      this.group = new three.Group();

      // const sphereSize = 1;
      // const pointLightHelper = new three.DirectionalLightHelper(this.makeLight, sphereSize);
      // this.scene.add(pointLightHelper);

      this.camera.position.x = this.position.x;
      this.camera.position.y = this.position.y;
      this.camera.position.z = this.position.z;
    },

    animate() {
      requestAnimationFrame(this.animate);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    }
  },
  computed: {
    makeRenderer() {
      const renderer = new three.WebGLRenderer();
      renderer.setSize(window.innerWidth * 0.8, 400);
      return renderer;
    },

    makeLight() {
      const pointLight = new three.DirectionalLight(0x404040, 1, 0, 2);
      pointLight.position.x = 10;
      pointLight.position.y = 10;
      pointLight.position.z = 20;
      return pointLight;
    }
  },

  mounted() {
    this.init();
    for (let x = 0; x < 20; x++) {
      for (let y = 0; y < 1; y++) {
        for (let z = 0; z < 8; z++) {
          // const color = `rgb(${175 + x + x * 2},${z * 20},${5 * z + z * 2})`;
          const coolColor = `rgb(${5 * z + z * 2}, ${150 + x + x * 2}, ${z * 25})`;
          const cube = this.makeCube(coolColor);
          this.group.add(cube);
          cube.position.x = -x * 1.25;
          cube.position.y = y * 1.05;
          cube.position.z = z * 1.25;
        }
      }
    }
    this.scene.add(this.group);
    this.group.translateX(10);
    this.group.translateZ(-4);

    const primaryLight = new three.DirectionalLight(0x404040, 1, 0, 2);
    primaryLight.position.x = 10;
    primaryLight.position.y = 10;
    primaryLight.position.z = 20;

    primaryLight.target = this.group;
    this.scene.add(primaryLight);

    const light2 = new three.HemisphereLight(0xffffff, 0xffffff, 0.7);
    light2.position.x = 0;
    light2.position.y = 20;
    light2.position.z = 0;
    light2.lookAt(0, 0, 0);
    // const pointLightHelper2 = new three.HemisphereLightHelper(light2, 2);
    this.scene.add(light2);
    // this.scene.add(pointLightHelper2);

    this.controls.update();

    this.animate();
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
