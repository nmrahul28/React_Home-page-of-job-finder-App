require('./ChatApp.css');
import React from 'react';
import io from 'socket.io-client';
import Messages from './Messages';
import ChatInput from './ChatInput';
import axios from 'axios';
var new_data_obj;
class ChatApp extends React.Component {
  socket = {};
  constructor(props) {
    super(props);
    this.state = { messages: [] };

    // Connect to the server
     new_data_obj=JSON.parse(this.props.match.params.msg);
    console.log(new_data_obj['user_name']);
    if(new_data_obj['user_name']===JSON.parse(localStorage.getItem('Currentuser')))
    {
      this.socket = io('http://localhost:8081', { query: { 'username': new_data_obj['user_name'], 'userID': new_data_obj['user_id'] } }).connect();
    }
    else{
      this.socket = io('http://localhost:8081', { query: { 'username': new_data_obj['company_name'], 'userID': new_data_obj['job_id']} }).connect();
    }
    console.log(this.socket);
    // Listen for messages from the server
    this.socket.on('server:message', (message) => {
      this.addMessage(message);
    });
  }
  componentDidMount(){
    if(new_data_obj['user_name']===JSON.parse(localStorage.getItem('Currentuser'))){
      console.log(new_data_obj.user_id, new_data_obj.job_id);
      axios.get(`http://localhost:8081/message/${new_data_obj.user_id}`+`/`+`${new_data_obj.job_id}`)
      .then((respo)=>{
        console.log(respo.data);
        this.setState({
          messages:respo.data
        })
      }).catch((err)=>{
        console.log(err);
      })
    }
    else if(new_data_obj['company_name']===JSON.parse(localStorage.getItem('Currentuser'))){
      console.log(new_data_obj.user_id, new_data_obj.job_id);
      axios.get(`http://localhost:8081/message/${new_data_obj.job_id}`+`/`+`${new_data_obj.user_id}`)
      .then((respo)=>{
        console.log(respo.data);
        this.setState({
          messages:respo.data
        })
      }).catch((err)=>{
        console.log(err);
      })
    }
    else{
      this.setState({
        messages:[]
      })
    }
  }

  sendHandler = (message) => {
    var messageObject={};
    console.log(new_data_obj.user_name);
    if(new_data_obj['user_name']===JSON.parse(localStorage.getItem('Currentuser'))){
      messageObject = {
        username: new_data_obj['user_name'],
        sendTo: new_data_obj['company_name'],
        sendToID: new_data_obj['job_id'],
        message
      };
    }
    else{
      messageObject = {
        username: new_data_obj['company_name'],
        sendTo: new_data_obj['user_name'],
        sendToID: new_data_obj['user_id'],
        message
      };

    }


    // Emit the message to the server
    this.socket.emit('client:message', messageObject);
    messageObject.fromMe = true;
    this.addMessage(messageObject);
  }

  addMessage(message) {
    // Append the message to the component state
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
  }

  render() {
    return (
      <div className="container">
        <h3>React Chat App</h3>
        <Messages messages={this.state.messages} />
        <ChatInput onSend={this.sendHandler} />
      </div>
    );
  }

}
ChatApp.defaultProps = {
  username: 'Anonymous'
};

export default ChatApp;
