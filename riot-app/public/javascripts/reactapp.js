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
        }else if(currentView===5){
          var bodyView = <AppPanelFive parent={this} />;
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
                       <li><button className="btn btn-default" type="button" onClick={ this.props.parent.changeViewstate.bind(this, 5) }>Graph</button></li>
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
                        <p>Is it better to be a master of one, or a jack of all trades?</p>
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
                        <p>There might be too much of a good thing when it comes to playing at a high level.</p>
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
                        <p>Many games in the LCS are won during the pick/ban phase. Which players can make the best out of any scenario?</p>
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
                        <p>What does the mastery point distribution look like across roles?</p>
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
                    <h3>What is the optimal number of champions to focus on?</h3>
                    <p>Here we are taking a look at which NA challenger players have level 5 with a champion, and more than three wins in ranked. The distinction is made, because a commonly played champion is not necessarily a "ranked-worthy" champion.</p>
                    <p>There doesn't seem to be any trend until we realize that almost all of these players who have more than three wins on a level 5 champion, also have win rates over 50%. Those that are below 50%, have mastered less than 5 champions.</p>
		    <p>Therefore, I would guess it is best to feel confident in ranked with 5 or more champions!</p>
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
                        <table className="table riotapp-table">
                          <thead>
                            <tr>
			      <td></td>
                              <td>Player Name</td>
                              <td>Number of Champions</td>
                              <td>Win Ratio</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
			      <td><img className="avatar" src={champIcon} alt="Stand In Avatar" /></td>
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
            <section id="inner-view">
            <div className="container">
              <div className="row">
                <div className="col-xs-12">
                  <div className="wtdwm-well">
                    <h3>What is the optimal amount of mastery for a good win ratio?</h3>
                    <p>This data is all over the place. This tells us almost nothing! Almost. What this means to me, is that macro-play beats mechanical skill. There is an upper limit to champion mastery, but there is no limit to outsmarting opponents on the rift.</p>
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
                        <table className="table riotapp-table">
                          <thead>
                            <tr>
			      <td></td>
                              <td>Player Name</td>
                              <td>Sum of Mastery Points</td>
                              <td>Average Win Ratio</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
			      <td><img className="avatar" src={champIcon} alt="Stand In Avatar" /></td>
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
          <section id="inner-view">
            <div className="container">
              <div className="row">
                <div className="col-xs-12">
                  <div className="wtdwm-well">
		    <h3>Which pro players show the highest mastery across the most champions?</h3>
                    <p>Having a large champion pool is an important skillset. Here again, we see that win ratio is not tied to number of level 5 champions. What this proves, is that challenger players are earning more mastery points than me. A lot more.</p>
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
                        <table className="table riotapp-table">
                          <thead>
                            <tr>
			      <td></td>
                              <td>Player Name</td>
                              <td>Number of Level 5 Champions</td>
                              <td>Win Ratio</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
			      <td><img className="avatar" src={champIcon} alt="Stand In Avatar" /></td>
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
          <section id="inner-view">
            <div className="container">
              <div className="row">
                <div className="col-xs-12">
                  <div className="wtdwm-well">
		    <h3>Which champion role has the most mastery points?</h3>
                    <p>There is a 280% difference in mastery points between marksmen and tanks. That doesn't necessarily mean marksmen are played more than tanks.</p>
		    <p>One theory is that in the algorithm used to generate mastery points, kills/kill participation are weighted for the most points. However, Mages and assasins would need to be higher for that to be true.</p>
		    <p>Our current theory is that in this meta, fighters with consistent damage are built as tanks, thus filling the role without being flagged by the data.</p>
                  </div>
                </div>
                <div className="col-xs-12">
                  <div className="wtdwm-well scroll-list-well eq-content">
                    <div className="scroll-list">
                    <p>View State: {this.props.viewstate}</p>
                    {this.props.champData.map(function(item, i){
                    var champIcon = champAvatar + i + ".png"
                    return(
                    <div key={item.tablekey} className="col-xs-12">
                        <div id="champ-item">
                        <table className="table riotapp-table">
                          <thead>
                            <tr>
			      <td></td>
                              <td>Champion Role</td>
                              <td>Total Mastery Points</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td><img className="avatar" src={champIcon} alt="Stand In Avatar" /></td>
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
var AppPanelFive = React.createClass({
  componentDidMount: function() {
      initGraph();
  }, 
  render: function(){
        return (
          <section id="inner-view">
            <div className="container">
              <div className="row">
                <div className="col-xs-12">
                  <div className="wtdwm-well">
                      <div id="status"></div>
                      <div id="vis"></div>
		  </div>
		  <div className="wtdwm-well">
		      <p>Larger bubbles have more mastery points. Lighter bubbles have higher win rates!</p>
		      <p>Fun Fact: The player "Annie Bot" has 80% of the challenger wins on Annie. Annie has a BIG bubble.</p>
		      <p>Pro Tip: Use CTRL F to find your favorite player.</p>
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
