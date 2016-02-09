/**
 * A class construct timing table according to timing structure.
 */
export default class TimingTableConstructor {
  /**
   * Create timing table.
   * @param  {Object[]} timingStructure A timing structure parsed by {@link TimingStructureParser}.
   * @param  {Number}   resolution      bmson resolution.
   * @return {Object[]}                 A timing table object.
   */
  construct(timingStructure, resolution) {
    let table = []

    let currentTime = 0
    let lastY = 0
    let lastSpeed = null

    // speed[pulse/ms] = bpm[beat/min] * resolution[pulse/beat] * 1/60000[min/ms]
    timingStructure.forEach((timing) => {
      const dy = timing.y - lastY
      lastY = timing.y
      if(lastSpeed != null) currentTime += dy / lastSpeed

      if(timing.bpm != null) {
        // speed change
        lastSpeed = timing.bpm * resolution / 60000
      }

      if(timing.stop != null) {
        // STOP event
        table.push({
          time: currentTime,
          y: timing.y,
          speed: 0
        })
        currentTime += timing.stop / lastSpeed
        table.push({
          time: currentTime,
          y: timing.y,
          speed: lastSpeed
        })
      } else if(timing.bpm != null) {
        // BPM change without STOP event
        table.push({
          time: currentTime,
          y: timing.y,
          speed: lastSpeed
        })
      }
    })

    return table
  }
}
