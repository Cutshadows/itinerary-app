import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBody,
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

@ApiTags('itinerary')
@Controller('itinerary')
export class ItineraryController {
  constructor() {}

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
    // type: [TicketDto],
  })
  async createItinerary(@Body() tickets: TicketDto[]): Promise<TicketDto[]> {
    // Here you would typically save the tickets to a database or process them
    // For this example, we'll just return the tickets
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
