console.log('React App Connected! - LOL API CHALLENGE');
// React Transition Group
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

/////////////////////////////////////////////////////////
// 0.0 Index Layout - Top Level Component
/////////////////////////////////////////////////////////
var IndexLayout = React.createClass({
    getInitialState: function(){
      return { 
        championlist: [],
        loading: true
      };
    },
    getData: function(url, resetID){  
      $.get(url, function(result) {
        if (this.isMounted()) {
          this.setState({
            championlist: result,
            loading: false
          });
          console.log('Ajax Call Made!');
        }
      }.bind(this));
    },
    componentDidMount: function() {
      console.log('IndexTemplate Mounted');
      this.getData('/champions/championlist');
    },
    render: function(){
      if(this.state.loading){
        // Display Loading Message
        return (
          <p className='loading-indicator'>Loading All Data...</p>
        );
      } else {
        // Load all Champion Data
        return (
          <div className='row' id='index-layout-inner'>
              {this.state.championlist.map(function(item, i){
                return(
                  <div key={item.tablekey} className='col-xs-12 col-sm-6 col-md-4'>
                      <div className='well'>
                        <p><b>Result #:</b> {i}</p>
                        <p><b>Table Key:</b> {item.tablekey}</p>
                        <p><b>Player Id:</b> {item.playerid}</p>
                        <p><b>Player Rank:</b> {item.playerrank}</p>
                        <p><b>Champion ID:</b> {item.championid}</p>
                        <p><b>Champion Points:</b> {item.championpoints}</p>
                        <p><b>Champion Level:</b> {item.championlevel}</p>
                      </div>
                  </div>
                );        
              })}
          </div>
        );
      } // End Loading all Champion Data
    }
});
//////////////////////////////////////////
// 0.0 Render the App
/////////////////////////////////////////////////////////
ReactDOM.render(
  <IndexLayout />,
  document.getElementById('index-layout')
);