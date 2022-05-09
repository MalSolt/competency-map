import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

type RestQuery = {
  [key:string]: string;
}

export const useQueryTabState = (values: string[], restQuery: RestQuery) => {
  const router = useRouter();
  const [tabValue, setTabValue] = useState<string>(values[0]);

  const internalSetTabValue = (newValue: string) => {
    setTabValue(newValue);

    router.push({
      query: {
        tab: newValue,
        ...restQuery,
      },
    });
  }

  useEffect(() => {
    const urlTabValue = router.query.tab as string;

    const newTabValue = values.includes(urlTabValue)
    ? urlTabValue
    : values[0];

    setTabValue(newTabValue);

  }, [router, values]);

  return { tabValue, setTabValue: internalSetTabValue };
}