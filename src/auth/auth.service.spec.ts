import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { PartialGraphHost } from '@nestjs/core';
import { User } from 'src/users/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    //Membuat array untuk menampung data yang menggunakan create
    const users: User[] = [];
    //Membuat fake UserService
      fakeUsersService = {
      find: (email:string) => {
        const user = users.filter((user) => user.email === email);
        return Promise.resolve(user)
      },
      create: (name:string, email:string, password:string) => {
        const user = {
          id : Math.floor(Math.random() * 999999),
          name,
          email,
          password,
        } as User;

        users.push(user);
        return Promise.resolve(user)
      },
  };

    //Pengujian
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //Testing method register
  it('Ketika membuuat user baru', async () => {
      const user = await service.Register(
        'Wahyu',
        'wahyu@mail.com',
        'wahyu123',
      );

    expect(user.password).not.toEqual('wahyu123');
    const [salt, hash] = user.password.split('.')
    expect(salt).toBeDefined();
    expect(hash).toBeDefined()
  })

  //Testing method create user yang sama
  it('Ketika memasukan email yang sama maka akan eror', async () => {
    await service.Register('Wahyu', 'wahyu@gmail.com', 'password');
    await expect(
      service.Register('Wahyu', 'wahyu@gmail.com', 'password')
    ).rejects.toThrow('email yang anda masukan sudah terdaftar');
  })

  //menguji eror ketika emailnya belum terdaftar pada saat login
  it('Ketika memasukan email yang belum terdaftar', async () => {
    await expect(
      service.Login('Burhan@gmail.com','password')
    ).rejects.toThrow('User Not Found')
  })

  //Ketika salah memasukan password pada saat login
  it('Ketika salah memasukan password ketika login', async () => {
    await service.Register('Wahyu', 'wahyu@gmail.com', 'wahyu123')
    await expect(
      service.Login('wahyu@gmail.com', 'password')
    ).rejects.toThrow('Password yang dimasukan salah');
  })

  //Ketika benar memasukan password yang sama
  it('Ketika benar memasukan password', async ()=> {
    await service.Register('Wahyu','wahyu@mail.com', 'wahyu123')
    const user = await service.Login('wahyu@mail.com', 'wahyu123');
    expect(user).toBeDefined();
  })
});
