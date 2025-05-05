import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Itinerary } from './entities/Itinerary.entity';

import { ItineraryService } from './itinerary.service';
import { ItineraryController } from './itinerary.controller';
import { AirPlaneStrategy } from './strategies/airplane.strategy';
import { TrainStrategy } from './strategies/train.strategy';
import { BusStrategy } from './strategies/bus.strategy';
import { TramStrategy } from './strategies/tram.strategy';
import { TicketRenderFactory } from './ticket.render.factory';
import { ItineraryContext } from './itinerary.context';
import { BoatStrategy } from './strategies/boat.strategy';
import { TaxiStrategy } from './strategies/taxi.strategy';

@Module({
  providers: [
    ItineraryService,
    AirPlaneStrategy,
    TrainStrategy,
    BusStrategy,
    BoatStrategy,
    TaxiStrategy,
    TramStrategy,
    TicketRenderFactory,
    ItineraryContext,
  ],
  controllers: [ItineraryController],
  imports: [TypeOrmModule.forFeature([Itinerary])], // Ensure TypeOrmModule is properly imported
})
export class ItineraryModule {}
