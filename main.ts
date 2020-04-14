palette.setColors(color.gradient(
    0x0000ff, 0xff0000, 16)
)
let sprite = sprites.create(image.create(8,8))
setPixels(Buffer.create(64))
let dev = new amg88xx.AMG88XX(pins.i2c());

game.onUpdate(function () {
  info.changeScoreBy(1)  
})

control.runInParallel(function () {
    while(true) {
        const pixels = dev.pixels()
        console.log(JSON.stringify(pixels))
        if (!pixels || !pixels.length)
            return;
        setPixels(pixels);
        pause(100);
    }
})

function setPixels(pixels: Buffer) {
    let i = image.create(8,8);
    for(let x = 0; x < 8; ++x) {
        for(let y = 0; y < 8; ++y) {
            const k = x * 8 + y;
            i.setPixel(x, y, pixels[k]);
        }
    }
    i = i.doubled().doubled().doubled().doubled();
    sprite.setImage(i);
    sprite.left = (screen.width - sprite.width) >> 1;
    sprite.top = 0;
}