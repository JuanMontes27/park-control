import { VehicleError } from '../VehicleError';

export class VehicleAmountCharged {
  constructor(public value: number | undefined) {
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (this.value !== undefined && this.value < 0)
      throw new VehicleError('A vehicle cannot have negative amount');
  }
}
