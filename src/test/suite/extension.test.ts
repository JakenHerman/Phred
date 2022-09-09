import * as assert from 'assert';
import * as vscode from 'vscode';
import { getBaseCallAccuracy } from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Test getBaseCallAccuracy returns appropriate accuracy', () => {
		[...Array(40).keys()].forEach((i) => {
			const baseCall = String.fromCharCode(i + 33);
			const acc = getBaseCallAccuracy(baseCall);
			assert.strictEqual(acc, i);
		});
	});

	test('Test getBaseCallAccuracy returns null for invalid base calls', () => {
		assert.strictEqual(getBaseCallAccuracy('Z'), null);
		assert.strictEqual(getBaseCallAccuracy(' '), null);
		assert.strictEqual(getBaseCallAccuracy(''), null);
		assert.strictEqual(getBaseCallAccuracy('!!'), null);
	});
});
