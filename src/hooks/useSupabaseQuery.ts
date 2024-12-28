import { useEffect, useState } from 'react';
import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '../utils/supabase';

interface UseSupabaseQueryResult<T> {
  data: T | null;
  error: PostgrestError | null;
  loading: boolean;
}

export function useSupabaseQuery<T>(
  tableName: string,
  query: (queryBuilder: any) => any
): UseSupabaseQueryResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryBuilder = supabase.from(tableName);
        const { data: result, error: queryError } = await query(queryBuilder);

        if (queryError) {
          setError(queryError);
        } else {
          setData(result);
        }
      } catch (err) {
        setError(err as PostgrestError);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tableName, query]);

  return { data, error, loading };
}