import { fileURLToPath } from 'url';

import { build } from './lib/builder.js';
import { crawl } from './lib/crawler.js';
import { config } from './config.js';

interface StartOptions {
  urlPaths?: string[];
  options?: Partial<typeof config>;
}

export async function start({ urlPaths, options }: StartOptions = {}) {
  // set config
  Object.assign(config, options);

  // crawl yuque data
  await crawl(urlPaths);

  // process yuque data
  await build();
}

// Determining if an ESM module is main then run the code
if (import.meta.url.startsWith('file:')) {
  const modulePath = fileURLToPath(import.meta.url);
  if (process.argv[1] === modulePath) {
    // 先不指定具体仓库，让程序爬取所有有权限的仓库
    // 如果你想指定特定仓库，请替换为你自己的仓库路径，格式：'用户名/仓库名'
    const urlPaths = [
      'dcoqry/gglr06', // 算力平台运维文档
      // 'dcoqry/tf6dgu', // 个人空间
      // 'atian25/blog',
    ];
    await start({ urlPaths });
  }
}
