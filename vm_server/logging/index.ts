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
  write({ event, data }: WriteAction) {
    const lineItem = `${JSON.stringify({
      event,
      data,
      timestamp: new Date(),
    })}\n`;

    fs.appendFileSync(path.join(__dirname, this.path), lineItem);
  }
  read() {
    fs.readFileSync(this.path);
  }
  clear() {
    fs.writeFileSync(path.join(__dirname), "");
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
