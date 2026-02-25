import { http, HttpResponse } from 'msw';
import { baseUrl } from '../url';

export const handlers = [
  http.get(`${baseUrl}/users`, () => {
    return HttpResponse.json({
      users: [
        { id: 1, username: "Patrick Jane" },
        { id: 2, username: "Teresa Lisbon" },
      ]
    })
  })
]