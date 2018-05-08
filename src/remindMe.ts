'use strict';
import * as vscode from 'vscode';
import * as sherlock from 'sherlockjs';
import * as datefns from 'date-fns';
import * as path from 'path';
import { writeFileSync } from 'fs';

const funTodos: string[] = [
    'conquere the 🌍  tomorrow',
    'git 🐙 commit 🐱 in 10 mins',
    'attend 🤝 meeting in 2 hours',
    '💧 water💧 myself at 4 pm',
    '🍊🍐 feed 🥕🥒 myself at 12:30 Am',
    'do 🎆 opensource 🎆 😎 after 5:30 pm'
]

function getRootPath() {
    var config: string = vscode.workspace.getConfiguration().get("remindme.path");
    if (!config) {
      config = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];
    }
    return path.join(config, ".remindme");
  }

export function activate(context: vscode.ExtensionContext) {

    let reminder = vscode.commands.registerCommand('remindMe.remind', () => {
        var funTodo: string = funTodos[Math.floor(Math.random() * funTodos.length)]
        vscode.window.showInputBox({
            ignoreFocusOut: true,
            placeHolder: `${funTodo}`,
            prompt: `Ask vscode to remind you! ⏰`,
        }).then(reminder => {
            if (!reminder) {
                return;
            }
            // parse the input with sherlockjs
            const event = sherlock.parse(reminder);
            if (!event.eventTitle || !event.startDate) {
                vscode.window.showWarningMessage('🤖 Sorry boss! Couldnt understand, mind repeating ? 😉');
                return;
            }
            // reminder message
            let reminderMessage: string = ` ⏰  ${event.eventTitle} in ${datefns.distanceInWordsToNow(event.startDate)}`
            vscode.window.showInformationMessage(reminderMessage);

            // read 
            // update 
            // write
            // const obj = {
            //     ""
            // }
            // write to disk
            var json = JSON.stringify(obj);
            
            const config = getRootPath();
            writeFileSync(config, 'utf8')

            // reminder time 
            const timePeriod = datefns.differenceInMilliseconds( event.startDate, new Date() );
            var timer = setInterval(function () {
                vscode.window.showInformationMessage(
                    `⏰  ${event.eventTitle} now! ⏰`)
                    .then(() => {
                        clearTimeout(timer)
                    })
            }, timePeriod)
        });
    });
    context.subscriptions.push(reminder);
}
