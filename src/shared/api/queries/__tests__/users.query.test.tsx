import { Suspense } from 'react';
import { describe, it, expect, beforeAll, afterEach, afterAll } from '@jest/globals';
import { renderHook, waitFor } from '@testing-library/react';
import { TestWrapper } from '../../../lib/utils/queryTestWrapper';
import { useChatList } from '../chatList.query';
import { server } from '../../mocks/server';
import type { User } from '../../../model/userSchema';
import userReducer from '../../../../entities/user';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Users", () => {
  it("should return 2 objects", async () => {
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

    await waitFor(() => {
      expect(result.current).not.toBeNull();
      expect(result.current.isSuccess).toBe(true)
    });

    const { data } = result.current;

    expect(data).toHaveLength(2);
  });
})