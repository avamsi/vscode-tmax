import * as vscode from "vscode";

async function toggle(workspaceState: vscode.Memento) {
  if (workspaceState.get("maximize")) {
    await vscode.commands.executeCommand("workbench.action.closeSidebar");
    await vscode.commands.executeCommand(
      "workbench.action.toggleActivityBarVisibility",
    );
    await vscode.commands.executeCommand("workbench.action.closeAuxiliaryBar");
    await vscode.commands.executeCommand(
      "workbench.action.toggleStatusbarVisibility",
    );
    vscode.window.activeTerminal?.show();
    await vscode.commands.executeCommand(
      "workbench.action.toggleMaximizedPanel",
    );
    workspaceState.update("maximize", false);
  } else {
    vscode.window.activeTerminal?.hide();
    await vscode.commands.executeCommand(
      "workbench.action.toggleStatusbarVisibility",
    );
    await vscode.commands.executeCommand("workbench.action.toggleAuxiliaryBar");
    await vscode.commands.executeCommand(
      "workbench.action.toggleActivityBarVisibility",
    );
    await vscode.commands.executeCommand(
      "workbench.action.toggleSidebarVisibility",
    );
    workspaceState.update("maximize", true);
  }
}

export function activate(context: vscode.ExtensionContext) {
  // Assume terminal is hidden when the extension is activated.
  context.workspaceState.update("maximize", true);
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "tmax.toggle",
      async () => await toggle(context.workspaceState),
    ),
  );
}

export function deactivate() {}
