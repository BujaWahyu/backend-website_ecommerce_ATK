import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { User } from 'src/users/user.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>
  
  beforeEach(async () => {
    fakeUsersService = {}
    fakeAuthService = {
      Login: (email:string, password:string) => {
        return Promise.resolve({id: 1, email, password} as User)
      }
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        }
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  //Menguji function login di bagian controller
  it('Menguji function login di controller', async () => {
    const session = {
      userId : -10,
    }
    const user = await controller.Login({email: 'Wahyu@gmail.com', password:'pw02012020'}, session);

    expect(user).toEqual({
      id: 1,
      email: 'Wahyu@gmail.com',
      password: 'pw02012020',
    });

    expect(session.userId).toEqual(1);
  })
});
