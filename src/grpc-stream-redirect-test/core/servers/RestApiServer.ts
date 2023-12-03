import type {IServer, ServerStatus} from "@src/grpc-stream-redirect-test/core/app/types/IServer";
import type {ServerConfigType} from "@src/grpc-stream-redirect-test/core/app/types/ServerConfigType";
import Fastify, {RouteHandlerMethod} from "fastify";
import {fastifyMultipart} from "@fastify/multipart";

export class RestApiServer implements IServer{
    status: ServerStatus = "off";
    server = Fastify();

    constructor() {
        this.server.register(fastifyMultipart, {
            limits: {
                fileSize: 1024 * 1024 * 1024
            }
        });

        this.server.post('/get', this.getHandler);
        this.server.post('/set', this.setHandler);
    }

    start(config: ServerConfigType): Promise<Error | null> {
        this.status = "on";
        return Promise.resolve(null);
    }

    stop(): Promise<Error | undefined> {
        this.status = "off";
        return Promise.resolve(undefined);
    }

    getHandler: RouteHandlerMethod = (req, res) => {
    }

    setHandler: RouteHandlerMethod = (req, res) => {
    }
}