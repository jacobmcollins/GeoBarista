const request = require('supertest');
const server = require('./server');

let test_server;
const image_api = "/api/v2/image";
const valid_ntf_image_path = "C:\\Users\\jacob\\dev\\data\\Pearl6_Alcatraz\\2017May10_225223_16100298_3c4c9600607e14bdbdfdc6c053d24a2b.ntf";
const invalid_image_path = "C:\\Users\\jacob\\dev\\data\\Pearl6_Alcatraz\\2017May10_225223_16100298_3c4c9600607bdfdc6c053d24a2b.ntf";

describe(`${image_api} Test Suite`, () => {
    beforeEach(() => {
        test_server = server(null);
    });

    afterEach(() => {
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
        expect(res2.body).toHaveProperty('success');
        expect(res2.body).toHaveProperty('data');
        expect(res2.body.success).toEqual(true);
        expect(res2.body.data).toEqual([{
            file_path: valid_ntf_image_path
        }]);
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
        expect(res2.body).toHaveProperty('success');
        expect(res2.body).toHaveProperty('data');
        expect(res2.body.success).toEqual(false);
        expect(res2.body.data).toEqual([]);
    });
})