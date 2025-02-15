// Mise en relation les formes géométriques survolées avec des fonctions js
function removeEventListeners(elements, eventType, handler) {elements.forEach(el => el.removeEventListener(eventType, handler));}
function addEventListeners(elements, eventType, handler) {elements.forEach(el => el.addEventListener(eventType, handler));}

// Fonction appelée lorsque la souris se déplace sur un triangle
function triangleMouseMove(e) {
    const triangle = e.target;
    
    // synchronisation de ce qui est affiché avec le triangle survolé
    const maskTriangle = document.getElementById('maskTriangle');
    maskTriangle.setAttribute("points", triangle.getAttribute('points'));

    // coordonnées de la souris (en pixels)
    const x = e.clientX;
    const y = e.clientY;

    // Milieu de la boîte englobante (coordonnées SVG en pourcentage des dimensions de l'image)
    const rect = triangle.getBoundingClientRect();
    const Milx = Number(rect.left) + Number(rect.width)/2 ;
    const Mily = Number(rect.top) + Number(rect.height)/2 ;
    
    // Milieu du triangle (coordonnées SVG en pourcentage des dimensions de l'image)
    const points = e.target.getAttribute("points").split(" ");
    const [x1, y1] = points[0].split(",").map(Number);
    const [x2, y2] = points[1].split(",").map(Number);
    const [x3, y3] = points[2].split(",").map(Number);
    const Milx2 = (Math.min(x1,x2,x3)+Math.max(x1,x2,x3))/2 ;
    const Mily2 = (Math.min(y1,y2,y3)+Math.max(y1,y2,y3))/2 ;

    // transformation de l'image
    const imageB = document.getElementById('imageB');
    imageB.setAttribute("transform", `rotate(${10*(x-Milx)/Number(rect.width) * Math.PI},${Milx2},${Mily2}) translate(${Milx2},${Mily2}) scale(${1.1 - 2*(y-Mily)/Number(rect.height)})  translate(${-Milx2},${-Mily2})`);
    imageB.style.opacity = '1';
}

// Fonction appelée lorsque la souris quitte un triangle
function triangleMouseLeave() {
    const imageB = document.getElementById('imageB');
    imageB.setAttribute("transform", "translate(0,0) scale(1) rotate(0)");
    imageB.style.opacity = '0';
}

// Fonction appelée lorsque la souris se déplace sur un cercle
function cercleMouseMove(e) {

   // synchronisation de ce qui est affiché avec le triangle survolé
   const cercle = e.target;
   const maskCircle = document.getElementById('maskCircle');
   maskCircle.setAttribute("cx", cercle.getAttribute('cx'));
   maskCircle.setAttribute("cy", cercle.getAttribute('cy'));
   maskCircle.setAttribute("r",  cercle.getAttribute('r'));

   // coordonnées de la souris (en pixels)
   const x = e.clientX;
   const y = e.clientY;

   // Coordonnées du centre et rayon (en pixels)
   const rect = cercle.getBoundingClientRect();
   const cx = rect.left + rect.width/2 ;
   const cy = rect.top  + rect.height/2 ;
   const r  = rect.width/2 ;

   // Coordonnées du centre et rayon (coordonnées SVG en pourcentage des dimensions de l'image)
   let cx2=cercle.getAttribute('cx');
   let cy2=cercle.getAttribute('cy');
   let cr2=cercle.getAttribute('r');

   // transformation de l'image
   const imageB = document.getElementById('imageB');
   imageB.setAttribute("transform", `rotate(${20*Math.PI*(x-cx)/r}, ${cx2}, ${cy2}) translate(${cx2},${cy2}) scale(${1.1 - 0.5*(y-cy)/r})  translate(${-cx2},${-cy2})`);
   imageB.style.opacity = '1';
}

// Fonction appelée lorsque la souris quitte un cercle
function cercleMouseLeave() {
   const imageB = document.getElementById('imageB');
   imageB.setAttribute("transform", "translate(0,0) scale(1) rotate(0)");
   imageB.style.opacity = '0';
}

// Fonction appelée lorsque la souris se déplace sur un rectangle
function rectangleMouseMove(e) {

   // synchronisation de ce qui est affiché avec le triangle survolé
    const rectangle = e.target;
    const maskRectangle = document.getElementById('maskRectangle');
    maskRectangle.setAttribute("x", rectangle.getAttribute('x'));
    maskRectangle.setAttribute("y", rectangle.getAttribute('y'));
    maskRectangle.setAttribute("width", rectangle.getAttribute('width'));
    maskRectangle.setAttribute("height", rectangle.getAttribute('height'));

    // coordonnées de la souris (en pixels)

    const x = e.clientX;
    const y = e.clientY;

    // Coordonnées du rectangle (en pixels)
    const rect = rectangle.getBoundingClientRect();
    const Rx = rect.left ;
    const Ry = rect.top ;
    const Rw  = rect.width ;
    const Rh  = rect.height ;
    const Xmil = Rx + 0.5*Rw;
    const Ymil = Ry + 0.5*Rh;
      
    // Coordonnées du rectangle (coordonnées SVG en pourcentage des dimensions de l'image)
    let rx2=rectangle.getAttribute('x');
    let ry2=rectangle.getAttribute('y');
    let w2=rectangle.getAttribute('width');
    let h2=rectangle.getAttribute('height');
    let xmil2=Number.parseFloat(rx2)+(Number.parseFloat(w2)/2);
    let ymil2=Number.parseFloat(ry2)+(Number.parseFloat(h2)/2);

   // transformation de l'image
    const imageB = document.getElementById('imageB');
    imageB.setAttribute("transform", `rotate(${20*Math.PI*(x-Xmil)/Rw}, ${xmil2}, ${ymil2}) translate(${xmil2},${ymil2}) scale(${1.1-(y-Ymil)/Rh}) translate(${-xmil2},${-ymil2})` );
    imageB.style.opacity = '1';
}

