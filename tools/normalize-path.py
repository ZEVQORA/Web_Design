import re, sys, gzip
src, prec = sys.argv[1], int(sys.argv[2])
s = open(src, encoding="utf8").read()
d = re.search(r'<path d="(.*?)"', s, re.S).group(1)
nums = [float(x) for x in re.findall(r'-?\d+\.?\d*', d)]
xs, ys = nums[0::2], nums[1::2]
minx, maxx, miny, maxy = min(xs), max(xs), min(ys), max(ys)
S = 100.0/(maxy-miny)
toks = re.split(r'(-?\d+\.?\d*)', d)
out, i = [], 0
for t in toks:
    if re.fullmatch(r'-?\d+\.?\d*', t or ''):
        v = float(t); v = (v-minx)*S if i%2==0 else (v-miny)*S
        out.append(f"{v:.{prec}f}".rstrip('0').rstrip('.') or "0"); i += 1
    else: out.append(t)
nd = re.sub(r'\s+', ' ', ''.join(out)).strip()
nd = re.sub(r' ([,])', r'\1', nd)
vw = round((maxx-minx)*S, 2)
sys.stderr.write(f"viewBox=0 0 {vw} 100  bytes={len(nd)}  gzip={len(gzip.compress(nd.encode()))}\n")
print(f"{vw}\t{nd}")
