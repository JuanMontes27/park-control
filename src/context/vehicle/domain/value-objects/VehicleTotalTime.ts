import { VehicleError } from '../VehicleError';

export class VehicleTotalTime {
  constructor(public value: number | undefined) {
    this.ensureIsValid();
  }

  private ensureIsValid(): void {
    if (this.value !== undefined && this.value < 0)
      throw new VehicleError('A vehicle cannot have negative time');
  }
}
