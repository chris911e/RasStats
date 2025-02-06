package main

import(
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/rpsys", Handler)

	fmt.Println("Websocket started on Port 5000")
	err := http.ListenAndServe(":5000", nil)
	if err != nil {
		fmt.Println("Error starting Websocket on Port 5000:", err)
	}
}