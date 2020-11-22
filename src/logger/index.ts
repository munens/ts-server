import _ from 'lodash';
import { BaseLogger } from "../interfaces";

export default class Logger implements BaseLogger {

  logError(error): void {
    // eslint-disable-next-line no-console
    console.log({error});

    const headers = _.get(error, ['response', 'headers']);
    // eslint-disable-next-line no-console
    console.log({'error-headers': headers});

    const data = _.get(error, ['response', 'data']);
    // eslint-disable-next-line no-console
    console.log({'error-data': data});
  }

}
