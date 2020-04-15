const mongoose = require('mongoose');
const request = require('supertest');
const server = require('../server/server');
const imageModel = require('../server/models/image')
const path = require('path');

let test_server;
const image_api = "/api/v2/image";

const data_path = path.join(__dirname, "data");
const pearl6_alcatraz_path = path.join(data_path, "Pearl6_Alcatraz");
const valid_ntf_image_path = path.join(pearl6_alcatraz_path, "2017May10_225223_16100298_3c4c9600607e14bdbdfdc6c053d24a2b.ntf");
const invalid_image_path = path.join(pearl6_alcatraz_path, "garbage.ntf");


describe(`${image_api} Test Suite`, () => {
    beforeEach( async () => {
        test_server = server(null);
    });

    afterEach( async () => {
        test_server.close();
        const collections = mongoose.connection.collections;

        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany();
        }
    });

    afterAll( async() => {
        test_server.close();
    });

    it('should insert NTF image into database', async () => {
        const res = await request(test_server)
            .post(image_api)
            .send({
                file_path: valid_ntf_image_path 
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('success');
        expect(res.body.success).toEqual(true);
        const res2 = await request(test_server)
            .get(image_api)
            .query({
                'file_path': valid_ntf_image_path
            });
        expect(res2.statusCode).toEqual(200);
        let images = res2.body;
        expect(images.length == 1);
        expect(images[0].file_path).toEqual(valid_ntf_image_path);
        expect(images[0].file_extension).toEqual('ntf');
    });

    it('should not insert image into database', async () => {
        const res = await request(test_server)
            .post(image_api)
            .send({
                file_path: invalid_image_path
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('success');
        expect(res.body.success).toEqual(false);
        const res2 = await request(test_server)
            .get(image_api)
            .query({
                'file_path': invalid_image_path
            });
        expect(res2.statusCode).toEqual(200);
        expect(res2.statusCode).toEqual(200);
        let images = res2.body;
        expect(images.length == 0);
    });
    it('should change image selected field in database', async () => {
        // check that it inserts
        const res = await request(test_server)
            .post(image_api)
            .send({
                file_path: valid_ntf_image_path 
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('success');
        expect(res.body.success).toEqual(true);
        // get it and check false
        const res2 = await request(test_server)
            .get(image_api)
            .query({
                file_path: valid_ntf_image_path
            });
        expect(res2.statusCode).toEqual(200);
        let images = res2.body;
        expect(images.length == 1);
        expect(images[0].file_path).toEqual(valid_ntf_image_path);
        expect(images[0].file_extension).toEqual('ntf');
        expect(images[0].selected).toEqual(false);
        // update it
        const res3 = await request(test_server)
            .put(image_api)
            .send({
                _id: images[0]._id,
                field: 'selected',
                value: true
            });
        expect(res3.statusCode).toEqual(200);
        expect(res3.body).toHaveProperty('success');
        expect(res3.body.success).toEqual(true);
        // get it and check true
        const res4 = await request(test_server)
            .get(image_api)
            .query({
                'file_path': valid_ntf_image_path
            });
        expect(res4.statusCode).toEqual(200);
        images = res4.body;
        expect(images.length == 1);
        expect(images[0].file_path).toEqual(valid_ntf_image_path);
        expect(images[0].file_extension).toEqual('ntf');
        expect(images[0].selected).toEqual(true);
    });
})