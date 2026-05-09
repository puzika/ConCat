import { http, HttpResponse } from 'msw';
import { baseUrl } from '../url';

export const handlers = [
  http.get(`${baseUrl}/chats?user=1`, () => {
    return HttpResponse.json([
      {
        "id": 3,
        "participant_one": {
          "id": 1,
          "username": "Patrick Jane"
        },
        "participant_two": {
          "id": 2,
          "username": "Teresa Lisbon"
        }
      },
      {
        "id": 4,
        "participant_one": {
          "id": 1,
          "username": "Patrick Jane"
        },
        "participant_two": {
          "id": 4,
          "username": "Kimball Cho"
        }
      }
    ])
  }),
]