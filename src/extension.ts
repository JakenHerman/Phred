import * as vscode from 'vscode';

export const getBaseCallAccuracy = (baseCall: string): number | null => {
	// todo: eventually, we should accept a string of length > 1 and
	// return a vector of accuracies, but for now, this should return null
	
	if (baseCall.length > 1) { return null; }
	const baseCallAccuracy = +baseCall.charCodeAt(0) - 33;
	return baseCallAccuracy < 0 || baseCallAccuracy > 40 || Number.isNaN(baseCallAccuracy) ? null : baseCallAccuracy;
};

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('phred.getBaseCallAccuracy', () => {
		const encodedChar = vscode.window.showInputBox({
			prompt: 'Enter a single character to get the base call accuracy',
			placeHolder: 'Enter a single character',
			validateInput: (text) => {
				if (text.length !== 1) {
					return 'Please enter a single character';
				}
				return text;
			},
		}).then((encodedChar) => {
			if (encodedChar) {
				let acc = getBaseCallAccuracy(encodedChar);
				if (acc) {
					vscode.window.showInformationMessage(`The base call accuracy for ${encodedChar} is ${acc}`);
				} else {
					vscode.window.showErrorMessage('Invalid character entered');
				}
			} else {
				vscode.window.showInformationMessage('Invalid character entered');
			}
		});
	});

	context.subscriptions.push(disposable);
}

// this method is called when the extension is deactivated,
// currently, we don't do anything here. I doubt there will ever be a need 
// to do any cleanup tasks for this extension.
export function deactivate() {}
