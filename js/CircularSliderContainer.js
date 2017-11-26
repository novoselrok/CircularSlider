function CircularSliderContainer(el, slidersOptions, options) {
  var sliderContainer = this;
  sliderContainer.size = options['size'];
  sliderContainer.center = sliderContainer.size / 2;
  sliderContainer.padding = options['padding'];

  sliderContainer.svg = createSvgElement('svg', {
    'height': sliderContainer.size + 'px',
    'width': sliderContainer.size + 'px',
    'viewBox': '0 0 ' + sliderContainer.size + ' ' + sliderContainer.size
  }, el);

  sliderContainer.sliders = sliderContainer.createSliders(slidersOptions);
}

CircularSliderContainer.prototype.createSliders = function (slidersOptions) {
  var sliderContainer = this;
  var initialRadius = sliderContainer.center - (2 * sliderContainer.padding);

  return slidersOptions.map(function (options, idx) {
    // Create equally spaced sliders from sliders options
    return new CircularSlider(sliderContainer, initialRadius * (1 - idx / slidersOptions.length), options);
  });
};
