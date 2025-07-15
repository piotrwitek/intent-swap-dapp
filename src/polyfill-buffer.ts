// Polyfill for buffer.Buffer in browser
import { Buffer } from "buffer";

if (typeof window !== "undefined") {
  window.Buffer = Buffer;
}
