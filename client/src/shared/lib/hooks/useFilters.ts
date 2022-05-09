import { useState, useMemo } from "react";

export const useFilters = <T, R>(items: T[], fn: (item: T, filters: R) => boolean, defaultFilters: R) => {
  const [filters, setFilters] = useState<R>(defaultFilters);

  const update = (partialFilters: Partial<R>) => {
    setFilters((prevState) => ({
      ...prevState,
      ...partialFilters,
    }));
  };

  const remove = (key: keyof R) => {
    setFilters((prevState) => {
      const shallowCopy = { ...prevState };
      delete shallowCopy[key];

      return shallowCopy;
    })
  };

  const clear = () => {
    setFilters({ ...defaultFilters });
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const filteredItems = useMemo(() => items.filter((item: T) => fn(item, filters)), [filters, fn, items])

  return {
    items: filteredItems,
    filters,
    update,
    remove,
    clear,
  }
}