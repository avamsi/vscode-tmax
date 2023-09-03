import * as vscode from "vscode";

const MAXIMIZE = "tmax.maximize";

async function toggle(workspaceState: vscode.Memento) {
  if (workspaceState.get(MAXIMIZE)) {
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
    workspaceState.update(MAXIMIZE, false);
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
    workspaceState.update(MAXIMIZE, true);
  }
}

export function activate(context: vscode.ExtensionContext) {
  // Assume terminal is hidden when the extension is activated.
  context.workspaceState.update(MAXIMIZE, true);
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "tmax.toggle",
      async () => await toggle(context.workspaceState),
    ),
  );
}

export function deactivate() {}
