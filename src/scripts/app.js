// dependencies
global.jQuery = global.$ = require('jquery');

var React = require('react'),
    imagesLoaded = require('imagesloaded');

//React Components
var Hello = React.createClass({
  render: function() {
    return (
      <div className="grid-component">
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
      <div className="grid-component">
        <h1>{ this.state.quote.quote }</h1>
        <h2>{ this.state.quote.author }</h2>
      </div>
    );
  }
});

var standardComponent = React.createClass({
  render: function() {
    return (
      <div className="grid-component">
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
      <div className="full modal">
        <div className="inner modal">
          <p>Things blah blah blah blah blah</p>
        </div>
        <span>+ About</span>
      </div>
    );
  }
});

var Grid = React.createClass({
  mouseGridShift: function() {
    $('html').mousemove(function(e) {
      var tempX = event.pageX,
          viewportWidth = $(window).width(),
          axis = $('.grid').width() / 2,
          graphBoundryX = viewportWidth - axis,
          limitY = 26,
          x = (tempX - axis),
          y = (limitY * Math.sin(( 1 / (graphBoundryX * 0.666) * x)));
      $('.grid').css({'transform': 'perspective(600px) rotateY( '+ y +'deg)'});
    });
  },
  componentDidMount: function() {
    this.mouseGridShift();
  },
  render: function() {
    var gridComponents = components.map(function (component, index) {
      return (
        <component.name
          className="grid-component"
          key={ index }
          title={ component.title }/>
      );
    });
    return (
      <div className="grid">
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
var components = [
  { name: Quote },
  { name: Hello },
  { name: standardComponent, title: 'Projects'},
  { name: standardComponent, title: 'Technologies'},
  { name: standardComponent, title: 'Something'},
  { name: standardComponent, title: 'Something else'},
]

//Render
React.render(
  <Content />,
  document.getElementById('content')
);
