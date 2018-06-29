let Laser_start = 0
let time_until_next_enemy = 0
let laser: game.LedSprite = null
let Enemy: game.LedSprite = null
let player: game.LedSprite = null
let enemy_move_timer = 0
let enemy_move_time = 0
let enemy_spawn_timer = 0
function Create_enemy()  {
    enemy_spawn_timer = input.runningTime()
    Enemy = game.createSprite(Math.random(5), 0)
    time_until_next_enemy = (Math.random(3) + 1) * 1000
}
input.onButtonPressed(Button.A, () => {
    player.change(LedSpriteProperty.X, -1)
})
input.onButtonPressed(Button.B, () => {
    player.change(LedSpriteProperty.X, 1)
})
input.onButtonPressed(Button.AB, () => {
    shoot_laser()
})
function shoot_laser()  {
    laser.delete()
    laser = game.createSprite(player.get(LedSpriteProperty.X), player.get(LedSpriteProperty.Y))
    Laser_start = 0
}
function move_enemies()  {
    enemy_move_timer = input.runningTime()
    Enemy.change(LedSpriteProperty.Y, 1)
}
enemy_move_time = 500
enemy_move_timer = input.runningTime()
player = game.createSprite(player.get(LedSpriteProperty.X), player.get(LedSpriteProperty.Y))
enemy_spawn_timer = input.runningTime()
time_until_next_enemy = (Math.random(3) + 1) * 1000
basic.forever(() => {
    if (input.runningTime() - enemy_move_timer >= enemy_move_time) {
        move_enemies()
    }
    if (input.runningTime() - enemy_spawn_timer >= time_until_next_enemy) {
        Create_enemy()
    }
    if (laser) {
        pins.digitalWritePin(DigitalPin.P1, 1)
        if (laser.isTouching(Enemy)) {
            Enemy.delete()
            game.addScore(1)
        }
        if (laser.get(LedSpriteProperty.Y) == 0) {
            laser.delete()
        } else {
            laser.change(LedSpriteProperty.Y, -1)
        }
    }
})
