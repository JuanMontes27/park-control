import { VehicleType } from '../../vehicle-type/domain';
import {
  VehicleAmountCharged,
  VehicleEntryTime,
  VehicleExitTime,
  VehicleId,
  VehicleLicensePlate,
  VehicleTotalTime,
} from './value-objects';
import { VehicleError } from './VehicleError';

interface IVehicle {
  id?: number;
  licensePlate: string;
  type: VehicleType;
  entryTime: Date;
  exitTime?: Date;
  totalTime?: number;
  amountCharged?: number;
}

export class Vehicle {
  private constructor(
    private readonly _id: VehicleId,
    private _licensePlate: VehicleLicensePlate,
    private _type: VehicleType,
    private _entryTime: VehicleEntryTime,
    private _exitTime: VehicleExitTime,
    private _totalTime: VehicleTotalTime,
    private _amountCharged: VehicleAmountCharged,
  ) {}

  static create(vehicle: IVehicle): Vehicle {
    const {
      id,
      licensePlate,
      type,
      entryTime,
      exitTime,
      totalTime,
      amountCharged,
    } = vehicle;

    const vehicleId = new VehicleId(id ?? 0);
    const vehicleLicensePlate = new VehicleLicensePlate(licensePlate);
    const vehicleType = type;
    const vehicleEntryTime = new VehicleEntryTime(entryTime);
    const vehicleExitTime = new VehicleExitTime(exitTime);
    const vehicleTotalTime = new VehicleTotalTime(totalTime);
    const vehicleAmountCharged = new VehicleAmountCharged(amountCharged);

    return new Vehicle(
      vehicleId,
      vehicleLicensePlate,
      vehicleType,
      vehicleEntryTime,
      vehicleExitTime,
      vehicleTotalTime,
      vehicleAmountCharged,
    );
  }

  get id(): number {
    return this._id.value;
  }

  get licensePlate(): string {
    return this._licensePlate.value;
  }

  get type(): VehicleType {
    return this._type;
  }

  get entryTime(): Date {
    return this._entryTime.value;
  }

  get exitTime(): Date | undefined {
    return this._exitTime.value;
  }

  get totalTime(): number | undefined {
    return this._totalTime.value;
  }

  get amountCharged(): number | undefined {
    return this._amountCharged.value;
  }

  set licensePlate(licensePlate: string) {
    this._licensePlate = new VehicleLicensePlate(licensePlate);
  }

  set type(type: VehicleType) {
    this._type = type;
  }

  set entryTime(entryTime: Date) {
    this._entryTime = new VehicleEntryTime(entryTime);
  }

  set exitTime(exitTime: Date) {
    if (exitTime < this._entryTime.value)
      throw new VehicleError(
        'The departure date must be later than the arrival date',
      );

    this._exitTime = new VehicleExitTime(exitTime);
  }

  set totalTime(totalTime: number) {
    this._totalTime = new VehicleTotalTime(totalTime);
  }

  set amountCharged(amountCharged: number) {
    this._amountCharged = new VehicleAmountCharged(amountCharged);
  }

  public toObject() {
    return {
      id: this._id.value,
      licensePlate: this._licensePlate.value,
      type: this._type.toObject(),
      entryTime: this._entryTime.value,
      exitTime: this._exitTime.value,
      totalTime: this._totalTime.value,
      amountCharged: this._amountCharged.value,
    };
  }
}
