import styles from "./styles.module.css";
import { useState } from "react";

const SendMessage = ({ userName, room, socket }) => {
    const [message, setMessage] = useState("");

    const sendMessage = () => {
        if (message !== "") {
            const __createdTime__ = Date.now();
            socket.emit("send_message", {
                userName,
                room,
                message,
                __createdTime__,
            });
            setMessage("");
        }
    };

    return (
        <div className={styles.sendMessageContainer}>
            <input
                className={styles.messageInput}
                placeholder='Type Something...'
                onChange={(e) => setMessage(e.target.value)}
                value={message}
            />
            <button className='btn btn-primary' onClick={sendMessage}>
                Send Message
            </button>
        </div>
    );
};

export default SendMessage;
