const debug = function (config, game) {
    // index toolbar - for DEBUG
    document.querySelector('#toolbar-input').addEventListener('input', function (ev) {
        let target = ev.target
        let data = target.dataset.debug
        let val = ev.target.value

        config[data] = val

        let label = target.closest('label').querySelector('.label')
        label.innerText = val
    })
    document.querySelector('#toolbar_change').addEventListener('change', function (ev) {
        let target = ev.target
        let data = target.dataset.debug
        let val = Boolean(target.checked)
        if (data == 'game_pause' && val == false) {
            game.run()
        }
        config[data] = val
        let label = target.closest('label').querySelector('.label')
        label.innerText = val
    })
}
export { debug }