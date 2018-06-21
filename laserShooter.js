let Laser_start = 0
let Laser: game.LedSprite = null
let Enemy: game.LedSprite = null
let player: game.LedSprite = null
input.onButtonPressed(Button.A, () => {
    player.change(LedSpriteProperty.X, -1)
})
input.onButtonPressed(Button.B, () => {
    player.change(LedSpriteProperty.X, 1)
})
input.onButtonPressed(Button.AB, () => {
    shoot_laser()
})
function Create_enemy() {
    Enemy = game.createSprite(Math.random(5), 0)
}
function shoot_laser() {
    Laser.delete()
    Laser = game.createSprite(player.get(LedSpriteProperty.X), player.get(LedSpriteProperty.Y))
    Laser_start = input.runningTime()
}
input.onGesture(Gesture.Shake, () => {
    Create_enemy()
})
player = game.createSprite(2, 4)
basic.forever(() => {
    if (Laser) {
        pins.digitalWritePin(DigitalPin.P1, 1)
        if (Laser.isTouching(Enemy)) {
            Enemy.delete()
            game.addScore(1)
        }
        if (Laser.get(LedSpriteProperty.Y) == 0) {
            Laser.delete()
        } else {
            Laser.change(LedSpriteProperty.Y, -1)
        }
    }
})
