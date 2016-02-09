import assert from "power-assert"
import TimingTableConstructor from "../src/timing-table-constructor"

describe("TimingTableConstructor", () => {
  it("can create timing table with resolution of 240", () => {
    const timingStructure = [
      { y: 0, bpm: 120 },
      { y: 960, stop: 240 },
      { y: 1920, bpm: 240, stop: 240 },
    ]

    const ttc = new TimingTableConstructor()
    const table = ttc.construct(timingStructure, 240)

    // speed[pulse/ms] = bpm[beat/min] * resolution[pulse/beat] * 1/60000[min/ms]
    assert.deepEqual(table[0], { time: 0, y: 0, speed: 120 * 240 / 60000 })
    assert.deepEqual(table[1], { time: 2000, y: 960, speed: 0 })
    assert.deepEqual(table[2], { time: 2500, y: 960, speed: 120 * 240 / 60000 })
    assert.deepEqual(table[3], { time: 4500, y: 1920, speed: 0 })
    assert.deepEqual(table[4], { time: 4750, y: 1920, speed: 240 * 240 / 60000 })
  })

  it("can create timing table with resolution of 960", () => {
    const timingStructure = [
      { y: 0, bpm: 120 },
      { y: 960, stop: 240 },
      { y: 1920, bpm: 240, stop: 240 },
    ]

    const ttc = new TimingTableConstructor()
    const table = ttc.construct(timingStructure, 960)

    // speed[pulse/ms] = bpm[beat/min] * resolution[pulse/beat] * 1/60000[min/ms]
    assert.deepEqual(table[0], { time: 0, y: 0, speed: 120 * 960 / 60000 })
    assert.deepEqual(table[1], { time: 500, y: 960, speed: 0 })
    assert.deepEqual(table[2], { time: 625, y: 960, speed: 120 * 960 / 60000 })
    assert.deepEqual(table[3], { time: 1125, y: 1920, speed: 0 })
    assert.deepEqual(table[4], { time: 1187.5, y: 1920, speed: 240 * 960 / 60000 })
  })
})
