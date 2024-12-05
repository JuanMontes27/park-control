import {
  VehicleTypeId,
  VehicleTypeName,
  VehicleTypeRatePerMinute,
} from './value-objects';

export class VehicleType {
  private constructor(
    private readonly _id: VehicleTypeId,
    private _name: VehicleTypeName,
    private _ratePerMinute: VehicleTypeRatePerMinute,
  ) {}

  static create(
    id: number = 0,
    name: string,
    ratePerMinute: number,
  ): VehicleType {
    const vehicleTypeId = new VehicleTypeId(id);
    const vehicleTypeName = new VehicleTypeName(name);
    const vehicleTypeRatePerMinute = new VehicleTypeRatePerMinute(
      ratePerMinute,
    );

    return new VehicleType(
      vehicleTypeId,
      vehicleTypeName,
      vehicleTypeRatePerMinute,
    );
  }

  get id(): number {
    return this._id.value;
  }

  get name(): string {
    return this._name.value;
  }

  get ratePerMinute(): number {
    return this._ratePerMinute.value;
  }

  set name(name: string) {
    const vehicleTypeName = new VehicleTypeName(name);
    this._name = vehicleTypeName;
  }

  set ratePerMinute(ratePerMinute: number) {
    const vehicleTypeRatePerMinute = new VehicleTypeRatePerMinute(
      ratePerMinute,
    );
    this._ratePerMinute = vehicleTypeRatePerMinute;
  }

  public toObject() {
    return {
      id: this._id.value,
      name: this._name.value,
      ratePerMinute: this._ratePerMinute.value,
    };
  }
}
