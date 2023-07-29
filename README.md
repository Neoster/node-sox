# Node-Sox

Node-Sox is a Node.js library that provides a wrapper around the terminal command 'sox', allowing you to interact with the 'sox' command-line tool programmatically. 'sox' is a powerful tool for audio processing and transformation, and with Node-Sox, you can easily utilize its capabilities in your Node.js applications.

## Features

- Spawn and control 'sox' processes from Node.js.
- Set various options such as recording device, sample size, channels, sample rate, file type, and more.
- **Capture audio data** and have it available inside the application instead of it being output to a file. (Note: This is a custom feature of Node-Sox.)

## Installation

To install Node-Sox, use npm:

```bash
npm install node-sox
```

## Getting Started

```javascript
// Import the Node-Sox library
import NodeSox from "node-sox";

// Create a new NodeSox instance with options
const nodeSox = new NodeSox({
  device: "Scarlett 2i2 USB", // Recording device to use.
  bits: 16, // Sample size.
  channels: 1, // Channel count.
  encoding: "signed-integer", // Encoding type.
  rate: 44100, // Sample rate.
  type: "wav", // File type.
});

// Start the 'sox' process
nodeSox.start();

// Listen for events
nodeSox.on("data", (data) => {
  console.log("Received data:", data);
});

nodeSox.on("error", (error) => {
  console.error("Error:", error);
});

nodeSox.on("exit", (code) => {
  console.log("Process exited with code:", code);
});

nodeSox.on("close", (code) => {
  console.log("Process closed with code:", code);
});

// Stop the 'sox' process after some time
setTimeout(() => {
  nodeSox.stop();
}, 5000); // Stop after 5 seconds
```

## Documentation

For detailed documentation and API reference, please see [here](https://link-to-your-documentation).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please check the [Contribution Guidelines](CONTRIBUTING.md) for more details.

## Acknowledgments

Special thanks to the creators of 'sox', an amazing audio processing tool.