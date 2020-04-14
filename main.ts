palette.setColors(color.gradient(
    0x0000ff, 0xff0000, 16)
)
let sprite = sprites.create(image.create(8,8))
let maxsprite = sprites.create(img`
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
    1 . . . . . . . . . . . . . . 1
    1 . . . . . . . . . . . . . . 1
    1 . . . . . . . . . . . . . . 1
    1 . . . . . . . . . . . . . . 1
    1 . . . . . . . . . . . . . . 1
    1 . . . . . . . . . . . . . . 1
    1 . . . . . . . . . . . . . . 1
    1 . . . . . . . . . . . . . . 1
    1 . . . . . . . . . . . . . . 1
    1 . . . . . . . . . . . . . . 1
    1 . . . . . . . . . . . . . . 1
    1 . . . . . . . . . . . . . . 1
    1 . . . . . . . . . . . . . . 1
    1 . . . . . . . . . . . . . . 1
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
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

    let i = image.create(8,8);
    for(let x = 0; x < 8; ++x) {
        for(let y = 0; y < 8; ++y) {
            const k = x * 8 + y;
            const t = pixels[k];
            i.setPixel(x, y, Math.map(t, mint, maxt, 0, 15) | 0);
            if (t == maxt) {
                maxsprite.say(`${t}c`)
                maxsprite.left = sprite.left + x * 16;
                maxsprite.top = sprite.top + y * 16;
            }
        }
    }
    i = i.doubled().doubled().doubled().doubled();
    sprite.setImage(i);
    sprite.right = screen.width;
    sprite.top = 0;
}