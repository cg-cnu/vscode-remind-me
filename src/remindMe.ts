'use strict';
import * as vscode from 'vscode';

// TODO: created by salapati @ 2017-10-7 02:06:21
// Add more of these
const funTodos = ['to conquere the world 5', 'to remind me 0']

export function activate(context: vscode.ExtensionContext) {

    let reminder = vscode.commands.registerCommand('remindMe.remind', () => {
        var funTodo = funTodos[Math.floor(Math.random() * funTodos.length)]
        var test = "test";
        vscode.window.showInputBox({
            ignoreFocusOut: true,
            placeHolder: `Remind me <${funTodos[0]}> minutes later!`,
            prompt: `Enter todo ending with number of minutes.`,
        }).then(remind => {
            if (!remind) {
                return;
            }
            console.log(remind);

            // FIXME: noticed by user @ 2017-10-7 02:19:32
            // Need better logic here...
            // extract minutes 
            const reminder = remind.split(' ')
            const timer = reminder[reminder.length-1]
            vscode.window.showInformationMessage(`Remind me ${remind} minutes later!`);
            // convert time 
            // start a timer
            // do a call back 
            // inform the user
            
        });
    });

    context.subscriptions.push(reminder);
}

// this method is called when your extension is deactivated
export function deactivate() { }