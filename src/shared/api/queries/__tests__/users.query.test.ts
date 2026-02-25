import { describe, it, expect, beforeAll, afterEach, afterAll } from '@jest/globals';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryWrapper } from '../../../lib/utils/queryTestWrapper';
import { useUsers } from '../users.query';
import { server } from '../../mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Users", () => {
  it("should return 2 objects", async () => {
    const { result } = renderHook(() => useUsers(), { wrapper: QueryWrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const { data } = result.current;

    expect(data).toHaveLength(2);
  });
})