import dom from 'vd';

export default function splash({ name, org, logo, active, total, channels, iframe }){
  let div = dom('.splash',
    !iframe && dom('link rel=stylesheet', { href: 'https://fonts.googleapis.com/css?family=Rye|Didact+Gothic|Unica+One|Righteous' }),
    !iframe && dom('.logos',
      dom('<img src="assets/logo.png"'),
      dom('.logo.slack')
    ),
    !iframe && dom('.intro',
      dom('h1', 'Join our community'),
      dom('p.status',
        active
          ? [
            dom('b.active', active), ' users online now of ',
            dom('b.total', total), ' registered.'
          ]
          : [dom('b.total', total), ' users are registered so far.']
      )
    ),
    iframe && dom('p',
      'Join ', dom('b', name),
      // mention single single-channel inline
      channels && channels.length === 1 && dom('span', ' #', channels[0]),
      ' on Slack.'
    ),
    iframe && dom('p.status',
      active
        ? [
          dom('b.active', active), ' users online now of ',
          dom('b.total', total), ' registered.'
        ]
        : [dom('b.total', total), ' users are registered so far.']
    ),
    dom('form',
      // channel selection when there are multiple
      channels && channels.length > 1 && dom('select.form-item name=channel',
        channels.map(channel => {
          return dom('option', { value: channel, text: channel });
        })
      ),
      dom('input.form-item type=email placeholder=you@yourdomain.com '
        + (!iframe ? 'autofocus' : '')),
      dom('button.loading', 'Get my Invite')
    ),
    !iframe && dom('.about',
      dom('h2', 'What is this?'),
      dom('p', 'Digital Artisans is a place where pixel artists, code poets, copywriting wordsmiths and masters of the digital arts can escape the confines of solitude and aid in each others enlightenment.'),
      dom('p', 'We come here to communicate with our peers, to collaborate on wonderful new ideas and to discuss which thrift store truly has the most beautiful chequered shirts.'),
      dom('h2', 'How do I sign up?'),
      dom('p', 'Enter your electronic mail address in the form above and we will send out the all important invite to ',
                dom(`a href=https://${org}.slack.com target=_top`, 'our Slack channel'),
                '.',
                dom('i',
                  dom('small', ' We\'re currently not accepting users with email hosted at aol, hotmail or yahoo…unless they\'re being used ironically.')
                )
      ),
      dom('p', 'If you do not receive your invite please contact ',
                dom('a href=https://twitter.com/aaronbassett', '@aaronbassett'),
                ' on Twitter.'
      ),
      dom('h2', 'We need to go for Affogato!'),
      dom('p', 'As much as digital is neato, sometimes we do love analog. Some of us meet to discuss the best beard oil recipes once a month over a couple of organic, fair-trade craft beers at ',
                dom('a href=http://rookieoven.com/meetup', 'RookieOven'),
                '. You should join us before it gets too mainstream.'),
      dom('h2', 'Is this a joke?'),
      dom('p', 'Whatever gave you that idea? Ok, so our tongue was firmly in our cheek while writing the copy. But the community is very real ',
               dom('i',
                '(',
                dom('b', total),
                ' users and counting)'
               ),
               ' and is filled with lovely people.'
      )
    ),
    !iframe && dom('p.signin',
      dom(`a href=https://${org}.slack.com target=_top`, 'Already one of the cool kids? Sign in.')
    ),
    !iframe && dom('footer',
      'powered by ',
      dom('a href=http://rauchg.com/slackin target=_blank', 'slackin')
    ),
    style({ logo, active, iframe }),
    // xxx: single build
    dom('script src=https://cdn.socket.io/socket.io-1.3.2.js'),
    dom('script src=assets/superagent.js'),
    dom('script src=assets/client.js')
  );
  return div;
}

const pink = '#42282E';