// Fonction appelée lorsque la souris quitte un rectangle
function rectangleMouseLeave() {
   const imageB = document.getElementById('imageB');
   imageB.setAttribute("transform", "translate(0,0) scale(1) rotate(0)");
   imageB.style.opacity = '0';
}

// Fonction appelée lorsque la fenêtre est redimensionnée
function updateImages() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const imageA = document.getElementById('imageA');
    const imageB = document.getElementById('imageB');
    const triangles = document.querySelectorAll('.triangle');
    const cercles = document.querySelectorAll('.cercle');
    const rectangles = document.querySelectorAll('.rectangle');

    // Grande fenêtre
    
    if (width > 1000 && height > 800) {

      // Changement des images
      imageA.setAttribute("href", "A.png");
	  imageB.setAttribute("href", "A_sepia.png");
	  
      // Changement des zones à survoler 
      triangles.forEach(el => {
        el.style.opacity = "1";
        el.style.display = "block";
        el.setAttribute("pointer-events", "all");
      });
      cercles.forEach(el => {
        el.style.opacity = "0";
        el.style.display = "none";
        el.setAttribute("pointer-events", "none");
      });
      rectangles.forEach(el => {
        el.style.opacity = "0";
        el.style.display = "none";
        el.setAttribute("pointer-events", "none");
      });

	  // Changement de la zone sepia à afficher 
      imageB.style.mask = "url(#dynamicMaskTriangle)";
      imageB.style.webkitMask = "url(#dynamicMaskTriangle)";

	  // Changement des fonctions à appeler en cas de survol d'une zone 
      addEventListeners(triangles, 'mousemove', triangleMouseMove);
      addEventListeners(triangles, 'mouseleave', triangleMouseLeave);
      removeEventListeners(cercles, 'mousemove', cercleMouseMove);
      removeEventListeners(cercles, 'mouseleave', cercleMouseLeave);
      removeEventListeners(rectangles, 'mousemove', rectangleMouseMove);
      removeEventListeners(rectangles, 'mouseleave', rectangleMouseLeave);      

    // Moyenne fenêtre

     } else if (width > 800 && height > 600) {

      // Changement des images
	imageA.setAttribute("href", "C.jpg");
	imageB.setAttribute("href", "C_sepia.png");

      // Changement des zones à survoler 
    triangles.forEach(el => {
       el.style.opacity = "0";
       el.style.display = "none";
       el.setAttribute("pointer-events", "none");
    });
    cercles.forEach(el => {
       el.style.opacity = "1";
       el.style.display = "block";
       el.setAttribute("pointer-events", "all");
    });
    rectangles.forEach(el => {
       el.style.opacity = "0";
       el.style.display = "none";
       el.setAttribute("pointer-events", "none");
    });

	  // Changement de la zone sepia à afficher 
    imageB.style.mask = "url(#dynamicMaskCircle)";
    imageB.style.webkitMask = "url(#dynamicMaskCircle)";

	  // Changement des fonctions à appeler en cas de survol d'une zone 
    addEventListeners(cercles, 'mousemove', cercleMouseMove);
    addEventListeners(cercles, 'mouseleave', cercleMouseLeave);
    removeEventListeners(triangles, 'mousemove', triangleMouseMove);
    removeEventListeners(triangles, 'mouseleave', triangleMouseLeave);
    removeEventListeners(rectangles, 'mousemove', rectangleMouseMove);
    removeEventListeners(rectangles, 'mouseleave', rectangleMouseLeave); 

    // Petite fenêtre

    } else {

      // Changement des images
	  imageA.setAttribute("href", "B.jpg");
	  imageB.setAttribute("href", "B_sepia.png");

      // Changement des zones à survoler 
      triangles.forEach(el => {
         el.style.opacity = "0";
         el.style.display = "none";
         el.setAttribute("pointer-events", "none");
      });
      cercles.forEach(el => {
         el.style.opacity = "0";
         el.style.display = "none";
         el.setAttribute("pointer-events", "none");
      });
      rectangles.forEach(el => {
         el.style.opacity = "1";
         el.style.display = "block";
         el.setAttribute("pointer-events", "all");
      });

	  // Changement de la zone sepia à afficher 
      imageB.style.mask = "url(#dynamicMaskRectangle)";
      imageB.style.webkitMask = "url(#dynamicMaskRectangle)";

	  // Changement des fonctions à appeler en cas de survol d'une zone 
      addEventListeners(rectangles, 'mousemove', rectangleMouseMove); 
      addEventListeners(rectangles, 'mouseleave', rectangleMouseLeave); 
      removeEventListeners(cercles, 'mousemove', cercleMouseMove);
      removeEventListeners(cercles, 'mouseleave', cercleMouseLeave);
      removeEventListeners(triangles, 'mousemove', triangleMouseMove);
      removeEventListeners(triangles, 'mouseleave', triangleMouseLeave); 
      }
};

// Définition des fonctions à appliquer en cas de redimensionnement (ou rechargement)
window.addEventListener('load', updateImages);
window.addEventListener('resize', updateImages);

// Modification de la luminosité de l'image principale en fonction de la molette
const imageA = document.getElementById("imageA");
let luminosite = 1; // Valeur initiale de la luminosité

document.addEventListener("wheel", (event) => {
  event.preventDefault(); // Empêcher le défilement de la page
  if (event.deltaY < 0) {luminosite += 0.1;} else {luminosite -= 0.1;}
  luminosite = Math.max(0, Math.min(2, luminosite)); // Limiter entre 0 (noir) et 2 (très lumineux)
  imageA.style.filter = `brightness(${luminosite})`;
});
