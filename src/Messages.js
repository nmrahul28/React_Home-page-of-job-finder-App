import React from 'react';

import Message from './Message';

class Messages extends React.Component {
  componentDidUpdate() {
    // There is a new message in the state, scroll to bottom of list
    const objDiv = document.getElementById('messageList');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  render() {
    // Loop through all the messages in the state and create a Message component
    if((this.props.messages).length){
       var messages = this.props.messages.map((message, index) => {
        return (
          <div>
            <Message key={index}
              username={message.name || message.username}
              message={message.text || message.message}
              fromMe={message.name || message.username} />
          </div>
        );
      });

    }

    return (
      <div className='messages' id='messageList'>
        {messages}
      </div>
    );
  }
}

Messages.defaultProps = {
  messages: []
};

export default Messages;
