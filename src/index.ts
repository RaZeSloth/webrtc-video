import uusBrauseriÜhendus from './Utils/player';
import signalhub from "signalhub";
import createSwarm from "webrtc-swarm";

navigator.mediaDevices
  .getUserMedia({ video: true, audio: true })
  .then((stream: MediaStream) => {

    const hub = signalhub("webrtc-connection", [ `http://localhost:${process.env.PORT || 8080}` ])
    const swarm = createSwarm(hub, {
      stream: stream,
    })

    const uusKasutaja = new uusBrauseriÜhendus({ x: 0, y: 0, color: "black", left: 0, top: 0 })
    uusKasutaja.addStream(stream)
    const kasutajad = {}
    swarm.on("connect", (peer, id) => {
      if (!kasutajad[ id ]) {
        kasutajad[ id ] = new uusBrauseriÜhendus({
          x: 300,
          y: 0,
          left: 200,
          top: 0,
          color: "red",
        })
        peer.on("data", (data) => {
          data = JSON.parse(data.toString())
          kasutajad[ id ].update(data)
        })
        kasutajad[ id ].addStream(peer.stream)
      }
    })

    swarm.on("disconnect", function (peer, id) {
      if (kasutajad[ id ]) {
        kasutajad[ id ].element.parentNode.removeChild(kasutajad[ id ].element)
        delete kasutajad[ id ]
      }
    })
    setInterval(function () {
      console.log("Interval Call")
      uusKasutaja.update()
      const youString = JSON.stringify(uusKasutaja)
      swarm.peers.forEach((peer) => {
        peer.send(youString)
      })
    }, 100)
    document.addEventListener('keypress', (e) => {
      const kiirus = 16
      switch (e.key) {
        case 'a':
          uusKasutaja.x -= kiirus
          break
        case 'd':
          uusKasutaja.x += kiirus
          break
        case 'w':
          uusKasutaja.y -= kiirus
          break
        case 's':
          uusKasutaja.y += kiirus
          break
      }
    }, false)

})

