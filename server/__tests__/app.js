import app from '../app.js';
import request from 'supertest';
import { Buffer } from 'buffer';
import fs from 'fs/promises';

describe('sample', () =>
    test('1+1=2', () => expect(1 + 1).toBe(2)
    ));

describe('app', () => {
    describe('test of /images', () => {
        test('GET should return an array of images', async () => {
            const response = await request(app).get('/image');
            expect(response.status).toBe(200);
            expect(response.body[0]).toBeInstanceOf(Object);

        });
        test('POST should return id of saved image', async () => {
            const buffer = Buffer.from('test');
            const response = await request(app)
                .post('/image')
                .field({name:'test'})
                .attach('file', buffer, 'test.jpeg');
            expect(response.statusCode).toBe(201);
            expect(response.body.insertedId).toBeDefined();

        });
        test('PUT should edit title of an image', async () => {
            const response = await request(app)
                .put('/image/6217514e2921ef5c80351bb1')
                .set('Content-Type', 'application/json')
                .send('{ "name": "name has been edited" }');
            expect(response.statusCode).toBe(200);
            expect(response.body.modifiedCount).toEqual(1);

        });
        test('DELETE should remove image from db', async () =>{
            const response = await request(app)
                .delete('/image/6217783a42a84573c52bfd2e');
            expect(response.statusCode).toBe(200);
            expect(response.body.deletedCount).toEqual(1);

        });
        test('DELETE should remove image file from folder', async () =>{
            const filePath = './public/image/test.jpeg';
            const response = await request(app)
                .delete('/image/621777311c4e212e0a754f1d');
            const file = await fs.readFile(filePath);
            expect(file).not.toBeDefined();
            expect(response.statusCode).toBe(200);
            expect(response.body.deletedCount).toEqual(1);

        });
    });
});
