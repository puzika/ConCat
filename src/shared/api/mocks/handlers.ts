import { http, HttpResponse } from 'msw';
import { baseUrl } from '../url';

export const handlers = [
  http.get(`${baseUrl}/chats`, async ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('user');

    if (!userId) return HttpResponse.json([]);

    return HttpResponse.json([
      {
        id: 3,
        participant_one: {
          id: 1,
          username: "Patrick Jane",
          email: "pj@gmail.com",
          is_online: false,
          last_seen: new Date().toISOString(),
        },
        participant_two: {
          id: 2,
          username: "Teresa Lisbon",
          email: "tl@gmail.com",
          is_online: false,
          last_seen: new Date().toISOString(),
        }
      },
      {
        id: 4,
        participant_one: {
          id: 1,
          username: "Patrick Jane",
          email: "pj@gmail.com",
          is_online: true,
          last_seen: new Date().toISOString(),
        },
        participant_two: {
          id: 4,
          username: "Kimball Cho",
          email: "kc@gmail.com",
          is_online: true,
          last_seen: new Date().toISOString(),
        }
      }
    ])
  }),

  http.get(`${baseUrl}/chats/:chatId`, async ({ params }) => {
    const { chatId } = params;
    
    return HttpResponse.json({
      id: Number(chatId),
      participant_one: {
        id: 1,
        username: "Patrick Jane",
        email: "pj@gmail.com",
        is_online: true,
        last_seen: new Date().toISOString(),
      },
      participant_two: {
        id: 2,
        username: "Teresa Lisbon",
        email: "tl@gmail.com",
        is_online: false,
        last_seen: new Date().toISOString(),
      },
      messages: []
    })
  })
]