import Conf from "conf"
import got from 'got'
import { parse } from "node-html-parser"
import { HomescreenPage } from "../homescreen.js"

let config = new Conf({ projectName: 'osc-g' })

export async function startHyperateMon (page: HomescreenPage) { 
    let checkState = await setInterval(() => {
        let check = config.get('hyperate.enabled')
        if (check == true) { //@ts-ignore
            //setTimeout(() => pingHyperate(page), 2000)
            clearInterval(checkState)
        }
    }, 5000)
}
/*
async function pingHyperate(page: HomescreenPage) {
    const baseURL = `https://app.hyperate.io/${config.get('hyperate.id')}`
    let response = await got(baseURL)
    let root = parse(response.body)
    let hr = root.querySelector('.heartrate')?.childNodes[0].rawText
    page.updateHeartrate(hr)
}
*/