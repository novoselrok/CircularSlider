document.addEventListener('DOMContentLoaded', function () {
  var htmlContainer = document.getElementById('circular-slider-container');
  var containerSize = Math.min(htmlContainer.getBoundingClientRect().width, 320);

  var transportationSlider = {
    min: 10,
    max: 200,
    step: 30,
    knobRadius: 10,
    circleWidth: 9,
    circleStroke: '#cccccc',
    knobColor: 'black',
    pathStroke: 'purple',
    onChange: function (newValue) {
      document.getElementById('listener1').innerHTML = newValue;
    }
  };

  var foodSlider = {
    min: 100,
    max: 500,
    step: 25,
    knobRadius: 10,
    circleWidth: 9,
    circleStroke: '#cccccc',
    knobColor: 'black',
    pathStroke: 'blue',
    onChange: function (newValue) {
      document.getElementById('listener2').innerHTML = newValue;
    }
  };

  var insuranceSlider = {
    min: 1,
    max: 10,
    step: 1,
    knobRadius: 10,
    circleWidth: 9,
    circleStroke: '#cccccc',
    knobColor: 'black',
    pathStroke: 'green',
    onChange: function (newValue) {
      document.getElementById('listener3').innerHTML = newValue;
    }
  };

  var entertainmentSlider = {
    min: 100,
    max: 150,
    step: 10,
    knobRadius: 10,
    circleWidth: 9,
    circleStroke: '#cccccc',
    knobColor: 'black',
    pathStroke: 'orange',
    onChange: function (newValue) {
      document.getElementById('listener4').innerHTML = newValue;
    }
  };

  var healthCareSlider = {
    min: 0,
    max: 33,
    step: 1,
    knobRadius: 10,
    circleWidth: 9,
    circleStroke: '#cccccc',
    knobColor: 'black',
    pathStroke: 'red',
    onChange: function (newValue) {
      document.getElementById('listener5').innerHTML = newValue;
    }
  };

  document.getElementById('listener1').innerHTML = transportationSlider.min;
  document.getElementById('listener2').innerHTML = foodSlider.min;
  document.getElementById('listener3').innerHTML = insuranceSlider.min;
  document.getElementById('listener4').innerHTML = entertainmentSlider.min;
  document.getElementById('listener5').innerHTML = healthCareSlider.min;

  new CircularSliderContainer(htmlContainer, [
    transportationSlider,
    foodSlider,
    insuranceSlider,
    entertainmentSlider,
    healthCareSlider
  ], {size: containerSize, padding: 5});
});
