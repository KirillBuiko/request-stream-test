import Fastify from 'fastify'
import {fastifyMultipart} from "@fastify/multipart";
import {getReaderWriter} from "../utils/getReaderWriter";

interface GetRequestInfo {
    info: string;
}

const fastify = Fastify()

fastify.register(fastifyMultipart, {
    limits: {
        fileSize: 1024 * 1024 * 1024
    }
});
const port = 3000;
console.log("3");

function wait(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    })
}

fastify.post('/set', async (req, reply) => {
    console.log("\n --SET REQUEST");
    const [_, writer] = getReaderWriter();
    try {
        const data = await req.file();
        if (data) {
            if (data.fields.info && 'type' in data.fields.info && data.fields.info.type == "field") {
                console.log("INFO", data.fields.info.value);
            }
            data.file.on('data', (data) => {
                writer.write(data);
            });
            data.file.on('error', (err) => {
                console.log("ERROR", err);
                writer.end("ERROR");
                reply.code(400);
            });
            data.file.on('end', () => {
                writer.end();
                reply.send();
            });
        }
    } catch (e) {
        console.log(e);
        reply.code(500);
    }
})

fastify.get('/get', async (req, reply) => {
    console.log("\n --GET REQUEST");
    const [reader, writer] = getReaderWriter();

    console.log((req.query as GetRequestInfo).info);

    // const fileReader = fs.createReadStream("./test.txt", "utf-8");

    // reader.push("123123");
    // await wait(1000);
    // reader.push("123123");
    // await wait(1000);
    // reader.push("123123");
    // await wait(1000);
    // reader.emit("end");

    reply.send(reader);
    writer.write("123");
    await wait(500);
    writer.write("456");
    await wait(500);
    writer.end();
})

fastify.listen({port}, () => {
    console.log(`Example app listening on port ${port}`)
})