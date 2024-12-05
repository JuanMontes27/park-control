import { VehicleError } from '../VehicleError';

export class VehicleLicensePlate {
  constructor(public value: string) {
    this.ensureIsValid();
  }

  private ensureIsValid(): void {
    const isLicensePlateValid = Boolean(this.value.match(/^[A-Z0-9]{6,7}$/));

    if (!isLicensePlateValid)
      throw new VehicleError(
        'The license plate must be 6 or 7 characters long and contain only uppercase letters (A-Z) and digits (0-9)',
      );
  }
}
