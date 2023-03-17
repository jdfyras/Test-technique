const request = require('supertest')
describe('POST /auth/register', () => {
    const query = {
        email: 'user@gmail.com',
        password: '11223344',
        passwordConfirm: '11223344',
        firstName: 'user',
        lastName: 'user',
        gender: 'M',
        cin: '15265324',
        dialCode: '+216',
        phone: '15265324',
        country: 'tunisia',
        city: 'zaghouen',
        governorate: 'zaghouen',
        street: 'rue abc',
        postalcode: '1152'
    }
    let baseURL = 'http://localhost:4000'
    it('should register', async () => {
        const response = await request(baseURL).post('/auth/register').send(query)
        expect(response.statusCode).toBe(200)
        expect(response.body.success).toBe(true)
        expect(typeof response?.body?.accessToken).toBe('string')
        expect(typeof response?.body?.refreshToken).toBe('string')
        expect(response.body.message).toBe('Account registered successfully.')
    })
})
describe('POST /auth/register', () => {
    const query = {
        email: 'avd@gmail.com',
        password: '11223344',
        passwordConfirm: '11223344',
        firstName: 'test',
        lastName: 'user',
        gender: 'M',
        cin: '77554411',
        dialCode: '+216',
        phone: '78451236',
        country: 'tunisia',
        city: 'zaghouen',
        governorate: 'zaghouen',
        street: 'rue abc',
        postalcode: '1152'
    }
    let baseURL = 'http://localhost:4000'
    it('should register', async () => {
        const response = await request(baseURL).post('/auth/register').send(query)
        expect(response.statusCode).toBe(409)
        expect(response.body.success).toBe(false)
        expect(response.body.message).toBe(
            'User with given phone number is already been registered'
        )
    })
})
describe('POST /auth/register', () => {
    const query = {
        email: 'abc@gmail.com',
        password: '11223344',
        passwordConfirm: '11223344',
        firstName: 'test',
        lastName: 'user',
        gender: 'M',
        cin: '14253644',
        dialCode: '+216',
        phone: '25142514',
        country: 'tunisia',
        city: 'zaghouen',
        governorate: 'zaghouen',
        street: 'rue abc',
        postalcode: '1152'
    }
    let baseURL = 'http://localhost:4000'
    it('should register', async () => {
        const response = await request(baseURL).post('/auth/register').send(query)
        expect(response.statusCode).toBe(409)
        expect(response.body.success).toBe(false)
        expect(response.body.message).toBe('User with given cin is already been registered')
    })
})
describe('POST /auth/register', () => {
    const query = {
        email: 'test@gmail.com',
        password: '11223344',
        passwordConfirm: '11223344',
        firstName: 'test',
        lastName: 'user',
        gender: 'M',
        cin: '44556644',
        dialCode: '+216',
        phone: '77441122',
        country: 'tunisia',
        city: 'zaghouen',
        governorate: 'zaghouen',
        street: 'rue abc',
        postalcode: '1152'
    }
    let baseURL = 'http://localhost:4000'
    it('should register', async () => {
        const response = await request(baseURL).post('/auth/register').send(query)
        expect(response.statusCode).toBe(409)
        expect(response.body.success).toBe(false)
        expect(response.body.message).toBe('User with given email is already been registered')
    })
})
describe('POST /auth/login', () => {
    const query = {
        email: 'jdfyras@gmail.com',
        password: '12345678'
    }
    let baseURL = 'http://localhost:4000'
    it('should login', async () => {
        const response = await request(baseURL).post('/auth/login').send(query)
        expect(response.statusCode).toBe(200)
        expect(response.body.success).toBe(true)
        expect(typeof response?.body?.accessToken).toBe('string')
        expect(typeof response?.body?.refreshToken).toBe('string')
    })
})
describe('POST /auth/login', () => {
    const query = {
        email: 'jdfyras@gmail.com',
        password: '11223d344'
    }
    let baseURL = 'http://localhost:4000'
    it('should login', async () => {
        const response = await request(baseURL).post('/auth/login').send(query)
        expect(response.statusCode).toBe(401)
        expect(response.body.success).toBe(false)
        expect(response.body.message).toBe('User password not valid')
    })
})
describe('POST /auth/login', () => {
    const query = {
        email: 'ayha@gmail.com',
        password: '11223344'
    }
    let baseURL = 'http://localhost:4000'
    it('should login', async () => {
        const response = await request(baseURL).post('/auth/login').send(query)
        expect(response.statusCode).toBe(404)
        expect(response.body.success).toBe(false)
        expect(response.body.message).toBe('User  not registered')
    })
})
