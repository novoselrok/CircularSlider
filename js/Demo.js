document.addEventListener('DOMContentLoaded', function () {
  var wrapper = document.getElementById('wrapper');
  new CircularSliderContainer(wrapper, [
    {min: 10, max: 100, step: 10, knobRadius: 10, circleWidth: 5, circleStroke: '#cccccc'},
    {min: 10, max: 100, step: 10, knobRadius: 10, circleWidth: 5, circleStroke: '#cccccc'}
  ], {size: 300, padding: 10});
});
