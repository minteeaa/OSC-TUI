import { HeartratePage } from "../heartrate.js";
import term from 'terminal-kit'
import Conf from 'conf'

let config = new Conf({ projectName: 'osc-g' })
let tm = term.terminal

export class HyperatePage {
    id: any
    backPage: HeartratePage
    optionList: any[]
    enabled: any
    doc: any
    menu: any
    title: any

    constructor(backPage: HeartratePage, doc: any) {
        this.id = this.id
        this.backPage = backPage
        this.optionList = []
        this.enabled = this.enabled
        this.doc = doc
        this.menu = this.menu
        this.title = this.title
    }

    build() {
        this.optionList = []

        this.enabled = config.get('hyperate.enabled', false)
        this.id = config.get('hyperate.id', 'undefined')

        if (this.enabled == true) this.optionList.push({ markup: true, content: '^Genabled', value: 1 })
        else this.optionList.push({ markup: true, content: '^Renabled', value: 1 })
        this.optionList.push({ markup: true, content: `id ^C${this.id}`, value: 2})
        this.optionList.push({ markup: false, content: 'back', value: 3 })
    }

    display() {
        this.build()
        // @ts-ignore
        this.title = new term.TextBox({
            parent: this.doc,
            x: 0, y: 8, width: 50, pageMaxHeight: 3,
            contentHasMarkup: true,
            content: '^K[ ^;hyperate options ^K]'
        })
        // @ts-ignore
        this.menu = new term.ColumnMenu({
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
            items: this.optionList
        })
        this.menu.focusValue(1)
        // @ts-ignore 
        const onSubmit = (buttonValue: any, action: any): any => {
            if (buttonValue == 1) {
                this.changeEnableState()
                this.menu.destroy()
                this.title.destroy()
                this.display()
            } else if (buttonValue == 2) {
                this.editID()
            } else if (buttonValue == 3) {
                this.menu.destroy()
                this.title.destroy()
                this.backPage.display()
            }
        }
        this.menu.on('submit', onSubmit)
    }

    async editID() {
        // @ts-ignore
        let input = new term.InlineInput({
            parent: this.doc,
            x: 5, y: 14, width: 20, pageMaxHeight: 5,
            placeholder: '[ your hyperate id ]',
            cancelable: true,
            buttonKeyBindings: { ENTER: 'submit', ESCAPE: 'cancel' },
        })
        this.doc.giveFocusTo(input)
        const onSubmit = (value: any) => {
            config.set('hyperate.id', value)
            input.destroy()
            this.menu.destroy()
            this.title.destroy()
            this.display()
        }
        const onCancel = () => {
            input.destroy()
            this.doc.giveFocusTo(this.menu)
        }
        input.on('submit', onSubmit)
        input.on('cancel', onCancel)
    }

    changeEnableState() {
        let en: any = config.get('hyperate.enabled', false)
        if (en == false) {
            config.set('hyperate.enabled', true)
        } else if (en == true) {
            config.set('hyperate.enabled', false)
        }
    }
}