import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.openTerminal', () => {
        // Open the terminal in VS Code
        vscode.commands.executeCommand('workbench.action.terminal.new');
    });

    context.subscriptions.push(disposable);
}

// This method is called when the extension is deactivated
export function deactivate() {}
