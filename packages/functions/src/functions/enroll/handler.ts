import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { getAuthToken } from '@services/fitbit';
import schema from './schema';

const enroll: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { access_token } = await getAuthToken(event.body.code);

  return formatJSONResponse({
    token: access_token,
  });
};

export const main = middyfy(enroll);
