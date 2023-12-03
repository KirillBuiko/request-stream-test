import {ServerConfigsType, ServerName} from "@src/grpc-stream-redirect-test/core/app/types/ServerConfigType";
import {servers} from ".";
import {IServersManager} from "@src/grpc-stream-redirect-test/core/app/types/IServersManager";
import {IRequestManager} from "@src/grpc-stream-redirect-test/core/app/types/IRequestManager";

export class ServersManager implements IServersManager {
    constructor() {}

    async startAll(configs: ServerConfigsType, requestManager: IRequestManager) {
        console.log("Servers are starting");
        const promises = Object.keys(servers).map(async serverName => {
            const server = servers[serverName as ServerName];
            const config = configs[serverName as ServerName];
            const err = await server.start(config, requestManager);
            if (err) {
                console.log(`The server "${serverName}" start attempt failed with error: ${err.message}`);
                throw err;
            } else {
                console.log(`The server "${serverName}" started on port ${config.port}`);
            }
        });
        try {
            await Promise.all(promises);
            console.log("Servers start finished");
        } catch (err) {
            console.log("Servers start aborted");
            throw err;
        }
    }

    stopAll() {
        const promises = Object.keys(servers).map(async serverName => {
            const server = servers[serverName as ServerName];
            if (server.status !== "on") return;
            const res = await server.stop();
            if (res) {
                console.log(`The server "${serverName}" stop attempt failed with error: ${res.message}`);
            } else {
                console.log(`The server "${serverName}" stopped`);
            }
        });
        return Promise.allSettled(promises);
    }
}