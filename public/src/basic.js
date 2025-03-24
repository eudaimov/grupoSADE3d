import * as THREE from 'three'
import gsap from 'gsap';

const myCanvas =  document.getElementById('Webgl')

const scene = new THREE.Scene();
const geometria = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color: '#ff0000', wireframe:true})
const maya = new THREE.Mesh(geometria, material)
scene.add(maya)

//Camera
const size = {
  width: document.querySelector('.contenedor').getBoundingClientRect().width,
  height: (document.querySelector('.contenedor').getBoundingClientRect().width/16)*6
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

const clock = new THREE.Clock()

// const animacion= ()=>{
//   console.info("Imprimiendo");
//   const elapseTime = clock.getElapsedTime();
//   maya.position.x = Math.cos(elapseTime)*1.5;
//   maya.position.y = Math.sin(elapseTime)*1.5;
  
//   render.render(scene, camera)
//   window.requestAnimationFrame(animacion)
// }

// animacion()


gsap.to(
  maya.position, {
    x: 2,
    duration: 3,
    delay: 3
  }
)
const animacion= ()=>{
  render.render(scene, camera)
  window.requestAnimationFrame(animacion)
}

animacion()