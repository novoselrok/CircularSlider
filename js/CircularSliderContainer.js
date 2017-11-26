function CircularSliderContainer(el, slidersOptions, options) {
  var sliderContainer = this;
  sliderContainer.size = options['size'];
  sliderContainer.center = sliderContainer.size / 2;
  sliderContainer.padding = options['padding'];
  sliderContainer.activeSlider = null;

  sliderContainer.svg = createSvgElement('svg', {
    'height': sliderContainer.size + 'px',
    'width': sliderContainer.size + 'px',
    'viewBox': '0 0 ' + sliderContainer.size + ' ' + sliderContainer.size
  }, el);

  sliderContainer.sliders = sliderContainer.createSliders(slidersOptions);

  // Wire up the events
  sliderContainer.svg.addEventListener('click', function (e) {
    var relativeCoordinates = sliderContainer.getRelativeCoordinates(e);
    // Check if the event is close enough to any circles
    for (var i = 0; i < sliderContainer.sliders.length; i++) {
      if (sliderContainer.sliders[i].isWithinCircleRange(relativeCoordinates.x, relativeCoordinates.y)) {
        var angle = Math.atan2(relativeCoordinates.y - sliderContainer.center, relativeCoordinates.x - sliderContainer.center);
        sliderContainer.sliders[i].animateKnob(angle);
        // Prevent moving/pull-to-refresh on mobile
        e.preventDefault();
        e.stopPropagation();
        break;
      }
    }
  });

  ['mousedown', 'touchstart'].forEach(function (type) {
    sliderContainer.svg.addEventListener(type, function (e) {
      var relativeCoordinates = sliderContainer.getRelativeCoordinates(e);
      // Check if the event is close enough to any knobs
      for (var i = 0; i < sliderContainer.sliders.length; i++) {
        if (sliderContainer.sliders[i].isWithinKnobRange(relativeCoordinates.x, relativeCoordinates.y)) {
          sliderContainer.activeSlider = sliderContainer.sliders[i];
          e.preventDefault();
          e.stopPropagation();
          break;
        }
      }
    });
  });

  ['mouseup', 'touchend', 'touchcancel'].forEach(function (type) {
    window.addEventListener(type, function (e) {
      // Remove the active slider
      sliderContainer.activeSlider = null;
    });
  });

  ['mousemove', 'touchmove'].forEach(function (type) {
    window.addEventListener(type, function (e) {
      if (sliderContainer.activeSlider === null) return;
      e.preventDefault();
      var relativeCoordinates = sliderContainer.getRelativeCoordinates(e);
      var angle = Math.atan2(relativeCoordinates.y - sliderContainer.center, relativeCoordinates.x - sliderContainer.center);
      sliderContainer.activeSlider.updateKnob(angle);
    });
  });
}

CircularSliderContainer.prototype.createSliders = function (slidersOptions) {
  var sliderContainer = this;
  var initialRadius = sliderContainer.center - (2 * sliderContainer.padding);

  return slidersOptions.map(function (options, idx) {
    // Create equally spaced sliders from sliders options
    return new CircularSlider(sliderContainer, initialRadius * (1 - idx / slidersOptions.length), options);
  });
};

CircularSliderContainer.prototype.getRelativeCoordinates = function (e) {
  var sliderContainer = this;
  var dimensions = sliderContainer.svg.getBoundingClientRect();

  if (e.type.startsWith("mouse") || e.type === "click") {
    return {
      x: e.x - dimensions.left,
      y: e.y - dimensions.top
    }
  } else if (e.type.startsWith("touch")) {
    var touch = e.targetTouches.item(e.targetTouches.length - 1);

    return {
      x: touch.clientX - dimensions.left,
      y: touch.clientY - dimensions.top
    }
  } else {
    console.log("Unknown event");
  }
};