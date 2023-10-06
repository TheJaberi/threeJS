import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls.js';
Object.assign(THREE , { TrackballControls });

import ThreeGlobe from 'three-globe';

import topology from '../img/earth-topology.png';
import imgmap from '../img/8k_earth_daymap.jpg';
import darkimgmap from '../img/8k_earth_nightmap.jpg';
import clouds from '../img/8k_earth_clouds.jpg';
import nebula from '../img/nebula.jpg';
import stars from '../img/stars1.jpg';

const monkeyUrl = new URL('../assets/monkey.glb', import.meta.url);

const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

// Gen random data
const N = 300;
const gData = [...Array(N).keys()].map(() => ({
  lat: 26.236299455976933,
  lng:  50.53247610702295,
  size: Math.random() / 3,
  color: ['red'][Math.round(Math.random() * 3)]
}));


const myGlobe = new ThreeGlobe()
    .globeImageUrl(imgmap)
    .bumpImageUrl(topology)
    // .pointsData(gData)
    // .pointAltitude(0.000001)
    // .pointColor('color');
    
    // (function rotateEarth() {
    //     myGlobe.rotation.y += 0.0006 * Math.PI / 180;
    //     requestAnimationFrame(rotateEarth);
    //   })();

scene.add(myGlobe);

// myGlobe.rotateY(-Math.PI * (5/9));
// myGlobe.rotateX(Math.PI / 6);
// scene.add(new THREE.AmbientLight(0xcccccc, Math.PI))
// scene.add(new THREE.DirectionalLight(0xffffff, 0.6 * Math.PI));
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.5 * Math.PI);
scene.add(directionalLight);
directionalLight.position.set(0, 0, 325);
directionalLight.castShadow = true;
directionalLight.shadow.camera.bottom = -12;


const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);
const lightOrbit = new OrbitControls(directionalLight, renderer.domElement);
lightOrbit.update();
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

camera.position.set(0, 0, 325);
orbit.update();



// const planeGeometry = new THREE.PlaneGeometry(30, 30);
// const planeMaterial = new THREE.MeshStandardMaterial({
//     color: 0xFFFFFF,
//     side: THREE.DoubleSide
// });

// const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// scene.add(plane);
// plane.rotation.x = -0.5 * Math.PI;
// plane.receiveShadow = true;

// const gridHelper = new THREE.GridHelper(30);
// scene.add(gridHelper);

const sphereGeometry = new THREE.SphereGeometry(0.1, 100, 100);
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    wireframe: false});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

let z = myGlobe.getCoords(26.236299455976933, 50.53247610702295);
// console.log(x,y,z)
sphere.position.set(z.x, z.y, z.z);
scene.add(sphere);
// sphere.castShadow = true;

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
// scene.add(directionalLight);
// directionalLight.position.set(-30, 50, 0);
// directionalLight.castShadow = true;
// directionalLight.shadow.camera.bottom = -12;

// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(dLightHelper);

// const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(dLightShadowHelper);
// myGlobe.rotateY(-Math.PI * (5/9));
// myGlobe.rotateX(Math.PI / 6);
const spotLight = new THREE.SpotLight(0xFFFFFF);
scene.add(spotLight);
spotLight.position.set(-100, 100, 0);
spotLight.castShadow = true;
spotLight.angle = 0.2;

// const sLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(sLightHelper);

// scene.fog = new THREE.Fog(0xFFFFFF, 0, 200);
// scene.fog = new THREE.FogExp2(0xFFFFFF, 0.01);

//renderer.setClearColor(0xFFEA00);

const textureLoader = new THREE.TextureLoader();
//scene.background = textureLoader.load(stars);
const cubeTextureLoader = new THREE.CubeTextureLoader();
// scene.background.addColors(0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000);

// scene.background = cubeTextureLoader.load([
//     stars,
//     stars,
//     stars,
//     stars,
//     stars,
//     stars
// ]);

// const box2Geometry = new THREE.BoxGeometry(4, 4, 4);
// const box2Material = new THREE.MeshBasicMaterial({
//     //color: 0x00FF00,
//     //map: textureLoader.load(nebula)
// });
// const box2MultiMaterial = [
//     new THREE.MeshBasicMaterial({map: textureLoader.load(stars)}),
//     new THREE.MeshBasicMaterial({map: textureLoader.load(stars)}),
//     new THREE.MeshBasicMaterial({map: textureLoader.load(nebula)}),
//     new THREE.MeshBasicMaterial({map: textureLoader.load(stars)}),
//     new THREE.MeshBasicMaterial({map: textureLoader.load(nebula)}),
//     new THREE.MeshBasicMaterial({map: textureLoader.load(stars)})
// ];
// const box2 = new THREE.Mesh(box2Geometry, box2MultiMaterial);
// scene.add(box2);
// box2.position.set(0, 15, 10);
//box2.material.map = textureLoader.load(nebula);

