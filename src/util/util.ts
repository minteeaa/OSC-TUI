import figlet from "figlet"
import term from 'terminal-kit'
let tm = term.terminal

export function displayTitle() {
    tm.cyan(figlet.textSync('OSC-TUI', { font: 'Lean' }))
}

export function exit() {
    tm.clear()
    tm('thank you for using OSC-TUI (:')
    process.exit()
}