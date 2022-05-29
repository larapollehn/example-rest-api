const request = require('supertest');
const app = require('../src/app');

describe('REST API', () => {
    it('App should run', () => {});

    it('API should listen to requests', () => {
        return request(app)
            .get('/')
            .expect('Content-Type', /text/)
            .expect(200);
    });

    it('GET /artists should fail if parameters are missing - all', () => {
        return request(app)
            .get('/artists')
            .expect(400)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        success: false,
                        error: expect.any(String)
                    })
                )
            })
    })

    it('GET /artists should fail if parameters are missing - artist', () => {
        return request(app)
            .get('/artists/?artist=Cher')
            .expect(400)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        success: false,
                        error: expect.any(String)
                    })
                )
            })
    })

    it('GET /artists should fail if parameters are missing - file', () => {
        return request(app)
            .get('/artists/?file=test.csv')
            .expect(400)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        success: false,
                        error: expect.any(String)
                    })
                )
            })
    })

    it('GET /artists should return artistmatches', () => {
        return request(app)
            .get('/artists/?artist=Foo+Fighters&file=test.csv')
            .expect(200)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        success: expect.any(Boolean),
                        data: expect.objectContaining({
                            type: 'search',
                            artists: expect.any(Array),
                            saved_to_csv: expect.objectContaining({
                                success: expect.any(Boolean),  
                            })
                        })
                    })
                )
            })
    });

    it('GET /artists should return random artistsmatches', () => {
        return request(app)
            .get('/artists/?artist=dkjfkds&file=test.csv')
            .expect(200)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        success: expect.any(Boolean),
                        data: expect.objectContaining({
                            type: 'random',
                            artists: expect.any(Array)
                        })
                    })
                )
            })
    });
})
