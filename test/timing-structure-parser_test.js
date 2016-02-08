import assert from "power-assert"
import * as bg from "../src/"

describe("TimingStructureParser", () => {

  it("can create timing structure normally", () => {
    const bmson = {
      info: { init_bpm: 120 },
      bpm_events: [
        { y: 10, bpm: 50 },
        { y: 20, bpm: 60 },
      ],
      stop_events: [
        { y: 20, value: 100 },
        { y: 30, value: 200 },
      ]
    }
    const tsp = new bg.TimingStructureParser()
    const structure = tsp.parse(bmson)
    assert.deepEqual(structure[0], { y: 0, bpm: 120 })
    assert.deepEqual(structure[1], { y: 10, bpm: 50 })
    assert.deepEqual(structure[2], { y: 20, bpm: 60, stop: 100 })
    assert.deepEqual(structure[3], { y: 30, stop: 200 })
  })

  it("can create timing structure with irregular order", () => {
    const bmson = {
      info: { init_bpm: 120 },
      bpm_events: [
        { y: 20, bpm: 60 },
        { y: 10, bpm: 50 },
      ],
      stop_events: [
        { y: 30, value: 200 },
        { y: 20, value: 100 },
      ]
    }
    const tsp = new bg.TimingStructureParser()
    const structure = tsp.parse(bmson)
    assert.deepEqual(structure[0], { y: 0, bpm: 120 })
    assert.deepEqual(structure[1], { y: 10, bpm: 50 })
    assert.deepEqual(structure[2], { y: 20, bpm: 60, stop: 100 })
    assert.deepEqual(structure[3], { y: 30, stop: 200 })
  })

  it("can create timing structure with duplication of y", () => {
    const bmson = {
      info: { init_bpm: 120 },
      bpm_events: [
        { y: 10, bpm: 50 },
        { y: 10, bpm: 60 },
        { y: 10, bpm: 70 },
        { y: 20, bpm: 60 },
      ],
      stop_events: [
        { y: 20, value: 100 },
        { y: 30, value: 200 },
        { y: 30, value: 800 },
      ]
    }
    const tsp = new bg.TimingStructureParser()
    const structure = tsp.parse(bmson)
    assert.deepEqual(structure[0], { y: 0, bpm: 120 })
    assert.deepEqual(structure[1], { y: 10, bpm: 70 })
    assert.deepEqual(structure[2], { y: 20, bpm: 60, stop: 100 })
    assert.deepEqual(structure[3], { y: 30, stop: 1000 })
  })

  it("can create timing structure with no bpm change between neighbor events", () => {
    const bmson = {
      info: { init_bpm: 50 },
      bpm_events: [
        { y: 10, bpm: 50 },
        { y: 20, bpm: 60 },
        { y: 30, bpm: 60 },
        { y: 40, bpm: 70 },
      ],
      stop_events: []
    }
    const tsp = new bg.TimingStructureParser()
    const structure = tsp.parse(bmson)
    assert.deepEqual(structure[0], { y: 0, bpm: 50 })
    assert.deepEqual(structure[1], { y: 20, bpm: 60 })
    assert.deepEqual(structure[2], { y: 40, bpm: 70 })
  })

  it("can create timing structure with y=0 bpm", () => {
    const bmson = {
      info: { init_bpm: 120 },
      bpm_events: [
        { y: 0, bpm: 50 },
        { y: 10, bpm: 60 },
      ],
      stop_events: []
    }
    const tsp = new bg.TimingStructureParser()
    const structure = tsp.parse(bmson)
    assert.deepEqual(structure[0], { y: 0, bpm: 50 })
    assert.deepEqual(structure[1], { y: 10, bpm: 60 })
  })

  it("can create timing structure with y=0 stop", () => {
    const bmson = {
      info: { init_bpm: 120 },
      bpm_events: [],
      stop_events: [
        { y: 0, value: 200 },
        { y: 10, value: 100 },
      ]
    }
    const tsp = new bg.TimingStructureParser()
    const structure = tsp.parse(bmson)
    assert.deepEqual(structure[0], { y: 0, bpm: 120, stop: 200 })
    assert.deepEqual(structure[1], { y: 10, stop: 100 })
  })
})
