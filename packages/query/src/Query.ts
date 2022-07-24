// Main async util wrapper
export type Input<T> = (v: T) => Promise<T>;
const query = <T>(input: Input<T>, all: Input<T>[]) => {
  return {
    value: () => input,
    all: () => all,
    chain: <K extends T>(nextInput: (i: T) => Promise<K>) => {
      // @ts-ignore
      return query<K>(nextInput, all.concat(nextInput));
    },
    use: <K extends T>(f: Input<T>) => {
      // @ts-ignore
      return query<K>(input, all.map(f));
    },
    // @ts-ignore
    resolve: (res = (t: T) => t, rej = (t: T, e: T) => t) => {
      const resolveAll = async (val: T, i = 0): Promise<T> => {
        if (!all[i]) {
          // @ts-ignore
          return val;
        }

        return await all[i](val)
          .then((v) => {
            // res(v);
            return resolveAll(v, i + 1);
          })
          .catch((err) => {
            // rej(val, err);
            return resolveAll(val, i + 1);
          });
      };

      // @ts-ignore
      return resolveAll(null, 0);
    },
  };
};

// API to expose async util
export const Query = {
  of: <T extends unknown>(input: () => Promise<T>) => query(input, [input]),
};
