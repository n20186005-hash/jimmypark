type GtagFunction = (command: string, eventName: string, parameters?: Record<string, string>) => void;

declare global {
  interface Window {
    gtag?: GtagFunction;
  }
}

type Motif = 'ticket' | 'forest' | 'starlight' | 'notebook' | 'rain' | 'sunset';
type FacingMode = 'user' | 'environment';

type Template = {
  id: string;
  title: string;
  routeTitle: string;
  routeLabel: string;
  stops: string[];
  paper: string;
  accent: string;
  accentSoft: string;
  ink: string;
  motif: Motif;
};

type OutputFormat = {
  id: string;
  name: string;
  width: number;
  height: number;
};

type Point = {
  x: number;
  y: number;
};

type EditorState = {
  image: HTMLCanvasElement | null;
  template: Template;
  format: OutputFormat;
  zoom: number;
  rotation: number;
  flipX: number;
  offsetX: number;
  offsetY: number;
  brightness: number;
  contrast: number;
  saturation: number;
  caption: string;
  visitorName: string;
  visitDate: string;
  pointers: Map<number, Point>;
  pinchDistance: number;
  pinchZoom: number;
};

type CardLayout = {
  photo: { x: number; y: number; width: number; height: number };
  contentX: number;
  contentY: number;
  contentWidth: number;
  routeStart: number;
  routeEnd: number;
  routeAxis: number;
  landscape: boolean;
};

const canvas = document.querySelector<HTMLCanvasElement>('[data-postcard-canvas]');
const photoInput = document.querySelector<HTMLInputElement>('[data-photo-input]');
const dropPhotoInput = document.querySelector<HTMLInputElement>('[data-drop-photo-input]');
const uploadZone = document.querySelector<HTMLElement>('[data-upload-zone]');
const fileLabel = document.querySelector<HTMLElement>('[data-file-label]');
const captionInput = document.querySelector<HTMLInputElement>('[data-caption-input]');
const captionCount = document.querySelector<HTMLElement>('[data-caption-count]');
const nameInput = document.querySelector<HTMLInputElement>('[data-name-input]');
const dateInput = document.querySelector<HTMLInputElement>('[data-date-input]');
const zoomInput = document.querySelector<HTMLInputElement>('[data-zoom-input]');
const zoomOutput = document.querySelector<HTMLOutputElement>('[data-zoom-output]');
const brightnessInput = document.querySelector<HTMLInputElement>('[data-brightness-input]');
const brightnessOutput = document.querySelector<HTMLOutputElement>('[data-brightness-output]');
const contrastInput = document.querySelector<HTMLInputElement>('[data-contrast-input]');
const contrastOutput = document.querySelector<HTMLOutputElement>('[data-contrast-output]');
const saturationInput = document.querySelector<HTMLInputElement>('[data-saturation-input]');
const saturationOutput = document.querySelector<HTMLOutputElement>('[data-saturation-output]');
const rotateLeft = document.querySelector<HTMLButtonElement>('[data-rotate-left]');
const rotateRight = document.querySelector<HTMLButtonElement>('[data-rotate-right]');
const flipPhoto = document.querySelector<HTMLButtonElement>('[data-flip-photo]');
const resetPhoto = document.querySelector<HTMLButtonElement>('[data-reset-photo]');
const downloadButton = document.querySelector<HTMLButtonElement>('[data-download]');
const shareButton = document.querySelector<HTMLButtonElement>('[data-share]');
const status = document.querySelector<HTMLElement>('[data-editor-status]');
const previewFormat = document.querySelector<HTMLElement>('[data-preview-format]');
const templateButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-postcard-template]'));
const formatButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-postcard-format]'));
const phraseButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-phrase]'));
const cameraButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-open-camera]'));
const cameraDialog = document.querySelector<HTMLDialogElement>('[data-camera-dialog]');
const cameraVideo = document.querySelector<HTMLVideoElement>('[data-camera-video]');
const cameraViewport = document.querySelector<HTMLElement>('[data-camera-viewport]');
const cameraStatus = document.querySelector<HTMLElement>('[data-camera-status]');
const cameraCountdown = document.querySelector<HTMLElement>('[data-camera-countdown]');
const cameraTimer = document.querySelector<HTMLInputElement>('[data-camera-timer]');
const closeCameraButton = document.querySelector<HTMLButtonElement>('[data-close-camera]');
const switchCameraButton = document.querySelector<HTMLButtonElement>('[data-switch-camera]');
const capturePhotoButton = document.querySelector<HTMLButtonElement>('[data-capture-photo]');

if (
  !canvas ||
  !photoInput ||
  !dropPhotoInput ||
  !uploadZone ||
  !fileLabel ||
  !captionInput ||
  !captionCount ||
  !nameInput ||
  !dateInput ||
  !zoomInput ||
  !zoomOutput ||
  !brightnessInput ||
  !brightnessOutput ||
  !contrastInput ||
  !contrastOutput ||
  !saturationInput ||
  !saturationOutput ||
  !rotateLeft ||
  !rotateRight ||
  !flipPhoto ||
  !resetPhoto ||
  !downloadButton ||
  !shareButton ||
  !status ||
  !previewFormat ||
  !cameraDialog ||
  !cameraVideo ||
  !cameraViewport ||
  !cameraStatus ||
  !cameraCountdown ||
  !cameraTimer ||
  !closeCameraButton ||
  !switchCameraButton ||
  !capturePhotoButton ||
  templateButtons.length === 0 ||
  formatButtons.length === 0 ||
  cameraButtons.length === 0
) {
  throw new Error('Postcard editor could not be initialized.');
}

