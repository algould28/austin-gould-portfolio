import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// initialize the scene
const scene = new THREE.Scene();

// add textureLoader
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
cubeTextureLoader.setPath("/textures/cubeMap/");

// adding textures
const sunTexture = textureLoader.load("/textures/2k_sun.jpg");
sunTexture.colorSpace = THREE.SRGBColorSpace;
const mercuryTexture = textureLoader.load("/textures/2k_mercury.jpg");
mercuryTexture.colorSpace = THREE.SRGBColorSpace;
const venusTexture = textureLoader.load("/textures/2k_venus_surface.jpg");
venusTexture.colorSpace = THREE.SRGBColorSpace;
const earthTexture = textureLoader.load("/textures/2k_earth_daymap.jpg");
earthTexture.colorSpace = THREE.SRGBColorSpace;
const marsTexture = textureLoader.load("/textures/2k_mars.jpg");
marsTexture.colorSpace = THREE.SRGBColorSpace;
const jupiterTexture = textureLoader.load("/textures/2k_jupiter.jpg");
jupiterTexture.colorSpace = THREE.SRGBColorSpace;
const saturnTexture = textureLoader.load("/textures/2k_saturn.jpg");
saturnTexture.colorSpace = THREE.SRGBColorSpace;
const uranusTexture = textureLoader.load("/textures/2k_uranus.jpg");
uranusTexture.colorSpace = THREE.SRGBColorSpace;
const neptuneTexture = textureLoader.load("/textures/2k_neptune.jpg");
neptuneTexture.colorSpace = THREE.SRGBColorSpace;
const plutoTexture = textureLoader.load("/textures/2k_pluto.jpg");
plutoTexture.colorSpace = THREE.SRGBColorSpace;
const moonTexture = textureLoader.load("/textures/2k_moon.jpg");
moonTexture.colorSpace = THREE.SRGBColorSpace;

const backgroundCubemap = cubeTextureLoader.load([
  "px.png",
  "nx.png",
  "py.png",
  "ny.png",
  "pz.png",
  "nz.png",
]);

scene.background = backgroundCubemap;

// add materials
const mercuryMaterial = new THREE.MeshStandardMaterial({
  map: mercuryTexture,
});
const venusMaterial = new THREE.MeshStandardMaterial({
  map: venusTexture,
});
const earthMaterial = new THREE.MeshStandardMaterial({
  map: earthTexture,
});
const marsMaterial = new THREE.MeshStandardMaterial({
  map: marsTexture,
});
const jupiterMaterial = new THREE.MeshStandardMaterial({
  map: jupiterTexture,
});
const saturnMaterial = new THREE.MeshStandardMaterial({
  map: saturnTexture,
});
const uranusMaterial = new THREE.MeshStandardMaterial({
  map: uranusTexture,
});
const neptuneMaterial = new THREE.MeshStandardMaterial({
  map: neptuneTexture,
});
const plutoMaterial = new THREE.MeshStandardMaterial({
  map: plutoTexture,
});
const moonMaterial = new THREE.MeshStandardMaterial({
  map: moonTexture,
});

// add stuff here
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({
  map: sunTexture,
});

const sun = new THREE.Mesh(sphereGeometry, sunMaterial);
sun.scale.setScalar(5);
scene.add(sun);

let saturnMoons = [];

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const generateRandomMoonsAndAsteroids = (
  moonQuantity,
  asteroidQuanity,
  planetName
) => {
  let moonsAndAsteroids = [];

  // generate main moons
  for (let i = 0; i < moonQuantity; i++) {
    moonsAndAsteroids.push({
      name: `${planetName} Moon ${i}`,
      radius: getRandomArbitrary(0.15, 0.2),
      distance: getRandomArbitrary(1.5, 3),
      speed: getRandomArbitrary(0.01, 0.03),
    });
  }

  //generate asteroid belt
  for (let i = 0; i < asteroidQuanity; i++) {
    moonsAndAsteroids.push({
      name: `${planetName} Asteroid ${i}`,
      radius: getRandomArbitrary(0.05, 0.08),
      distance: getRandomArbitrary(6, 6.2),
      speed: getRandomArbitrary(0.01, 0.03),
    });
  }

  return moonsAndAsteroids;
};

