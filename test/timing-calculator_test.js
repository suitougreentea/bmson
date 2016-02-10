import assert from "power-assert"
import TimingCalculator from "../src/timing-calculator"

describe("TimingCalculator", () => {
  it("can calculate pulse number from time", () => {
    const table = [
      { time: 0, y: 0, speed: 120 * 240 / 60000 },
      { time: 2000, y: 960, speed: 0 },
      { time: 2500, y: 960, speed: 120 * 240 / 60000 },
      { time: 4500, y: 1920, speed: 0 },
      { time: 4750, y: 1920, speed: 240 * 240 / 60000 },
    ]

    const tc = new TimingCalculator(240)

    // in range
    assert(tc.calculatePulseFromTime(0, table[0]) == 0)
    assert(tc.calculatePulseFromTime(1000, table[0]) == 480)
    assert(tc.calculatePulseFromTime(2000, table[1]) == 960)
    assert(tc.calculatePulseFromTime(2250, table[1]) == 960)
    assert(tc.calculatePulseFromTime(3500, table[2]) == 1440)
    assert(tc.calculatePulseFromTime(5000, table[4]) == 2160)

    // out of range
    assert(tc.calculatePulseFromTime(4000, table[0]) == 1920)
    assert(tc.calculatePulseFromTime(1500, table[2]) == 480)
    assert(tc.calculatePulseFromTime(4000, table[3]) == 1920)
  })

  it("can calculate time number from pulse number", () => {
    const table = [
      { time: 0, y: 0, speed: 120 * 240 / 60000 },
      { time: 2000, y: 960, speed: 0 },
      { time: 2500, y: 960, speed: 120 * 240 / 60000 },
      { time: 4500, y: 1920, speed: 0 },
      { time: 4750, y: 1920, speed: 240 * 240 / 60000 },
    ]

    const tc = new TimingCalculator()

    // in range
    assert(tc.calculateTimeFromPulse(0, table[0]) == 0)
    assert(tc.calculateTimeFromPulse(480, table[0]) == 1000)
    assert(tc.calculateTimeFromPulse(960, table[1]) == 2000)
    assert(tc.calculateTimeFromPulse(1440, table[2]) == 3500)
    assert(tc.calculateTimeFromPulse(2160, table[4]) == 5000)

    // out of range
    assert(tc.calculateTimeFromPulse(1920, table[0]) == 4000)
    assert(tc.calculateTimeFromPulse(480, table[2]) == 1500)
  })
})
