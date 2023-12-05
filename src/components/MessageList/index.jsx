import React from 'react';
import { useMessages } from '../../hooks/useMessages';
import './styles.css';
import { getUSer } from '../../utils';

function MessageList({ roomId }) {
    const containerRef = React.useRef(null);
    const user  = getUSer();
    console.log("userrrrr", user);
    const messages = useMessages(roomId);
    console.log("message", messages);

    React.useLayoutEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    });

    return (
      // <h1>Hello</h1>
        <div className="message-list-container" ref={containerRef}>
            <ul className="message-list">
                {messages.map((x) => (
                    <Message
                        key={x.id}
                        message={x}
                        isOwnMessage={x.uid === user.uid}
                        photoURL={user}
                    />
                ))}
            </ul>
        </div>
    );
}

function Message({ message, isOwnMessage, photoURL }) {
  const { displayName, text } = message;

  return (
    <li className={["message", isOwnMessage && "own-message"].join(" ")}>
      <div style={{display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px"}}>
        <h4 className="sender">{isOwnMessage ? "You" : displayName}</h4>
        <img style={{height: "30px", width: "30px", borderRadius: "9999px"}} src={photoURL.photoURL} alt="" />
      </div>
      <div style={{textAlign: "start"}}>{text}</div>
    </li>
  );
}

export { MessageList };
