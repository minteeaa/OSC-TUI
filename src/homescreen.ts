import term from 'terminal-kit'
import { exit } from './util/util.js'
import { HeartratePage } from './heartrate.js'
import Conf from 'conf'

let tm = term.terminal
let config = new Conf({ projectName: 'osc-g' })


export class HomescreenPage {
    doc: any
    moduleList: any[]
    heartrate: any
    hrdisplay: any

    constructor(doc: any) {
        this.doc = doc
        this.moduleList = []
        this.heartrate = this.heartrate
        // @ts-ignore
        this.hrdisplay = new term.TextBox({
            parent: this.doc,
            x: 16, y: 10, width: 50, pageMaxHeight: 3,
            contentHasMarkup: true,
        })
    }

    build() {
        this.moduleList = []

        this.heartrate = config.get('hyperate.enabled', false)

        if (this.heartrate) this.moduleList.push({ markup: true, content: '^Gheartrate', value: 1 })
        else this.moduleList.push({ markup: true, content: '^Rheartrate', value: 1 })
        this.moduleList.push({ markup: false, content: 'quit', value: 2 })
    }

    display() {
        this.build()
        // @ts-ignore
        let title = new term.TextBox({
            parent: this.doc,
            x: 0, y: 8, width: 50, pageMaxHeight: 3,
            contentHasMarkup: true,
            content: '^K[ ^;module list ^K]'
        })
        // @ts-ignore
        let menu = new term.ColumnMenu({
            parent: this.doc,
            x: 5, y: 10, width: 50, pageMaxHeight: 5,
            blurLeftPadding: '^;  ',
            focusLeftPadding: '^;> ',
            disabledLeftPadding: '^;  ',
            paddingHasMarkup: true,
            multiLineItems: true,
            buttonFocusAttr: {
                bgColor: 'inverse', 
                color: 'white',
                bold: true
            },
            buttonKeyBindings: { ENTER: 'submit' },
            items: this.moduleList
        })
        menu.focusValue(1)
        const onSubmit = (buttonValue: any, action: any): any => {
            if (buttonValue == 1) {
                menu.destroy()
                title.destroy()
                let hr = new HeartratePage(this, this.doc)
                hr.display()
            } else if (buttonValue == 2) exit()
        }
        menu.on('submit', onSubmit)
    }

    updateHeartrate(rate: string | undefined) {
        this.hrdisplay.destroy()
        // @ts-ignore
        this.hrdisplay = new term.TextBox({
            parent: this.doc,
            x: 16, y: 10, width: 50, pageMaxHeight: 3,
            contentHasMarkup: true,
            content: rate
        })
    }
}