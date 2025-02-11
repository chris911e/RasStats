import React, { createContext, useContext, useEffect, useRef, useState } from "react";

const WebSocketContext = createContext<WebSocket | null>(null);

interface Props {
    url: string;
    children: React.ReactNode;
}

export default function WebSocketProvider({url, children} : Props) {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const connect = () => {

            if(wsRef.current) {
                return
            }

            const socket = new WebSocket(url)
            wsRef.current = socket

            socket.onopen = () => {
                console.log("Connected to WebSocket")
                setWs(socket);
            }

            socket.onclose = () => {
                console.log("Disconnected from WebSocket")
                wsRef.current = null;
                setWs(null)
            }

            socket.onerror = (e) => {
                console.error("WebSocket error:", e)
                socket.close()
            }
        }

        connect()

        return () => {
            wsRef.current?.close()
        }
    }, [url])

    return <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
}

export const useWebSocket = () => {
    return useContext(WebSocketContext)
}