const planets = [
  {
    name: "Mercury",
    radius: 0.5,
    distance: 10,
    speed: 0.01,
    material: mercuryMaterial,
    angle: 0.1,
    moons: [],
  },
  {
    name: "Venus",
    radius: 0.8,
    distance: 15,
    speed: 0.007,
    material: venusMaterial,
    angle: 117,
    moons: [],
  },
  {
    name: "Earth",
    radius: 1,
    distance: 20,
    speed: 0.005,
    material: earthMaterial,
    angle: 23,
    moons: [
      {
        name: "Moon",
        radius: 0.3,
        distance: 3,
        speed: 0.015,
      },
    ],
  },
  {
    name: "Mars",
    radius: 0.7,
    distance: 25,
    speed: 0.003,
    material: marsMaterial,
    angle: 25,
    moons: [
      {
        name: "Phobos",
        radius: 0.1,
        distance: 2,
        speed: 0.02,
      },
      {
        name: "Deimos",
        radius: 0.2,
        distance: 3,
        speed: 0.015,
        color: 0xffffff,
      },
    ],
  },
  {
    name: "Jupiter",
    radius: 1.9,
    distance: 40,
    speed: 0.0015,
    material: jupiterMaterial,
    angle: 3,
    moons: generateRandomMoonsAndAsteroids(4, 91, "Jupiter"),
  },
  {
    name: "Saturn",
    radius: 1.2,
    distance: 65,
    speed: 0.0012,
    material: saturnMaterial,
    angle: 27,
    moons: generateRandomMoonsAndAsteroids(16, 130, "Saturn"),
  },
  {
    name: "Uranus",
    radius: 1.15,
    distance: 80,
    speed: 0.001,
    material: uranusMaterial,
    angle: 98,
    moons: generateRandomMoonsAndAsteroids(5, 0, "Uranus"),
  },
  {
    name: "Neptune",
    radius: 1.3,
    distance: 100,
    speed: 0.0008,
    material: neptuneMaterial,
    angle: 30,
    moons: generateRandomMoonsAndAsteroids(4, 12, "Neptune"),
  },
  {
    name: "Pluto",
    radius: 0.2,
    distance: 200,
    speed: 0.000001,
    material: plutoMaterial,
    angle: 0,
    moons: [],
  },
];

const createPlanet = (planet) => {
  const planetMesh = new THREE.Mesh(sphereGeometry, planet.material);
  planetMesh.scale.setScalar(planet.radius);
  planetMesh.position.x = planet.distance;
  planetMesh.rotation.x = THREE.MathUtils.degToRad(planet.angle);
  return planetMesh;
};

const createMoon = (moon) => {
  const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
  moonMesh.scale.setScalar(moon.radius);
  moonMesh.position.x = moon.distance;
  return moonMesh;
};

const planetMeshes = planets.map((planet) => {
  const planetMesh = createPlanet(planet);
  scene.add(planetMesh);

  planet.moons.forEach((moon) => {
    const moonMesh = createMoon(moon);
    planetMesh.add(moonMesh);
  });
  return planetMesh;
});

// add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1000);
scene.add(pointLight);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  500
);
camera.position.z = 200;
camera.position.y = 10;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// add controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxDistance = 200;
controls.minDistance = 20;

// add resize listener
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// render loop
const renderloop = () => {
  planetMeshes.forEach((planet, planetIndex) => {
    planet.rotation.y += planets[planetIndex].speed;
    planet.position.x =
      Math.sin(planet.rotation.y) * planets[planetIndex].distance;
    planet.position.z =
      Math.cos(planet.rotation.y) * planets[planetIndex].distance;
    planet.children.forEach((moon, moonIndex) => {
      moon.rotation.y += planets[planetIndex].moons[moonIndex].speed;
      moon.position.x =
        Math.sin(moon.rotation.y) *
        planets[planetIndex].moons[moonIndex].distance;
      moon.position.z =
        Math.cos(moon.rotation.y) *
        planets[planetIndex].moons[moonIndex].distance;
    });
  });

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
