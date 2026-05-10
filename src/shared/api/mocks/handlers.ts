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
          username: "Patrick Jane"
        },
        participant_two: {
          id: 2,
          username: "Teresa Lisbon"
        }
      },
      {
        id: 4,
        participant_one: {
          id: 1,
          username: "Patrick Jane"
        },
        participant_two: {
          id: 4,
          username: "Kimball Cho"
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
      },
      participant_two: {
        id: 2,
        username: "Teresa Lisbon",
      },
      messages: []
    })
  })
]