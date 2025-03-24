import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const myCanvas =  document.getElementById('Webgl')

const scene = new THREE.Scene();
const geometria = new THREE.BoxGeometry(1,1,1);
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('../src/resource/matcap/matcap.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace;
const material = new THREE.MeshMatcapMaterial();
material.matcap = matcapTexture;
const maya = new THREE.Mesh(geometria, material)
scene.add(maya)

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
render.setClearColor(0xffffff, 1)

const controls = new OrbitControls( camera, myCanvas );
controls.enableDamping = true;


const clock = new THREE.Clock()

 const animacion= ()=>{

  const elapseTime = clock.getElapsedTime();

  
  render.render(scene, camera)
  window.requestAnimationFrame(animacion)
 }




animacion()