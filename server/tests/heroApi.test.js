const request = require("supertest")
const fs = require("fs");
const path = require("path");
const baseURL = "http://localhost:5000"
const imageForCreateTest = path.resolve(__dirname, 'create_test.jpg')

// describe('get 5 heroes with pagination', () => {
//     it('successfully get 5 heroes', async () => {
//         const resp = await request(baseURL).get('/superhero')
//         expect(resp.statusCode).toBe(200)
//         expect(resp.body.heroes.length === 5).toBe(true)
//     })
// });

describe("Create one hero, then get it by ID, and delete", () => {

    let createdHeroId;
    const newHero = {
        real_name: 'Zhenya',
        nickname: 'SuperZhenya',
        origin_description: ' Kyiv city Ukraine',
        superpowers: ['fly', 'cry', 'try', 'can write tests'],
        catch_phrase: 'Wow its SuperZhenya',
        images: fs.readFileSync(imageForCreateTest)
    }

    afterAll(async () => {
        await request(baseURL).delete(`/superhero/${createdHeroId}`)
    })

    it("should successfully create item", async () => {
        const response = await request(baseURL)
            .post(`/superhero`)
            .field('real_name', newHero.real_name)
            .field('nickname', newHero.nickname)
            .field('origin_description', newHero.origin_description)
            .field('superpowers', JSON.stringify(newHero.superpowers))
            .field('catch_phrase', newHero.catch_phrase)
            .attach('images', newHero.images)
        createdHeroId = response.body._id

        expect(response.statusCode).toBe(200);
        expect(response.body.real_name).toBe('Zhenya');
        expect(response.body.nickname).toBe('SuperZhenya');

    });


    it("shouldn't create item because name is dublicat", async () => {
        const response = await request(baseURL)
            .post(`/superhero`)
            .field('real_name', newHero.real_name)
            .field('nickname', newHero.nickname)
            .field('origin_description', newHero.origin_description)
            .field('superpowers', JSON.stringify(newHero.superpowers))
            .field('catch_phrase', newHero.catch_phrase)
            .attach('images', newHero.images)

        expect(response.statusCode).toBe(500);
        expect(response.body.real_name).toBe(undefined);

    });

    it("shouldn't create item because invalid body", async () => {
        //without real_name field
        const response = await request(baseURL)
            .post(`/superhero`)
            .field('nickname', newHero.nickname)
            .field('origin_description', newHero.origin_description)
            .field('superpowers', JSON.stringify(newHero.superpowers))
            .field('catch_phrase', newHero.catch_phrase)
            .attach('images', newHero.images)

        expect(response.statusCode).toBe(500);
        expect(response.body.real_name).toBe(undefined);
        //with non-valid images
        const response2 = await request(baseURL)
            .post(`/superhero`)
            .field('real_name', newHero.real_name)
            .field('nickname', newHero.nickname)
            .field('origin_description', newHero.origin_description)
            .field('superpowers', JSON.stringify(newHero.superpowers))
            .field('catch_phrase', newHero.catch_phrase)
            .attach('images', 2222)

        expect(response2.statusCode).toBe(500);
        expect(response2.body.real_name).toBe(undefined);
        //with empty name
        const response3 = await request(baseURL)
            .post(`/superhero`)
            .field('real_name', '')
            .field('nickname', newHero.nickname)
            .field('origin_description', newHero.origin_description)
            .field('superpowers', JSON.stringify(newHero.superpowers))
            .field('catch_phrase', newHero.catch_phrase)
            .attach('images', 2222)

        expect(response3.statusCode).toBe(500);
        expect(response3.body.real_name).toBe(undefined);

    });

    it('successfully get hero by ID', async () => {
        const resp = await request(baseURL).get(`/superhero/${createdHeroId}`)
        expect(resp.statusCode).toBe(200)
        expect(resp.body.nickname).toBe(newHero.nickname)
    })

    it("failed get hero by ID because ID doesn't exist", async () => {
        const resp = await request(baseURL).get(`/superhero/1111aa111111a1a1a1a1111a`)
        expect(resp.statusCode).toBe(404)
        expect(resp.body.nickname).toBe(undefined)
    })
});


// describe("Create one hero, Update it, Delete it", () => {
//
//     let createdHeroId
//     afterAll(async () => {
//         await request(baseURL).delete(`/superhero/${createdHeroId}`)
//     })
//
//     const newHero = {
//         real_name: 'Zhenya',
//         nickname: 'SuperZhenya',
//         origin_description: ' Kyiv city Ukraine',
//         superpowers: ['fly', 'cry', 'try', 'can write tests'],
//         catch_phrase: 'Wow its SuperZhenya',
//         images: fs.readFileSync(imageForCreateTest)
//     }
//
//     it("should update item", async () => {
//         const newHeroCreated = await request(baseURL)
//             .post(`/superhero`)
//             .field('real_name', newHero.real_name)
//             .field('nickname', newHero.nickname)
//             .field('origin_description', newHero.origin_description)
//             .field('superpowers', JSON.stringify(newHero.superpowers))
//             .field('catch_phrase', newHero.catch_phrase)
//             .attach('images', newHero.images)
//
//         createdHeroId = newHeroCreated.body._id
//
//         const response = await request(baseURL)
//             .put(`/superhero/${createdHeroId}`)
//             .field('real_name', 'Not Zhenya')
//             .field('nickname', 'Not SuperZhenya')
//             .field('origin_description', newHero.origin_description)
//             .field('superpowers', JSON.stringify(newHero.superpowers))
//             .field('catch_phrase', newHero.catch_phrase)
//             .attach('images', newHero.images)
//
//         expect(response.statusCode).toBe(200);
//         expect(response.body.real_name).toBe('Not Zhenya');
//         expect(response.body.nickname).toBe('Not SuperZhenya');
//
//     });
// });
//
//
//
