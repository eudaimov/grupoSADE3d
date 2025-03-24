import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const myCanvas =  document.getElementById('Webgl')

const scene = new THREE.Scene();

const particleGeometry = new THREE.BufferGeometry();
const numeroParticulas = 4000;
const positionParticulas = new Float32Array(numeroParticulas*3)
for(let i=0; i<numeroParticulas*3;i++){
  positionParticulas[i]= (Math.random()-0.5)*5

}

particleGeometry.setAttribute(
  'position', new THREE.BufferAttribute(positionParticulas, 3)
)

const particleMaterial = new THREE.PointsMaterial();
particleMaterial.size= 0.3;  
particleMaterial.sizeAttenuation=true;


const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('../src/resource/particles/transparent/circle_02.png')
particleMaterial.transparent=true;

particleMaterial.alphaMap= matcapTexture;
//particleMaterial.alphaTest = 0.1
particleMaterial.depthWrite = false;
const particles = new THREE.Points(particleGeometry, particleMaterial);



scene.add(particles)

//Camera
const size = {
  width: document.querySelector('.contenedor').getBoundingClientRect().width,
  height: (document.querySelector('.contenedor').getBoundingClientRect().height)
}

const camera = new THREE.PerspectiveCamera(50, size.width / size.height, 1, 1000)
camera.position.setZ(5)
scene.add(camera)

//Render

const render = new THREE.WebGLRenderer({
  canvas: myCanvas,
})

render.setSize(size.width, size.height)
render.setClearColor(0x000000, 1)

const controls = new OrbitControls( camera, myCanvas );
controls.enableDamping = true;


const clock = new THREE.Clock()

 const animacion= ()=>{

  const elapseTime = clock.getElapsedTime();

  
  render.render(scene, camera)
  window.requestAnimationFrame(animacion)
 }




animacion()