import { describe, it, expect, beforeAll, afterEach, afterAll } from '@jest/globals';
import { renderHook, waitFor } from '@testing-library/react';
import { TestWrapper } from '../../../lib/utils/queryTestWrapper';
import { useChatList } from '../chatList.query';
import { server } from '../../mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Users", () => {
  it("should return 2 objects", async () => {
    const { result } = renderHook(() => useChatList(1), { wrapper: TestWrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const { data } = result.current;

    expect(data).toHaveLength(2);
  });
})