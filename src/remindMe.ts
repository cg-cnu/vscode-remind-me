'use strict';
import * as vscode from 'vscode';

// TODO: created by salapati @ 2017-10-7 02:06:21
// Add more funny these and emojis
const funTodos = [
    'to conquere the world 👏 5',
    'about meeting 2',
    'to git commit 10',
    'to water myself 20',
    'to do more opensource 5'
]

export function activate(context: vscode.ExtensionContext) {

    let reminder = vscode.commands.registerCommand('remindMe.remind', () => {
        var funTodo = funTodos[Math.floor(Math.random() * funTodos.length)]
        vscode.window.showInputBox({
            ignoreFocusOut: true,
            placeHolder: `Remind me <${funTodos[0]}> minutes later!`,
            prompt: `Enter todo ending with number of minutes.`,
        }).then(reminder => {
            if (!reminder) {
                return;
            }
            // FIXME: noticed by user @ 2017-10-7 02:19:32
            // Need better logic here...
            // extract minutes 
            const remind = reminder.split(' ')
            // TODO: created by user @ 2017-10-7 09:28:28
            // validations for the time period
            // its a number
            // not zero
            // not float
            // not negative
            const timePeriod = parseInt(reminder[reminder.length - 1]) * 60000
            vscode.window.showInformationMessage(`Remind me ${reminder} minutes later!`);
            // IDEA: logged by salapati @ 2017-10-7 08:43:25
            // show a status bar icon ?
            var timer = setInterval(function () {
                vscode.window.showInformationMessage(`⏰Reminder ${reminder} now!⏰`);
            }, timePeriod)
            // NOTE: note written by salapati @ 2017-10-7 08:44:01
            // what if the editor is closed ?
            // make it persistent ?
        });
    });
    context.subscriptions.push(reminder);
}

export function deactivate() { }