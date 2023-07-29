// example.js
import NodeSox from "./index.js"

// Example usage of the NodeSox library

// Create a new instance of NodeSox with custom options
const options = {
  //   device: "Scarlett 2i2 USB", // Example recording device name, keep null to use the system default device
  bits: 16,
  channels: 1,
  rate: 44100,
  type: "wav",
}
const nodeSox = new NodeSox(options)

// Event listeners to handle the events emitted by NodeSox
nodeSox.on("spawn", (soxProcess) => {
  console.log("Process spawned:", soxProcess.pid)
})

nodeSox.on("close", (code) => {
  console.log("Process closed with code:", code)
})

nodeSox.on("exit", (code) => {
  console.log("Process exited with code:", code)
})

nodeSox.on("error", (error) => {
  console.error("Error occurred:", error)
})

nodeSox.on("data", (data) => {
  console.log(data)
})

nodeSox.on("stderr", (data) => {
  console.error("STDERR:", data.toString())
})

// Start the sox process
nodeSox.start()

// You can stop the process when needed using the stop() method
// Uncomment the line below to stop the process after 10 seconds
setTimeout(() => {
  nodeSox.stop()
}, 10000)
