import * as NeoGeocoder from 'node-geocoder';

const options = {
  provider: 'openstreetmap',
  format: 'string',
} as NeoGeocoder.Options;

const geocoder = NeoGeocoder(options);

const getCoordinates = async (address: string) => {
  const result = await geocoder.geocode(address);
  console.log('GeoCodeResult', result);

  if (!result || result.length === 0) {
    return { [address]: [undefined, undefined] };
  }
  const { latitude, longitude } = result[0];

  return { [address]: [latitude, longitude] };
};

export { getCoordinates };