const context = canvas.getContext('2d');
if (!context) throw new Error('Canvas is not supported.');

const themeById: Record<string, Pick<Template, 'paper' | 'accent' | 'accentSoft' | 'ink' | 'motif'>> = {
  ticket: {
    paper: '#fff3cf',
    accent: '#d97860',
    accentSoft: '#f4d6ca',
    ink: '#294f47',
    motif: 'ticket',
  },
  forest: {
    paper: '#e7f0e9',
    accent: '#3c7163',
    accentSoft: '#bad5c8',
    ink: '#294f47',
    motif: 'forest',
  },
  starlight: {
    paper: '#203654',
    accent: '#f3ca61',
    accentSoft: '#607595',
    ink: '#fff8dc',
    motif: 'starlight',
  },
  notebook: {
    paper: '#eee8f5',
    accent: '#796990',
    accentSoft: '#d9cde8',
    ink: '#3f3651',
    motif: 'notebook',
  },
  rain: {
    paper: '#e5f0f3',
    accent: '#638a96',
    accentSoft: '#bfd5db',
    ink: '#314f58',
    motif: 'rain',
  },
  sunset: {
    paper: '#ffe5be',
    accent: '#c86d6d',
    accentSoft: '#f4b49b',
    ink: '#573f3b',
    motif: 'sunset',
  },
  collector: {
    paper: '#fff1bd',
    accent: '#d97860',
    accentSoft: '#c9ddd2',
    ink: '#294f47',
    motif: 'ticket',
  },
};

const templateFromButton = (button: HTMLButtonElement): Template => {
  const id = button.dataset.postcardTemplate ?? 'forest';
  const theme = themeById[id] ?? themeById.forest;
  return {
    id,
    title: button.dataset.title ?? '宜蘭散步紀念卡',
    routeTitle: button.dataset.routeTitle ?? '站前經典路線',
    routeLabel: button.dataset.routeLabel ?? '60 分鐘',
    stops: (button.dataset.stops ?? '').split('|').filter(Boolean),
    ...theme,
  };
};

const formatFromButton = (button: HTMLButtonElement): OutputFormat => ({
  id: button.dataset.postcardFormat ?? 'portrait',
  name: button.dataset.name ?? '直式貼文',
  width: Number(button.dataset.width) || 1080,
  height: Number(button.dataset.height) || 1350,
});

const requestedTemplateId = new URLSearchParams(window.location.search).get('style');
const requestedTemplateButton = requestedTemplateId
  ? templateButtons.find((button) => button.dataset.postcardTemplate === requestedTemplateId && !button.disabled)
  : undefined;
if (requestedTemplateButton) {
  templateButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button === requestedTemplateButton));
  });
}

const selectedTemplateButton =
  requestedTemplateButton ??
  templateButtons.find((button) => button.getAttribute('aria-pressed') === 'true' && !button.disabled) ??
  templateButtons.find((button) => !button.disabled);
const selectedFormatButton =
  formatButtons.find((button) => button.getAttribute('aria-pressed') === 'true') ?? formatButtons[0];
if (!selectedTemplateButton || !selectedFormatButton) throw new Error('Postcard options could not be initialized.');

const state: EditorState = {
  image: null,
  template: templateFromButton(selectedTemplateButton),
  format: formatFromButton(selectedFormatButton),
  zoom: 1,
  rotation: 0,
  flipX: 1,
  offsetX: 0,
  offsetY: 0,
  brightness: 100,
  contrast: 100,
  saturation: 100,
  caption: '',
  visitorName: '',
  visitDate: '',
  pointers: new Map(),
  pinchDistance: 0,
  pinchZoom: 1,
};

let cameraStream: MediaStream | null = null;
let currentFacingMode: FacingMode = 'environment';
let cameraStarting = false;

const setStatus = (message: string) => {
  status.textContent = message;
};

const track = (eventName: string) => {
  window.gtag?.('event', eventName, {
    postcard_template: state.template.id,
    postcard_format: state.format.id,
  });
};

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(maximum, Math.max(minimum, value));

const roundedRect = (
  target: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) => {
  const r = Math.min(radius, width / 2, height / 2);
  target.beginPath();
  target.moveTo(x + r, y);
  target.arcTo(x + width, y, x + width, y + height, r);
  target.arcTo(x + width, y + height, x, y + height, r);
  target.arcTo(x, y + height, x, y, r);
  target.arcTo(x, y, x + width, y, r);
  target.closePath();
};

const drawStar = (
  target: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  outerRadius: number,
  color: string,
) => {
  target.save();
  target.translate(centerX, centerY);
  target.fillStyle = color;
  target.beginPath();
  for (let index = 0; index < 8; index += 1) {
    const radius = index % 2 === 0 ? outerRadius : outerRadius * 0.28;
    const angle = -Math.PI / 2 + (index * Math.PI) / 4;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (index === 0) target.moveTo(x, y);
    else target.lineTo(x, y);
  }
  target.closePath();
  target.fill();
  target.restore();
};

