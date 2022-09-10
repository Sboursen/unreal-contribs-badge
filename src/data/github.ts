import axios from 'axios';
const TOKEN = process.env.GH_TOKEN;

export type ValidUserContributionsType = {
  user: {
    createdAt: string;
    isHireable: boolean;
    contributionsCollection: {
      contributionCalendar: {
        totalContributions: number;
        weeks: {
          contributionDays: {
            contributionCount: number;
            date: string;
            weekday: [0, 1, 2, 3, 4, 5, 6];
          }[];
        }[];
      };
    };
  };
};

export type UnValidUserContributionsType = {
  user: null;
};

export type getUserContributionsResponseType =
  | ValidUserContributionsType
  | UnValidUserContributionsType;

const currentYear = Math.floor(Date.now() / (1000 * 60 * 60 * 365));

export function getUserContributions(
  userHandle: string,
  year: number,
): Promise<getUserContributionsResponseType>;

export default async function getUserContributions(
  userHandle = 'Sboursen',
  year = currentYear,
) {
  
  const query = `query($userName:String!) { 
                  user(login: $userName){
                    createdAt
                    isHireable
                    contributionsCollection(from: "${
                      year - 1
                    }-12-31T23:59:59Z") {
                      contributionCalendar {
                        totalContributions
                        weeks {
                          contributionDays {
                            contributionCount
                            date
                            weekday
                          }
                        }
                      }
                    }
                  }
                }`;

  const variables = `{"userName":"${userHandle}"}`;

  const options = {
    method: 'POST',
    url: 'https://api.github.com/graphql',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    data: { query, variables },
  };

  const response = await axios.request(options);
  const data: getUserContributionsResponseType = response.data.data;
  return data;
}
