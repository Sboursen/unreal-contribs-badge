import getUserContributions from '../github';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getUserContributions', () => {
  beforeAll(() => {
    jest.setTimeout(10000);
  });
  afterAll(() => {
    jest.setTimeout(5000);
  });
  it('should resolve for the default userHandle and year', async () => {
    mockedAxios.request.mockResolvedValueOnce({
      data: {
        data: {
          user: null,
        },
        errors: [
          {
            type: 'NOT_FOUND',
            path: ['user'],
            locations: [
              {
                line: 2,
                column: 3,
              },
            ],
            message:
              "Could not resolve to a User with the login of 'Sboufsfrsen'.",
          },
        ],
      },
      status: 200,
      statusText: 'Ok',
      headers: {},
      config: {},
    });

    const year = 2022;
    const userHandle = 'Sboursen';
    const data = await getUserContributions(userHandle, year);

    expect(data).toHaveProperty('user');
    expect(data).toHaveProperty('year');
    expect(data.year).toBe(year);
  });

  it('should return empty user data for non existent user', async () => {
    mockedAxios.request.mockResolvedValueOnce({
      data: {
        data: {
          user: null,
        },
        errors: [
          {
            type: 'NOT_FOUND',
            path: ['user'],
            locations: [
              {
                line: 2,
                column: 3,
              },
            ],
            message:
              "Could not resolve to a User with the login of 'Sbouaslkdfgbnowgrsen'.",
          },
        ],
      },
      status: 200,
      statusText: 'Ok',
      headers: {},
      config: {},
    });
    const year = 2022;
    const userHandle = 'Sbouaslkdfgbnowgrsen';
    const data = await getUserContributions(userHandle, year);

    expect(data).toHaveProperty('user');
    expect(data).toHaveProperty('year');
    expect(data.year).toBe(year);
    expect(data.user).toBeNull();
  });
});
