'use strict';
import * as vscode from 'vscode';

const funTodos = [
    'conquere the 🌍 5',
    'attend 🤝 meeting 😓 2',
    '🐙 git 🐱 commit 10',
    '💧 water 💧 myself 20',
    '🍊🍐 feed 🥕🥒 myself 10',
    'do 🎆 opensource 🎆 😎 5'
]

export function activate(context: vscode.ExtensionContext) {

    let reminder = vscode.commands.registerCommand('remindMe.remind', () => {
        var funTodo = funTodos[Math.floor(Math.random() * funTodos.length)]
        vscode.window.showInputBox({
            ignoreFocusOut: true,
            placeHolder: `Remind me to {{${funTodo}}} minutes later!`,
            prompt: `Enter todo ending with number of minutes ⏰`,
        }).then(reminder => {
            if (!reminder) {
                return;
            }
            const remind = reminder.split(' ')
            const timePeriod = parseInt(remind[remind.length - 1])
            if(timePeriod <= 0){
                vscode.window.showWarningMessage('Are you testing? 😉');
                return false;
            }
            vscode.window.showInformationMessage(`⏰ I will remind you  to ' ${reminder} ' minutes later! 😎`);
            // IDEA: logged by salapati @ 2017-10-7 08:43:25
            // show a status bar icon ?
            // which will list all the reminders ?
            var timer = setInterval(function () {
                vscode.window.showInformationMessage(
                    `⏰ Reminder to ${reminder.replace(timePeriod.toString(), '')} now! ⏰`);
            }, timePeriod * 60000)
            // IDEA: logged by salapati @ 2017-10-7 08:44:01
            // what if the editor is closed ?
            // make it persistent ?
        });
    });
    context.subscriptions.push(reminder);
}

export function deactivate() { }