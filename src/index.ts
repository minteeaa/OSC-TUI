import { HomescreenPage } from './homescreen.js'
import term from 'terminal-kit'
import { startHyperateMon } from './monitors/hyperateMon.js'
import { displayTitle } from './util/util.js'

let tm = term.terminal

async function start() {
    // @ts-ignore
    let global = tm.createDocument({ palette: new term.Palette() })
    let home = new HomescreenPage(global)
    displayTitle()
    tm.nextLine(1)
    tm('[ starting monitor processes ]')
    await startHyperateMon(home)
    tm.clear()
    displayTitle()
    home.display()
}

start()

tm.on('key', function(key: any) {
	switch(key) {
		case 'CTRL_C':
			tm.grabInput(false)
			tm.hideCursor(false)
			tm.styleReset()
			tm.clear()
			process.exit()
    }
})