const getScale = () => Math.min(canvas.width / 1080, canvas.height / 1350);

const getLayout = (): CardLayout => {
  const { width, height } = canvas;
  const landscape = width / height > 1.1;
  if (landscape) {
    return {
      photo: {
        x: width * 0.045,
        y: height * 0.13,
        width: width * 0.55,
        height: height * 0.72,
      },
      contentX: width * 0.64,
      contentY: height * 0.18,
      contentWidth: width * 0.305,
      routeStart: height * 0.53,
      routeEnd: height * 0.82,
      routeAxis: width * 0.655,
      landscape: true,
    };
  }

  const padding = width * 0.066;
  const photoY = height * 0.105;
  const photoHeight =
    state.format.id === 'story'
      ? height * 0.53
      : state.format.id === 'square'
        ? height * 0.48
        : height * 0.485;
  return {
    photo: {
      x: padding,
      y: photoY,
      width: width - padding * 2,
      height: photoHeight,
    },
    contentX: padding,
    contentY: photoY + photoHeight + height * 0.048,
    contentWidth: width - padding * 2,
    routeStart: padding * 1.25,
    routeEnd: width - padding * 1.25,
    routeAxis: height * 0.895,
    landscape: false,
  };
};

const drawBackground = (target: CanvasRenderingContext2D) => {
  const { width, height } = canvas;
  if (state.template.motif === 'starlight') {
    const gradient = target.createRadialGradient(width * 0.76, height * 0.1, 10, width * 0.45, height * 0.45, height);
    gradient.addColorStop(0, '#526b91');
    gradient.addColorStop(0.4, '#263e61');
    gradient.addColorStop(1, '#17283f');
    target.fillStyle = gradient;
  } else if (state.template.motif === 'sunset') {
    const gradient = target.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#fff0c6');
    gradient.addColorStop(0.58, '#ffd2a7');
    gradient.addColorStop(1, '#efa6a0');
    target.fillStyle = gradient;
  } else if (state.template.motif === 'rain') {
    const gradient = target.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#edf6f7');
    gradient.addColorStop(1, '#cbdfe4');
    target.fillStyle = gradient;
  } else {
    target.fillStyle = state.template.paper;
  }
  target.fillRect(0, 0, width, height);
};

const drawPaperTexture = (target: CanvasRenderingContext2D) => {
  const spacing = Math.max(26, 34 * getScale());
  target.save();
  target.globalAlpha = state.template.motif === 'starlight' ? 0.09 : 0.065;
  target.fillStyle = state.template.ink;
  for (let y = spacing * 0.6; y < canvas.height; y += spacing) {
    for (let x = spacing * 0.7 + ((y / spacing) % 2) * 7; x < canvas.width; x += spacing * 1.28) {
      target.beginPath();
      target.arc(x, y, Math.max(1, 1.2 * getScale()), 0, Math.PI * 2);
      target.fill();
    }
  }
  target.restore();
};

const drawMotif = (target: CanvasRenderingContext2D) => {
  const { width, height } = canvas;
  const { motif, accent, accentSoft, ink } = state.template;
  const scale = getScale();
  target.save();

  if (motif === 'ticket') {
    target.strokeStyle = accent;
    target.globalAlpha = 0.46;
    target.lineWidth = 3 * scale;
    target.setLineDash([12 * scale, 12 * scale]);
    target.beginPath();
    target.moveTo(width * 0.07, height * 0.066);
    target.lineTo(width * 0.93, height * 0.066);
    target.stroke();
    target.setLineDash([]);
    for (let index = 0; index < 4; index += 1) {
      drawStar(target, width * (0.78 + index * 0.045), height * (0.043 + (index % 2) * 0.007), 10 * scale, accent);
    }
  }

  if (motif === 'forest') {
    target.globalAlpha = 0.32;
    target.fillStyle = accent;
    for (let index = 0; index < 7; index += 1) {
      const baseX = width * 0.73 + index * width * 0.038;
      target.beginPath();
      target.moveTo(baseX, height * 0.072);
      target.lineTo(baseX + width * 0.017, height * (0.025 + (index % 3) * 0.006));
      target.lineTo(baseX + width * 0.034, height * 0.072);
      target.closePath();
      target.fill();
    }
  }

  if (motif === 'starlight') {
    target.globalAlpha = 0.88;
    target.fillStyle = accent;
    target.beginPath();
    target.arc(width * 0.87, height * 0.052, 24 * scale, 0, Math.PI * 2);
    target.fill();
    target.fillStyle = '#526b91';
    target.beginPath();
    target.arc(width * 0.882, height * 0.043, 21 * scale, 0, Math.PI * 2);
    target.fill();
    for (let index = 0; index < 12; index += 1) {
      drawStar(
        target,
        width * (0.58 + ((index * 0.071) % 0.35)),
        height * (0.018 + ((index * 0.027) % 0.072)),
        (index % 3 === 0 ? 7 : 4) * scale,
        accent,
      );
    }
  }

  if (motif === 'notebook') {
    target.globalAlpha = 0.42;
    target.strokeStyle = accent;
    target.lineWidth = 3 * scale;
    for (let index = 0; index < 10; index += 1) {
      target.beginPath();
      target.arc(width * (0.08 + index * 0.09), height * 0.038, 10 * scale, Math.PI, 0);
      target.stroke();
    }
    target.fillStyle = accentSoft;
    roundedRect(target, width * 0.76, height * 0.025, width * 0.17, height * 0.038, 14 * scale);
    target.fill();
  }

  if (motif === 'rain') {
    target.strokeStyle = accent;
    target.lineWidth = 3 * scale;
    target.lineCap = 'round';
    target.globalAlpha = 0.35;
    for (let index = 0; index < 12; index += 1) {
      const x = width * (0.58 + ((index * 0.067) % 0.36));
      const y = height * (0.018 + ((index % 4) * 0.017));
      target.beginPath();
      target.moveTo(x, y);
      target.lineTo(x - 7 * scale, y + 17 * scale);
      target.stroke();
    }
  }

  if (motif === 'sunset') {
    target.globalAlpha = 0.48;
    target.fillStyle = accent;
    target.beginPath();
    target.arc(width * 0.86, height * 0.06, 44 * scale, 0, Math.PI * 2);
    target.fill();
    target.strokeStyle = ink;
    target.lineWidth = 3 * scale;
    for (let index = 0; index < 3; index += 1) {
      target.beginPath();
      target.moveTo(width * (0.69 + index * 0.035), height * (0.055 + index * 0.008));
      target.quadraticCurveTo(width * (0.73 + index * 0.035), height * 0.04, width * (0.77 + index * 0.035), height * (0.055 + index * 0.008));
      target.stroke();
    }
  }

  target.restore();
};

