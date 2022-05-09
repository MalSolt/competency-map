export const SafeJSON = {
  stringify: (value: any, fallback: string) => {
    try {
      return JSON.stringify(value);
    } catch (e) {
      return fallback;
    }
  },
  parse: <T>(string: Opt<string>, fallback: T): T => {
    if (!string) return fallback;
    try {
      return JSON.parse(string) as T;
    } catch (e) {
      return fallback;
    }
  },
};
