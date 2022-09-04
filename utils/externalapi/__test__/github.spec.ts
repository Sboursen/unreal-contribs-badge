import getUserContributions from '../github';

describe('getUserContributions', () => {
  it('should resolve for the default userHandle and year', async () => {
    const year = 2022;
    const userHandle = 'Sboursen';
    const data = await getUserContributions(userHandle, year);

    expect(data).toHaveProperty('user');
  });

  it('should return empty user data for non existent user', async () => {
    const year = 2022;
    const userHandle = 'Sbouaslkdfgbnowgrsen';
    const data = await getUserContributions(userHandle, year);

    expect(data).toHaveProperty('user');
    expect(data.user).toBeNull();
  });
});
