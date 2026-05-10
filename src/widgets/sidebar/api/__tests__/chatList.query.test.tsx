import { Suspense } from 'react';
import { describe, it, expect, beforeAll, afterEach, afterAll } from '@jest/globals';
import { renderHook, waitFor } from '@testing-library/react';
import { TestWrapper } from '../../../../shared/lib/utils/queryTestWrapper';
import { useChatList } from '../chatList.query';
import { server } from '../../../../shared/api/mocks/server';
import type { User } from '../../../../entities/user/model/userSchema';
import userReducer from '../../../../entities/user';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Users", () => {
  it("should return a chat list", async () => {
    const { result } = renderHook(() => useChatList(1), { 
      wrapper: ({ children }) => (
        <TestWrapper 
          reducers={{ userReducer }} 
          preloadedState={{userReducer: {id: 1, username: "Patrick Jane"} satisfies User}}
        >
          <Suspense>
            { children }
          </Suspense>
        </TestWrapper>
      )
    });

    await waitFor(() => { expect(result.current.isSuccess).toBe(true) });
  });
})