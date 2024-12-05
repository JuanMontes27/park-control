export class VehicleTypeRatePerMinute {
  constructor(public value: number) {
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (this.value < 0)
      throw new Error(
        'The rate per minute cannot be negative for any vehicle type',
      );
  }
}
