import * as vscode from 'vscode';
import { getCrayons, getAllCrayonsInstances, disposeCrayons } from './crayons';

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
    vscode.commands.registerCommand(
      "crayons.highlightManual",
      async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
          return;
        }
        await getCrayons(editor).highlightManual();
      }
    ),
    vscode.commands.registerCommand(
      "crayons.navigateNext",
      () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
          return;
        }
        getCrayons(editor).navigateToNext();
      }
    ),
    vscode.commands.registerCommand(
      "crayons.navigatePrevious",
      () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
          return;
        }
        getCrayons(editor).navigateToPrevious();
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
    // 监听配置变更
    vscode.workspace.onDidChangeConfiguration((event) => {
      // 检查是否是我们关心的配置发生了变化
      if (event.affectsConfiguration('crayons.configuration.autoRefreshInterval')) {
        // 更新所有Crayons实例的自动刷新间隔
        const instances = getAllCrayonsInstances();
        instances.forEach(crayons => {
          crayons.updateAutoRefreshInterval();
        });
      }
    }),
    // 监听文档关闭事件
    vscode.workspace.onDidCloseTextDocument((document) => {
      // 当文档关闭时，清理对应的Crayons实例
      disposeCrayons(document.uri.toString());
    }),
  );

}

export function deactivate() {
  // 清理所有Crayons实例的定时器
  const instances = getAllCrayonsInstances();
  instances.forEach(crayons => {
    crayons.dispose();
  });
}
