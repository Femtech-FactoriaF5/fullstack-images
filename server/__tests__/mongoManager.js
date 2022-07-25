import connection from "../database/mongoManager.js";
import { config } from "../config.js";

describe('mongo driver', () => {
    let conn;
    beforeEach(async () => conn =await connection(config));
    afterEach(() => conn.close());
    describe('connection', () => {
        test('should connect to mongodb', async () => {
            expect(conn).toBeDefined();
        });
    }
    );
});