const drawPlaceholder = (
  target: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
) => {
  const scale = getScale();
  const gradient = target.createLinearGradient(x, y, x + width, y + height);
  gradient.addColorStop(0, state.template.accentSoft);
  gradient.addColorStop(1, state.template.motif === 'starlight' ? '#334d70' : '#fffaf0');
  target.fillStyle = gradient;
  roundedRect(target, x, y, width, height, 30 * scale);
  target.fill();

  target.save();
  target.translate(x + width / 2, y + height / 2 - 22 * scale);
  target.strokeStyle = state.template.ink;
  target.lineWidth = 6 * scale;
  target.globalAlpha = 0.62;
  roundedRect(target, -62 * scale, -50 * scale, 124 * scale, 100 * scale, 18 * scale);
  target.stroke();
  target.beginPath();
  target.arc(-23 * scale, -17 * scale, 12 * scale, 0, Math.PI * 2);
  target.stroke();
  target.beginPath();
  target.moveTo(-46 * scale, 34 * scale);
  target.lineTo(-4 * scale, -3 * scale);
  target.lineTo(23 * scale, 25 * scale);
  target.lineTo(50 * scale, 4 * scale);
  target.stroke();
  target.restore();

  target.fillStyle = state.template.ink;
  target.globalAlpha = 0.78;
  target.textAlign = 'center';
  target.font = `700 ${Math.max(20, 31 * scale)}px "PingFang TC", "Microsoft JhengHei", sans-serif`;
  target.fillText('拍照或選一張相片', x + width / 2, y + height / 2 + 90 * scale);
  target.globalAlpha = 1;
};

