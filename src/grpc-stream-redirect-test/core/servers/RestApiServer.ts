import type {IServer, ServerStatus} from "@src/grpc-stream-redirect-test/core/app/types/IServer";
import type {ServerConfigType} from "@src/grpc-stream-redirect-test/core/app/types/ServerConfigType";
import Fastify, {RouteHandlerMethod} from "fastify";
import {fastifyMultipart} from "@fastify/multipart";
import swagger from "swagger-ui-dist";
import fStat from "@fastify/static"

export class RestApiServer implements IServer{
    status: ServerStatus = "off";
    server = Fastify();

    constructor() {
        this.server.register(fastifyMultipart, {
            limits: {
                fileSize: 1024 * 1024 * 1024
            }
        });
        console.log(swagger.absolutePath());
        this.server.register(fStat, {
            root: swagger.absolutePath(),
            // prefix: "/swagger",
            logLevel: "info"
        })

        this.server.get('/get', this.getHandler);
        this.server.post('/set', this.setHandler);
    }

    async start(config: ServerConfigType): Promise<Error | null> {
        this.status = "on";
        await this.server.listen({
            port: config.port
        }, (err) => {
            if(err)
            console.log(err);
        });
        return null;
    }

    stop(): Promise<Error | undefined> {
        this.status = "off";
        this.server.close();
        return Promise.resolve(undefined);
    }

    getHandler: RouteHandlerMethod = (req, res) => {
    }

    setHandler: RouteHandlerMethod = (req, res) => {
    }
}