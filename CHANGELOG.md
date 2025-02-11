# 📓 Changelog

Versioning follows following syntax:

| Type | Syntax |
| ------- | ----------- |
 🚀 Major release | **v1.0.0**  |
 🎯 Minor release | **v0.1.0**  |
 ⚙️ Patch release | **v0.0.1**  |

---
## 🎯 v0.2.0 - RS Client + Server Connection Handling
- Added Main Page of RS Client
  - Currently supported stats integrated
  - React Router v6 Integration
  - Websocket Context for websocket connection handling
  - New Icon for RasStats
  - Header
- Refactored Server connection handling
  - Pong Handler for Receiving
  - Ping Handler for Sending
  - Reading messages with timeout
  - Channel management synced for closing

**📅 11.02.2025**

## ⚙️ v0.1.3 - Memory & Sensor
- Added Memory data to return
- Added Sensor data to return

**📅 11.02.2025**

## ⚙️ v0.1.2 - Websockets Refactor
- Renamed rastats-ui to rs-client
- Refactored websocket codebase
  - gopsutil pkg migration
  - common origin for structs to prevent import cycle
  - future-proof folder structure
- Added CPU/Disk/General(Host) data to return

**📅 10.02.2025**

## ⚙️ v0.1.1 - Websockets
- Migrated onto Golang
- Setup conn + tested with wscat
- Basic SysInfo with sys/unix

**📅 06.02.2025**

## 🎯 v0.1.0 - Project Setup
- Base UI Project (React + Vite + Typescript)
- Base Python Project
- Base Structure

**📅 02.02.2025**