// const plane2Geometry = new THREE.PlaneGeometry(10, 10, 10, 10);
// const plane2Material = new THREE.MeshBasicMaterial({
//     color: 0xFFFFFF,
//     wireframe: true
// });
// const plane2 = new THREE.Mesh(plane2Geometry, plane2Material);
// scene.add(plane2);
// plane2.position.set(10, 10, 15);

// plane2.geometry.attributes.position.array[0] -= 10 * Math.random();
// plane2.geometry.attributes.position.array[1] -= 10 * Math.random();
// plane2.geometry.attributes.position.array[2] -= 10 * Math.random();
// const lastPointZ = plane2.geometry.attributes.position.array.length - 1;
// plane2.geometry.attributes.position.array[lastPointZ] -= 10 * Math.random();

// const sphere2Geometry = new THREE.SphereGeometry(4);

// const vShader = `
//     void main() {
//         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//     }
// `;

// const fShader = `
//     void main() {
//         gl_FragColor = vec4(0.5, 0.5, 1.0, 1.0);
//     }
// `;

// const sphere2Material = new THREE.ShaderMaterial({
//     vertexShader: document.getElementById('vertexShader').textContent,
//     fragmentShader: document.getElementById('fragmentShader').textContent
// });
// const sphere2 = new THREE.Mesh(sphere2Geometry, sphere2Material);
// scene.add(sphere2);
// sphere2.position.set(-5, 10, 10);

const assetLoader = new GLTFLoader();

// let mixer;
// assetLoader.load(monkeyUrl.href, function(gltf) {
//     const model = gltf.scene;
//     console.log(model.children[1].material.opacity)
//     scene.add(model);
//     model.position.set(-12, 4, 10);
    
    
// // Create an AnimationMixer, and get the list of AnimationClip instances
// mixer = new THREE.AnimationMixer( model );
// const clips = gltf.animations;

// // Play a specific animation
// const clip = THREE.AnimationClip.findByName( clips, 'myAnimation' );
// const action = mixer.clipAction( clip );
//action.play();

// Play all animations
// clips.forEach( function ( clip ) {
// 	mixer.clipAction( clip ).play();
// } );



// }, undefined, function(error) {
//     console.error(error);
// });

const gui = new dat.GUI();

const options = {
    sphereColor: '#ffea00',
    // wireframe: false,
    // speed: 0.01,
    // angle: 0.2,
    // penumbra: 0,
    // intensity: 1
    darkmode: false
};

// gui.addColor(options, 'sphereColor').onChange(function(e){
//     sphere.material.color.set(e);
// });

gui.add(options, 'darkmode').onChange(function(e){
    // sphere.material.wireframe = e;
    if (options.darkmode) {
        myGlobe.globeImageUrl(darkimgmap)
    } else {
        myGlobe.globeImageUrl(imgmap)
    }
    
});

// gui.add(options, 'speed', 0, 0.1);

// gui.add(options, 'angle', 0, 1);
// gui.add(options, 'penumbra', 0, 1);
// gui.add(options, 'intensity', 0, 1);

let step = 0;

const mousePosition = new THREE.Vector2();

window.addEventListener('mousemove', function(e) {
    mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = - (e.clientY / window.innerHeight) * 2 + 1;
});

const rayCaster = new THREE.Raycaster();

// const sphereId = sphere.id;
// box2.name = 'theBox';
const clock = new THREE.Clock();
function animate(time) {
    // Update the mixer on each frame
    // if(mixer) mixer.update(clock.getDelta());

    // rotateEarth();
    // myGlobe.objectRotation(0, 0, 0,100)
     // Rotate the globe to the new longitude
    //  myGlobe.rotateGlobeTo({
    //     lat: 25.0,
    //     lng: 26.0
    //   });
    // step += options.speed;
    // sphere.position.y = 10 * Math.abs(Math.sin(step));

    // spotLight.angle = options.angle;
    // spotLight.penumbra = options.penumbra;
    // spotLight.intensity = options.intensity;
    // sLightHelper.update();

    rayCaster.setFromCamera(mousePosition, camera);
    const intersects = rayCaster.intersectObjects(scene.children);
    //console.log(intersects);

    // for(let i = 0; i < intersects.length; i++) {
    //     // if(intersects[i].object.id === sphereId)
    //     //     intersects[i].object.material.color.set(0xFF0000);

    //     if(intersects[i].object.name === 'theBox') {
    //         intersects[i].object.rotation.x = time / 1000;
    //         intersects[i].object.rotation.y = time / 1000;
    //     }
    // }

    // plane2.geometry.attributes.position.array[0] = 10 * Math.random();
    // plane2.geometry.attributes.position.array[1] = 10 * Math.random();
    // plane2.geometry.attributes.position.array[2] = 10 * Math.random();
    // plane2.geometry.attributes.position.array[lastPointZ] = 10 * Math.random();
    // plane2.geometry.attributes.position.needsUpdate = true;


//     myGlobe.rotateY(-Math.PI * (5/9));
// myGlobe.rotateX(Math.PI / 6);


    renderer.render(scene, camera);
    //console.log(window.innerHeight);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});