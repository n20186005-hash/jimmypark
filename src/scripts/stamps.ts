import { STAMP_STORAGE_KEY, stampSpots, type StampId } from '../data/stampSpots';

type StoredStampState = {
  version: 1;
  stamps: StampId[];
};

type GtagFunction = (command: string, eventName: string, parameters?: Record<string, string>) => void;

declare global {
  interface Window {
    gtag?: GtagFunction;
    __jimmyParkStampsReady?: boolean;
  }
}

const validIds = new Set<StampId>(stampSpots.map((spot) => spot.id));

const readStamps = () => {
  try {
    const raw = window.localStorage.getItem(STAMP_STORAGE_KEY);
    if (!raw) return new Set<StampId>();
    const parsed = JSON.parse(raw) as Partial<StoredStampState>;
    const stamps = Array.isArray(parsed.stamps)
      ? parsed.stamps.filter((id): id is StampId => typeof id === 'string' && validIds.has(id as StampId))
      : [];
    return new Set<StampId>(stamps);
  } catch {
    return new Set<StampId>();
  }
};

let collected = readStamps();

const writeStamps = () => {
  const state: StoredStampState = {
    version: 1,
    stamps: stampSpots.map((spot) => spot.id).filter((id) => collected.has(id)),
  };
  try {
    window.localStorage.setItem(STAMP_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // The current page still keeps working when storage is unavailable.
  }
};

const setHidden = (selector: string, hidden: boolean) => {
  document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
    element.hidden = hidden;
  });
};

const updateDom = () => {
  const count = collected.size;
  const total = stampSpots.length;
  const complete = count === total;
  const remaining = total - count;

  document.querySelectorAll<HTMLElement>('[data-stamp-count]').forEach((element) => {
    element.textContent = String(count);
  });
  document.querySelectorAll<HTMLElement>('[data-stamp-total]').forEach((element) => {
    element.textContent = String(total);
  });
  document.querySelectorAll<HTMLElement>('[data-stamp-remaining]').forEach((element) => {
    element.textContent = String(remaining);
  });
  document.querySelectorAll<HTMLElement>('[data-stamp-progress]').forEach((element) => {
    element.style.width = `${(count / total) * 100}%`;
  });
  document.querySelectorAll<HTMLElement>('[data-stamp-progressbar]').forEach((element) => {
    element.setAttribute('aria-valuenow', String(count));
    element.setAttribute('aria-valuemax', String(total));
    element.setAttribute('aria-label', `已完成 ${count} 個，共 ${total} 個景點`);
  });

  document.querySelectorAll<HTMLButtonElement>('[data-stamp-toggle]').forEach((button) => {
    const id = button.dataset.stampToggle as StampId | undefined;
    const isCollected = Boolean(id && collected.has(id));
    button.setAttribute('aria-pressed', String(isCollected));
    const label = button.querySelector<HTMLElement>('[data-stamp-action-label]');
    if (label) label.textContent = isCollected ? '已收集・點擊取消' : '蓋下這一站';
  });

  document.querySelectorAll<HTMLButtonElement>('[data-stamp-unlock]').forEach((button) => {
    button.disabled = !complete;
    button.setAttribute('aria-disabled', String(!complete));
    const note = button.querySelector<HTMLElement>('[data-stamp-unlock-note]');
    if (note) note.textContent = complete ? '已解鎖・五站散步完成' : `尚差 ${remaining} 站解鎖`;
  });

  setHidden('[data-stamp-complete]', !complete);
  setHidden('[data-stamp-incomplete]', complete);
};

const toggleStamp = (id: StampId) => {
  const added = !collected.has(id);
  if (added) collected.add(id);
  else collected.delete(id);
  writeStamps();
  updateDom();
  window.gtag?.('event', 'walk_stamp_update', {
    stamp_spot: id,
    stamp_action: added ? 'collect' : 'remove',
  });
};

const resetStamps = () => {
  if (collected.size === 0) return;
  if (!window.confirm('確定要清除目前裝置上的所有集章紀錄嗎？')) return;
  collected = new Set<StampId>();
  writeStamps();
  updateDom();
  window.gtag?.('event', 'walk_stamp_reset');
};

if (!window.__jimmyParkStampsReady) {
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const toggle = target.closest<HTMLButtonElement>('[data-stamp-toggle]');
    if (toggle) {
      const id = toggle.dataset.stampToggle as StampId | undefined;
      if (id && validIds.has(id)) toggleStamp(id);
      return;
    }
    if (target.closest('[data-stamp-reset]')) resetStamps();
  });

  window.addEventListener('storage', (event) => {
    if (event.key !== STAMP_STORAGE_KEY) return;
    collected = readStamps();
    updateDom();
  });
  window.__jimmyParkStampsReady = true;
}

updateDom();

