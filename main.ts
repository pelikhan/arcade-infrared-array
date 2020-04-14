palette.setColors(color.gradient(
    0x0000ff, 0xff0000, 16)
)
let heat = image.create(80,80);
let sprite = sprites.create(heat)
let maxsprite = sprites.create(img`
    1 1 1 1 1 1 1 1 1 1
    1 . . . . . . . . 1
    1 . . . . . . . . 1
    1 . . . . . . . . 1
    1 . . . . . . . . 1
    1 . . . . . . . . 1
    1 . . . . . . . . 1
    1 . . . . . . . . 1
    1 . . . . . . . . 1
    1 1 1 1 1 1 1 1 1 1
`)
let dev = new amg88xx.AMG88XX(pins.i2c());

game.onUpdate(function () {
  info.changeScoreBy(1)  
})

control.runInParallel(function () {
    while(true) {
        const pixels = dev.pixels()
        if (!pixels || !pixels.length)
            return;
        setPixels(pixels);
        pause(100);
    }
})

function setPixels(pixels: number[]) {
    // find min max
    let mint = Infinity;
    let maxt = -Infinity;
    for(const v of pixels) {
        mint = Math.min(v, mint);
        maxt = Math. max(v, maxt);
    }

    for(let x = 0; x < 8; ++x) {
        for(let y = 0; y < 8; ++y) {
            const k = x * 8 + y;
            const t = pixels[k];
            heat.fillRect(x * 10, y * 10, 10, 10, Math.map(t, mint, maxt, 0, 15) | 0);
            if (t == maxt) {
                maxsprite.say(`${t}c`)
                maxsprite.left = sprite.left + x * 10;
                maxsprite.top = sprite.top + y * 10;
            }
        }
    }
}