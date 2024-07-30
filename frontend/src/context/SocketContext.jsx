import { useEffect, useState, createContext, useContext } from "react";
import {useAuthContext} from './AuthContext';
import io from "socket.io-client";

export const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({children}) => {
    const [socket,setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const {authUser} = useAuthContext();

    useEffect(() => {
        if(authUser) {
            const socket = io("https://sarim-chat-app.onrender.com", {
                query:{
                    userId: authUser._id
                }
            });

            setSocket(socket);

            // Socket.on() is used to listen to events. Can be used for both on client and server side rendering.
            socket.on("getOnlineUsers", (users) => {
            setOnlineUsers(users);
            });

            return () => socket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    },[authUser]);

    return <SocketContext.Provider value={{socket, onlineUsers}}>{children}</SocketContext.Provider>;
};
