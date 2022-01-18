import Player from './Utils/player';
import signalhub from "signalhub";
import createSwarm from "webrtc-swarm";

/* if(!navigator?.mediaDevices?.getUserMedia) console.log("Halb brauser")
else */
navigator.mediaDevices
  .getUserMedia({ video: true, audio: true })
  .then(function (stream) {

    const hub = signalhub("webrtc-connection", [ `http://localhost:${process.env.PORT || 8080}` ])
    const swarm = createSwarm(hub, {
      stream: stream,
    })

    const you = new Player({ x: 0, y: 0, color: "black", left: 0, top: 0 })
    you.addStream(stream)
    const players = {}
    swarm.on("connect", function (peer, id) {
      if (!players[ id ]) {
        players[ id ] = new Player({
          x: 300,
          y: 0,
          left: 200,
          top: 0,
          color: "red",
        })
        peer.on("data", function (data) {
          data = JSON.parse(data.toString())
          players[ id ].update(data)
        })
        players[ id ].addStream(peer.stream)
      }
    })

    swarm.on("disconnect", function (peer, id) {
      if (players[ id ]) {
        players[ id ].element.parentNode.removeChild(players[ id ].element)
        delete players[ id ]
      }
    })
    setInterval(function () {
      console.log("Interval Call")
      you.update()
      const youString = JSON.stringify(you)
      swarm.peers.forEach(function (peer) {
        peer.send(youString)
      })
    }, 100)
    document.addEventListener('keypress', function (e) {
      const speed = 16
      switch (e.key) {
        case 'a':
          you.x -= speed
          break
        case 'd':
          you.x += speed
          break
        case 'w':
          you.y -= speed
          break
        case 's':
          you.y += speed
          break
      }
    }, false)

})

