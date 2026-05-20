export enum VehicleType { CAR, BIKE, TRUCK }
export enum SpotType { COMPACT, LARGE, MOTORBIKE }

export class Vehicle {
  number: string;
  type: VehicleType;

  constructor(number: string, type: VehicleType) {
    this.number = number;
    this.type = type;
  }
}

export class ParkingSpot {
  id: string;
  type: SpotType;
  vehicle: Vehicle | null = null;

  constructor(id: string, type: SpotType) {
    this.id = id;
    this.type = type;
  }

  isAvailable(): boolean {
    return this.vehicle === null;
  }

  park(vehicle: Vehicle): boolean {
    if (!this.isAvailable()) return false;
    if (
      (vehicle.type === VehicleType.BIKE && this.type !== SpotType.MOTORBIKE) ||
      (vehicle.type === VehicleType.CAR && this.type === SpotType.MOTORBIKE)
    ) return false;

    this.vehicle = vehicle;
    return true;
  }

  leave(): void {
    this.vehicle = null;
  }
}

export class ParkingLot {
  floors: ParkingSpot[][];

  constructor(floorCount: number, spotsPerFloor: number) {
    this.floors = [];
    for (let f = 0; f < floorCount; f++) {
      const floor: ParkingSpot[] = [];
      for (let s = 0; s < spotsPerFloor; s++) {
        const type = s % 3 === 0 ? SpotType.MOTORBIKE : SpotType.COMPACT;
        floor.push(new ParkingSpot(`${f}-${s}`, type));
      }
      this.floors.push(floor);
    }
  }

  park(vehicle: Vehicle): boolean {
    for (const floor of this.floors) {
      for (const spot of floor) {
        if (spot.park(vehicle)) {
          console.log(`Vehicle ${vehicle.number} parked at ${spot.id}`);
          return true;
        }
      }
    }
    console.log("No spot available");
    return false;
  }

  remove(vehicleNumber: string): boolean {
    for (const floor of this.floors) {
      for (const spot of floor) {
        if (spot.vehicle?.number === vehicleNumber) {
          spot.leave();
          console.log(`Vehicle ${vehicleNumber} removed`);
          return true;
        }
      }
    }
    console.log(`Vehicle ${vehicleNumber} not found`);
    return false;
  }

  displayAvailable(): void {
    const available: string[] = [];
    this.floors.forEach(floor =>
      floor.forEach(spot => {
        if (spot.isAvailable()) available.push(spot.id);
      })
    );
    console.log("Available Spots:", available);
  }
}