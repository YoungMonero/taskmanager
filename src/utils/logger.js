import winston from "winston"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { config } from "../config/sequelize"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const logDir = path.join(__dirname, "../logs")

export const logger = winston.createLogger({
  level: config.logging.level,
  formate: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'todos-api' },
  transports: [
    new winston.transports.File({
      filename: path.join(logDir, "error.log"),
      level: 'error',
      maxsize: 5242880
    }),
    new winston.transports.File({
      filename: path.join(logDir, "app.log"),
      level: "info",
      maxsize: 5242880
    })
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: path.join(logDir, 'exeptions.log') })
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: path.join(logDir, 'rejections.log') })
  ],
  exitOnError: false
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.align()
    ),
    level: "debug"
  }))
}
