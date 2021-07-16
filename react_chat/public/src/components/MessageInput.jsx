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

  render: function() {
    return (
      <input
        ref="input"
        type="text"
        className="form-control"
        placeholder="Enter smth"
        valueLink={this.linkState("message")}
        onKeyUp={this.keyHandler}
      />
    )
  },
})
