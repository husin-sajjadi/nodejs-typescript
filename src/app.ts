import express, {Application} from 'express';
import IndexRoutes from './index.routes';
import UserRoutes from './api/users/user.routes';
import cors from 'cors';
import {env} from './config/env';
import http from 'http';
import WebSocket from 'ws';

export class App {
    private app: Application;
    private server: any;
    private io: any;

    constructor(private port?: number | string) {
        this.app = express();
        this.middleWares();
        this.settings();
        this.socket();
        this.routes();
    }

    settings() {
        this.app.set('port', this.port || env.PORT || 3000)
    }

    socket() {
        const server = http.createServer((req, res) => {

        });

        const wss = new WebSocket.Server({server});

        wss.on('connection', function connected(ws: WebSocket) {

            let token = '';//ws.handshake.query.token;
            ws.on('disconnect', () => {
                console.log('user disconnected', 'token: ' + token);
            });

            ws.on('my message', (msg: any) => {
                wss.emit('my broadcast', `server: ${msg} => token : ${token}`);
            });

            ws.send('connected');

        });

        server.listen(4000, () => {
        });
    }

    middleWares() {
        // this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.urlencoded({limit: '20mb', extended: false, parameterLimit: 20000000}));
        this.app.use(express.json({limit: '20mb'}));
    }

    routes() {
        this.app.use(IndexRoutes);
        this.app.use('/api/users', UserRoutes);
    }

    async listen() {
        await this.app.listen(this.app.get('port'));
    }
}
