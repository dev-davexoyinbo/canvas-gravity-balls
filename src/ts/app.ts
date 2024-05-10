import { setCanvasToFullScreen } from "./utils.js";

export const rootStyle = document.documentElement;
export const DEVICE_DPI_RATIO = window.devicePixelRatio || 1;
export const canvas: HTMLCanvasElement = document.querySelector(
  ".canvas"
) as HTMLCanvasElement;
export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
