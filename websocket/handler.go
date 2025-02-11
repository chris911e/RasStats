package main

import (
	"fmt"
	"net/http"
	"sync"
	"time"

	"github.com/gorilla/websocket"
	"rasstats/websocket/sys"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

func Handler(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println("Upgrade error:", err)
		return
	}
	defer conn.Close()

	done := make(chan struct{})
	var once sync.Once

	fmt.Println("Client connected:", r.RemoteAddr)

	conn.SetPongHandler(func(appData string) error {
		fmt.Println("Pong received")
		conn.SetReadDeadline(time.Now().Add(2 * time.Second))
		return nil
	})

	go func() {
		select {
		case <-done:
			return
		default:
			for {
				_, _, err := conn.ReadMessage()
				if err != nil {
					fmt.Println("Client disconnected:", err)
					once.Do(func() { close(done) })
					return
				}
			}
		}
	}()

	go func() {
		select {
		case <-done:
			return
		default:
			for {
				time.Sleep(1 * time.Second)
				err := conn.WriteMessage(websocket.PingMessage, nil)
				if err != nil {
					once.Do(func() { close(done) })
					return
				}
			}
		}
	}()

	for {
		select {
		case <-done:
			fmt.Println("Client disconnected:", r.RemoteAddr)
			return
		default:
			rpInfo, err := sys.FetchSystemStats()
			if err != nil {
				fmt.Println("Fetch error:", err)
				return
			}

			err = conn.WriteJSON(rpInfo)
			if err != nil {
				fmt.Println("Write error:", err)
				return
			}

			time.Sleep(1 * time.Second)
		}
	}
}
