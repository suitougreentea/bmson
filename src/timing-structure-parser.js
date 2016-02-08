import _ from "lodash"

export default class TimingStructureParser {
  parse(bmson) {
    let structure = []

    let unsortedEvents = new Array()
    unsortedEvents.push({ type: "bpm", y: 0, bpm: bmson.info.init_bpm })
    unsortedEvents.push(... bmson.bpm_events.map((e) => { return { type: "bpm", y: e.y, bpm: e.bpm } }))
    unsortedEvents.push(... bmson.stop_events.map((e) => { return { type: "stop", y: e.y, value: e.value } }))

    // stable sort
    const sortedEvents = _.sortBy(unsortedEvents, (e) => e.y)
    const sortedPulses = _.uniq(sortedEvents.map((e) => e.y))

    // for removal of duplication
    let lastBpm = null

    sortedPulses.forEach((pulse) => {
      const events = sortedEvents.filter((event) => event.y == pulse)
      const bpmEvent = _.findLast(events, (event) => event.type == "bpm")
      const stopDuration = _.reduce(events.filter((event) => event.type == "stop"), (result, event) => result + event.value, 0)

      let eventToPut = {}
      eventToPut.y = pulse

      if(bpmEvent && bpmEvent.bpm != lastBpm) {
        eventToPut.bpm = bpmEvent.bpm
        lastBpm = bpmEvent.bpm
      }

      if(stopDuration > 0) {
        eventToPut.stop = stopDuration
      }

      // When bpm value is same as previous one, both events are set to null due to its removal
      if(eventToPut.bpm != null || eventToPut.stop != null) structure.push(eventToPut)
    })

    return structure
  }
}
