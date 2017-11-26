var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

function createSvgElement(tag, attributes, parent) {
  var el = document.createElementNS(SVG_NAMESPACE, tag);
  for (var attribute in attributes) {
    el.setAttribute(attribute, attributes[attribute]);
  }

  parent.appendChild(el);
  return el;
}