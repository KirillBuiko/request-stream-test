import Fastify from 'fastify'
import {getReaderWriter} from "../utils/getReaderWriter";

const fastify = Fastify()

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


    writer.end();
})

fastify.listen({port}, () => {
    console.log(`Example app listening on port ${port}`)
})