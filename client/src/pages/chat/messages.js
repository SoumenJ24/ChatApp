import styles from "./styles.module.css";
import { useState, useEffect, useRef } from "react";

const Messages = ({ socket }) => {
    const [messagesReceived, setMessagesReceived] = useState([]);
    const messagesColumnRef = useRef(null);

    useEffect(() => {
        socket.on("receive_message", (data) => {
            // console.log(data);
            setMessagesReceived((state) => [
                ...state,
                {
                    message: data.message,
                    userName: data.userName,
                    createdTime: data.__createdTime__,
                },
            ]);
        });

        // Remove event listener on component unmount
        return () => {
            socket.off("receive_message"); //cleanup function for useEffect
        };
    }, [socket]);

    useEffect(() => {
        socket.on("last_100_messages", (data) => {
            data = JSON.parse(data);
            data = sortMessagesByDate(data);
            setMessagesReceived((state) => [...data, ...state]);
        });
        return () => socket.off("last_100_messages");
    }, [socket]);

    useEffect(() => {
        messagesColumnRef.current.scrollTop =
            messagesColumnRef.current.scrollHeight;
    }, [messagesReceived]);

    function sortMessagesByDate(messages) {
        // console.log(messages);
        return messages.sort(
            (a, b) => parseInt(a.createdTime) - parseInt(b.createdTime)
        );
    }
    // dd/mm/yyyy, hh:mm:ss
    function formatDateFromTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    return (
        <div className={styles.messagesColumn} ref={messagesColumnRef}>
            {messagesReceived.map((msg, i) => (
                <div className={styles.message} key={i}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}>
                        <span className={styles.msgMeta}>{msg.userName}</span>
                        <span className={styles.msgMeta}>
                            {formatDateFromTimestamp(msg.createdTime)}
                        </span>
                    </div>
                    <p className={styles.msgText}>{msg.message}</p>
                    <br />
                </div>
            ))}
        </div>
    );
};
export default Messages;
