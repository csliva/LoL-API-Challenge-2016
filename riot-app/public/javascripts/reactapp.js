console.log('React App Connected! - LOL API CHALLENGE');
// React Transition Group
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

/////////////////////////////////////////////////////////
// 0.0 DATA
/////////////////////////////////////////////////////////

var champAvatar = 'http://ddragon.leagueoflegends.com/cdn/6.9.1/img/champion/Aatrox.png';

var questions = [
  {"question" : "What is the optimal number of champions to focus on?"},
  {"question" : "What is the optimal amount of mastery for a good win ratio?"},
  {"question" : "Which pro players show the highest mastery across the most champions?"},
  {"question" : "Which champion role has the most mastery points?"}
];

var fakedata = [
  {"tablekey":"00000001", "name":"fakename01", "champnum":"00000000", "totalmastery":"10000000", "champrole":"Role I"},
  {"tablekey":"00000002", "name":"fakename02", "champnum":"11111111", "totalmastery":"20000000", "champrole":"Role H"},
  {"tablekey":"00000003", "name":"fakename03", "champnum":"22222222", "totalmastery":"30000000", "champrole":"Role G"},
  {"tablekey":"00000004", "name":"fakename04", "champnum":"33333333", "totalmastery":"40000000", "champrole":"Role F"},
  {"tablekey":"00000005", "name":"fakename05", "champnum":"44444444", "totalmastery":"50000000", "champrole":"Role E"},
  {"tablekey":"00000006", "name":"fakename06", "champnum":"55555555", "totalmastery":"60000000", "champrole":"Role D"},
  {"tablekey":"00000007", "name":"fakename07", "champnum":"55555555", "totalmastery":"70000000", "champrole":"Role C"},
  {"tablekey":"00000008", "name":"fakename08", "champnum":"66666666", "totalmastery":"80000000", "champrole":"Role B"},
  {"tablekey":"00000009", "name":"fakename09", "champnum":"77777777", "totalmastery":"90000000", "champrole":"Role A"}
];

/////////////////////////////////////////////////////////
// 0.0 Index Layout - Top Level Component
/////////////////////////////////////////////////////////
var IndexLayout = React.createClass({
    getInitialState: function(){
      return { 
        viewstate: 0,
        champnum: [],
        championlist: fakedata,
        loading: false,
        postLimit: 100,
        postOffset: 0
      };
    },
    getCount: function(url){  
      $.get(url, function(result) {
        if (this.isMounted()) {
          this.setState({
            champnum: result
          });
          console.log('Ajax Call Made! - Getting Row Count');
        }
      }.bind(this));
    },
    getData: function(url){  
      $.get(url, function(result) {
        if (this.isMounted()) {
          this.setState({
            championlist: result,
            loading: false
          });
          console.log('Ajax Call Made! - Getting Champions');
        }
      }.bind(this));
    },
    changeViewstate: function(stateID){
      console.log('Change state to: '+stateID);
      this.setState({
        viewstate: stateID
      });
    },
    componentDidMount: function() {
      var pLimit = this.state.postLimit;
      var pOffset = this.state.postOffset;
      console.log('IndexTemplate Mounted');
      //this.getData('/champions/championlist/'+pLimit+'/'+pOffset+'');
      //this.getCount('/champions/championcount');
    },
    render: function(){
        //Get app viewstate
        var currentView = this.state.viewstate;
        if(currentView===0){
          var bodyView = <AppBodyWelcome parent={this} champData={this.state.championlist} />;
        }else if(currentView===1){
          var bodyView = <AppPanelOne parent={this} champData={this.state.championlist} />;
        }else if(currentView===2){
          var bodyView = <AppPanelTwo parent={this} champData={this.state.championlist} />;
        }else if(currentView===3){
          var bodyView = <AppPanelThree parent={this} champData={this.state.championlist} />;
        }else if(currentView===4){
          var bodyView = <AppPanelFour parent={this} champData={this.state.championlist} />;
        }
        // Render App
        return (
          <div id='index-layout-inner'>
              {bodyView}
          </div>
        );
    }
});

