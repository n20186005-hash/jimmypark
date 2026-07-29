# JimmyPark.org

宜蘭幾米公園單頁旅遊網站。使用 Astro、Tailwind CSS、TypeScript 與 Cloudflare Workers Static Assets，無資料庫、無登入、無 CMS。

## 開發

```bash
corepack enable
pnpm install
pnpm dev
```

## 建置

```bash
pnpm build
```

靜態輸出位於 `dist/`。

## 部署到 Cloudflare Workers

```bash
pnpm deploy
```

`wrangler.jsonc` 已設定 Workers Static Assets、404 頁與無尾斜線網址。

### 綁定自訂網域

在 Cloudflare Dashboard 的 Workers & Pages → `jimmypark-org` → Settings → Domains & Routes 中加入：

- `jimmypark.org`
- 可選：`www.jimmypark.org`，再透過 Redirect Rule 301 到主網域

## GA4

已在 `src/layouts/BaseLayout.astro` 加入：`G-HXM22WWPKP`。

## 圖片

圖片已下載為本地資產並轉換為 WebP。授權與來源請見 `PHOTO_CREDITS.md`，頁尾亦保留必要署名連結。
