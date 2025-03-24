import * as THREE from 'three'

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {GUI} from 'lil-gui';
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'




const myCanvas =  document.getElementById('Webgl')
let debugObject = {}

const scene = new THREE.Scene();

//Camera
const size = {
  width: document.querySelector('.contenedor').getBoundingClientRect().width,
  height: (document.querySelector('.contenedor').getBoundingClientRect().width/16)*6
}

const camera = new THREE.PerspectiveCamera(50, size.width / size.height, 1, 1000)

camera.position.setZ(5)
camera.position.y = 2
scene.add(camera)
// Fuentes

const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('../src/resource/matcap/cobrecap.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace;
const fontLoader = new FontLoader()
fontLoader.load(
  '../src/resource/Impact_Regular.json',
  (font) =>
  {
      const textGeometry = new TextGeometry(
          ' Cristina',
          {
              font: font,
              size: 1,
              depth: 0.2,
              curveSegments: 12,
              bevelEnabled: true,
              bevelThickness: 0.03,
              bevelSize: 0.02,
              bevelOffset: 0,
              bevelSegments: 5
          }
      )
      const textMaterial = new THREE.MeshMatcapMaterial();
      textMaterial.matcap = matcapTexture;
      textMaterial.normalMap= matcapTexture;
      const text = new THREE.Mesh(textGeometry, textMaterial)
      text.position.x=-3
      scene.add(text)
      camera.lookAt(text.position)
  }
)


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




const animate= ()=> {

	requestAnimationFrame( animate );

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();
  render.render(scene, camera)

}

animate()


