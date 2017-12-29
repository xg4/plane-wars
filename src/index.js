import Game from './game'
import { config } from './config'
import { debug } from './debug'

if (window.navigator.platform.indexOf('Win32') != -1) {
    config.height = Math.min(document.documentElement.clientHeight, config.height)
} else {
    config.width = Math.min(document.body.offsetWidth, config.width)
    config.height = Math.min(document.documentElement.clientHeight, config.height)
    document.querySelector('#toolbar').style.display = "none"
}

new Game()

if (config.enableDebug)
    debug(config, game)
