import { Logger } from "winston";
import { loggerConfig } from "../config/loggerConfig";

let winstonLoggerConfig = new loggerConfig();

let logger:Logger ;

process.env.NODE_ENV !== 'production' ?  
    logger = winstonLoggerConfig.devlepmentConfig() : 
    logger = winstonLoggerConfig.productionConfig();

export default logger ;