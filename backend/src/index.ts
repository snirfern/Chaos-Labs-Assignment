import express, {NextFunction, Request, Response} from 'express';
import {ApolloServer} from '@apollo/server';
import bodyParser from 'body-parser';
import cors from 'cors';
import {typeDefs} from './controllers/schema';
import resolvers from './controllers/Resolvers/resolvers';
import clickHouseDb from './framework/db/clickHouse';
import {runWithRetry} from './utils/utils';
import logger from "./utils/logger/logger";
import {AppError} from "./errors/errors";
import {expressMiddleware} from "@apollo/server/express4";


async function initApp(): Promise<express.Express> {
    const app = express();

    const server = new ApolloServer({
        typeDefs,
        resolvers
    });

    await server.start();

    app.use(
        '/graphql',
        cors(),
        bodyParser.json(),
        expressMiddleware(server)
    );

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        logger.error(`Unhandled error: ${err.message}\nStack: ${err.stack}`);

        if (err instanceof AppError) {
            return res.status(err.statusCode).json({error: err.message});
        }

        res.status(500).json({error: 'Internal Server Error'});
    });

    await runWithRetry(() => clickHouseDb.connect());

    return app;
}

if (process.env.NODE_ENV !== 'tests') {
    (async () => {
        try {
            const app = await initApp();
            const PORT = 4000;

            app.listen(PORT, () => {
                console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
            });
        } catch (err) {
            console.error('Failed to initialize app', err);
            process.exit(1);
        }
    })();
}

export {initApp};
