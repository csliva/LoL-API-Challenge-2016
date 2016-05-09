console.log('React App Connected! - LOL API CHALLENGE');
// React Transition Group
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

/////////////////////////////////////////////////////////
// 0.0 DATA
/////////////////////////////////////////////////////////

var champAvatar = 'http://ddragon.leagueoflegends.com/cdn/6.9.1/img/profileicon/';

var questions = [
  {"question" : "What is the optimal number of champions to focus on?"},
  {"question" : "What is the optimal amount of mastery for a good win ratio?"},
  {"question" : "Which pro players show the highest mastery across the most champions?"},
  {"question" : "Which champion role has the most mastery points?"}
];

/////////////////////////////////////////////////////////
// 0.0 Index Layout - Top Level Component
/////////////////////////////////////////////////////////
var IndexLayout = React.createClass({
    getInitialState: function(){
      return { 
        viewstate: 0,
        champnum: [],
        championlist: [],
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
	      <AppHeader parent={this} />
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
               <nav id="wtdwm-navi"> 
                   <a href="/" id="wtdwm-logo">
                      <img src="../images/wtdwm-logo-web-opt.png" alt="What's the Deal with Mastery Logo" />
                   </a>
                   <ul className="list-inline" id="wtdwm-navlinks">
                       <li><button className="btn btn-default" type="button" onClick={ this.props.parent.changeViewstate.bind(this, 0) }>H</button></li>
                       <li><button className="btn btn-default" type="button" onClick={ this.props.parent.changeViewstate.bind(this, 1) }>Q1</button></li>
                       <li><button className="btn btn-default" type="button" onClick={ this.props.parent.changeViewstate.bind(this, 2) }>Q2</button></li>
                       <li><button className="btn btn-default" type="button" onClick={ this.props.parent.changeViewstate.bind(this, 3) }>Q3</button></li>
                       <li><button className="btn btn-default" type="button" onClick={ this.props.parent.changeViewstate.bind(this, 4) }>Q4</button></li>
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
              <div id="question-list" className="row eq-row">
                  <div className="col-xs-12 col-sm-6 eq-col">
                    <div className="wtdwm-well eq-content">
                        <small>Question 1</small>
                        <h2>{questions[0].question}</h2>
                        <p>Lorem ipsum dolor sit amet, est eirmod facilisi perfecto cu, id postea liberavisse pri. Explicari percipitur cu pri.</p>
                        <div className="btn-wrap">
                        <button className="btn wtdwm-btn" type="button"
                          onClick={ this.props.parent.changeViewstate.bind(this, 1) }>
                          View the Results <i className="fa fa-long-arrow-right"></i>
                        </button>
                        </div>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-6 eq-col">
                    <div className="wtdwm-well eq-content">
                        <small>Question 2</small>
                        <h2>{questions[1].question}</h2>
                        <p>Lorem ipsum dolor sit amet, est eirmod facilisi perfecto cu, id postea liberavisse pri. Explicari percipitur cu pri.</p>
                        <div className="btn-wrap">
                        <button className="btn wtdwm-btn" type="button"
                          onClick={ this.props.parent.changeViewstate.bind(this, 2) }>
                          View the Results <i className="fa fa-long-arrow-right"></i>
                        </button>
                        </div>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-6 eq-col">
                    <div className="wtdwm-well eq-content">
                        <small>Question 3</small>
                        <h2>{questions[2].question}</h2>
                        <p>Lorem ipsum dolor sit amet, est eirmod facilisi perfecto cu, id postea liberavisse pri. Explicari percipitur cu pri.</p>
                        <div className="btn-wrap">
                        <button className="btn wtdwm-btn" type="button"
                          onClick={ this.props.parent.changeViewstate.bind(this, 3) }>
                          View the Results <i className="fa fa-long-arrow-right"></i>
                        </button>
                        </div>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-6 eq-col">
                    <div className="wtdwm-well eq-content">
                        <small>Question 4</small>
                        <h2>{questions[3].question}</h2>
                        <p>Lorem ipsum dolor sit amet, est eirmod facilisi perfecto cu, id postea liberavisse pri. Explicari percipitur cu pri.</p>
                        <div className="btn-wrap">
                        <button className="btn wtdwm-btn" type="button"
                          onClick={ this.props.parent.changeViewstate.bind(this, 4) }>
                          View the Results <i className="fa fa-long-arrow-right"></i>
                        </button>
                        </div>
                    </div>
                  </div>
              </div>
            </div>
            </div>
          </section>
        );
    }
});
var AppPanelOne = React.createClass({
  componentDidMount: function() {
    this.props.champData = this.props.parent.getData('/champions/optimalchamp');
  },
  render: function(){
        return (
          <section id="inner-view">
            <div className="container">
              <div className="row">
                <div className="col-xs-12">
                  <div className="wtdwm-well">
                    <p>Content Here</p>
                  </div>
                </div>
                <div className="col-xs-12">
                  <div className="wtdwm-well scroll-list-well eq-content">
                    <div className="scroll-list">
                    <p>View State: {this.props.viewstate}</p>
                    {this.props.champData.map(function(item, i){
                    var champIcon = champAvatar + item.playericon + ".png"
                    return(
                    <div key={item.tablekey} className="col-xs-12">
                        <div id="champ-item">
                        <img className="avatar" src={champIcon} alt="Stand In Avatar" />
                        <table className="table riotapp-table">
                          <thead>
                            <tr>
                              <td>Player Name</td>
                              <td>Number of Champions</td>
                              <td>Win Ratio</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{item.playername}</td>
                              <td>{item.count}</td>
                              <td>{item.avg}</td>
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
              </div>
            </div>
          </section>
        );
    }
});
var AppPanelTwo = React.createClass({
  componentDidMount: function() {
    this.props.champData = this.props.parent.getData('champions/optimalmastery');
  },
  render: function(){
        return (
            <div className="container">
              <div className="row">
                <div className="col-xs-12">
                  <div className="wtdwm-well">
                    <p>Content Here</p>
                  </div>
                </div>
                <div className="col-xs-12">
                  <div className="wtdwm-well scroll-list-well eq-content">
                    <div className="scroll-list">
                    <p>View State: {this.props.viewstate}</p>
                    {this.props.champData.map(function(item, i){
                    var champIcon = champAvatar + item.playericon + ".png"
                    return(
                    <div key={item.tablekey} className="col-xs-12">
                        <div id="champ-item">
                        <img className="avatar" src={champIcon} alt="Stand In Avatar" />
                        <table className="table riotapp-table">
                          <thead>
                            <tr>
                              <td>Player Name</td>
                              <td>Sum of Champion Mastery</td>
                              <td>Win Ratio</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{item.playername}</td>
                              <td>{item.sum}</td>
                              <td>{item.avg}</td>
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
              </div>
            </div>
          </section>
        );
    }
});
var AppPanelThree = React.createClass({
  componentDidMount: function() {
    this.props.champData = this.props.parent.getData('/champions/masteryspread');
  },
  render: function(){
        return (
            <div className="container">
              <div className="row">
                <div className="col-xs-12">
                  <div className="wtdwm-well">
                    <p>Content Here</p>
                  </div>
                </div>
                <div className="col-xs-12">
                  <div className="wtdwm-well scroll-list-well eq-content">
                    <div className="scroll-list">
                    <p>View State: {this.props.viewstate}</p>
                    {this.props.champData.map(function(item, i){
                    var champIcon = champAvatar + item.playericon + ".png"
                    return(
                    <div key={item.tablekey} className="col-xs-12">
                        <div id="champ-item">
                        <img className="avatar" src={champIcon} alt="Stand In Avatar" />
                        <table className="table riotapp-table">
                          <thead>
                            <tr>
                              <td>Player Name</td>
                              <td>Number of Champions</td>
                              <td>Win Ratio</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{item.playername}</td>
                              <td>{item.count}</td>
                              <td>{item.avg}</td>
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
              </div>
            </div>
          </section>
        );
    }
});
var AppPanelFour = React.createClass({
  componentDidMount: function() {
    this.props.champData = this.props.parent.getData('/champions/role');
  },
  render: function(){
        return (
            <div className="container">
              <div className="row">
                <div className="col-xs-12">
                  <div className="wtdwm-well">
                    <p>Content Here</p>
                  </div>
                </div>
                <div className="col-xs-12">
                  <div className="wtdwm-well scroll-list-well eq-content">
                    <div className="scroll-list">
                    <p>View State: {this.props.viewstate}</p>
                    {this.props.champData.map(function(item, i){
                    var champIcon = champAvatar + item.playericon + ".png"
                    return(
                    <div key={item.tablekey} className="col-xs-12">
                        <div id="champ-item">
                        <img className="avatar" src={champIcon} alt="Stand In Avatar" />
                        <table className="table riotapp-table">
                          <thead>
                            <tr>
                              <td>Champion Role</td>
                              <td>Sum of Mastery</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{item.championrole}</td>
                              <td>{item.sum}</td>
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
