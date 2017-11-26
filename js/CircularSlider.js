function CircularSlider(sliderContainer, radius, options) {
  var circularSlider = this;
  circularSlider.container = sliderContainer;
  circularSlider.startAngle = Math.PI / 2;
  circularSlider.radius = radius;
  circularSlider.step = options['step'];
  circularSlider.min = options['min'];
  circularSlider.max = options['max'];
  circularSlider.knobRadius = options['knobRadius'];
  circularSlider.circleWidth = options['circleWidth'];

  circularSlider.circle = createSvgElement('circle', {
    'cx': (sliderContainer.size / 2) + 'px',
    'cy': (sliderContainer.size / 2) + 'px',
    'r': circularSlider.radius + 'px',
    'fill': 'none',
    'stroke': options['circleStroke'],
    'stroke-width': circularSlider.circleWidth
  }, sliderContainer.svg);

  circularSlider.knob = createSvgElement('circle', {
    'r': circularSlider.knobRadius + 'px',
    'fill': options['knobColor']
  }, sliderContainer.svg);

  var coordinates = circularSlider.getCoordinatesFromAngle(-circularSlider.startAngle);
  circularSlider.setKnobCoordinates(coordinates.x, coordinates.y);
}

CircularSlider.prototype.getCoordinatesFromAngle = function (angle) {
  var circularSlider = this;
  return {
    x: circularSlider.container.center + Math.cos(angle) * circularSlider.radius,
    y: circularSlider.container.center + Math.sin(angle) * circularSlider.radius
  }
};

CircularSlider.prototype.setKnobCoordinates = function (x, y) {
  var circularSlider = this;
  circularSlider.knobX = x;
  circularSlider.knobY = y;
  circularSlider.knob.setAttribute('cx', x + 'px');
  circularSlider.knob.setAttribute('cy', y + 'px');
};
