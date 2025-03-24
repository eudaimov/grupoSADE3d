import * as THREE from 'three'
import gsap from 'gsap';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { LineSegments2 } from 'three/addons/lines/LineSegments2.js';
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js'
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import {GUI} from 'lil-gui';

const myCanvas =  document.getElementById('Webgl')
let debugObject = {}

const scene = new THREE.Scene();
const geometria = new THREE.BoxGeometry(1,1,1);
debugObject.colorMaterial = '#0022cc';
const material = new THREE.MeshBasicMaterial({color: debugObject.colorMaterial })
debugObject.colorWireframe = '#000000'
debugObject.sizeWireframe = 3

// Crear la geometría para las aristas
const edgesGeometry = new THREE.EdgesGeometry(geometria);

// Usar LineSegmentsGeometry para preparar las aristas
const lineSegmentsGeometry = new LineSegmentsGeometry().fromEdgesGeometry(edgesGeometry);

// Crear LineMaterial para las aristas con grosor
const lineMaterial = new LineMaterial({
  color: debugObject.colorWireframe, // Color de las líneas
  linewidth: debugObject.sizeWireframe, // Grosor de las líneas (ajustado según tamaño de la pantalla)
});

// Crear LineSegments2 con geometría y material
const wireframe = new LineSegments2(lineSegmentsGeometry, lineMaterial);
wireframe.computeLineDistances();

const maya = new THREE.Mesh(geometria, material)
scene.add(maya)
scene.add(wireframe)

//Camera
const size = {
  width: document.querySelector('.contenedor').getBoundingClientRect().width,
  height: (document.querySelector('.contenedor').getBoundingClientRect().width/16)*6
}

const camera = new THREE.PerspectiveCamera(50, size.width / size.height, 1, 1000)

camera.position.setZ(5)
camera.position.y = 3
camera.lookAt(maya.position)
scene.add(camera)

//Render

const render = new THREE.WebGLRenderer({
  canvas: myCanvas,
})

const controls = new OrbitControls( camera, myCanvas );
controls.enableDamping = true;

render.setSize(size.width, size.height)
render.setClearColor(0xffffff, 1)

//Animacion

const clock = new THREE.Clock();
const elapseTime = clock.getElapsedTime();

//Debug
const gui=  new GUI({
  title: 'Parametros',
  width: 200,
})

gui.addColor(debugObject, 'colorMaterial')
.onChange(()=>{
   material.color.set(debugObject.colorMaterial)
  }
);
gui.addColor(debugObject,'colorWireframe')
.onChange(()=>{
  lineMaterial.color.set(debugObject.colorWireframe);
 })
gui.add(debugObject, "sizeWireframe")
.onChange(()=>{
  lineMaterial.linewidth = debugObject.sizeWireframe
})



const animate= ()=> {

	requestAnimationFrame( animate );

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();
  render.render(scene, camera)

}

animate()


