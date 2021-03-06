var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
var ANIMATION_ATTRACTION = 0.1;
var ANIMATION_DAMPING = 0.5;

function createSvgElement(tag, attributes, parent) {
  var el = document.createElementNS(SVG_NAMESPACE, tag);
  for (var attribute in attributes) {
    el.setAttribute(attribute, attributes[attribute]);
  }

  parent.appendChild(el);
  return el;
}

function toRadians(degrees) {
  return degrees * Math.PI / 180;
}

function toDegrees(radians) {
  return radians * 180 / Math.PI;
}