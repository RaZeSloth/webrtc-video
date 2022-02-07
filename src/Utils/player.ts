
function uusBrauseriÜhendus(data) {
  data = data || {}
  this.color = data.color || värviGen()
  this.x = data.x
  this.y = data.y
  this.top = data.top
  this.left = data.left
  this.name = data.name
  this.element = document.createElement("video")
  this.element.volume = 0;
  Object.assign(this.element.style, {
    width: "40%",
    height: "50%",
    position: "absolute",
    top: data.top + "px",
    left: data.left + "px",
    backgroundColor: this.color,
  })
  document.body.appendChild(this.element)
}
uusBrauseriÜhendus.prototype.addStream = function(stream) {
  this.element.srcObject = stream
  this.element.play()
}
uusBrauseriÜhendus.prototype.update = function(data) {
  data = data || {}
  this.x = data.x || this.x
  this.y = data.y || this.y
  Object.assign(this.element.style, {
    top: this.y + "px",
    left: this.x + "px",
  })
}
function värviGen() {
    const tähed = '0123456789ABCDEF';
    let värv = '#';
    for (let i = 0; i < 6; i++) {
      värv += tähed[Math.floor(Math.random() * 16)];
    }
    return värv;
}


export default uusBrauseriÜhendus 