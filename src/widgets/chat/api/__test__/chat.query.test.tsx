import { describe, it, expect, beforeAll, afterEach, afterAll } from "@jest/globals";
import { server } from "../../../../shared/api/mocks/server";
import { useChat } from "../chat.query";
import { renderHook, waitFor } from "@testing-library/react";
import { TestWrapper } from "../../../../shared/lib/utils/queryTestWrapper";
import type { User } from "../../../../entities/user/model/userSchema";
import userReducer from "../../../../entities/user";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Chat', () => {
  it('should return chat data', async () => {
    const { result } = renderHook(() => useChat(1), { wrapper: ({ children }) => (
      <TestWrapper
        reducers={{userReducer}}
        preloadedState={{ "userReducer": { id: 1, username: "Patrick Jane" } satisfies User}}
      >
        { children }
      </TestWrapper>
    )});

    await waitFor(() => { expect(result.current.isSuccess).toBe(true); });
  });
});