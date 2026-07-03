import type { ILogger } from "../../application/ports/logger.port.js";
import { env } from "../../config/env.config.js";
import pino, { destination } from "pino";

export const pinoLogger = pino({
    level: env.LOG_LEVEL || "info",
    
    timestamp: pino.stdTimeFunctions.isoTime,

    transport: {
        targets: [
            {
            target: "pino-pretty",

            options: {
                colorize: true,
                translateTime : "SYS:standard",
            },
            level: "info",
        },
        {
            target: "pino/file",

            options: {
                destination: "./logs/app.log",
                mkdir: true,
            },
            
            level: "info",
        },
        {
        target: "pino/file",

        options: {
          destination: "./logs/error.log",
          mkdir: true,
        },

        level: "error",
      },
    ]
    }
})

export class PinoLogger implements ILogger{
    info(message: string, meta?: object): void {
        pinoLogger.info(meta, message)
        
    }
    error(message: string, meta?: object): void {
            pinoLogger.error(meta, message)
    }
}