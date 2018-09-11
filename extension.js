// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const uuidv4 = require('uuid/v4');
const cp = require("copy-paste");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "uuid-generator" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    context.subscriptions.push(vscode.commands.registerCommand('uuid.generate', function () {
        const editor = vscode.window.activeTextEditor;
        const position = editor.selection.active;

        var newPosition = position.with(position.line, 0);

        editor.edit(function (e) {
            e.insert(newPosition, generate());
        });
    }));

    context.subscriptions.push(vscode.commands.registerCommand('uuid.copy', function () {
        cp.copy(generate(), function () {
            console.log('success.');
        });
    }));

    function generate() {
        return uuidv4();
    }
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;