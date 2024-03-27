const SystemAssetsDirs = {
   "images":"Images",
   "sounds":"Sounds",
   "effects":"Effects",
}
export function GetAssetsFile(url) {
   return new URL(`../assets/`+url, import.meta.url).href
}

export function GamesGetAssetsFile(id,url) {
   return new URL(`../assets/Games/${id}/${url}`, import.meta.url).href
}

export function GetSystemAssetsFile(url,type) {
   type = type.toLowerCase();
   return new URL(`../assets/System/`+SystemAssetsDirs[type]+`/${url}`, import.meta.url).href
}


