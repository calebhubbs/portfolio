import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118.3/build/three.module.js";


let scene, camera, renderer, starGeo, stars;
function init() {
  //create scene object
  scene = new THREE.Scene();

  //setup camera with facing upward
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 1;
  camera.rotation.x = Math.PI / 2;

  //setup renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  starGeo = new THREE.Geometry();
  for (let i = 0; i < 6000; i++) {
    let star = new THREE.Vector3(
      //this is the number of stars
      Math.random() * 400 - 200,
      Math.random() * 400 - 200,
      Math.random() * 400 - 200
    );
    star.velocity = 0.005;
    star.acceleration = 0.005;
    starGeo.vertices.push(star);
  }

  let sprite = new THREE.TextureLoader().load("/src/textures/stars.png");
  let starMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 0.5,
    map: sprite,
  });
  stars = new THREE.Points(starGeo, starMaterial);
  scene.add(stars);

  animate();
}
//rendering loop
function animate() {
  starGeo.vertices.forEach((p) => {
    p.velocity += p.acceleration;
    p.y -= p.velocity;

    if (p.y < -100) {
      p.y = 100;
      p.velocity = 0;
    }
  });
  starGeo.verticesNeedUpdate = true;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
init();