function style({ logo, active, iframe } = {}){
  var css = dom.style();

  css.add('.splash', {
    'width': iframe ? '250px' : '800px',
    'margin': iframe ? '0' : '100px auto 20px',
    'text-align': 'center',
    'font-family': iframe ? '"Helvetica Neue", Helvetica, Arial' : '"Didact Gothic", sans-serif'
  });

  if (iframe) {
    css.add('body, html', {
      'margin': '0',
      'padding': '0',
      'background': '#FAFAFA',
      'overflow': 'hidden' // ff
    });

    css.add('.splash', {
      'box-sizing': 'border-box',
      'padding': '10px'
    });
  }

  if (!iframe) {
    css
    .media('(max-width: 800px)')
    .add('.splash', {
      'margin-top': '0',
      'width': '100%'
    });

    css.add('body', {
      'background-image': 'url(assets/background.png)'
    })

    css.add('a, a:visited', {
      'color': '#D6665A',
      'text-decoration': 'none'
    });

    css.add('.intro', {
      'margin-bottom': '30px'
    });

    css.add('.intro h1', {
      'font-family': '"Rye", cursive',
      'text-transform': 'uppercase',
      'font-size': '50px',
      'margin': 0
    });

    css.add('.about h2', {
      'font-family': '"Unica One", sans-serif',
      'text-transform': 'uppercase',
      'font-size': '30px',
      'margin': '15px 0 5px 0'
    });

    css.add('.about', {
      'text-align': 'left',
      '-webkit-column-count': 2,
      '-moz-column-count': 2,
      'column-count': 2,
      'margin-top': '30px'
    });
  }

  css.add('.head', {
    'margin-bottom': '40px'
  });

  css.add('.logos', {
    'position': 'relative',
    'margin-bottom': '40px'
  });

  if (!iframe) {
    css.add('.logo', {
      'width': '60px',
      'height': '60px',
      'display': 'inline-block',
      'background-size': 'cover',
      'position': 'absolute',
      'left': '60%',
      'top': '20px'
    });

    css
    .media('(max-width: 400px)')
    .add('.logos img', {
      'width': '100%'
    });

    css.add('.logo.slack', {
      'background-image': 'url(assets/slack.svg)'
    });

    css
    .media('(max-width: 800px)')
    .add('.about', {
      '-webkit-column-count': 1,
      '-moz-column-count': 1,
      'column-count': 1,
      'padding': '0 10px'
    });

    if (logo) {
      let pw = 10; // '+' width
      let lp = 30; // logos separation

      css.add('.logo.org::after', {
        'position': 'absolute',
        'display': 'block',
        'content': '"+"',
        'top': '15px',
        'left': '0',
        'text-align': 'center',
        'color': '#D6D6D6',
        'font': '15px Helvetica Neue'
      });

      css.add('.logo.org', {
        'background-image': `url(${logo})`,
        'margin-right': `${lp + pw + lp}px`
      });
    }
  }

  css.add('p', {
    'font-size': iframe ? '12px' : '17px',
    'margin': iframe ? '0 0 5px' : '5px 0'
  });

  if (iframe) {
    css.add('p.status', {
      'font-size': '11px'
    });
  }

  css.add('select', {
    'background': 'none'
  });

  css.add('button, .form-item', {
    'font-size': '12px',
    'margin-top': iframe ? '5px' : '10px',
    'vertical-align': 'middle',
    'display': 'block',
    'text-align': 'center',
    'box-sizing': 'border-box',
    'width': '100%',
    'padding': '9px'
  });

  css.add('button', {
    'color': '#fff',
    'font-weight': 'bold',
    'border-width': 0,
    'background': pink,
    'text-transform': 'uppercase',
    'cursor': 'pointer',
    'appearence': 'none',
    '-webkit-appearence': 'none',
    'outline': '0',
    'transition': 'background-color 150ms ease-in, color 150ms ease-in'
  });

  css.add('button.loading', {
    'pointer-events': 'none'
  });

  css.add('button:disabled', {
    'color': '#9B9B9B',
    'background-color': '#D6D6D6',
    'cursor': 'default',
    'pointer-events': 'none'
  });

  css.add('button.error', {
    'background-color': '#F4001E',
    'text-transform': 'none'
  });

  css.add('button.success:disabled', {
    'color': '#fff',
    'background-color': '#68C200'
  });

  css.add('button:not(.disabled):active', {
    'background-color': '#7A002F',
  });

  css.add('b', {
    'transition': 'transform 150ms ease-in'
  });

  css.add('b.grow', {
    'transform': 'scale(1.3)'
  });

  css.add('form', {
    'margin-top': iframe ? '10px' : '20px',
    'margin-bottom': '0'
  });

  css.add('input', {
    'color': '#9B9B9B',
    'border': '1px solid #D6D6D6'
  });

  if (iframe) {
    css.add('input, button', {
      'font-size': '11px',
      'height': '28px',
      'line-height': '28px'
    });
  }

  css.add('input:focus', {
    'color': '#666',
    'border-color': '#999',
    'outline': '0'
  });

  if (active) {
    css.add('.active', {
      'color': pink
    });
  }

  if (!iframe) {
    css.add('button', {
      'font-family': '"Righteous", cursive',
      'font-size': '30px'
    });

    css.add('.splash form input', {
      'font-family': '"Didact Gothic", sans-serif',
      'font-size': '20px'
    });

    css.add('p.signin', {
      'padding': '10px',
      'font-size': '20px',
      'margin-top': '20px'
    });

    css.add('p.signin a', {
      'color': pink,
      'text-decoration': 'none'
    });

    css.add('p.signin a:hover', {
      'text-decoration': 'underline'
    });
  }

  if (!iframe) {
    css.add('footer', {
      'color': '#D6D6D6',
      'font-size': '11px',
      'margin': '30px auto',
      'width': '300px',
      'text-align': 'center',
    });

    css.add('footer a', {
      'color': '#9B9B9B',
      'text-decoration': 'none',
      'border-bottom': '1px solid #9B9B9B'
    });

    css.add('footer a:hover', {
      'color': '#fff',
      'background-color': '#9B9B9B'
    });
  }

  return css;
}
