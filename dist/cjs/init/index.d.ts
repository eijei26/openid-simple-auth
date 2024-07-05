import { iConnectionOptions, iInitResponse } from './interface.js';
declare const init: (connectionOptions: iConnectionOptions) => Promise<iInitResponse>;
export default init;
