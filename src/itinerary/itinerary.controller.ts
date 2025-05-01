import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TicketsDto } from './dto/create-itinerary.dto';

@ApiTags('itinerary')
@Controller('itinerary')
export class ItineraryController {
  constructor() {}

  @Post()
  @ApiOperation({ summary: 'Submit unsorted tickets' })
  @ApiBody({
    type: [TicketsDto],
  })
  @ApiResponse({
    status: 201,
    description: 'Tickets submitted successfully',
    type: [TicketsDto],
  })
  async createItinerary(@Body() tickets: TicketsDto[]): Promise<TicketsDto[]> {
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
  getTickets(@Param('id') id: string): TicketsDto[] {
    return [];
  }
}
