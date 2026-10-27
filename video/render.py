import subprocess
from pathlib import Path
for comp,stem in [('EvidenceRibbon','evidence-ribbon'),('EvidenceRibbonMobile','evidence-ribbon-mobile')]:
    cmd=['node','node_modules/@remotion/cli/remotion-cli.js','render','video/src/index.tsx',comp,'public/films/'+stem+'.mp4','--public-dir=video/public','--codec=h264','--crf=21','--concurrency=2','--browser-executable=node_modules/.remotion/chrome-headless-shell/mac-arm64/chrome-headless-shell-mac-arm64/chrome-headless-shell']
    subprocess.run(cmd,check=True)
