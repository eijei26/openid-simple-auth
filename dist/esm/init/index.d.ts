import { iConnectionOptions, iInitResponse } from './interface';
declare const init: (connectionOptions: iConnectionOptions) => Promise<iInitResponse>;
export default init;
