'use strict';
import * as vscode from 'vscode';

const funTodos: string[] = [
    'conquere the 🌍 5',
    'attend 🤝 meeting 😓 2',
    '🐙 commit 🐱 10',
    '💧 water 💧 myself 20',
    '🍊🍐 feed 🥕🥒 myself 10',
    'do 🎆 opensource 🎆 😎 5'
]

export function activate(context: vscode.ExtensionContext) {

    let reminder = vscode.commands.registerCommand('remindMe.remind', () => {
        var funTodo: string = funTodos[Math.floor(Math.random() * funTodos.length)]
        vscode.window.showInputBox({
            ignoreFocusOut: true,
            placeHolder: `Remind me to {{${funTodo}}} minutes later!`,
            prompt: `Enter reminder ending with number of minutes ⏰`,
        }).then(reminder => {
            if (!reminder) {
                return;
            }
            const remind: string[] = reminder.trim().split(' ');
            const timePeriod: number = parseInt(remind[remind.length - 1]);
            if (!timePeriod || timePeriod <= 0) {
                vscode.window.showWarningMessage(' Plese enter a reminder ending with number of minutes 😉');
                return false;
            }
            const reminderText: string = reminder.replace(timePeriod.toString(), '').trim()
            let reminderMessage: string = `⏰ I will remind you  to '${reminderText}' ${timePeriod} minute`
            reminderMessage += timePeriod === 1 ?  '':'s'
            reminderMessage += ' later! 😎'
            vscode.window.showInformationMessage(reminderMessage);
            // IDEA: logged by salapati @ 2017-10-7 08:43:25
            // show a status bar icon ?
            // which will list all the reminders ?
            var timer = setInterval(function () {
                vscode.window.showInformationMessage(
                    `⏰ Reminder to ${reminderText} now! ⏰`);
            }, timePeriod * 60000)
            // IDEA: logged by salapati @ 2017-10-7 08:44:01
            // what if the editor is closed ?
            // make it persistent ?
        });
    });
    context.subscriptions.push(reminder);
}
