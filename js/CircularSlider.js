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

  circularSlider.value = 0;
  circularSlider.currentDeg = 0;

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

  circularSlider.updateKnob(-circularSlider.startAngle);
}

CircularSlider.prototype.updateKnob = function (angle) {
  var circularSlider = this;
  // Rotate circle in positive direction by PI/2
  // and convert angle in radians to degrees
  var deg = toDegrees(angle + circularSlider.startAngle);
  if (deg < 0 && deg > -90) {
    deg += 360;
  }

  var coordinates = circularSlider.getCoordinatesFromAngle(angle);
  circularSlider.setKnobCoordinates(coordinates.x, coordinates.y);

  // Calculate new value
  // Map degrees from 0:360 to min:max range
  var newValue = circularSlider.min + (circularSlider.max - circularSlider.min) * (deg / 360);
  var newValueRounded = Math.floor(newValue / circularSlider.step) * circularSlider.step;
  if (Math.abs(circularSlider.value - newValueRounded) >= circularSlider.step) {
    circularSlider.value = newValueRounded;
  }

  circularSlider.currentDeg = deg;
};

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

CircularSlider.prototype.isWithinCircleRange = function (x, y) {
  var circularSlider = this;
  var distToCenter = Math.sqrt(Math.pow(x - circularSlider.container.center, 2) + Math.pow(y - circularSlider.container.center, 2));
  return Math.abs(distToCenter - circularSlider.radius) < circularSlider.circleWidth;
};
