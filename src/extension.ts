import * as vscode from 'vscode';
import { getCrayons } from './crayons';

export function activate(context: vscode.ExtensionContext) {

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "crayons.highlight",
      () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
          return;
        }
        getCrayons(editor).highlight();
      }
    ),
    vscode.commands.registerCommand(
      "crayons.clear",
      () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
          return;
        }
        getCrayons(editor).clear();
      }
    ),
    vscode.commands.registerCommand(
      "crayons.clearAll",
      () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
          return;
        }
        getCrayons(editor).clear();
      }
    ),
    vscode.workspace.onDidChangeTextDocument((event) => {
      console.log("onDidChangeTextDocument", event);
    }),
    vscode.window.onDidChangeActiveTextEditor((editor) => {
      console.log("onDidChangeActiveTextEditor", editor);
      if (editor) {
        // 当切换到新的编辑器时，恢复该编辑器的高亮
        getCrayons(editor).refresh();
      }
    }),
  );

}

export function deactivate() { }
