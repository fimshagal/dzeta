import "./../css/base.css";
import "./../css/zeta.css";

import { onDocReady } from "./utils";
import { exeZetaFn } from "./exe.zeta.fn";

(async(): Promise<void> => {
    await onDocReady();
    exeZetaFn();
})();