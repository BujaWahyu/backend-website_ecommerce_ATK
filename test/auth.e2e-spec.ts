import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { setupApp } from '../src/setup-app';

describe('Auth Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

//Mentesting register apakah berfungsi dengan baik atau tidak
  it('Menangani register', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'gintoki',
        email: 'kintoki5@gmail.com',
        password:'pw020129'
      })
      .expect(201)
      .then(({body}: request.Response) => {
        expect(body.id).toBeDefined();
        expect(body.name).toBe('gintoki');
        expect(body.email).toBe('kintoki5@gmail.com');
      })
  });

  //Mencoba memastikan apakah data yang di daftar melalui registrasi bisa di gunakan di login
  it('Login setelah register', async() => {
    const email = 'bima@gmail.com';

    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'Bima',
        email: 'bima@gmail.com',
        password: "ngeri"
      })
      .expect(201)

    const cookie = response.get('Set-Cookie');
    console.log(cookie)
    // const {body} = await request(app.getHttpServer())
    //   .get('/auth/whoami')
    //   .set('Cookie', cookie)
    //   .expect(201);

    //   expect(body.email).toEqual(email);
  })
});
