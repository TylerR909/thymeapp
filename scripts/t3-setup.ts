import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'coverage', '.expo', 'web-build', 'out']);

/** Patterns from `.worktreeinclude`. Blank lines and `#` comments are dropped. */
export function parseWorktreeInclude(text: string): readonly string[] {
  const patterns: string[] = [];
  for (const line of text.split(/\r?\n/)) {
    if (line.trim() === '' || line.trimStart().startsWith('#')) continue;
    patterns.push(line.replace(/\\ /g, ' ').trimEnd());
  }
  return patterns;
}

function segmentMatches(glob: string, segment: string): boolean {
  let re = '^';
  for (const char of glob) {
    if (char === '*') re += '[^/]*';
    else if (char === '?') re += '[^/]';
    else re += char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  return new RegExp(`${re}$`).test(segment);
}

/** Gitignore-style match of one pattern (no leading `!`) against a `/`-separated relative path. */
export function matchesWorktreePattern(pattern: string, relPath: string): boolean {
  let body = pattern;
  const directoryOnly = body.endsWith('/');
  if (directoryOnly) body = body.slice(0, -1);
  if (body.startsWith('/')) body = body.slice(1);
  if (body === '') return false;

  const parts = relPath.split('/');
  if (!body.includes('/')) {
    const segments = directoryOnly ? parts.slice(0, -1) : parts.slice(-1);
    return segments.some(segment => segmentMatches(body, segment));
  }

  const globs = body.split('/');
  const matchFrom = (globIndex: number, pathIndex: number): boolean => {
    if (globIndex === globs.length) {
      if (directoryOnly) return true;
      return pathIndex === parts.length;
    }
    const glob = globs[globIndex];
    if (glob === undefined) return false;
    if (glob === '**') {
      if (matchFrom(globIndex + 1, pathIndex)) return true;
      return pathIndex < parts.length && matchFrom(globIndex, pathIndex + 1);
    }
    const segment = parts[pathIndex];
    if (segment === undefined || !segmentMatches(glob, segment)) return false;
    return matchFrom(globIndex + 1, pathIndex + 1);
  };

  return matchFrom(0, 0);
}

export function isWorktreeIncluded(relPath: string, patterns: readonly string[]): boolean {
  let included = false;
  for (const pattern of patterns) {
    const negated = pattern.startsWith('!');
    const body = negated ? pattern.slice(1) : pattern;
    if (body !== '' && matchesWorktreePattern(body, relPath)) included = !negated;
  }
  return included;
}

function listFiles(dir: string, root: string, out: string[]): void {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      listFiles(abs, root, out);
      continue;
    }
    if (!entry.isFile()) continue;
    out.push(path.relative(root, abs).split(path.sep).join('/'));
  }
}

/** Copy matching files from the main checkout into this worktree. Existing files stay. */
export function copyWorktreeInclude(projectRoot: string, worktree: string): readonly string[] {
  const includePath = path.join(projectRoot, '.worktreeinclude');
  if (!existsSync(includePath)) {
    console.log('No .worktreeinclude in the main checkout; skipped file copy.');
    return [];
  }

  const patterns = parseWorktreeInclude(readFileSync(includePath, 'utf8'));
  const files: string[] = [];
  listFiles(projectRoot, projectRoot, files);
  const copied: string[] = [];

  for (const rel of files) {
    if (rel === '.worktreeinclude' || !isWorktreeIncluded(rel, patterns)) continue;
    const dest = path.join(worktree, rel);
    if (existsSync(dest)) continue;
    const src = path.join(projectRoot, rel);
    const srcStat = statSync(src);
    if (!srcStat.isFile()) continue;
    mkdirSync(path.dirname(dest), { recursive: true });
    cpSync(src, dest);
    copied.push(rel);
    console.log(`copied ${rel}`);
  }

  return copied;
}

function main(): void {
  const install = spawnSync('bun', ['install'], { cwd: process.cwd(), stdio: 'inherit' });
  if (install.error) console.error(install.error.message);
  if ((install.status ?? 1) !== 0) process.exit(install.status ?? 1);

  const projectRoot = process.env.T3CODE_PROJECT_ROOT;
  if (projectRoot === undefined || projectRoot === '') {
    console.log('T3CODE_PROJECT_ROOT is unset; skipped copying gitignored files.');
    return;
  }
  if (path.resolve(projectRoot) === path.resolve(process.cwd())) return;

  copyWorktreeInclude(projectRoot, process.cwd());
}

const entry = process.argv[1];
if (entry !== undefined && import.meta.url === pathToFileURL(path.resolve(entry)).href) main();
