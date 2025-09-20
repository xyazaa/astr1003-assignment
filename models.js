import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';    
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';
import { animate, utils, createDraggable, createSpring } from 'animejs';

import {incrementScene} from './main'

// Scene, camera and renderer
const sceneBH = new THREE.Scene();
const sceneSun = new THREE.Scene();
const sceneShape = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 1, 4000);
const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas,
    alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animated)

let current = sceneSun;

//Orbit Conrtol
const controls = new OrbitControls(camera, renderer.domElement)

//Camera
camera.position.z = 100;
camera.position.x= 0
camera.position.y = 1   

// change camera pos on first click
const overlay = document.getElementById('overlay')

overlay.addEventListener("mousedown", firstClick);

function firstClick()
{
    animate(camera.position, {
        z:10,
        duration: 1000,
        ease:'outQuad',
        onComplete: ()=>{
            camera.position.z=5000
            animate(camera.position, {
                z:1200,
                duration:2000,
                onBegin: ()=>{
                    current = sceneBH;
                },
            })
        }
    })
    animate(document.getElementById('itb'),{
        opacity: 0,
        duration:2000,
        onComplete:()=>{
            document.getElementById('itb').remove();
            const para = document.createElement('p');
            para.id = 'hwie'
            para.className = 'disapear'
            const text = document.createTextNode("But how will it end?");
            para.appendChild(text)
            document.getElementById('overlay').appendChild(para);
            overlay.addEventListener("mousedown", incrementScene)
        }
    })
    overlay.removeEventListener("mousedown", firstClick);

}


//3D Model
const loader = new GLTFLoader();
let bh;
loader.load('./black_hole.glb', (glb)=>{ //https://sketchfab.com/3d-models/black-hole-e410da98b1e5445eae2acafaaa53587d
    glb.scene.scale.set(1,1,1) 
    sceneBH.add(glb.scene);
    bh = glb.scene;
}), undefined, function (error) {
    console.error(error)
}

let sun;
loader.load('./sun.glb', glb =>{ //https://sketchfab.com/3d-models/sun-9ef1c68fbb944147bcfcc891d3912645
    sceneSun.add(glb.scene);
    sun = glb.scene;
}), undefined, function (error) {
    console.error(error)
}

const sphere = new THREE.Mesh(new THREE.SphereGeometry( 250, 32, 16 ), new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true } )); 
sphere.rotation.x = 1

const saddleFunc = (u, v, target) => {
    const x = (u - 0.5) * 10; // scale u from -5 to 5
    const y = (v - 0.5) * 10; // scale v from -5 to 5
    const z = (x*x)/10 - (y*y)/20; // saddle equation
    target.set(x, y, z);
};

const saddle = new THREE.Mesh(new ParametricGeometry(saddleFunc,50,50), new THREE.MeshStandardMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    wireframe: true
}));
saddle.scale.set(51,51,51);

const plane = new THREE.Mesh(new THREE.PlaneGeometry(500,500, 32,32), new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe:true
}))
plane.position.set(0, 0, 30);
plane.rotation.x = 0.5

//Lights
const light = new THREE.AmbientLight(0xffffff, 1)
sceneSun.add(light)
sceneBH.add(light)
sceneShape.add(light)

//const hemo = new THREE.HemisphereLight(0x222222, 0xFFFFFF, 2)
//scene.add(hemo)

const dir = new THREE.DirectionalLight(0xffffff,0.1)
dir.position.set(0,0,10000)
sceneBH.add(dir)

// Window resizer
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function animated(){
    if (bh && current===sceneBH) {
        bh.rotation.y += 0.001;
        bh.rotation.x -= 0.00001;
        //bh.rotation.z -= 0.0001
    }
    if (sun && current===sceneSun){
        sun.rotation.y +=0.01;
    }
    if (sceneShape.children.includes(saddle))
    {
        saddle.rotation.z +=0.005;
    }
    if (sceneShape.children.includes(sphere))
    {
        sphere.rotation.z +=0.001;
        sphere.rotation.x +=0.001;
    }
    if (sceneShape.children.includes(plane))
    {
        plane.rotation.z +=0.001;
        
    }
    renderer.render(current, camera)
}

function lookCamera(px,py,pz)
{
    const dir = new THREE.Vector3();
    camera.getWorldDirection(dir);
    const target = camera.position.clone().add(dir.multiplyScalar(200));
    animate(target,{
        x:px,
        y:py,
        z:pz,
        duration:400,
        onUpdate: ()=> {camera.lookAt(target);}
    })
}

function moveCamera(px,py,pz)
{
    animate(camera.position,{
        x:px,
        y:py,
        z:pz,
        duration:300
    })
}

function switchScene(setScene)
{
    if (setScene==2)
    {
        current=sceneShape;
        camera.position.set(0,800,0);
    }
    else if (setScene==1)
    {
        current = sceneBH;
        camera.position.set(0,1,1200)
    }
    else if (setScene==3)
    {
        current = sceneSun;
        camera.position.set(0,1,100)
    }
}

function renderShapes(shape){
    if (shape==1)
    {
        sceneShape.remove(saddle);
        sceneShape.add(sphere);
    }
    else if (shape==2)
    {
        sceneShape.remove(sphere);
        sceneShape.remove(plane);
        sceneShape.add(saddle);
    }
    else if (shape==3)
    {
        sceneShape.remove(saddle);
        sceneShape.add(plane);
    }
}

export {lookCamera, moveCamera, switchScene, renderShapes}