import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { AnimationMixer } from 'three';


const myCanvas =  document.getElementById('Webgl')





const scene = new THREE.Scene();
// const geometria = new THREE.BoxGeometry(1,1,1);
// const textureLoader = new THREE.TextureLoader();
// const matcapTexture = textureLoader.load('matcap.png')
// matcapTexture.colorSpace = THREE.SRGBColorSpace;
// const material = new THREE.MeshMatcapMaterial();
// const materialPlataforma = new THREE.MeshStandardMaterial({
//   color: new THREE.Color(0xffffff), // Rojo brillante (hexadecimal para rojo puro)
//   roughness: 0.5, // Reduce la aspereza para simular una superficie plástica
//   metalness: 0.1, // Leve metalness para simular el brillo característico
// });
// material.matcap = matcapTexture;
let numero3d;




//const maya = new THREE.Mesh(geometria, material)
//scene.add(maya)

//Camera
const size = {
  width: document.querySelector('.contenedor').getBoundingClientRect().width,
  height: (document.querySelector('.contenedor').getBoundingClientRect().height)
}

const camera = new THREE.PerspectiveCamera(50, size.width / size.height, 1, 1000)
camera.position.setX(-0.01889412557980033);
camera.position.setY(1.229353166426113);
camera.position.setZ(3.1402137833797736)
camera.lookAt(-0.008382379428353693, 0.5430277935228617, -0.2589688162612163);
// Posición de la cámara: x=-0.01889412557980033, y=1.229353166426113, z=3.1402137833797736
// text.js:66 Target de OrbitControls: x=-0.008382379428353693, y=0.5430277935228617, z=-0.2589688162612163
scene.add(camera)

//Render

const render = new THREE.WebGLRenderer({
  canvas: myCanvas,
  antialias: true,
  
})
render.shadowMap.enabled = true;
render.shadowMap.type = THREE.PCFSoftShadowMap; // Otras opciones: BasicShadowMap, VSMShadowMap


render.setSize(size.width, size.height)
render.setClearColor(0xffffff, 1)

// const controls = new OrbitControls( camera, myCanvas );
// controls.enableDamping = true;
// controls.addEventListener('end', () => {
//   console.log(`Posición de la cámara: x=${camera.position.x}, y=${camera.position.y}, z=${camera.position.z}`);
//   console.log(`Target de OrbitControls: x=${controls.target.x}, y=${controls.target.y}, z=${controls.target.z}`);
// });

let mixer;
const gltf = new GLTFLoader();
gltf.load(
  'src/resource/model/aniversario.glb',
  (gltf) => {
   console.info(gltf);




    const shadowLight = new THREE.DirectionalLight(0xffffff, 1); // Luz para sombras
    shadowLight.position.set(5, 8, 0);
    shadowLight.castShadow = true;
    shadowLight.shadow.mapSize.width = 2048; // Alta resolución de sombras
    shadowLight.shadow.mapSize.height = 2048;
    shadowLight.shadow.camera.near = 0.5;
    shadowLight.shadow.camera.far = 20
    scene.add(shadowLight);

    const shadowLight2 = new THREE.DirectionalLight(0xffffff, 1); // Luz para sombras
    shadowLight2.position.set(2, 7, 0);
    shadowLight2.castShadow = true;
    shadowLight2.shadow.mapSize.width = 2048; // Alta resolución de sombras
    shadowLight2.shadow.mapSize.height = 2048;
    shadowLight2.shadow.camera.near = 0.5;
    shadowLight2.shadow.camera.far = 20
    scene.add(shadowLight2);

    const shadowLight3 = new THREE.DirectionalLight(0xffffff, 6); // Luz para sombras
    shadowLight3.position.set(2, 4, 5);
    shadowLight3.castShadow = true;
    shadowLight3.shadow.mapSize.width = 2048; // Alta resolución de sombras
    shadowLight3.shadow.mapSize.height = 2048;
    shadowLight3.shadow.camera.near = 0.5;
    shadowLight3.shadow.camera.far = 20
    scene.add(shadowLight3);


    const numero = gltf.scene.children[0];
    // numero.material = material
    numero.castShadow= true;
    numero.receiveShadow = true;
    const plataforma = gltf.scene.children[1];
    plataforma.castShadow = true;
    plataforma.receiveShadow = true;
    plataforma.material = materialPlataforma

    const cubo1 = gltf.scene.children[2];
    const cubo2 = gltf.scene.children[3];
    const cubo3 = gltf.scene.children[4];
    cubo1.castShadow= true;
    cubo1.receiveShadow = true;
    cubo2.castShadow= true;
    cubo2.receiveShadow = true;
    cubo3.castShadow= true;
    cubo3.receiveShadow = true;

    const model = gltf.scene;
    scene.add(model);

  
    // Configuración de AnimationMixer
    mixer = new AnimationMixer(model);
  
    // Reproducción de las animaciones
    gltf.animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.play();
    });

  },
  undefined,
  (error) => {
      console.error(error);
  }
)


const clock = new THREE.Clock()

 const animacion= ()=>{

  // const elapseTime = clock.getElapsedTime();
  // if (numero3d) {
  //   //numero3d.rotation.y = elapseTime * 0.1; // Ajusta la velocidad multiplicando por un factor
  // }
  
  const delta = clock.getDelta();
  if(mixer){
    mixer.update(delta); // Actualiza el mixer con el tiempo transcurrido
  }
  render.render(scene, camera)
  window.requestAnimationFrame(animacion)
 }




animacion()