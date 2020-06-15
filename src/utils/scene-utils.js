import * as THREE from "three";

var FBXLoader = require("three-fbx-loader");
//import { FBXLoader } from "./FBXLoader";

var FBXUrl = require("./painting-stand.fbx");
var tloader = new THREE.TextureLoader();

let loadCubemap = () => {
  var path = "https://threejs.org/examples/textures/cube/SwedishRoyalCastle/";
  var format = ".jpg";

  var urls = [
    path + "px" + format,
    path + "nx" + format,
    path + "py" + format,
    path + "ny" + format,
    path + "pz" + format,
    path + "nz" + format
  ];

  var loader = new THREE.CubeTextureLoader();

  loader.setCrossOrigin("");
  var cubeMap = loader.load(urls);

  cubeMap.format = THREE.RGBFormat;

  return cubeMap;
};

let loader = new FBXLoader();
let createPainting = () => {
  loader.load(FBXUrl, function(object3d) {
    console.log(object3d);
    object3d.scale.x = 50;
    object3d.scale.y = 50;
    object3d.scale.z = 50;
    return object3d;
  });
};

let createPainting2 = (_txtr) => {

  let geometry = new THREE.BoxGeometry(1.4, 2, 0.04);
  let material = new THREE.MeshBasicMaterial({ map: tloader.load(_txtr) });
  let cube = new THREE.Mesh(geometry, material);
  cube.position.z = -5;

  return cube;
};

let createOutline = _ref => {
  let outlineMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.BackSide
  });
  let outlineMesh = new THREE.Mesh(_ref.geometry, outlineMaterial);
  outlineMesh.visible = false;
  outlineMesh.position.set(_ref.position.x, _ref.position.y, _ref.position.z);
  outlineMesh.scale.multiplyScalar(1.05);

  return outlineMesh;
};

export { loadCubemap, createPainting, createPainting2, createOutline };
