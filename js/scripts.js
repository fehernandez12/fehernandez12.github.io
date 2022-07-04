window.onload = function() {

  var messagesEl = document.querySelector('.messages');
  var typingSpeed = 20;
  var loadingText = '<b>•</b><b>•</b><b>•</b>';
  var messageIndex = 0;
  var language = window.navigator.userLanguage || window.navigator.language;

  var getCurrentTime = function() {
    var date = new Date();
    var hours =  date.getHours();
    var minutes =  date.getMinutes();
    var current = hours + (minutes * .01);
    if (current >= 5 && current < 19) return 'Have a nice day';
    if (current >= 19 && current < 22) return 'Have a nice evening';
    if (current >= 22 || current < 5) return 'Have a good night';
  }

  var getCurrentTimeES = function() {
    var date = new Date();
    var hours =  date.getHours();
    var minutes =  date.getMinutes();
    var current = hours + (minutes * .01);
    if (current >= 6 && current < 16) return '¡Ten un lindo día!';
    if (current >= 16 && current < 20) return '¡Que tengas una buena tarde!';
    if (current >= 20 || current < 6) return '¡Te deseo una gran noche!';
  }

  var messages = [
    'Hey there 👋',
    'I\'m Felipe',
    'I code things for the web',
    'To put it short, I\'m a developer 🤓' ,
    'I\'m currently accepting freelance work.<br> You can contact me <a href="mailto:feehernandezba@gmail.com">here.</a>',
    '<a target="_blank" href="https://github.com/fehernandez12">github.com/fehernandez12</a><br><a target="_blank" href="https://instagram.com/defffeater">instagram.com/defffeater</a>',
    'Or you can read <a target="_blank" href="https://fehernandez.com/blog">my blog 😎</a>, <br>or take a look at <a target="_blank" href="https://fehernandez.com/portfolio/">my portfolio</a>.',
    getCurrentTime(),
    '👾 F.'
  ]

  var messages_ES = [
    '¡Hola! 👋',
    'Soy Felipe',
    'Escribo código para la web',
    'En pocas palabras, soy desarrollador 🤓' ,
    'Actualmente acepto trabajos freelance.<br> Puedes contactarme <a href="mailto:feehernandezba@gmail.com">aquí.</a>',
    '<a target="_blank" href="https://github.com/fehernandez12">github.com/fehernandez12</a><br><a target="_blank" href="https://instagram.com/defffeater">instagram.com/defffeater</a>',
    'O puedes leer lo que posteo en <a target="_blank" href="https://fehernandez.com/blog">mi blog 😎</a>, <br>o echarle un ojo a <a target="_blank" href="https://fehernandez.com/portfolio/">mi porfafolio</a>.',
    getCurrentTimeES(),
    '👾 F.'
  ]

  var getFontSize = function() {
    return parseInt(getComputedStyle(document.body).getPropertyValue('font-size'));
  }

  var pxToRem = function(px) {
    return px / getFontSize() + 'rem';
  }

  var createBubbleElements = function(message, position) {
    var bubbleEl = document.createElement('div');
    var messageEl = document.createElement('span');
    var loadingEl = document.createElement('span');
    var time = new Date().getHours();
    if (time >= 6 && time < 19) {
      document.body.style.background = '#FFF';
      bubbleEl.classList.add('bubble');
    } else {
      messagesEl.style.color = '#FFF';
      document.body.style.background = '#000';
      bubbleEl.classList.add('bubble-dark');
    }
    bubbleEl.classList.add('is-loading');
    bubbleEl.classList.add('cornered');
    if (time >= 6 && time < 19) {
      bubbleEl.classList.add('light');
      bubbleEl.classList.add(position === 'right' ? 'right' : 'left');
    } else {
      bubbleEl.classList.add('dark');
      bubbleEl.classList.add(position === 'right' ? 'right' : 'left-dark');
    }
    messageEl.classList.add('message');
    if (time >= 6 && time < 19) {
      loadingEl.classList.add('loading');
    } else {
      loadingEl.classList.add('loading-dark');
    }
    messageEl.innerHTML = message;
    loadingEl.innerHTML = loadingText;
    bubbleEl.appendChild(loadingEl);
    bubbleEl.appendChild(messageEl);
    bubbleEl.style.opacity = 0;
    return {
      bubble: bubbleEl,
      message: messageEl,
      loading: loadingEl
    }
  }

  var getDimentions = function(elements) {
    return dimensions = {
      loading: {
        w: '4rem',
        h: '2.25rem'
      },
      bubble: {
        w: pxToRem(elements.bubble.offsetWidth + 4),
        h: pxToRem(elements.bubble.offsetHeight)
      },
      message: {
        w: pxToRem(elements.message.offsetWidth + 4),
        h: pxToRem(elements.message.offsetHeight)
      }
    }
  }

  var sendMessage = function(message, position) {
    var loadingDuration = (message.replace(/<(?:.|\n)*?>/gm, '').length * typingSpeed) + 500;
    var elements = createBubbleElements(message, position);
    messagesEl.appendChild(elements.bubble);
    messagesEl.appendChild(document.createElement('br'));
    var dimensions = getDimentions(elements);
    elements.bubble.style.width = '0rem';
    elements.bubble.style.height = dimensions.loading.h;
    elements.message.style.width = dimensions.message.w;
    elements.message.style.height = dimensions.message.h;
    elements.bubble.style.opacity = 1;
    var bubbleOffset = elements.bubble.offsetTop + elements.bubble.offsetHeight;
    if (bubbleOffset > messagesEl.offsetHeight) {
      var scrollMessages = anime({
        targets: messagesEl,
        scrollTop: bubbleOffset,
        duration: 750
      });
    }
    var bubbleSize = anime({
      targets: elements.bubble,
      width: ['0rem', dimensions.loading.w],
      marginTop: ['2.5rem', 0],
      marginLeft: ['-2.5rem', 0],
      duration: 800,
      easing: 'easeOutElastic'
    });
    var loadingLoop = anime({
      targets: elements.bubble,
      scale: [1.05, .95],
      duration: 1100,
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutQuad'
    });
    var dotsStart = anime({
      targets: elements.loading,
      translateX: ['-2rem', '0rem'],
      scale: [.5, 1],
      duration: 400,
      delay: 25,
      easing: 'easeOutElastic',
    });
    var dotsPulse = anime({
      targets: elements.bubble.querySelectorAll('b'),
      scale: [1, 1.25],
      opacity: [.5, 1],
      duration: 300,
      loop: true,
      direction: 'alternate',
      delay: function(i) {return (i * 100) + 50}
    });
    setTimeout(function() {
      loadingLoop.pause();
      dotsPulse.restart({
        opacity: 0,
        scale: 0,
        loop: false,
        direction: 'forwards',
        update: function(a) {
          if (a.progress >= 65 && elements.bubble.classList.contains('is-loading')) {
            elements.bubble.classList.remove('is-loading');
            anime({
              targets: elements.message,
              opacity: [0, 1],
              duration: 300,
            });
          }
        }
      });
      bubbleSize.restart({
        scale: 1,
        width: [dimensions.loading.w, dimensions.bubble.w ],
        height: [dimensions.loading.h, dimensions.bubble.h ],
        marginTop: 0,
        marginLeft: 0,
        begin: function() {
          elements.bubble.classList.remove('cornered');
        }
      })
    }, loadingDuration - 50);
  }

  var sendMessages = function() {
    if (language == 'es-ES') {
      var message = messages_ES[messageIndex];
    } else {
      var message = messages[messageIndex];
    }
    if (!message) return;
    sendMessage(message);
    ++messageIndex;
    setTimeout(sendMessages, (message.replace(/<(?:.|\n)*?>/gm, '').length * typingSpeed) + anime.random(900, 1200));
  }

  sendMessages();

}
