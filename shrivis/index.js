window.onload = () => {
    Game = new Game()
    Board = new Board()
    Tile = new Tile()
    machanics = new machanics()
    Game.start()
    document.onkeydown = (e) => {
        machanics.keyInput(e.keyCode)
        const createTile = Tile.get()
        Tile.set(createTile.x,createTile.y)
        Game.draw()
    }
}
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);