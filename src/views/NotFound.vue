<template>
  <div class="col dead-center not-found">
    <h1 class="lime">404</h1>
    <h1>Woops. You've hit a dead end. Let's try that again.</h1>
    <router-link to="/">Back to home</router-link>

    <div class="three" width="500" height="300"></div>
  </div>
</template>

<script>
const THREE = require('../../node_modules/three/build/three.js');
require('@littlstar/three-canvas-renderer')(THREE);
// const CanvasRenderer = THREE.CanvasRenderer;

export default {
  mounted() {
    // let scene = new THREE.Scene();
    // let renderer = new CanvasRenderer({
    //   canvas: document.querySelector('canvas.three'),
    //   alpha: true
    // });
    // let camera = new THREE.PerspectiveCamera();
    // renderer.setSize(600,400);
    // document.querySelector('.three').appendChild(renderer.domElement);
    /* =============================================== */

    let container;

    let camera, scene, renderer;

    let cube, plane;

    let targetRotation = 0;
    let targetRotationOnMouseDown = 0;

    let mouseX = 0;
    let mouseXOnMouseDown = 0;

    let windowHalfX = window.innerWidth / 2;
    // let windowHalfY = window.innerHeight / 2;

    init();
    animate();

    function init() {
      container = document.querySelector('.three');

      camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.y = 150;
      camera.position.z = 500;

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf0f0f0);

      // Cube

      geometry = new THREE.BoxGeometry(200, 200, 200);

      for (var i = 0; i < geometry.faces.length; i += 2) {
        var hex = Math.random() * 0xffffff;
        geometry.faces[i].color.setHex(hex);
        geometry.faces[i + 1].color.setHex(hex);
      }

      material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors, overdraw: 0.5 });

      cube = new THREE.Mesh(geometry, material);
      cube.position.y = 150;
      scene.add(cube);

      // Plane

      let geometry = new THREE.PlaneBufferGeometry(200, 200);
      geometry.rotateX(-Math.PI / 2);

      var material = new THREE.MeshBasicMaterial({ color: 0x222222, overdraw: 0.5 });

      plane = new THREE.Mesh(geometry, material);
      scene.add(plane);

      renderer = new THREE.CanvasRenderer({ alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth * 0.67, window.innerHeight * 0.5);
      container.appendChild(renderer.domElement);

      document.addEventListener('mousedown', onDocumentMouseDown, false);
      document.addEventListener('touchstart', onDocumentTouchStart, false);
      document.addEventListener('touchmove', onDocumentTouchMove, false);

      window.addEventListener('resize', onWindowResize, false);
    }

    function onWindowResize() {
      windowHalfX = window.innerWidth / 2;
      // windowHalfY = window.innerHeight / 2;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    //

    function onDocumentMouseDown(event) {
      event.preventDefault();

      document.addEventListener('mousemove', onDocumentMouseMove, false);
      document.addEventListener('mouseup', onDocumentMouseUp, false);
      document.addEventListener('mouseout', onDocumentMouseOut, false);

      mouseXOnMouseDown = event.clientX - windowHalfX;
      targetRotationOnMouseDown = targetRotation;
    }

    function onDocumentMouseMove(event) {
      mouseX = event.clientX - windowHalfX;

      targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.02;
    }

    function onDocumentMouseUp() {
      document.removeEventListener('mousemove', onDocumentMouseMove, false);
      document.removeEventListener('mouseup', onDocumentMouseUp, false);
      document.removeEventListener('mouseout', onDocumentMouseOut, false);
    }

    function onDocumentMouseOut() {
      document.removeEventListener('mousemove', onDocumentMouseMove, false);
      document.removeEventListener('mouseup', onDocumentMouseUp, false);
      document.removeEventListener('mouseout', onDocumentMouseOut, false);
    }

    function onDocumentTouchStart(event) {
      if (event.touches.length === 1) {
        event.preventDefault();

        mouseXOnMouseDown = event.touches[0].pageX - windowHalfX;
        targetRotationOnMouseDown = targetRotation;
      }
    }

    function onDocumentTouchMove(event) {
      if (event.touches.length === 1) {
        event.preventDefault();

        mouseX = event.touches[0].pageX - windowHalfX;
        targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.05;
      }
    }

    //

    function animate() {
      requestAnimationFrame(animate);
      render();
    }

    function render() {
      plane.rotation.y = cube.rotation.y += (targetRotation - cube.rotation.y) * 0.05;
      renderer.render(scene, camera);
    }
  }
};
</script>

<style lang="scss" scoped>
  @import '../assets/scss/global';

.not-found {
  height: 100vh;

  h1.lime {
    font-size: 1000%;
    font-weight: 700;
    margin-top: -10%;
  }

  a {
    color: $color_lime;
    text-decoration: underline;
  }
}
</style>
