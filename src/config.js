const config = {
    game_version: '1.0.5',            // 版本信息
    //debug
    enableDebug: true,          // 是否启动DEBUG
    game_pause: false,          // 游戏是否暂停

    el: '#game',                // canvas name
    width: 500,                 // canvas width
    height: 700,                // canvas height
    fps: 60,                    // fps 设置
    // player
    player_speed: 5,            // 玩家 移动速度
    player_God: false,          // 玩家 是否无敌
    player_auto: true,          // 玩家 是否自动射击
    bullet_speed: 12,            // 玩家 子弹速度
    fire_cooldown: 4,          // 玩家 开火冷却
    // other
    cloud_speed: 1,             // 云朵 速度
    // enemy
    enemy_speed: 2,             // 敌人 移动速度
    enemy_bullet_speed: 5,      // 敌人 子弹速度
    enemy_fire_cooldown: 150,   // 敌人 子弹冷却
    enemies_max_number: 15,          // 每波敌人最大数量

}

export { config }