const drawPhoto = (
  target: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
) => {
  const scale = getScale();
  target.save();
  roundedRect(target, x, y, width, height, 30 * scale);
  target.clip();

  if (!state.image) {
    drawPlaceholder(target, x, y, width, height);
    target.restore();
    return;
  }

  const quarterTurns = Math.abs(Math.round(state.rotation / 90)) % 2;
  const sourceWidth = quarterTurns === 1 ? state.image.height : state.image.width;
  const sourceHeight = quarterTurns === 1 ? state.image.width : state.image.height;
  const coverScale = Math.max(width / sourceWidth, height / sourceHeight) * state.zoom;
  const drawWidth = state.image.width * coverScale;
  const drawHeight = state.image.height * coverScale;

  target.translate(x + width / 2 + state.offsetX, y + height / 2 + state.offsetY);
  target.rotate((state.rotation * Math.PI) / 180);
  target.scale(state.flipX, 1);
  target.filter = `brightness(${state.brightness}%) contrast(${state.contrast}%) saturate(${state.saturation}%)`;
  target.drawImage(state.image, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
  target.restore();

  target.save();
  target.strokeStyle = state.template.ink;
  target.globalAlpha = 0.38;
  target.lineWidth = 4 * scale;
  roundedRect(target, x, y, width, height, 30 * scale);
  target.stroke();
  target.restore();
};

const fitText = (
  target: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  startingSize: number,
  minimumSize: number,
) => {
  let size = startingSize;
  while (size > minimumSize) {
    target.font = `700 ${size}px "DFKai-SB", "BiauKai", "Kaiti TC", "STKaiti", serif`;
    if (target.measureText(text).width <= maxWidth) return size;
    size -= 2;
  }
  return minimumSize;
};

const shortStop = (stop: string, maximum = 5) =>
  Array.from(stop).length > maximum ? `${Array.from(stop).slice(0, maximum).join('')}…` : stop;

const drawRoute = (target: CanvasRenderingContext2D, layout: CardLayout) => {
  const stops = state.template.stops;
  if (stops.length === 0) return;
  const scale = getScale();

  target.save();
  target.strokeStyle = state.template.accent;
  target.fillStyle = state.template.accent;
  target.lineWidth = 4 * scale;
  target.globalAlpha = 0.44;
  target.setLineDash([10 * scale, 10 * scale]);

  if (layout.landscape) {
    target.beginPath();
    target.moveTo(layout.routeAxis, layout.routeStart);
    target.lineTo(layout.routeAxis, layout.routeEnd);
    target.stroke();
    target.setLineDash([]);
    target.globalAlpha = 1;
    const gap = stops.length > 1 ? (layout.routeEnd - layout.routeStart) / (stops.length - 1) : 0;
    stops.forEach((stop, index) => {
      const y = layout.routeStart + gap * index;
      target.fillStyle = state.template.accent;
      target.beginPath();
      target.arc(layout.routeAxis, y, 11 * scale, 0, Math.PI * 2);
      target.fill();
      target.fillStyle = state.template.ink;
      target.textAlign = 'left';
      target.textBaseline = 'middle';
      target.font = `700 ${17 * scale}px "PingFang TC", "Microsoft JhengHei", sans-serif`;
      target.fillText(shortStop(stop, 7), layout.routeAxis + 24 * scale, y);
    });
  } else {
    target.beginPath();
    target.moveTo(layout.routeStart, layout.routeAxis);
    target.lineTo(layout.routeEnd, layout.routeAxis);
    target.stroke();
    target.setLineDash([]);
    target.globalAlpha = 1;
    const gap = stops.length > 1 ? (layout.routeEnd - layout.routeStart) / (stops.length - 1) : 0;
    stops.forEach((stop, index) => {
      const x = layout.routeStart + gap * index;
      target.fillStyle = state.template.accent;
      target.beginPath();
      target.arc(x, layout.routeAxis, 12 * scale, 0, Math.PI * 2);
      target.fill();
      target.fillStyle = state.template.ink;
      target.textAlign = 'center';
      target.textBaseline = 'top';
      target.font = `700 ${Math.max(13, (stops.length > 4 ? 16 : 18) * scale)}px "PingFang TC", "Microsoft JhengHei", sans-serif`;
      target.fillText(shortStop(stop), x, layout.routeAxis + 23 * scale);
    });
  }
  target.restore();
};

const displayDate = (value: string) => {
  const [year, month, day] = value.split('-');
  return year && month && day ? `${year}.${month}.${day}` : '';
};

const render = () => {
  const scale = getScale();
  const layout = getLayout();
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground(context);
  drawPaperTexture(context);
  drawMotif(context);

  context.textBaseline = 'alphabetic';
  context.fillStyle = state.template.ink;
  context.textAlign = 'left';
  context.globalAlpha = 0.72;
  context.font = `700 ${Math.max(15, 21 * scale)}px "PingFang TC", "Microsoft JhengHei", sans-serif`;
  context.fillText('JIMMY PARK · YILAN', canvas.width * 0.066, canvas.height * 0.058);
  context.textAlign = 'right';
  context.fillStyle = state.template.accent;
  context.fillText('TRAVEL MEMORY', canvas.width * 0.934, canvas.height * 0.058);
  context.globalAlpha = 1;

  drawPhoto(context, layout.photo.x, layout.photo.y, layout.photo.width, layout.photo.height);

  const caption = state.caption.trim() || '今天，在宜蘭慢慢走';
  const visitorMeta = [state.visitorName.trim(), displayDate(state.visitDate)].filter(Boolean).join(' · ');
  context.textAlign = 'left';
  context.fillStyle = state.template.accent;
  context.font = `700 ${Math.max(16, 22 * scale)}px "PingFang TC", "Microsoft JhengHei", sans-serif`;
  context.fillText(`${state.template.routeLabel} · ${state.template.routeTitle}`, layout.contentX, layout.contentY);

  context.fillStyle = state.template.ink;
  if (layout.landscape) {
    const titleSize = fitText(context, state.template.title, layout.contentWidth, 52 * scale, 31 * scale);
    context.font = `700 ${titleSize}px "DFKai-SB", "BiauKai", "Kaiti TC", "STKaiti", serif`;
    context.fillText(state.template.title, layout.contentX, layout.contentY + 70 * scale);

    const captionSize = fitText(context, caption, layout.contentWidth, 32 * scale, 22 * scale);
    context.font = `700 ${captionSize}px "DFKai-SB", "BiauKai", "Kaiti TC", "STKaiti", serif`;
    context.globalAlpha = 0.84;
    context.fillText(`「${caption}」`, layout.contentX, layout.contentY + 142 * scale);
    context.globalAlpha = 1;
    if (visitorMeta) {
      context.font = `600 ${18 * scale}px "PingFang TC", "Microsoft JhengHei", sans-serif`;
      context.globalAlpha = 0.62;
      context.fillText(visitorMeta, layout.contentX, layout.contentY + 190 * scale);
      context.globalAlpha = 1;
    }
  } else {
    const titleSize = fitText(context, state.template.title, layout.contentWidth, 58 * scale, 34 * scale);
    context.font = `700 ${titleSize}px "DFKai-SB", "BiauKai", "Kaiti TC", "STKaiti", serif`;
    context.fillText(state.template.title, layout.contentX, layout.contentY + 68 * scale);

    const captionSize = fitText(context, caption, layout.contentWidth, 39 * scale, 24 * scale);
    context.font = `700 ${captionSize}px "DFKai-SB", "BiauKai", "Kaiti TC", "STKaiti", serif`;
    context.globalAlpha = 0.83;
    context.fillText(`「${caption}」`, layout.contentX, layout.contentY + 135 * scale);
    context.globalAlpha = 1;
    if (visitorMeta) {
      context.font = `600 ${18 * scale}px "PingFang TC", "Microsoft JhengHei", sans-serif`;
      context.globalAlpha = 0.6;
      context.fillText(visitorMeta, layout.contentX, layout.contentY + 178 * scale);
      context.globalAlpha = 1;
    }
  }

  drawRoute(context, layout);

  context.fillStyle = state.template.ink;
  context.textAlign = 'left';
  context.font = `700 ${Math.max(13, 17 * scale)}px "PingFang TC", "Microsoft JhengHei", sans-serif`;
  context.globalAlpha = 0.58;
  context.fillText('旅遊紀念卡・非正式票券', canvas.width * 0.066, canvas.height * 0.968);
  context.textAlign = 'right';
  context.fillStyle = state.template.accent;
  context.globalAlpha = 0.9;
  context.fillText('JimmyPark.org', canvas.width * 0.934, canvas.height * 0.968);
  context.globalAlpha = 1;
};

const updateOutputLabels = () => {
  zoomOutput.textContent = `${Math.round(state.zoom * 100)}%`;
  brightnessOutput.textContent = `${state.brightness}%`;
  contrastOutput.textContent = `${state.contrast}%`;
  saturationOutput.textContent = `${state.saturation}%`;
};

const setEditorEnabled = (enabled: boolean) => {
  [
    zoomInput,
    brightnessInput,
    contrastInput,
    saturationInput,
    rotateLeft,
    rotateRight,
    flipPhoto,
    resetPhoto,
    downloadButton,
    shareButton,
  ].forEach((element) => {
    element.disabled = !enabled;
  });
};

const resetTransform = () => {
  state.zoom = 1;
  state.rotation = 0;
  state.flipX = 1;
  state.offsetX = 0;
  state.offsetY = 0;
  state.brightness = 100;
  state.contrast = 100;
  state.saturation = 100;
  zoomInput.value = '1';
  brightnessInput.value = '100';
  contrastInput.value = '100';
  saturationInput.value = '100';
  updateOutputLabels();
  render();
};

const applyFormat = (format: OutputFormat) => {
  state.format = format;
  canvas.width = format.width;
  canvas.height = format.height;
  canvas.style.aspectRatio = `${format.width} / ${format.height}`;
  cameraViewport.style.aspectRatio = `${format.width} / ${format.height}`;
  previewFormat.textContent = `${format.name}・${format.width} × ${format.height}`;
  state.offsetX = 0;
  state.offsetY = 0;
  render();
};

const prepareImage = (
  source: CanvasImageSource,
  sourceWidth: number,
  sourceHeight: number,
  label: string,
) => {
  const longestEdge = Math.max(sourceWidth, sourceHeight);
  const resizeScale = Math.min(1, 2600 / longestEdge);
  const preview = document.createElement('canvas');
  preview.width = Math.max(1, Math.round(sourceWidth * resizeScale));
  preview.height = Math.max(1, Math.round(sourceHeight * resizeScale));
  const previewContext = preview.getContext('2d');
  if (!previewContext) throw new Error('Canvas is not supported.');
  previewContext.drawImage(source, 0, 0, preview.width, preview.height);

  state.image = preview;
  fileLabel.textContent = label;
  resetTransform();
  setEditorEnabled(true);
  setStatus('照片已加入。可在預覽上拖曳、雙指縮放，或繼續調整色彩。');
  track('postcard_photo_ready');
};

const loadFile = async (file: File) => {
  const validTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);
  if (!validTypes.has(file.type)) {
    setStatus('請選擇 JPG、PNG 或 WebP 圖片。');
    return;
  }
  if (file.size > 20 * 1024 * 1024) {
    setStatus('圖片超過 20MB，請改用較小的檔案。');
    return;
  }

  setStatus('正在讀取照片；照片不會離開你的裝置…');
  const objectUrl = URL.createObjectURL(file);
  try {
    const source = new Image();
    source.decoding = 'async';
    source.src = objectUrl;
    await source.decode();
    prepareImage(source, source.naturalWidth, source.naturalHeight, file.name);
  } catch {
    setStatus('無法讀取這張照片，請換一個檔案再試。');
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
};

const getBlob = () =>
  new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Image export failed.'));
      },
      'image/jpeg',
      0.92,
    );
  });

