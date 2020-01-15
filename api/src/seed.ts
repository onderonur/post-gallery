import { createConnection } from 'typeorm';
import { ComponentType } from './entity/ComponentType';
import { Location } from './entity/Location';
import { SubLocation } from './entity/SubLocation';

const seedDb = async () => {
  await createConnection();
  const componentTypes = [
    { name: 'Component Type 1' },
    { name: 'Component Type 2' },
    { name: 'Component Type 3' },
  ];
  const componentTypeEntities = componentTypes.map(componentType => {
    const entity = new ComponentType();
    entity.name = componentType.name;
    return entity;
  });
  await ComponentType.save(componentTypeEntities);
  const locations = [
    {
      name: 'Location 1',
      subLocations: [
        { name: 'Location 1 / SubLocation 1' },
        { name: 'Location 1 / SubLocation 2' },
        { name: 'Location 1 / SubLocation 3' },
      ],
    },
    {
      name: 'Location 2',
      subLocations: [
        { name: 'Location 2 / SubLocation 1' },
        { name: 'Location 2 / SubLocation 2' },
        { name: 'Location 2/ SubLocation 3' },
      ],
    },
    {
      name: 'Location 3',
      subLocations: [
        { name: 'Location 3 / SubLocation 1' },
        { name: 'Location 3 / SubLocation 2' },
        { name: 'Location 3 / SubLocation 3' },
      ],
    },
    {
      name: 'Location 4',
      subLocations: [
        { name: 'Location 4 / SubLocation 1' },
        { name: 'Location 4 / SubLocation 2' },
        { name: 'Location 4 / SubLocation 3' },
      ],
    },
    {
      name: 'Location 5',
      subLocations: [
        { name: 'Location 5 / SubLocation 1' },
        { name: 'Location 5 / SubLocation 2' },
        { name: 'Location 5 / SubLocation 3' },
      ],
    },
    {
      name: 'Location 6',
      subLocations: [
        { name: 'Location 6 / SubLocation 1' },
        { name: 'Location 6 / SubLocation 2' },
        { name: 'Location 6 / SubLocation 3' },
      ],
    },
  ];
  const locationEntities = locations.map(location => {
    const entity = new Location();
    entity.name = location.name;
    entity.subLocations = location.subLocations.map(subLocation => {
      const subEntity = new SubLocation();
      subEntity.name = subLocation.name;
      return subEntity;
    });
    return entity;
  });
  await Location.save(locationEntities);
};

seedDb();
