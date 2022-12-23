import fs from "fs";
import path from "path";

class Logger {
  constructor(private path: string) {
    this.path = path;
  }
  write(data: string) {
    fs.appendFileSync(path.join(__dirname, this.path), data);
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
  write(data: string): void {
    super.write(data);
  }
  read(): void {
    super.read();
  }
  clear(): void {
    super.clear();
  }
}

export const dBLogger = new DBLogger("./logs/db.log");
