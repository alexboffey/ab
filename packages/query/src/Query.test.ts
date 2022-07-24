import { Query } from "./Query";

// Async Utils
const wait = (time: number, v?: any): Promise<any> =>
  new Promise((res) => setTimeout(() => res(v), time));
const waitFail = (time: number, v?: any): Promise<any> =>
  new Promise((_, rej) => setTimeout(() => rej(v), time));

// Example Data Types
type NestedModel = {
  static: string;
  thirdThing: Promise<string> | string;
};

type Model<T> = {
  firstThing: string;
  secondThing: Promise<string> | string;
  nestedModel: T;
};

// Example Async Fns
const getModel = (): Promise<Model<NestedModel>> =>
  wait(500, {
    firstThing: "foo",
    secondThing: wait(100, "bar"),
    nestedModel: {
      static: "value",
      thirdThing: wait(200, "baz"),
    },
  });

const getValueDependentOnModel = async (v: Model<NestedModel>) => {
  const nextV = { ...v };
  nextV.secondThing = await v.secondThing;

  return nextV;
};

const getAnotherDependentValue = async (v: Model<NestedModel>) => {
  const nextV = { ...v };
  nextV.nestedModel.thirdThing = await v.nestedModel.thirdThing;

  return nextV;
};

describe("Query", () => {
  it("executes entire chain where every promise resolves", async () => {
    const asyncChain = Query.of<Model<NestedModel>>(getModel)
      .chain(getValueDependentOnModel)
      .chain(getAnotherDependentValue);

    const val = await asyncChain.resolve();

    expect(val).toStrictEqual({
      firstThing: "foo",
      secondThing: "bar",
      nestedModel: { static: "value", thirdThing: "baz" },
    });
  });

  it("merges input value over map", async () => {
    const c = Query.of<{ v: number }>(() => wait(200, { v: 1 }))
      .chain(async ({ v }) => ({ v: v + 1 }))
      .chain(async ({ v }) => ({ v: v * 2 }));

    expect(await c.resolve()).toStrictEqual({ v: 4 });

    const mapped = await c
      .chain(async ({ v }) => ({ v, mappedV: v + 1 }))
      .resolve();

    expect(mapped).toStrictEqual({ v: 4, mappedV: 5 });
  });

  it("skips rejected promise", async () => {
    const c = Query.of<{ v: number }>(() => wait(200, { v: 1 }))
      .chain(async ({ v }) => waitFail(200, { v: v + 1 }))
      .chain(async ({ v }) => ({ v: v * 2 }));

    const resolved = await c.resolve();

    expect(resolved).toStrictEqual({ v: 2 });
  });
});
