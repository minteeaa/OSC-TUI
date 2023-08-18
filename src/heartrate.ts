import term from 'terminal-kit'

import { HyperatePage } from './providers/hyperate.js'
import { HomescreenPage } from './homescreen.js'

export class HeartratePage {
    service: number
    backPage: HomescreenPage
    doc: any

    constructor(backPage: HomescreenPage, doc: any) {
        this.service = 0
        this.backPage = backPage
        this.doc = doc
    }

    display() {
        let services = [
            { markup: true, content: 'hyperate', value: 1 },
            { markup: true, content: 'pulsoid [ coming soon ]', disabled: true, value: 2 },
            { markup: true, content: 'back', value: 3 }
        ]
        // @ts-ignore till the types are properly implemented
        let title = new term.TextBox({
            parent: this.doc,
            x: 0, y: 8, width: 50, pageMaxHeight: 3,
            contentHasMarkup: true,
            content: '^K[ ^;heartrate services ^K]'
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
            items: services
        })
        menu.focusValue(1)
        // @ts-ignore 
        const onSubmit = (buttonValue: any, action: any): any => {
            if (buttonValue == 1) {
                let back = new HyperatePage(this, this.doc)
                menu.destroy()
                title.destroy()
                back.display()
            } else if (buttonValue == 3) {
                menu.destroy()
                title.destroy()
                this.backPage.build()
                this.backPage.display()
            }
        }
        menu.on('submit', onSubmit)
    }
}