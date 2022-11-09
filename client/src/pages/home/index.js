import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const Home = ({ userName, setUserName, room, setRoom, socket }) => {
    const navigate = useNavigate();
    const joinRoom = () => {
        if (room !== "" && userName !== "") {
            socket.emit("join_room", { userName, room });
        }
        //console.log("Username is :", userName);
        navigate("/chat", { replace: true });
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h1> {`My Chat Room`} </h1>
                <input
                    className={styles.input}
                    placeholder='Username...'
                    onChange={(e) => setUserName(e.target.value)}
                />

                <select
                    className={styles.input}
                    onChange={(e) => setRoom(e.target.value)}>
                    <option>-- Select Room --</option>
                    <option value='javascript'>JavaScript</option>
                    <option value='node'>Node</option>
                    <option value='express'>Express</option>
                    <option value='react'>React</option>
                </select>

                <button
                    className='btn btn-secondary'
                    style={{ width: "100%" }}
                    onClick={joinRoom}>
                    JOIN ROOM
                </button>
            </div>
        </div>
    );
};
export default Home;
