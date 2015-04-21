// dependencies
global.jQuery = global.$ = require('jquery');

var React = require('react/addons'),
    ReactCSSTransitionGroup = React.addons.CSSTransitionGroup,
    imagesLoaded = require('imagesloaded');

function shuffle(o){ //v1.0
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

//React Components
var Hello = React.createClass({
  render: function() {
    return (
      <div className="grid-component small">
        <h1>Hello!</h1>
      </div>
    );
  }
});

var Quote = React.createClass({
  getQuoteFromTESQuotes: function() {
    //get data from quotes api
    var apiUrl = 'http://tesquotes.kenjin.me/api/random_quote'
    $.get(apiUrl, function(res) {
      if (this.isMounted()) {
        this.setState({quote: res});
        $('.quote').addClass('shown');
      }
    }.bind(this));
  },
  getInitialState: function() {
    return {
      quote: {}
    };
  },
  componentDidMount: function() {
    this.getQuoteFromTESQuotes();
  },
  render: function() {
    return (
      <div className="grid-component large quote">
        <p>{ this.state.quote.quote }</p>
        <span>{ this.state.quote.author }</span>
      </div>
    );
  }
});

var standardComponent = React.createClass({
  handleClick: function() {
    var el = $('.' + this.props.title);
    var ex = $('.expanded');
    var position = el.offset();
    ex.offset({top: Math.floor(position.top), left: Math.floor(position.left)});
  },
  componentDidMount: function() {
  },
  render: function() {
    var componentClass = "grid-component " + this.props.size + ' ' + this.props.title;
    return (
      <div className={ componentClass } onClick={ this.handleClick }>
        <a href={ this.props.url }>
          <span>{ this.props.title }</span>
        </a>
      </div>
    );
  }
});

var Nav = React.createClass({
  render: function() {
    return (
      <div className="nav">
        <div className="full modal">
          <div className="inner modal">
            <p>Things blah blah blah blah blah</p>
          </div>
          <span>+ About</span>
        </div>
      </div>
    );
  }
});

var Grid = React.createClass({
  mouseGridShift: function() {
    $('html').mousemove(function(e) {
      var tempX = e.pageX,
          viewportWidth = $(window).width(),
          axis = $('.grid').width() / 2,
          graphBoundryX = viewportWidth - axis,
          limitY = 26,
          x = (tempX - axis),
          y = (limitY * Math.sin(( 1 / (graphBoundryX * 0.666) * x)));
      $('.grid').css({'transform': 'perspective(600px) rotateY( '+ y +'deg)'});
    });
  },
  getInitialState: function() {
    return {
      components: componentsList
    };
  },
  componentDidMount: function() {
    this.mouseGridShift();
    $(window).keypress(function(e) {
      if (e.keyCode === 0 || e.keyCode === 32) {
        if (this.isMounted()) {
          this.setState({components: shuffle(componentsList)});
        }
      }
    }.bind(this));
  },
  render: function() {
    var gridComponents = this.state.components.map(function (component, index) {
      return (
        <component.name
          size={ component.size }
          key={ index }
          title={ component.title }/>
      );
    });
    return (
      <div className="grid">
        <div className="expanded"></div>
        { gridComponents }
      </div>
    );
  }
});

var Content = React.createClass({
  render: function() {
    return (
      <div>
        <Nav />
        <Grid />
      </div>
    );
  }
});

//Mock Up Data
var componentsList = [
  { name: Quote, size: 'large'},
  { name: Hello, size: 'small'},
  { name: standardComponent, size: 'small', title: 'Projects'},
  { name: standardComponent, size: 'small', title: 'Technologies'},
  { name: standardComponent, size: 'medium', title: 'Something'},
  { name: standardComponent, size: 'medium', title: 'Something-else'},
  { name: standardComponent, size: 'small', title: 'Contact'},
]

//Render
React.render(
  <Content />,
  document.getElementById('content')
);
