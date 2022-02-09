export type Point = {
  x: number;
  y: number;
};

/* Hammer.js types, adapted from @types/hammerjs */

export interface Recognizer {
  defaults: any;

  canEmit(): boolean;
  canRecognizeWith(otherRecognizer: Recognizer): boolean;
  dropRecognizeWith(otherRecognizer: Recognizer | Recognizer[] | string): Recognizer;
  dropRequireFailure(otherRecognizer: Recognizer | Recognizer[] | string): Recognizer;
  emit(input: HammerInput): void;
  getTouchAction(): any[];
  hasRequireFailures(): boolean;
  process(inputData: HammerInput): string;
  recognize(inputData: HammerInput): void;
  recognizeWith(otherRecognizer: Recognizer | Recognizer[] | string): Recognizer;
  requireFailure(otherRecognizer: Recognizer | Recognizer[] | string): Recognizer;
  reset(): void;
  set(options?: RecognizerOptions): Recognizer;
  tryEmit(input: HammerInput): void;
}

export interface RecognizerOptions {
  direction?: number;
  enable?: boolean | ((recognizer: Recognizer, inputData: HammerInput) => boolean);
  event?: string;
  interval?: number;
  pointers?: number;
  posThreshold?: number;
  taps?: number | undefined;
  threshold?: number;
  time?: number;
  velocity?: number;
}

export interface RecognizerStatic {
  new (options?: RecognizerOptions): Recognizer;
}

export type RecognizerTuple =
  | [RecognizerStatic]
  | [RecognizerStatic, RecognizerOptions]
  | [RecognizerStatic, RecognizerOptions, string | string[]]
  | [
      RecognizerStatic,
      RecognizerOptions,
      string | string[],
      (string | Recognizer) | (string | Recognizer)[]
    ];

export interface HammerOptions {
  // cssProps?: CssProps;
  domEvents?: boolean;
  enable?: boolean | ((manager: HammerManager) => boolean);
  preset?: RecognizerTuple[];
  touchAction?: string;
  recognizers?: RecognizerTuple[];
}

export interface HammerManager {
  // add( recognizer:Recognizer ):Recognizer;
  // add( recognizer:Recognizer[] ):HammerManager;
  destroy(): void;
  emit(event: string, data: any): void;
  get(recognizer: Recognizer): Recognizer;
  get(recognizer: string): Recognizer;
  off(events: string, handler?: (event: HammerInput) => void): HammerManager;
  on(events: string, handler: (event: HammerInput) => void): HammerManager;
  // recognize( inputData:any ):void;
  // remove( recognizer:Recognizer ):HammerManager;
  // remove( recognizer:string ):HammerManager;
  set(options: HammerOptions): HammerManager;
  // stop( force:boolean ):void;
}

export interface HammerManagerConstructor {
  new (element: EventTarget, options?: HammerOptions): HammerManager;
}

/** A hammerjs gesture event */
export type HammerInput = {
  /** Name of the event. */
  type:
    | 'tap'
    | 'anytap'
    | 'doubletap'
    | 'press'
    | 'pinch'
    | 'pinchin'
    | 'pinchout'
    | 'pinchstart'
    | 'pinchmove'
    | 'pinchend'
    | 'pinchcancel'
    | 'rotate'
    | 'rotatestart'
    | 'rotatemove'
    | 'rotateend'
    | 'rotatecancel'
    | 'tripan'
    | 'tripanstart'
    | 'tripanmove'
    | 'tripanup'
    | 'tripandown'
    | 'tripanleft'
    | 'tripanright'
    | 'tripanend'
    | 'tripancancel'
    | 'pan'
    | 'panstart'
    | 'panmove'
    | 'panup'
    | 'pandown'
    | 'panleft'
    | 'panright'
    | 'panend'
    | 'pancancel'
    | 'swipe'
    | 'swipeleft'
    | 'swiperight'
    | 'swipeup'
    | 'swipedown';

  /** Movement of the X axis. */
  deltaX: number;

  /** Movement of the Y axis. */
  deltaY: number;

  /** Total time in ms since the first input. */
  deltaTime: number;

  /** Distance moved. */
  distance: number;

  /** Angle moved. */
  angle: number;

  /** Velocity on the X axis, in px/ms. */
  velocityX: number;

  /** Velocity on the Y axis, in px/ms */
  velocityY: number;

  /** Highest velocityX/Y value. */
  velocity: number;

  /** Direction moved. Matches the DIRECTION constants. */
  direction: number;

  /** Direction moved from it's starting point. Matches the DIRECTION constants. */
  offsetDirection: number;

  /** Scaling that has been done when multi-touch. 1 on a single touch. */
  scale: number;

  /** Rotation that has been done when multi-touch. 0 on a single touch. */
  rotation: number;

  /** Center position for multi-touch, or just the single pointer. */
  center: Point;

  /** Source event object, type TouchEvent, MouseEvent or PointerEvent. */
  srcEvent: TouchEvent | MouseEvent | PointerEvent;

  /** Target that received the event. */
  target: HTMLElement;

  /** Primary pointer type, could be touch, mouse, pen or kinect. */
  pointerType: string;

  /** Event type, matches the INPUT constants. */
  eventType: string;

  /** true when the first input. */
  isFirst: boolean;

  /** true when the final (last) input. */
  isFinal: boolean;

  /** Array with all pointers, including the ended pointers (touchend, mouseup). */
  pointers: any[];

  /** Array with all new/moved/lost pointers. */
  changedPointers: any[];

  /** Maximum number of pointers detected in the gesture */
  maxPointers: number;

  /** Timestamp of a gesture */
  timeStamp: number;

  /** Reference to the srcEvent.preventDefault() method. Only for experts! */
  preventDefault: () => void;
};

/* mjolnir.js */

export interface MjolnirEventRaw {
  type: string;
  srcEvent: Event;
  target: HTMLElement;
}

export type MjolnirEventWrapper<T extends MjolnirEventRaw> = T & {
  rootElement: HTMLElement;
  center?: Point;
  offsetCenter?: Point;
  leftButton?: boolean;
  rightButton?: boolean;
  middleButton?: boolean;
  handled: boolean;
  stopPropagation: () => void;
  stopImmediatePropagation: () => void;
};

export type MjolnirPointerEventRaw = MjolnirEventRaw & {
  type:
    | 'contextmenu'
    | 'pointermove'
    | 'pointerover'
    | 'pointerout'
    | 'pointerenter'
    | 'pointerleave';
  pointerType: 'mouse' | 'touch';
  srcEvent: TouchEvent | MouseEvent | PointerEvent;
};

export type MjolnirWheelEventRaw = MjolnirEventRaw & {
  type: 'wheel';
  pointerType: 'mouse';
  center: Point;
  srcEvent: WheelEvent;
  delta: number;
};

export type MjolnirKeyEventRaw = MjolnirEventRaw & {
  type: 'keydown' | 'keyup';
  key: string;
  srcEvent: KeyboardEvent;
};

export type MjolnirEvent =
  | MjolnirEventWrapper<HammerInput>
  | MjolnirEventWrapper<MjolnirPointerEventRaw>
  | MjolnirEventWrapper<MjolnirWheelEventRaw>
  | MjolnirEventWrapper<MjolnirKeyEventRaw>;

export type MjolnirEventHandler = (event: MjolnirEvent) => void;
