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
}