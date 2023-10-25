import express, { Application } from "express";
import ip from "ip";
import cors from "cors"
import { Code } from "./enum/code.enum";
import { HttpResponse } from "./domain/response";
import { Status } from "./enum/status.enum";
import productsRoutes from "./routes/products.routes";

export class App {
    private readonly app: Application;
    private readonly APPLICATION_RUNING = 'application is running on:';
    private readonly ROUTE_NOT_FOUND = 'Rote does not exist on this server';
    constructor(private readonly port: (string | number) = process.env.SERVER_PORT || 8000) {
        this.app = express();
        this.middleware();
        this.routes();
    }
    listen(): void {
        this.app.listen(this.port, () => {
            console.log(`${this.APPLICATION_RUNING}  ${ip.address()}:${this.port}`);
        });
    }

    /**
     * This function is a placeholder for middleware logic.
     * It throws an error indicating that the method is not implemented.
     */
    private middleware(): void {
        this.app.use(cors({ origin: '*' }));
        this.app.use(express.json());
    }
    private routes(): void {
        this.app.use('/products', productsRoutes);
        this.app.get('/', (_, res) => res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'welcome to the e-commerce')));
        this.app.all('*', (_, res) => res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, this.ROUTE_NOT_FOUND)));
    }
}