const download = async () => {
  if (!state.image) return;
  setStatus('正在產生高畫質紀念卡…');
  try {
    const blob = await getBlob();
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = objectUrl;
    anchor.download = `jimmypark-${state.template.id}-${state.format.id}.jpg`;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    setStatus(`已下載 ${state.format.width} × ${state.format.height} 的 JPG 紀念卡。`);
    track('postcard_export');
  } catch {
    setStatus('圖片輸出失敗，請再試一次。');
  }
};

const share = async () => {
  if (!state.image) return;
  setStatus('正在準備分享…');
  try {
    const blob = await getBlob();
    const file = new File([blob], `jimmypark-${state.template.id}-${state.format.id}.jpg`, {
      type: 'image/jpeg',
    });
    const shareData = {
      files: [file],
      title: '我的宜蘭散步紀念卡',
      text: '在 JimmyPark.org 製作的宜蘭散步紀念卡',
    };
    if (navigator.share && (!navigator.canShare || navigator.canShare(shareData))) {
      await navigator.share(shareData);
      setStatus('系統分享面板已開啟。');
      track('postcard_share');
      return;
    }
    setStatus('這個瀏覽器不支援圖片分享，已改為下載 JPG。');
    await download();
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      setStatus('已取消分享，照片仍只保留在目前頁面。');
      return;
    }
    setStatus('無法開啟分享，請改用下載圖片。');
  }
};

