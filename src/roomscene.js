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
      sel: false,
      typ: 'pdf'
    };
  }

  componentDidMount() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );

    this.camera = camera;
    


    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.autoClear = false;
    renderer.setClearColor(0x000000, 0);
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
    //scene.add( directionalLight );

    var ambientlight = new THREE.AmbientLight( 0x404040 ); // soft white light
    //scene.add( ambientlight );

    var dynamicObject;
    var dynamicObject1;

    const gloader = new GLTFLoader();
    gloader.load(
        process.env.PUBLIC_URL + '/assets/home.gltf',
        ( gltf ) => {
           
            var _scnobj = gltf.scene.children[0].children[0];
            // called when the resource is loaded
            //gltf.scene.children[0].scale.x = 1;
            //gltf.scene.children[0].scale.y = 1;
            //gltf.scene.children[0].scale.z = 1;

            scene.add( _scnobj );
            //this.camera.lookAt(gltf.scene.position);
            this.camera.position.y=50;

            this.marker_2 = SceneUtils.loadMarker(new THREE.Vector3(20,20,30), scene, 'pointer');
            
            scene.add( this.marker_2 );
            debugger;
            this.marker_2.on('click', (ev) => this.tRotate(_scnobj.children[0].children[0], _scnobj.children[0].children[0], 1000, 50) );	

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

    var Tloader = new THREE.TextureLoader();
    Tloader.load(process.env.PUBLIC_URL + '/assets//underwater.jpg', 
        function( texture ) {
        var sphereGeometry = new THREE.SphereGeometry( 500, 60, 40 )
        var sphereMaterial = new THREE.MeshBasicMaterial({
             map: texture,
             side: THREE.DoubleSide
        })
        sphereGeometry.scale( -1, 1, 1 );
        var mesh = new THREE.Mesh( sphereGeometry, sphereMaterial );
        scene.add( mesh );
        mesh.position.set( 0, 0, 0 )
   })

    //camera.position.z =  1;

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

	var rotation = { y: obj.rotation.x };
	var target = { y: THREE.Math.degToRad(angle) };
  var tween = new TWEEN.Tween(rotation).to(target, 2000);
	
	tween.onUpdate(function(){
		obj.rotation.y = rotation.y;
	});

  tween.start();

  // var position = { z: obj1.position.z };
	// var target1 = { z: pos };
  // var tween1 = new TWEEN.Tween(position).to(target1, 2000);

  // tween1.onUpdate(function(){
	// 	obj1.position.z = position.z;
  // });
  
  // tween1.start();

  this.setState({podstate : !this.state.podstate});
}

  toMove = (obj, dist) => {

    var position = { x : 0, y: 300 };
    var target = { x : 400, y: 50 };
    var tween = new TWEEN.Tween(position).to(target, 4000);

    tween.delay(2000);

    tween.onUpdate(function(){
        //obj.position.x = position.x;
        obj.position.y = dist.y;
    });

    tween.start();


  }

  deSel = () => this.setState({sel: false});

  render() {
    return (
    <div>
        <div ref={ref => (this.mount = ref)}>
          {/* <UI  sel={this.state.sel}  typ={this.state.typ} deSel = {this.deSel} /> */}
        </div>
    </div>
    );
  }
}
