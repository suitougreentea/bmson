import _ from "lodash"

export default class NoteParser {
  parse(bmson) {
    return bmson.sound_channels.map((channel) => {
      let obj = {}
      obj.name = channel.name
      obj.notes = _(channel.notes)
        .sortBy((e) => e.y)
        .uniqWith((a, b) => a.x == b.x && a.y == b.y)
        .value()
      return obj
    })
  }
}
