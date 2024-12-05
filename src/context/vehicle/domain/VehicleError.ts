export class VehicleError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'VehicleError';
  }
}
