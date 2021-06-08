import winston from 'winston';

const { createLogger, format, transports } = winston;

const logConfiguration = {
  transports: [new transports.Console()],
  format: format.combine(
    format.colorize(),
    // format.simple(),
    format.timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.label({ label: `Label🏷️` }),
    // format.prettyPrint()
    format.printf(
      (info) => `${info.level} - ${info.label} - ${[info.timestamp]} - ${info.message}`
    )
  ),
};

const logger = createLogger(logConfiguration);

export default logger;
