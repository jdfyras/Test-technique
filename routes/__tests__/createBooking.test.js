const moment = require('moment')
const request = require('supertest')
describe('Test to create booking', function () {
    let baseURL = 'http://localhost:4000'

    it('should require authorization', async function () {
        let response = await request(baseURL).post('/train/availability')
        expect(response.statusCode).toBe(401)
    })

    it('should require body validation', async function () {
        let auth = await loginUser()

        let response = await request(baseURL)
            .post('/train/availability')
            .set('Authorization', 'Bearer ' + auth.token)
        expect(response.statusCode).toBe(400)
    })
    it('should display list of trains', async function () {
        let auth = await loginUser()
        let twoWeeksLater = moment().add(14, 'days')
        let departureDate = twoWeeksLater.format('YYYY-MM-DD')
        const query = {
            jouney: [
                {
                    depDate: '2023-03-20', //departureDate,
                    origin: 'ALG',
                    destination: 'PAR'
                }
            ],
            class: 'all',
            journeyType: 'oneway',
            paxes: {
                adults: 1,
                children: 0,
                infants: 1
            }
        }
        let response = await request(baseURL)
            .post('/train/availability')
            .set('Authorization', 'Bearer ' + auth.token)
            .send(query)
        expect(response.statusCode).toBe(200)
        expect(response.body.success).toBe(true)
        expect(typeof response?.body?.searchCode).toBe('string')
        expect(typeof response?.body?.trainList).toBe('object')
        expect(response?.body?.trainList.length > 0).toBe(true)
    })
    it('should display list of seats', async function () {
        let { token, searchCode, trainId } = await trainAvailability()
        const query = {
            searchCode: searchCode,
            trainId: trainId
        }
        let response = await request(baseURL)
            .post('/seat/availability')
            .set('Authorization', 'Bearer ' + token)
            .send(query)
        expect(response.statusCode).toBe(200)
        expect(response.body.success).toBe(true)
        expect(typeof response?.body?.searchCode).toBe('string')
        expect(typeof response?.body?.seatsAvailable).toBe('number')
        expect(typeof response?.body?.seatsList).toBe('object')
        expect(response?.body?.seatsList.length > 0).toBe(true)
    })
    it('should create booking', async function () {
        let { token, searchCode, trainId, seatId } = await seatAvailability()
        const query = {
            searchCode: searchCode,
            trainId: trainId,
            seatId: seatId,
            passengers: [
                {
                    title: 'Mr',
                    firstName: 'test',
                    lastName: 'test',
                    birthDate: '1996-03-20',
                    nationality: 'TN',
                    cin: '12345678',
                    phone: '29449117',
                    dialCode: '+216',
                    address: 'rue mrezga',
                    city: 'nabeul',
                    countryCode: 'TN',
                    countryName: 'Tunisia',
                    email: 'jdfyras@gmail.com',
                    gender: 'M',
                    type: 'ADT',
                    infants: {
                        birthDate: '2022-03-20',
                        firstName: 'baby',
                        lastName: 'test',
                        nationality: 'TN',
                        sex: 'M'
                    }
                }
            ]
        }
        let response = await request(baseURL)
            .post('/booking')
            .set('Authorization', 'Bearer ' + token)
            .send(query)
        expect(response.statusCode).toBe(200)
        expect(response.body.success).toBe(true)
        expect(typeof response?.body?.searchCode).toBe('string')
        expect(typeof response?.body?.booking?.bookingId).toBe('string')
        expect(response?.body?.booking?.statusId).toBe(0)
        expect(typeof response?.body?.booking).toBe('object')
        expect(response?.body?.booking?.refresa.length === 5).toBe(true)
    })
})
async function loginUser() {
    let baseURL = 'http://localhost:4000'

    const response = await request(baseURL).post('/auth/login').send({
        email: 'jdfyras@gmail.com',
        password: '12345678'
    })
    expect(response.statusCode).toBe(200)
    return { token: response.body.accessToken }
}
async function trainAvailability() {
    let baseURL = 'http://localhost:4000'

    let auth = await loginUser()
    const query = {
        jouney: [
            {
                depDate: '2023-03-20', //departureDate,
                origin: 'ALG',
                destination: 'PAR'
            }
        ],
        class: 'all',
        journeyType: 'oneway',
        paxes: {
            adults: 1,
            children: 0,
            infants: 1
        }
    }
    let response = await request(baseURL)
        .post('/train/availability')
        .set('Authorization', 'Bearer ' + auth.token)
        .send(query)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(typeof response?.body?.searchCode).toBe('string')
    expect(typeof response?.body?.trainList).toBe('object')
    expect(response?.body?.trainList.length > 0).toBe(true)
    return {
        token: auth.token,
        searchCode: response?.body?.searchCode,
        trainId: response?.body?.trainList[0].trainId
    }
}
async function seatAvailability() {
    let baseURL = 'http://localhost:4000'

    let auth = await trainAvailability()
    let { token, searchCode, trainId } = auth
    const query = {
        searchCode: searchCode,
        trainId: trainId
    }
    let response = await request(baseURL)
        .post('/seat/availability')
        .set('Authorization', 'Bearer ' + token)
        .send(query)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(typeof response?.body?.searchCode).toBe('string')
    expect(typeof response?.body?.seatsAvailable).toBe('number')
    expect(typeof response?.body?.seatsList).toBe('object')
    expect(response?.body?.seatsList.length > 0).toBe(true)
    return {
        token: token,
        searchCode: response?.body?.searchCode,
        trainId: response?.body?.seatsList[0].refTrain,
        seatId: response?.body?.seatsList[0].seatId
    }
}
