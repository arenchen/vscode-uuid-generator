import { spawn } from 'child_process';

let _copy: { command: string, args: string[] };

switch (process.platform) {
  case "darwin":
    _copy = { command: 'pbcopy', args: [] };
    break;
  case "win32":
    _copy = { command: 'clip', args: [] };
    break;
  case "linux":
    _copy = { command: 'xclip', args: ["-selection", "clipboard"] };
    break;
  default:
    throw new Error("Unknown platform: '" + process.platform + "'.");
}

export const copy = function (text:string, callback: () => void) {
  const child = spawn(_copy.command, _copy.args);

  child.stdin.end(text);

  callback();
};
