import React, { Component } from "react";
import ReactDOM from "react-dom";

import * as THREE from "three";
import { Interaction } from "three.interaction";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import UI from "./ui";
//import TWEEN from '@tweenjs/tween.js';

import * as SceneUtils from "./utils/scene-utils";

const OrbitControls = require("three-orbit-controls")(THREE);
const TWEEN = window.TWEEN;

var airpod_min = 0.633;
var airpod_max  = -0.633;

var airpodcase_min = 0;
var airpodcase_max = 91;



export default class Scene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      podstate: false,
      sel: false
    };
  }

  componentDidMount() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.camera = camera;


    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor (0x3d4582, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.enabled = true;

    this.controls = controls;
    const interaction = new Interaction(renderer, scene, camera);

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.75 );
    directionalLight.position.set(0.5, 0.64, -0.82);
    scene.add( directionalLight );

    var ambientlight = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( ambientlight );

    var dynamicObject;
    var dynamicObject1;

    const gloader = new GLTFLoader();
    gloader.load(
        'http://localhost:3000/assets/airpods.gltf',
        ( gltf ) => {
            // called when the resource is loaded
            gltf.scene.scale.x = 0.1;
            gltf.scene.scale.y = 0.1;
            gltf.scene.scale.z = 0.1;

            scene.add( gltf.scene );

            dynamicObject = scene.getObjectByName("AVE_Airpods");
            dynamicObject.position.z = airpod_min;
            
            dynamicObject1 = scene.getObjectByName("AVE_Airpods_Case_2");
            dynamicObject1.rotation.x = airpodcase_min;
            //dynamicObject.rotation.y = THREE.Math.degToRad(90);

            this.marker_1 = SceneUtils.loadMarker(new THREE.Vector3(0,-0.1,-0.18), scene, 'pointer');
            scene.add( this.marker_1 );
            this.marker_1.on('click', (ev) => this.setState({sel: true}) );
            
            this.marker_2 = SceneUtils.loadMarker(new THREE.Vector3(0.25,0.04,0), scene, 'pointer');
            scene.add( this.marker_2 );
            this.marker_2.on('click', (ev) => this.tRotate(dynamicObject1, dynamicObject, 1000, 50) );	

        },
        ( xhr ) => {
            // called while loading is progressing
            //console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded` );
        },
        ( error ) => {
            // called when loading has errors
            console.error( 'An error happened', error );
        },
    );
    

    camera.position.z =  1;

    var animate = function() {
      requestAnimationFrame(animate);
	  TWEEN.update();
      renderer.render(scene, camera);
    };

    animate();

    this.initialize();
  }

  initialize() {
    
  }

  componentDidUpdate(prevProps) {
    
  }
  
  tRotate = ( obj, obj1, delay, pause ) => {

  var angle;
  var pos;

  if(this.state.podstate === false)
  {
    angle = airpodcase_max;
    pos = airpod_max;
  }
  else if(this.state.podstate === true)
  {
    angle = airpodcase_min;
    pos = airpod_min;
  }

	var rotation = { x: obj.rotation.x };
	var target = { x: THREE.Math.degToRad(angle) };
  var tween = new TWEEN.Tween(rotation).to(target, 2000);
	
	tween.onUpdate(function(){
		obj.rotation.x = rotation.x;
	});

  tween.start();

  var position = { z: obj1.position.z };
	var target1 = { z: pos };
  var tween1 = new TWEEN.Tween(position).to(target1, 2000);

  tween1.onUpdate(function(){
		obj1.position.z = position.z;
  });
  
  tween1.start();

  this.setState({podstate : !this.state.podstate});
}

  deSel = () => this.setState({sel: false});

  render() {
    return (
    <div>
        <div ref={ref => (this.mount = ref)}>
          <UI  sel={this.state.sel}  deSel = {this.deSel} />
        </div>
    </div>
    );
  }
}
