// The only registry import pages/lib should use. Switches adapter from .env (VITE_USE_MOCK).
import { CONFIG } from "../../config.js";

export const lookup = hash =>
  (CONFIG.useMock ? import("./mock.js") : import("./chain.js")).then(m => m.lookup(hash));
