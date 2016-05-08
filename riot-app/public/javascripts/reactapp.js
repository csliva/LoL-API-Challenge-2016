console.log('React App Connected! - LOL API CHALLENGE');
// React Transition Group
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

/////////////////////////////////////////////////////////
// 0.0 DATA
/////////////////////////////////////////////////////////

var champAvatar = 'http://ddragon.leagueoflegends.com/cdn/6.9.1/img/profileicon/';

var questions = [
  {
    "qindex" : 1,
    "question" : "What is the optimal number of champions to focus on?",
    "dataroute" : "/champions/optimalchamp",
    "fields" : ['playername', 'playericon', 'avg']
  },
  {
    "qindex" : 2,
    "question" : "What is the optimal amount of mastery for a good win ratio?",
    "dataroute" : "/champions/optimalmastery",
    "fields" : ['playername', 'playericon', 'sum', 'avg']
  },
  {
    "qindex" : 3,
    "question" : "Which pro players show the highest mastery across the most champions?",
    "dataroute" : "/champions/masteryspread",
    "fields" : ['playername', 'playericon', 'count', 'avg', 'sum']
  },
  {
    "qindex" : 4,
    "question" : "Which champion role has the most mastery points?",
    "dataroute" : "/champions/role",
    "fields" : ['championrole','sum']
  }
];

