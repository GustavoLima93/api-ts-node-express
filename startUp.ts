import * as express from 'express';
import * as BodyParse from 'body-parser';
import * as cors from 'cors';

import Database from './infra/db';
import bodyParser = require('body-parser');
import NewsController from './controller/newsController';

class statrtUp {
    public app: express.Application;
    private _db: Database;
    private bodyParser;

    constructor() {
        this.app = express();
        this._db = new Database();
        this._db.createConection();        
        this.middler();
        this.routes();
    }

    enableCors() {
        const options: cors.CorsOptions = {
            methods: "GET,OPTIONS,PUT,POST,DELETE",
            origin: "*"
        };

        this.app.use(cors(options));
    }

    middler() {
        this.enableCors();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false}));
    }

    routes() {
        this.app.route('/').get((req,res) => {
            res.send({versao: '0.0.1'})
        })

        //new

        this.app.route('/api/v1/news').get(NewsController.get);
        this.app.route('/api/v1/news/:id').get(NewsController.getById);
        this.app.route('/api/v1/news').post(NewsController.create);
        this.app.route('/api/v1/news/:id').put(NewsController.update);
        this.app.route('/api/v1/news/:id').delete(NewsController.delete);
    }

 
}


export default new statrtUp();