/** @jsx React.DOM */

var MessageInput = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function() {
    return {
      message: ''
    }
  },

  componentDidMount(){
    this.refs.input.getDOMNode().focus();
  },

  keyHandler: function(event) {
    const message = this.state.message.trim();

    if (event.keyCode === 13 && message.length) {
      this.props.messageHandler(message);
      this.setState({
        message: '',
      });
    }
  },

  clickHandler: function() {
    const message = this.state.message.trim();

    if (message.length) {
      this.props.messageHandler(message);
      this.setState({
        message: '',
      });
    }
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-md-10">
          <input
            ref="input"
            type="text"
            className="form-control"
            placeholder="Enter smth"
            valueLink={this.linkState("message")}
            onKeyUp={this.keyHandler}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary btn-block" onClick={this.clickHandler}>Send</button>
        </div>
      </div>
    )
  },
})
