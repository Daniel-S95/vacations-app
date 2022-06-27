import { createContext, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext<any>(null);
export const ConnectContext = createContext<any>(null);


const SocketContainer = ({ children }: any) => {
    let [socket, setSocket] = useState<any>(null);

    let connect: Function = (token: string) => {
        let newSocket = io("http://localhost:3002", {
            query: { token },
        });

        setSocket(newSocket);
    }

    return (
        <SocketContext.Provider value={socket}>
            <ConnectContext.Provider value={connect}>
                {children}
            </ConnectContext.Provider>
        </SocketContext.Provider>
    )

}

export default SocketContainer;