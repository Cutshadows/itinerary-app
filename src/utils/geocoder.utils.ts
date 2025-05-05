import * as NeoGeocoder from 'node-geocoder';

const options = {
  provider: 'openstreetmap',
  format: null,
} as NeoGeocoder.Options;

const geocoder = NeoGeocoder(options);

const getCoordinates = async (address: string) => {
  const res = await geocoder.geocode(address);

  if (res.length === 0) {
    console.error(`No coordinates found : ${address}`);
    // throw new Error('No coordinates found');
  }
  return res[0];
};

export { getCoordinates };
