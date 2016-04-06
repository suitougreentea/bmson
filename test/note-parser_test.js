import assert from "power-assert"
import NoteParser from "../src/note-parser"

describe("NoteParser", () => {
  it("can parse sound_channels", () => {
    const bmson = {
      sound_channels: [
        {
          name: "name_1",
          notes: [
            {x: 0, y: 0, c: false},
            {x: 1, y: 240, c: true}
          ]
        },
        {
          name: "name_2",
          notes: [
            {x: 2, y: 480, c: false},
            {x: 3, y: 720, c: true}
          ]
        }
      ]
    }

    const np = new NoteParser()
    const channels = np.parse(bmson)

    assert(channels[0].name == "name_1")
    assert(channels[1].name == "name_2")
    assert.deepEqual(channels[0].notes, [
      {x: 0, y: 0, c: false},
      {x: 1, y: 240, c: true}
    ])
    assert.deepEqual(channels[1].notes, [
      {x: 2, y: 480, c: false},
      {x: 3, y: 720, c: true}
    ])
  })

  it("can remove duplication", () => {
    const bmson = {
      sound_channels: [
        {
          name: "name_1",
          notes: [
            {x: 0, y: 0, c: false},
            {x: 1, y: 240, c: true},
            {x: 1, y: 240, c: true}
          ]
        },
      ]
    }

    const np = new NoteParser()
    const channels = np.parse(bmson)

    assert.deepEqual(channels[0].notes, [
      {x: 0, y: 0, c: false},
      {x: 1, y: 240, c: true}
    ])
  })

  it("can sort notes", () => {
    const bmson = {
      sound_channels: [
        {
          name: "name_1",
          notes: [
            {x: 1, y: 240, c: true},
            {x: 0, y: 0, c: false}
          ]
        },
      ]
    }

    const np = new NoteParser()
    const channels = np.parse(bmson)

    assert.deepEqual(channels[0].notes, [
      {x: 0, y: 0, c: false},
      {x: 1, y: 240, c: true}
    ])
  })
})
