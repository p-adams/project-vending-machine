import fs from "fs";
import path from "path";

class Logger {
  constructor(private path: string) {
    this.path = path;
  }
  write(data: string) {
    fs.writeFileSync(path.join(__dirname, this.path), data);
  }
  read() {
    fs.readFileSync(this.path);
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
}

export const dBLogger = new DBLogger("./logs/db.log");
