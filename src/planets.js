import React from "react";
import * as THREE from "three";
let OrbitControls = require("three-orbit-controls")(THREE)

class Planets extends React.Component {
  componentDidMount() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    this.mount.appendChild( renderer.domElement );
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);
    var light = new THREE.PointLight(0xffffff, 1, 0);
    light.position.set(0, 0, 100);
    scene.add(light);
    var ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    camera.position.z = 10;

    let controls = new OrbitControls(camera)

    let star = createSphere("yellow")
    let planet1 = createSphere("green")
    let planet2 = createSphere("purple")
    let planet3 = createSphere("blue")
    let planet4 = createSphere("red")
    let planet5 = createSphere("orange")

    let spheres = [planet1, planet2, planet3, planet4, planet5]
    let orbitSpeeds = [1, 0.9, 0.75, 0.55, 0.15]
    let orbitDegrees = [0, 0, 0, 0, 0]
    let orbitRadii = [2, 3, 4, 5, 8]

    star.position.set(0,0,0)

    planet1.scale.set(0.1, 0.1, 0.1)
    planet2.scale.set(0.18, 0.18, 0.18)
    planet3.scale.set(0.2, 0.2, 0.2)
    planet4.scale.set(0.11, 0.11, 0.11)
    planet5.scale.set(0.4, 0.4, 0.4)

    scene.add(star)
    scene.add(planet1)
    scene.add(planet2)
    scene.add(planet3)
    scene.add(planet4)
    scene.add(planet5)

    var animate = function () {
      requestAnimationFrame( animate );
      renderer.render( scene, camera );
      for(let i = 0; i < spheres.length; i++){
        spheres[i].position.set(orbitRadii[i]*Math.sin(orbitDegrees[i]), 0, orbitRadii[i]*Math.cos(orbitDegrees[i]))
        orbitDegrees[i] += orbitSpeeds[i] * Math.PI/180
      }
    }
    animate();
  }
  render() {
    return (
      <div ref={ref => (this.mount = ref)} />
    )
  }
}

function createSphere(colour){
    let sphereMaterial = new THREE.MeshBasicMaterial({ color: colour })
    let sphereGeometry = new THREE.SphereGeometry()
    let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    return sphere
}

export default Planets