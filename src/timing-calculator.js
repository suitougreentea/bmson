/**
 * A class calculates between time and pulse number according to timing table created by {@link TimingTableConstructor}.
 */
export default class TimingCalculator {
  /**
   * Calculate pulse number from time value.
   * @param  {Number} time     Time (millisecond).
   * @param  {Object} tableRow An element of timing table created by {@link TimingTableConstructor}.
   * @return {Number}          Pulse number.
   */
  calculatePulseFromTime(time, tableRow) {
    return tableRow.y + (time - tableRow.time) * tableRow.speed
  }

  /**
   * Calculate time value from pulse number.
   * @param  {Number} pulse    Pulse number.
   * @param  {Object} tableRow An element of timing table created by {@link TimingTableConstructor}.
   * @return {Number}          Time (millisecond).
   */
  calculateTimeFromPulse(pulse, tableRow) {
    if(tableRow.speed == 0) return tableRow.time
    return tableRow.time + (pulse - tableRow.y) / tableRow.speed
  }
}
