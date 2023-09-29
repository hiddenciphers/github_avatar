// Initialize scene, camera, and renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Move the camera back so we can see the object
camera.position.z = 5;

// Load texture and create material and geometry
var texture = new THREE.TextureLoader().load('./assets/github_avatar.png');
var geometry = new THREE.PlaneGeometry(4, 4, 1, 1);
var material = new THREE.MeshBasicMaterial({ map: texture });

// Create mesh and add to the scene
var avatar = new THREE.Mesh(geometry, material);
scene.add(avatar);

// Add lighting effects
var ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.8);
scene.add(ambientLight);

// Handle window resize
window.addEventListener('resize', function() {
  var newWidth = window.innerWidth;
  var newHeight = window.innerHeight;
  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(newWidth, newHeight);
});

// Raycasting for clickable objects
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onMouseClick(event) {
  event.preventDefault();

  // Normalized device coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  // Check for intersection with avatar
  var intersects = raycaster.intersectObject(avatar);
  if (intersects.length > 0) {
    // Redirect
    window.location.href = 'https://github.com/hiddenciphers';
  }
}
window.addEventListener('click', onMouseClick, false);

// Animation loop for pulsing effect
var clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);

  var time = clock.getElapsedTime();

  // Pulsing effect
  var scale = 1 + 0.1 * Math.sin(time);
  avatar.scale.set(scale, scale, scale);

  renderer.render(scene, camera);
}

// Run the animation
animate();










  