const stopCamera = () => {
  cameraStream?.getTracks().forEach((track) => track.stop());
  cameraStream = null;
  cameraVideo.srcObject = null;
  cameraStarting = false;
};

const startCamera = async () => {
  if (cameraStarting) return;
  cameraStarting = true;
  stopCamera();
  cameraStarting = true;
  cameraViewport.dataset.facing = currentFacingMode;
  cameraStatus.textContent = currentFacingMode === 'user' ? '正在開啟前置鏡頭…' : '正在開啟後置鏡頭…';

  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: { ideal: currentFacingMode },
        width: { ideal: 1920 },
        height: { ideal: 1920 },
      },
    });
    cameraVideo.srcObject = cameraStream;
    await cameraVideo.play();
    cameraStatus.textContent =
      currentFacingMode === 'user' ? '自拍預覽會鏡像顯示，輸出會和預覽一致。' : '移動手機，讓主體落在虛線範圍內。';
  } catch (error) {
    const denied = error instanceof DOMException && (error.name === 'NotAllowedError' || error.name === 'SecurityError');
    cameraStatus.textContent = denied
      ? '沒有取得相機權限。可以關閉視窗，改從相簿選擇照片。'
      : '目前無法開啟相機。請關閉視窗，改從相簿選擇照片。';
    setStatus(denied ? '相機權限未開啟；仍可使用「選擇相片」。' : '此裝置暫時無法使用相機。');
  } finally {
    cameraStarting = false;
  }
};

const openCamera = async (mode: FacingMode) => {
  if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
    setStatus('此瀏覽器無法直接開啟相機；請使用「選擇相片」。');
    photoInput.click();
    return;
  }
  currentFacingMode = mode;
  cameraDialog.showModal();
  await startCamera();
  track(mode === 'user' ? 'postcard_selfie_open' : 'postcard_camera_open');
};

const closeCamera = () => {
  stopCamera();
  if (cameraDialog.open) cameraDialog.close();
  cameraCountdown.hidden = true;
  cameraCountdown.textContent = '';
};

const wait = (milliseconds: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });

const runCountdown = async () => {
  if (!cameraTimer.checked) return;
  cameraCountdown.hidden = false;
  for (const number of [3, 2, 1]) {
    cameraCountdown.textContent = String(number);
    await wait(700);
  }
  cameraCountdown.textContent = '●';
  await wait(180);
  cameraCountdown.hidden = true;
};

const captureCameraPhoto = async () => {
  if (!cameraStream || cameraVideo.videoWidth === 0 || cameraVideo.videoHeight === 0) {
    cameraStatus.textContent = '相機尚未準備完成，請稍候再拍。';
    return;
  }
  capturePhotoButton.disabled = true;
  await runCountdown();

  const capture = document.createElement('canvas');
  capture.width = cameraVideo.videoWidth;
  capture.height = cameraVideo.videoHeight;
  const captureContext = capture.getContext('2d');
  if (!captureContext) {
    capturePhotoButton.disabled = false;
    return;
  }
  if (currentFacingMode === 'user') {
    captureContext.translate(capture.width, 0);
    captureContext.scale(-1, 1);
  }
  captureContext.drawImage(cameraVideo, 0, 0, capture.width, capture.height);
  prepareImage(
    capture,
    capture.width,
    capture.height,
    currentFacingMode === 'user' ? '自拍照片' : '相機照片',
  );
  capturePhotoButton.disabled = false;
  track('postcard_camera_capture');
  closeCamera();
};

const onFileInput = (input: HTMLInputElement) => {
  const file = input.files?.[0];
  if (file) void loadFile(file);
  input.value = '';
};

photoInput.addEventListener('change', () => onFileInput(photoInput));
dropPhotoInput.addEventListener('change', () => onFileInput(dropPhotoInput));

uploadZone.addEventListener('dragover', (event) => {
  event.preventDefault();
  uploadZone.classList.add('border-forest', 'bg-white');
});

