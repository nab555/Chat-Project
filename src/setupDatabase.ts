import mongoose from "mongoose";
import { config } from "@root/config";
import Logger from 'bunyan';

const log: Logger = config.createLogger('SetupDatabase');


export default () => {
    const connect = () => {
        mongoose.connect(`${config.DATABASE_URL}`)
        .then(() => {
            log.info("Database connected successfully");
        })
        .catch((error) => {
            log.error("Database connection failed", error);
            return process.exit(1);
        })
    };
    connect();

    mongoose.connection.on("disconnected", connect);
};