/////////////////////////////////////////////////////////
// 0.0 Index Layout - Top Level Component
/////////////////////////////////////////////////////////
var IndexLayout = React.createClass({
    getInitialState: function(){
      return { 
        viewstate: 0,
        //viewData: [],
        viewDataA: [],
        viewDataB: [],
        viewDataC: [],
        viewDataD: [],
        loading: false
      };
    },
    getDataA: function(url){  
      console.log('Trying to get: '+url)
      $.get(url, function(result) {
        if (this.isMounted()) {
          this.setState({
            viewDataA: result
          });
          console.log('Ajax Call Made! - Getting Data for View A');
        }
      }.bind(this));
    },
    getDataB: function(url){  
      console.log('Trying to get: '+url)
      $.get(url, function(result) {
        if (this.isMounted()) {
          this.setState({
            viewDataB: result
          });
          console.log('Ajax Call Made! - Getting Data for View A');
        }
      }.bind(this));
    },
    getDataC: function(url){  
      console.log('Trying to get: '+url)
      $.get(url, function(result) {
        if (this.isMounted()) {
          this.setState({
            viewDataC: result
          });
          console.log('Ajax Call Made! - Getting Data for View C');
        }
      }.bind(this));
    },
    getDataD: function(url){  
      console.log('Trying to get: '+url)
      $.get(url, function(result) {
        if (this.isMounted()) {
          this.setState({
            viewDataC: result
          });
          console.log('Ajax Call Made! - Getting Data for View D');
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
      console.log('IndexTemplate Mounted');
      this.getDataA(questions[0].dataroute);
      this.getDataB(questions[1].dataroute);
      this.getDataC(questions[2].dataroute);
      this.getDataD(questions[3].dataroute);
    },
    render: function(){
        //Get app viewstate
        var currentView = this.state.viewstate;
        if(currentView===0){
          var bodyView = <AppBodyWelcome parent={this} viewstate={this.state.viewstate} />;
        }else if(currentView===1) {
          var bodyView = <QViewA parent={this} viewstate={this.state.viewstate} viewData={this.state.viewDataA} />;
        }
        else if(currentView===2) {
          var bodyView = <QViewB parent={this} viewstate={this.state.viewstate} viewData={this.state.viewDataB} />;
        }
        else if(currentView===3) {
          var bodyView = <QViewC parent={this} viewstate={this.state.viewstate} viewData={this.state.viewDataC} />;
        }
        else if(currentView===4) {
          var bodyView = <QViewD parent={this} viewstate={this.state.viewstate} viewData={this.state.viewDataD} />;
        } else {
          var bodyView = <div className="error">An Error Has Ocurred</div>;
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
  componentDidMount: function(){

  },
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

var QViewA = React.createClass({
  componentDidMount: function(){

  },
  render: function(){
        var that = this;
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
                    {this.props.viewData.map(function(item, i){
                      return(
                        <div className="champ-item-wrap">
                          <h4 className="rank-num">{i+1}</h4>
                        <div className="champ-item">
                            <div className="champ-avatar">
                               <img src={champAvatar+item.playericon+'.png'} alt="Alt" />
                            </div>
                            <ul className="details row">
                              <li className="col-xs-6">
                                  <label>Player Name</label>
                                  <div className="champdata">{item.playername}</div>
                              </li>
                              <li className="col-xs-6">
                                  <label>Average Win Rate</label>
                                  <div className="champdata">{parseFloat(item.avg).toFixed(2)}</div>
                              </li>
                            </ul>
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

var QViewB = React.createClass({
  componentDidMount: function(){

  },
  render: function(){
        var that = this;
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
                  <div className="wtdwm-well scroll-list-well">
                    <div className="scroll-list">
                    <p>View State: {this.props.viewstate}</p>
                    {this.props.viewData.map(function(item, i){
                      return(
                        <div className="champ-item-wrap">
                          <h4 className="rank-num">{i+1}</h4>
                        <div className="champ-item">
                            <div className="champ-avatar">
                               <img src={champAvatar+item.playericon+'.png'} alt="Alt" />
                            </div>
                            <ul className="details row">
                              <li className="col-xs-4">
                                  <label>Player Name</label>
                                  <div className="champdata">{item.playername}</div>
                              </li>
                              <li className="col-xs-4">
                                  <label>Mastery Point Total</label>
                                  <div className="champdata">{item.sum}</div>
                              </li>
                              <li className="col-xs-4">
                                  <label>Average Win Rate</label>
                                  <div className="champdata">{parseFloat(item.avg).toFixed(2)}</div>
                              </li>
                            </ul>
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

var QViewC = React.createClass({
  componentDidMount: function(){

  },
  render: function(){
        var that = this;
        return ( 
          <section id="inner-view">
            <div className="container-">
              <div className="row">
                <div className="col-xs-12">
                  <div className="wtdwm-well">
                    <p>Content Here</p>
                  </div>
                </div>
                <div className="col-xs-12">
                  <div className="wtdwm-well scroll-list-well">
                    <div className="scroll-list">
                    <p>View State: {this.props.viewstate}</p>
                    {this.props.viewData.map(function(item, i){
                      return(
                        <div className="champ-item-wrap">
                          <h4 className="rank-num">{i+1}</h4>
                        <div className="champ-item">
                            <div className="champ-avatar">
                               <img src={champAvatar+item.playericon+'.png'} alt="Alt" />
                            </div>
                            <ul className="details row">
                              <li className="col-xs-3">
                                  <label>Player Name</label>
                                  <div className="champdata">{item.playername}</div>
                              </li>
                              <li className="col-xs-3">
                                  <label>Champions</label>
                                  <div className="champdata">{item.count}</div>
                              </li>
                              <li className="col-xs-3">
                                  <label>Mastery Point Total</label>
                                  <div className="champdata">{item.sum}</div>
                              </li>
                              <li className="col-xs-3">
                                  <label>Average Win Rate</label>
                                  <div className="champdata">{parseFloat(item.avg).toFixed(2)}</div>
                              </li>
                            </ul>
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

var QViewD = React.createClass({
  componentDidMount: function(){

  },
  render: function(){
        var that = this;
        return ( 
          <section id="inner-view">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 ">
                  <div className="wtdwm-well">
                    <p>Content Here</p>
                  </div>
                </div>
                <div className="col-xs-12">
                  <div className="wtdwm-well scroll-list-well">
                    <div className="scroll-list">
                    <p>View State: {this.props.viewstate}</p>
                    {this.props.viewData.map(function(item, i){
                      return(
                        <div className="champ-item-wrap">
                          <h4 className="rank-num">{i+1}</h4>
                        <div className="champ-item">
                            <div className="champ-avatar">
                               <img src={champAvatar+i+'.png'} alt="Alt" />
                            </div>
                            <ul className="details row">
                              <li className="col-xs-6">
                                  <label>Role</label>
                                  <div className="champdata">{item.championrole}</div>
                              </li>
                              <li className="col-xs-6">
                                  <label>Mastery Point Total</label>
                                  <div className="champdata">{item.sum}</div>
                              </li>
                            </ul>
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

var ChampTable = React.createClass({
  componentDidMount: function(){

  },
  render: function(){
        var that = this;
        return ( 
          <div id="wtdwm-table">
            Champ Table
          </div>
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
