import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { TicketDto } from './dto/ticket.dto';
import { AirplaneTicketDto } from './dto/airplane-ticket.dto';
import { TrainTicketDto } from './dto/train-ticket.dto';
import { BusTicketDto } from './dto/bus-ticket.dto';
import { TramTicketDto } from './dto/tram-ticket.dto';
import { ItineraryService } from './itinerary.service';

@ApiExtraModels(AirplaneTicketDto, TrainTicketDto, BusTicketDto, TramTicketDto)
@ApiTags('itinerary')
@Controller('itinerary')
export class ItineraryController {
  constructor(private itineraryService: ItineraryService) {}

  @Post()
  @ApiOperation({ summary: 'Submit unsorted tickets' })
  @ApiBody({
    schema: {
      oneOf: [
        { $ref: getSchemaPath(AirplaneTicketDto) },
        { $ref: getSchemaPath(TrainTicketDto) },
        { $ref: getSchemaPath(BusTicketDto) },
        { $ref: getSchemaPath(TramTicketDto) },
      ],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Tickets submitted successfully',
  })
  async createItinerary(@Body() tickets: TicketDto[]): Promise<TicketDto[]> {
    return Promise.resolve(tickets);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve previously sorted itinerary by ID' })
  @ApiResponse({
    status: 200,
    description: 'Sorted itinerary',
  })
  getTickets(@Param('id') id: string): TicketDto[] {
    return [];
  }
}
