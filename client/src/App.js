import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Chat from "./pages/chat";
import { useState } from "react";
import { io } from "socket.io-client";

// this should be the port number in which the server runs
const socket = io("http://localhost:4000");

function App() {
    const [userName, setUserName] = useState("");
    const [room, setRoom] = useState("");

    return (
        <Router>
            <div className='App'>
                <Routes>
                    <Route
                        path='/'
                        element={
                            <Home
                                userName={userName}
                                setUserName={setUserName}
                                room={room}
                                setRoom={setRoom}
                                socket={socket}
                            />
                        }
                    />
                    <Route
                        path='/chat'
                        element={
                            <Chat
                                userName={userName}
                                room={room}
                                socket={socket}
                            />
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
