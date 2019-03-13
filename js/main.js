particlesJS("background-particles", {
  "particles": {
    "number": {
      "value": 300,
      "density": {
        "enable": true,
        "value_area": 790
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": { "nb_sides": 5 }
    },
    "opacity": {
      "value": 1,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 10,
        "opacity_min": 0,
        "sync": false
      }
    },
    "size": {
      "value": 1,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 2,
        "size_min": 0,
        "sync": false
      }
    },
    "line_linked": { "enable": false },
    "move": {
      "enable": false,
      "speed": 0.5,
      "direction": 'none',
      "random": false,
      "straight": false,
      "out_mode": 'out',
      "bounce": false
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": { "enable": false },
      "onclick": { "enable": false },
      "resize": true
    }
  },
  "retina_detect": true,
  "modes": {}
});

particlesJS("line-particles", {
  "particles": {
    "number": {
      "value": 200,
      "density": {
        "enable": true,
        "value_area": 250
      }
    },
    "color": {
      "value": "#4B3820"
    },
    "shape": {
      "type": ["polygon", "image"],
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": { "nb_sides": 5 },
      "image": {
        "src": "images/rock.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": { "enable": false }
    },
    "size": {
      "value": 6,
      "random": true,
      "anim": { "enable": false }
    },
    "line_linked": { "enable": false },
    "move": {
      "enable": true,
      "speed": 3,
      "direction": "right",
      "random": true,
      "straight": true,
      "out_mode": "out",
      "bounce": false,
      "attract": { "enable": false }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": { "enable": false },
      "onclick": { "enable": false },
      "resize": true
    }
  },
  "retina_detect": true,
  "modes": {}
});

function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

function getSeen (first) {
  var stored = JSON.parse(localStorage.getItem("seenPlanet"));
  if (first && stored !== true) {
    localStorage.removeItem("seenPlanet");
    return false;
  } else return stored;
}

var fallingPlanet = anime({
  targets: ".right-planet .planetoid",
  translateX: [
    { value: 50, duration: 3000, delay: 1000 },
    { value: 100, duration: 4000, delay: 1500 }
  ],
  translateY: [
    { value: 50, duration: 1000, easing: "easeInElastic(1, 1)" },
    { value: 40, duration: 500 },
    { value: 2000, duration: 7500, easing: "linear" }
  ],
  rotate: {
    value: 450,
    duration: 5000,
    delay: 750,
    easing: "easeOutQuart"
  },
  easing: "easeOutElastic(1, 2)",
  autoplay: false,
  loop: false,
  complete: function () {
    document.querySelector(".right-planet .planetoid").style.display = "none";
  }
});

var shakePlanet = anime({
  targets: ".right-planet .planet",
  translateX: [-1, 1],
  translateY: [-1, 1],
  duration: 100,
  direction: 'alternate',
  easing: "linear",
  autoplay: false,
  loop: 10
});

var flyingCar = anime({
  targets: ".flying-car-container",
  translateX: [-50, 1500],
  translateY: [200, -50],
  duration: 20000,
  easing: "linear",
  loop: true,
  delay: 20000
});

ready(function(){
  var hasSeenFirst = getSeen(true);

  if (hasSeenFirst !== true) document.querySelector(".right-planet .planetoid").style.display = "inline";

  document.querySelector(".right-planet").onclick = function () {
    shakePlanet.play();

    if (hasSeenFirst !== true) {
      var hasSeen = getSeen();
      if (hasSeen !== true) {
        if (!isNaN(hasSeen) && hasSeen >= 4) {
          fallingPlanet.play();
          localStorage.setItem("seenPlanet", "true");
        } else {
          localStorage.setItem("seenPlanet", JSON.stringify(hasSeen ? hasSeen + 1 : 1));
        }
      }
    }
  };

  var flyingCarEl = document.querySelector(".flying-car-container");
  var flyingCarTooltip = document.querySelector(".flying-car-container span")
  flyingCarEl.onmouseenter = function () {
    flyingCar.pause();
    flyingCarTooltip.style.display = "inline";
  };
  flyingCarEl.onmouseleave = function () {
    flyingCar.play();
    flyingCarTooltip.style.display = "none";
  }
})
