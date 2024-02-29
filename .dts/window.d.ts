import {StreplyInterface} from "@streply/browser/src/types";

export {};

declare global {
    interface Window {
        Streply: StreplyInterface;
    }
}
