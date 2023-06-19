import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Lobby } from './components/Lobby';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { useState } from 'react';

const App = () => {
    const [connection, setConnection] = useState(null);

    const joinRoom = async (user, room) => {
        try {
            const newConnection = new HubConnectionBuilder()
                .withUrl('/Chat')
                .withAutomaticReconnect()
                .build();

            newConnection.on('ReceiveMessage', (user, message) => {
                console.log("Message received: ", message);
            });

            await newConnection.start();
            await newConnection.invoke('JoinRoom', { user, room });

            setConnection(newConnection);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="app">
            <h2>Mychat</h2>
            <hr className='line' />
            <Lobby joinRoom={joinRoom} />
        </div>
    );
};

export default App;
