import fs from "fs";
import path from "path";
interface WriteAction {
  event: string;
  data: string;
  timestamp?: Date;
}
class Logger {
  constructor(private path: string) {
    this.path = path;
  }
  write(writeAction: WriteAction) {
    fs.appendFileSync(
      path.join(__dirname, this.path),
      Logger.createLineItem(writeAction)
    );
  }
  read() {
    fs.readFileSync(this.path);
  }
  clear() {
    fs.writeFileSync(path.join(__dirname), "");
  }
  static createLineItem(writeAction: WriteAction) {
    const { data, event } = writeAction;
    return `${JSON.stringify({
      event,
      data,
      timestamp: new Date(),
    })}\n`;
  }
}

class DBLogger extends Logger {
  constructor(path: string) {
    super(path);
  }
  write(writeAction: WriteAction): void {
    super.write(writeAction);
  }
  read(): void {
    super.read();
  }
  clear(): void {
    super.clear();
  }
}

export const dBLogger = new DBLogger("./logs/db.log");
