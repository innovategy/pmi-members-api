import { createClientAsync } from 'soap';

import * as path from 'path';
const WSDL_PATH = path.join(__dirname, 'wsdl', 'DEPService.wsdl');

export async function getDepClient(username: string, password: string) {
  const client = await createClientAsync(WSDL_PATH);
  const { WSSecurity } = require('soap');
client.setSecurity(new WSSecurity(username, password, { passwordType: 'PasswordText' }));
  return client;
}
