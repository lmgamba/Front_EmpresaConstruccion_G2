import { Component } from '@angular/core';
import { SiteCard } from './site-card/site-card';
import { IConstruction } from '../../../interfaces/iconstruction';

@Component({
  selector: 'app-constructions',
  imports: [SiteCard],
  templateUrl: './constructions.html',
  styleUrl: './constructions.css',
})
export class Constructions {




   constructions: IConstruction[] = [
    {
      id_constructions: 1,
      name: 'Downtown Plaza',
      description: 'Structural reinforcement and interior remodeling of the main commercial hall.',
      address: '124 Broadway, NY',
      latitude: 40.712776,
      longitude: -74.005974,
      status: 'In progress'
    },
    {
      id_constructions: 2,
      name: 'Skyline Tower',
      description: 'Foundations and initial structure for a 20-story residential building.',
      address: '450 W 42nd St, NY',
      latitude: 40.759243,
      longitude: -73.991409,
      status: 'Soon'
    },
    {
      id_constructions: 3,
      name: 'East River Bridge',
      description: 'Maintenance of suspension cables and surface repainting.',
      address: 'Brooklyn Bridge, NY',
      latitude: 40.706086,
      longitude: -73.996864,
      status: 'Ending'
    },
    {
      id_constructions: 4,
      name: 'Central Park Pavilion',
      description: 'Complete restoration of the historical wooden structure.',
      address: 'Central Park, NY',
      latitude: 40.781219,
      longitude: -73.966514,
      status: 'Finished'
    },
    {
      id_constructions: 5,
      name: 'Harbor Warehouse',
      description: 'Demolition of old piers and construction of a new logistics center.',
      address: 'Pier 40, NY',
      latitude: 40.729729,
      longitude: -74.011505,
      status: 'In progress'
    },
    {
      id_constructions: 6,
      name: 'Uptown Medical Center',
      description: 'Final phase of electrical and plumbing installation in the North Wing.',
      address: '168th St & Broadway, NY',
      latitude: 40.841523,
      longitude: -73.939281,
      status: 'Ending'
    }
  ];
  
}
