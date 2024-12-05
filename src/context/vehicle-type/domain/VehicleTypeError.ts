export class VehicleTypeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'VehicleTypeError';
  }
}