uploadZone.addEventListener('dragleave', () => {
  uploadZone.classList.remove('border-forest', 'bg-white');
});

uploadZone.addEventListener('drop', (event) => {
  event.preventDefault();
  uploadZone.classList.remove('border-forest', 'bg-white');
  const file = event.dataTransfer?.files[0];
  if (file) void loadFile(file);
});

formatButtons.forEach((button) => {
  button.addEventListener('click', () => {
    formatButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    applyFormat(formatFromButton(button));
    track('postcard_format_select');
  });
});

templateButtons.forEach((button) => {
  button.addEventListener('click', () => {
    templateButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    state.template = templateFromButton(button);
    render();
    track('postcard_template_select');
  });
});

phraseButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const phrase = button.dataset.phrase ?? '';
    captionInput.value = phrase;
    state.caption = phrase;
    captionCount.textContent = String(Array.from(phrase).length);
    render();
  });
});

captionInput.addEventListener('input', () => {
  state.caption = captionInput.value;
  captionCount.textContent = String(Array.from(captionInput.value).length);
  render();
});

nameInput.addEventListener('input', () => {
  state.visitorName = nameInput.value;
  render();
});

dateInput.addEventListener('input', () => {
  state.visitDate = dateInput.value;
  render();
});

zoomInput.addEventListener('input', () => {
  state.zoom = Number(zoomInput.value);
  updateOutputLabels();
  render();
});

brightnessInput.addEventListener('input', () => {
  state.brightness = Number(brightnessInput.value);
  updateOutputLabels();
  render();
});

contrastInput.addEventListener('input', () => {
  state.contrast = Number(contrastInput.value);
  updateOutputLabels();
  render();
});

saturationInput.addEventListener('input', () => {
  state.saturation = Number(saturationInput.value);
  updateOutputLabels();
  render();
});

rotateLeft.addEventListener('click', () => {
  state.rotation -= 90;
  state.offsetX = 0;
  state.offsetY = 0;
  render();
});

rotateRight.addEventListener('click', () => {
  state.rotation += 90;
  state.offsetX = 0;
  state.offsetY = 0;
  render();
});

flipPhoto.addEventListener('click', () => {
  state.flipX *= -1;
  render();
});

resetPhoto.addEventListener('click', resetTransform);
downloadButton.addEventListener('click', () => void download());
shareButton.addEventListener('click', () => void share());

cameraButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const mode = button.dataset.openCamera === 'user' ? 'user' : 'environment';
    void openCamera(mode);
  });
});

closeCameraButton.addEventListener('click', closeCamera);
switchCameraButton.addEventListener('click', () => {
  currentFacingMode = currentFacingMode === 'user' ? 'environment' : 'user';
  void startCamera();
});
capturePhotoButton.addEventListener('click', () => void captureCameraPhoto());
cameraDialog.addEventListener('cancel', (event) => {
  event.preventDefault();
  closeCamera();
});
cameraDialog.addEventListener('click', (event) => {
  if (event.target === cameraDialog) closeCamera();
});

const pointerDistance = () => {
  const points = Array.from(state.pointers.values());
  if (points.length < 2 || !points[0] || !points[1]) return 0;
  return Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
};

canvas.addEventListener('pointerdown', (event) => {
  if (!state.image) return;
  state.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
  canvas.setPointerCapture(event.pointerId);
  if (state.pointers.size === 2) {
    state.pinchDistance = pointerDistance();
    state.pinchZoom = state.zoom;
  }
});

canvas.addEventListener('pointermove', (event) => {
  if (!state.image) return;
  const previous = state.pointers.get(event.pointerId);
  if (!previous) return;
  state.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

  if (state.pointers.size >= 2) {
    const distance = pointerDistance();
    if (state.pinchDistance > 0) {
      state.zoom = clamp(state.pinchZoom * (distance / state.pinchDistance), 1, 2.5);
      zoomInput.value = String(state.zoom);
      updateOutputLabels();
      render();
    }
    return;
  }

  const bounds = canvas.getBoundingClientRect();
  state.offsetX += ((event.clientX - previous.x) * canvas.width) / bounds.width;
  state.offsetY += ((event.clientY - previous.y) * canvas.height) / bounds.height;
  render();
});

const stopPointer = (event: PointerEvent) => {
  state.pointers.delete(event.pointerId);
  if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
  if (state.pointers.size < 2) {
    state.pinchDistance = 0;
    state.pinchZoom = state.zoom;
  }
};

canvas.addEventListener('pointerup', stopPointer);
canvas.addEventListener('pointercancel', stopPointer);
canvas.addEventListener(
  'wheel',
  (event) => {
    if (!state.image || (!event.ctrlKey && !event.metaKey)) return;
    event.preventDefault();
    state.zoom = clamp(state.zoom + (event.deltaY > 0 ? -0.05 : 0.05), 1, 2.5);
    zoomInput.value = String(state.zoom);
    updateOutputLabels();
    render();
  },
  { passive: false },
);

window.addEventListener('pagehide', () => {
  stopCamera();
  state.image = null;
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden && cameraDialog.open) closeCamera();
});

setEditorEnabled(false);
applyFormat(state.format);
updateOutputLabels();
render();
track('postcard_open');

export {};
