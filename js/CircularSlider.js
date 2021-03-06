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
  circularSlider.onChange = options['onChange'];

  circularSlider.value = circularSlider.min;
  circularSlider.currentDeg = 0;
  circularSlider.animationVelocity = 0;

  circularSlider.circle = createSvgElement('circle', {
    'cx': (sliderContainer.size / 2) + 'px',
    'cy': (sliderContainer.size / 2) + 'px',
    'r': circularSlider.radius + 'px',
    'fill': 'none',
    'stroke': options['circleStroke'],
    'stroke-width': circularSlider.circleWidth
  }, sliderContainer.svg);

  circularSlider.path = createSvgElement('path', {
    'stroke': options['pathStroke'],
    'fill': 'none',
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
  var newValueRounded = Math.floor((newValue - circularSlider.min) / circularSlider.step) * circularSlider.step + circularSlider.min;
  if (Math.abs(circularSlider.value - newValueRounded) >= circularSlider.step) {
    circularSlider.value = newValueRounded;
    if (typeof circularSlider.onChange === 'function') {
      circularSlider.onChange(circularSlider.value);
    }
  }

  circularSlider.currentDeg = deg;
  circularSlider.setPath(toRadians(deg));
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

CircularSlider.prototype.isWithinKnobRange = function (x, y) {
  var circularSlider = this;
  return Math.sqrt(Math.pow(x - circularSlider.knobX, 2) + Math.pow(y - circularSlider.knobY, 2)) < circularSlider.knobRadius;
};

CircularSlider.prototype.setPath = function (angle) {
  var circularSlider = this;
  var start = circularSlider.getCoordinatesFromAngle(angle - circularSlider.startAngle);
  var end = circularSlider.getCoordinatesFromAngle(-circularSlider.startAngle);
  var largeArcFlag = angle <= Math.PI ? "0" : "1";

  var d = [
    "M", start.x, start.y,
    "A", circularSlider.radius, circularSlider.radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(" ");

  circularSlider.path.setAttribute('d', d);
};

CircularSlider.prototype.animateKnob = function (angle) {
  // Rotate circle in positive direction by PI/2
  var circularSlider = this;
  var deg = toDegrees(angle + circularSlider.startAngle);
  if (deg < 0 && deg > -90) {
    deg += 360;
  }
  var animate = function () {
    if (Math.abs(deg - circularSlider.currentDeg) <= 3) {
      // Stop the animation
      circularSlider.animationVelocity = 0;
      circularSlider.updateKnob(toRadians(deg) - circularSlider.startAngle);
    } else {
      var step = ANIMATION_ATTRACTION * (deg - circularSlider.currentDeg);
      circularSlider.animationVelocity = (circularSlider.animationVelocity + step) * ANIMATION_DAMPING;
      circularSlider.currentDeg += circularSlider.animationVelocity;

      var coordinates = circularSlider.getCoordinatesFromAngle(toRadians(circularSlider.currentDeg) - circularSlider.startAngle);
      circularSlider.setKnobCoordinates(coordinates.x, coordinates.y);
      circularSlider.setPath(toRadians(circularSlider.currentDeg));
      circularSlider.animateKnob(toRadians(deg) - circularSlider.startAngle);
    }
  };

  requestAnimationFrame(animate);
};
