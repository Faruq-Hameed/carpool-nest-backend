import { Injectable } from '@nestjs/common';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';

@Injectable()
export class RidesService {
  create(createRideDto: CreateRideDto) {
    return 'This action adds a new ride';
  }

  findAll() {
    return `This action returns all rides`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ride`;
  }

  update(id: number, updateRideDto: UpdateRideDto) {
    return `This action updates a #${id} ride`;
  }

  remove(id: number) {
    return `This action removes a #${id} ride`;
  }
}
