/* eslint-disable */
// This will stylize log messages in the console
// enabling you to easily identify different types of messages
export class Logger {
  private context: string;
  private colors = {
    reset: "\x1b[0m",
    red: "\x1b[31m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    gray: "\x1b[90m",
    bold: "\x1b[1m",
  };

  constructor(context: string) {
    this.context = context;
  }

  private formatMessage(level: string, message: string, data?: any) {
    const timestamp = new Date().toISOString();
    const prefix = `${timestamp} ${this.context}:`;
    return { prefix, message, ...(data && { data }) };
  }

  private colorize(color: keyof typeof this.colors, text: string) {
    return `${this.colors[color]}${text}${this.colors.reset}`;
  }

  private formatLogLevel(level: string): string {
    return `[${level.toUpperCase()}]`;
  }

  private formatOutput({
    prefix,
    message,
    data,
  }: {
    prefix: string;
    message: string;
    data?: any;
  }) {
    const output = [prefix, message];
    if (data) {
      output.push(JSON.stringify(data, null, 2));
    }
    return output.join(" ");
  }
}
