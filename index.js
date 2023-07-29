import { EventEmitter } from "events"
import { spawn } from "child_process"

const defaultOptions = {
  device: null, // Recording device to use.
  bits: 16, // Sample size. (only for `rec` and `sox`)
  channels: 1, // Channel count.
  encoding: "signed-integer", // Encoding type
  rate: 44100, // Sample rate.
  type: "wav", // File type.
}

// 'sox -d -q -c 1 -r 44100 -t wav -V6 -L -b 16 -e signed-integer -'; Options: AUDIODEV Scarlett 2i2 USB, AUDIODRIVER: (default);

class NodeSox extends EventEmitter {
  constructor(options = {}) {
    super()
    this._childprocess = undefined
    this._options = { ...defaultOptions, ...options }
    this._args = []
    this._env = { ...process.env }

    if (this._options.device !== null) {
      this._env.AUDIODEV = this._options.device
    }

    this._args.push("-d") // default device (to use a specific device, set env AUDIODEV to the value)
    this._args.push("-q") // sox should not show progress
    this._args.push("-c", this._options.channels) // No of channels
    this._args.push("-r", this._options.rate) // sample rate
    this._args.push("-t", this._options.type) // output type
    this._args.push("-e", this._options.encoding) // encoding type
    this._args.push("-b", this._options.bits) // sample size
    this._args.push("-V6") // verbose level
    this._args.push("-") // pipe data to stdout instead of a file

    // TODO: find a common debug library so we can debug the build argument string if we want to
    console.log(this._args.join(" "))
  }

  start() {
    if (this._childprocess !== undefined) {
      this.emit("error", "NodeSox already running")
      return
    }

    const soxCommand = "sox"
    this._childprocess = spawn(soxCommand, this._args, { env: this._env })

    // Emit 'spawn' event right after spawning the process
    this.emit("spawn", this._childprocess)

    this._childprocess.on("close", (code) => {
      // Emit 'close' when the process is closed
      this.emit("close", code)
    })

    this._childprocess.on("exit", (code) => {
      // Emit 'exit' when the process exits
      this.emit("exit", code)
    })

    this._childprocess.on("error", (error) => {
      // Emit 'error' when an error occurs during the spawning or running
      this.emit("error", error)
    })

    this._childprocess.stdout.on("data", (data) => {
      // Emit 'data' when data is received on the stdout of the child process
      this.emit("data", data)
    })

    this._childprocess.stderr.on("data", (data) => {
      // Emit 'stderr' when data is received on the stderr of the child process
      this.emit("stderr", data)
    })
  }

  stop() {
    if (this._childprocess === undefined) {
      this.emit("error", "NodeSox not running")
      return
    }

    this._childprocess.kill("SIGINT")
    this._childprocess = undefined
  }
}

export default NodeSox
