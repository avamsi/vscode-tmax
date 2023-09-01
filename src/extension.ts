import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand("tmax.toggle", async () => {
    if (context.workspaceState.get("maximize")) {
      await vscode.commands.executeCommand("workbench.action.closeSidebar");
      await vscode.commands.executeCommand(
        "workbench.action.toggleActivityBarVisibility",
      );
      await vscode.commands.executeCommand(
        "workbench.action.closeAuxiliaryBar",
      );
      await vscode.commands.executeCommand(
        "workbench.action.toggleStatusbarVisibility",
      );
      vscode.window.activeTerminal?.show();
      await vscode.commands.executeCommand(
        "workbench.action.toggleMaximizedPanel",
      );
      context.workspaceState.update("maximize", false);
    } else {
      vscode.window.activeTerminal?.hide();
      await vscode.commands.executeCommand(
        "workbench.action.toggleStatusbarVisibility",
      );
      await vscode.commands.executeCommand(
        "workbench.action.toggleAuxiliaryBar",
      );
      await vscode.commands.executeCommand(
        "workbench.action.toggleActivityBarVisibility",
      );
      await vscode.commands.executeCommand(
        "workbench.action.toggleSidebarVisibility",
      );
      context.workspaceState.update("maximize", true);
    }
  });
  context.subscriptions.push(disposable);
}

export function deactivate() {}
