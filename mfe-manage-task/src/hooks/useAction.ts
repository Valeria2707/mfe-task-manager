import { useState, useCallback } from "react";

export function useAction<T, P = void>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeAction = useCallback(
    async (
      action: (params: P) => Promise<T>,
      params: P
    ): Promise<T | undefined> => {
      setLoading(true);
      setError(null);

      try {
        const result = await action(params);
        return result;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "An error occurred";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { executeAction, loading, error };
}
