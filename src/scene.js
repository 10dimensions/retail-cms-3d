import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { Interaction } from "three.interaction";

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import * as SceneUtils from "./utils/scene-utils";
var OrbitControls = require("three-orbit-controls")(THREE);


export default class Scene extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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
    renderer.setClearColor (0xbababa, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.enabled = true;

    this.controls = controls;
    const interaction = new Interaction(renderer, scene, camera);

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    scene.add( directionalLight );

    const gloader = new GLTFLoader();
    gloader.load(
        'http://localhost:3000/assets/Inhaler_2.gltf',
        ( gltf ) => {
            // called when the resource is loaded
            gltf.scene.scale.x = 0.1;
            gltf.scene.scale.y = 0.1;
            gltf.scene.scale.z = 0.1;

            scene.add( gltf.scene );
            console.log(scene);
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
    

    camera.position.z = 1;

    var animate = function() {
      requestAnimationFrame(animate);

      renderer.render(scene, camera);
    };

    animate();

    this.initialize();
  }

  initialize() {
    const { idx } = this.props;
  }

  componentDidUpdate(prevProps) {
    const { idx, sel } = this.props;
  }


  render() {
    return <div ref={ref => (this.mount = ref)} />;
  }
}