var AppHeader = React.createClass({
  render: function(){
        return (
          <header id="riotapp-header">
            <div className="container">
              <nav id="riotapp-navbar" className="navbar navbar-default">
                <a className="navbar-brand" href=".">Riot LoL Challenge</a>
                <ul className="nav navbar-nav">
                  <li><a href="#">Navlink</a></li>
                  <li><a href="#">Navlink</a></li>
                  <li><a href="#">Navlink</a></li>
                  <li><a href="#">Navlink</a></li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  <li><a href="#"><i className="fa fa-bars"></i></a></li>
                </ul>
              </nav>
            </div>
          </header>
        );
    }
});
var AppBodyWelcome = React.createClass({
  render: function(){
        return (
          <section id="riotapp-welcome-section">
            <div className="container">
            <div className="body-content">
              <div className="panel-title">
                <h1>Welcome to the Riot Challenge App!</h1>
                <p>Here are the questions we set out to answer: </p>
              </div>
              <ul id="question-list">
                    <li><button className="btn btn-default" type="button" onClick={ this.props.parent.changeViewstate.bind(this, 1) }>
                        <b>Q:</b> {questions[0].question}
                    </button></li>
                    <li><button className="btn btn-default" type="button" onClick={ this.props.parent.changeViewstate.bind(this, 2) }>
                        <b>Q:</b> {questions[1].question}
                    </button></li>
                    <li><button className="btn btn-default" type="button" onClick={ this.props.parent.changeViewstate.bind(this, 3) }>
                        <b>Q:</b> {questions[2].question}
                    </button></li>
                    <li><button className="btn btn-default" type="button" onClick={ this.props.parent.changeViewstate.bind(this, 4) }>
                        <b>Q:</b> {questions[3].question}
                    </button></li>
              </ul>
            </div>
            </div>
          </section>
        );
    }
});
var AppPanelOne = React.createClass({
  render: function(){
        return (
          <section id="riotapp-panel-one">
            <div className="container">
            <div className="body-content">
              <div className="panel-title">
              <h1>Q: {questions[0].question}</h1>
              </div>
              <button className="btn btn-default" type="button" onClick={ this.props.parent.changeViewstate.bind(this, 0) }>
                  <i className="fa fa-long-arrow-left"></i> Back to Questions
              </button>
              <div className="row">
                  {this.props.champData.map(function(item, i){
                    return(
                    <div key={item.tablekey} className="col-xs-12">
                        <div id="champ-item">
                        <img className="avatar" src={champAvatar} alt="Stand In Avatar" />
                        <table className="table riotapp-table">
                          <thead>
                            <tr>
                              <td>Payer Name</td>
                              <td>Number of Champions</td>
                              <td>Win Ratio</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{item.name}</td>
                              <td>{item.champnum}</td>
                              <td>20%</td>
                            </tr>
                          </tbody>
                        </table>
                        </div>
                    </div>
                    );        
                  })}
              </div>
            </div>
            </div>
          </section>
        );
    }
});
var AppPanelTwo = React.createClass({
  render: function(){
        return (
          <section id="riotapp-panel-two">
            <div className="container">
            <div className="body-content">
              <div className="panel-title">
              <h1>Q: {questions[1].question}</h1>
              </div>
              <button className="btn btn-default" type="button" onClick={ this.props.parent.changeViewstate.bind(this, 0) }>
                  <i className="fa fa-long-arrow-left"></i> Back to Questions
              </button>
              <div className="row">
                  {this.props.champData.map(function(item, i){
                    return(
                    <div key={item.tablekey} className="col-xs-12">
                        <div id="champ-item">
                        <img className="avatar" src={champAvatar} alt="Stand In Avatar" />
                        <table className="table riotapp-table">
                          <thead>
                            <tr>
                              <td>Payer Name</td>
                              <td>Number of Champions</td>
                              <td>Win Ratio</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{item.name}</td>
                              <td>{item.champnum}</td>
                              <td>20%</td>
                            </tr>
                          </tbody>
                        </table>
                        </div>
                    </div>
                    );        
                  })}
              </div>
            </div>
            </div>
          </section>
        );
    }
});
var AppPanelThree = React.createClass({
  render: function(){
        return (
          <section id="riotapp-panel-three">
            <div className="container">
            <div className="body-content">
              <div className="panel-title">
              <h1>Q: {questions[2].question}</h1>
              </div>
              <button className="btn btn-default" type="button" onClick={ this.props.parent.changeViewstate.bind(this, 0) }>
                  <i className="fa fa-long-arrow-left"></i> Back to Questions
              </button>
              <div className="row">
                  {this.props.champData.map(function(item, i){
                    return(
                    <div key={item.tablekey} className="col-xs-12">
                        <div id="champ-item">
                        <img className="avatar" src={champAvatar} alt="Stand In Avatar" />
                        <table className="table riotapp-table">
                          <thead>
                            <tr>
                              <td>Payer Name</td>
                              <td>Number of Champions</td>
                              <td>Win Ratio</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{item.name}</td>
                              <td>{item.champnum}</td>
                              <td>20%</td>
                            </tr>
                          </tbody>
                        </table>
                        </div>
                    </div>
                    );        
                  })}
              </div>
            </div>
            </div>
          </section>
        );
    }
});
var AppPanelFour = React.createClass({
  render: function(){
        return (
          <section id="riotapp-panel-four">
            <div className="container">
            <div className="body-content">
              <div className="panel-title">
              <h1>Q: {questions[3].question}</h1>
              </div>
              <button className="btn btn-default" type="button" onClick={ this.props.parent.changeViewstate.bind(this, 0) }>
                  <i className="fa fa-long-arrow-left"></i> Back to Questions
              </button>
              <div className="row">
                  {this.props.champData.map(function(item, i){
                    return(
                    <div key={item.tablekey} className="col-xs-12">
                        <div id="champ-item">
                        <img className="avatar" src={champAvatar} alt="Stand In Avatar" />
                        <table className="table riotapp-table">
                          <thead>
                            <tr>
                              <td>Payer Name</td>
                              <td>Number of Champions</td>
                              <td>Win Ratio</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{item.name}</td>
                              <td>{item.champnum}</td>
                              <td>20%</td>
                            </tr>
                          </tbody>
                        </table>
                        </div>
                    </div>
                    );        
                  })}
              </div>
            </div>
            </div>
          </section>
        );
    }
});
var AppFooter = React.createClass({
  render: function(){
        return (
          <footer id="riotapp-footer">
            <div className="container">
              <p>Footer Menu</p>
            </div>
          </footer>
        );
    }
});
//////////////////////////////////////////
// 0.0 Render the App
/////////////////////////////////////////////////////////
ReactDOM.render(
  <IndexLayout />,
  document.getElementById('index-layout')
);