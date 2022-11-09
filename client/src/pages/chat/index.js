import styles from "./styles.module.css";
import Message from "./messages";
import SendMessage from "./sendMessage";
import RoomAndUsers from "./room-users";

const Chat = ({ socket, userName, room }) => {
    return (
        <div className={styles.chatContainer}>
            <RoomAndUsers socket={socket} userName={userName} room={room} />
            <div>
                <Message socket={socket} />
                <SendMessage socket={socket} userName={userName} room={room} />
            </div>
        </div>
    );
};
export default Chat;
