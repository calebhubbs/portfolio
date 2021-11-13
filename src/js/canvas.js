import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.118.3/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118.3/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118.3/examples/jsm/controls/OrbitControls.js";

document.addEventListener("mousemove", getMousePos);

let mouseY = 0;
let mouseX = 0;

function getMousePos(event) {
  mouseY = event.clientY;
  mouseX = event.clientX;
}

function playScrollAnimations() {
  animationScripts.forEach((a) => {
    if (scrollPercent >= a.start && scrollPercent < a.end) {
      a.func();
    }
  });
}

let scrollPercent = 0;

document.body.onscroll = () => {
  //calculate the current scroll progress as a percentage
  scrollPercent =
    ((document.documentElement.scrollTop || document.body.scrollTop) /
      ((document.documentElement.scrollHeight || document.body.scrollHeight) -
        document.documentElement.clientHeight)) *
    100;
};

// const clock = new THREE.Clock()

const tick = () => {
  plane.rotation.z += 0.0005;

  // material.displacementScale = mouseY * 0.002;

  playScrollAnimations();

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
