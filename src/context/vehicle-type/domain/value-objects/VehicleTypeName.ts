export class VehicleTypeName {
  constructor(public value: string) {
    this.ensureIsValid();
  }

  private ensureIsValid(): void {
    if (this.value.trim() === '')
      throw new Error('The vehicle type name can not be empty');
  }
}
