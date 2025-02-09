package main

import(
	"net/http"
	"fmt"
	"github.com/gorilla/websocket"
	"time"

	"rasstats/websocket/sys"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:		1024,
	WriteBufferSize:	1024,
	CheckOrigin: func(r *http.Request) bool {
		fmt.Println("Attempted Connection:", r.RemoteAddr)
		return true
	},
}

func Handler(w http.ResponseWriter, r *http.Request) {

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println(err)

	}
	defer conn.Close()

	for {
		rpInfo, err := sys.FetchSystemStats()
		if err != nil {
			break
		}

		err = conn.WriteJSON(rpInfo)
		if err != nil {
			fmt.Println("Write error:", err)
			break
		}

		err = conn.WriteMessage(websocket.PingMessage, nil)
		if err != nil {
			fmt.Println("Ping Failed:", err)
			break
		}

		time.Sleep(1 * time.Second)
	}
}
