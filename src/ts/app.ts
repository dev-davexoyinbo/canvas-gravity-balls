import { setCanvasToFullScreen } from "./utils.js";

export const rootStyle = document.documentElement;
export const DEVICE_DPI_RATIO = window.devicePixelRatio || 1;
export const canvas: HTMLCanvasElement = document.querySelector(
  ".canvas"
) as HTMLCanvasElement;
export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

// number of balls per 10_000 pixels square, ie 100px x 100px
export const BALLS_DENSITY = 1;

