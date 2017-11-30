<template>
  <div class="threejs">
    <hr>
    <div class="inputs row around" v-if="false">
      <div class="position">
        position
        <input type="range" min="-15" max="25" v-model.number="position.x">x: {{position.x}}</input>
        <input type="range" min="-15" max="25" v-model.number="position.y">y: {{position.y}}</input>
        <input type="range" min="-15" max="25" v-model.number="position.z">z: {{position.z}}</input>
      </div>

      <div class="translation">
        translate
        <input type="range" min="-15" max="25" v-model.number="translation.x">x: {{translation.x}}</input>
        <input type="range" min="-15" max="25" v-model.number="translation.y">y: {{translation.y}}</input>
        <input type="range" min="-15" max="25" v-model.number="translation.z">z: {{translation.z}}</input>
      </div>

      <div class="rotation">
        rotation
        <input type="range" min="-15" max="25" v-model.number="rotation.x">x: {{rotation.x}}</input>
        <input type="range" min="-15" max="25" v-model.number="rotation.y">y: {{rotation.y}}</input>
        <input type="range" min="-15" max="25" v-model.number="rotation.z">z: {{rotation.z}}</input>
      </div>
    </div>
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
      x: 10,
      y: 5,
      z: 20,
      position: {
        x: 11,
        y: 4,
        z: 1
      },
      translation: {
        x: 7,
        y: 0,
        z: 0
      },
      rotation: {
        x: 0,
        y: 0,
        z: 0
      }
    };
  },

  methods: {
    makeCube(color) {
      const geometry = new three.BoxGeometry(1, 5, 1);
      const material = new three.MeshLambertMaterial({ color, flatShading: false });
      const cube = new three.Mesh(geometry, material);
      // cube.rotation.y = 0.75;
      // cube.rotation.x = 0.25;
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

      const sphereSize = 1;
      const pointLightHelper = new three.DirectionalLightHelper(this.makeLight, sphereSize);
      this.scene.add(pointLightHelper);

      this.camera.position.x = this.position.x;
      this.camera.position.y = this.position.y;
      this.camera.position.z = this.position.z;

      this.camera.translateX(this.translation.x);
      this.camera.translateY(this.translation.y);
      this.camera.translateZ(this.translation.z);
    },

    animate() {
      requestAnimationFrame(this.animate);

      // this.camera.rotation.x = this.rotation.x;
      // this.camera.rotation.y = this.rotation.y;
      // this.camera.rotation.z = this.rotation.z;
      // this.camera.setViewOffset(this.offset);
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
    this.scene.add(this.makeLight);
    const light2 = new three.HemisphereLight(0xffffff, 0xffffff, 0.7);
    light2.position.x = 0;
    light2.position.y = 20;
    light2.position.z = 0;
    light2.lookAt(0, 0, 0);
    const pointLightHelper2 = new three.HemisphereLightHelper(light2, 2);
    this.scene.add(light2);
    this.scene.add(pointLightHelper2);

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
