// Polyfill for buffer.Buffer in browser
import { Buffer } from "buffer";

if (typeof window !== "undefined") {
  // @ts-ignore
  window.Buffer = Buffer;
}
