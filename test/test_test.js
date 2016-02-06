import assert from "power-assert"
import test from "../src/"

describe("bmson v1", () => {
  it("can do nothing", () => {
    assert(test(0) == 0)
    assert(test(1) == 1)
  })
})
