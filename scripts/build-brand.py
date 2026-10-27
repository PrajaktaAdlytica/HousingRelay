from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
import shutil
root=Path(__file__).resolve().parents[1]
out=root/'public/brand'
font=TTFont(root/'node_modules/@fontsource/manrope/files/manrope-latin-700-normal.woff2')
glyphs=font.getGlyphSet(); cmap=font.getBestCmap(); units=font['head'].unitsPerEm
x=0; letters=[]
for c in 'HousingRelay':
 name=cmap[ord(c)]; pen=SVGPathPen(glyphs); glyphs[name].draw(pen)
 letters.append(f'<path transform="translate({x} 0)" d="{pen.getCommands()}"/>')
 x+=font['hmtx'][name][0]-18
word=''.join(letters)
def symbol(mode='color',small=False):
 dark,side,top,matcha,matchaside,pink,pinkside=('#3B482B','#495637','#798461','#D5DFB6','#A8B685','#EAC8C2','#C9ACA2')
 if mode=='mono': dark=side=top=matcha=matchaside=pink=pinkside='#3B482B'
 if mode=='reverse': dark=side=top=matcha=matchaside=pink=pinkside='#F8F7EE'
 # Source-faithful planar construction with transparent entrance and window.
 s=f'''<path fill="{side}" d="M136 462L241 510V622L136 572Z"/>
 <path fill="{dark}" fill-rule="evenodd" d="M241 510L329 467L329 449L418 403L418 355L522 303L522 254L618 208V489L418 586L418 547L367 524V560L329 580V506L277 531V605L241 622Z M555 282L588 265V305L555 321Z"/>
 <path fill="{top}" d="M136 462L225 419L329 467L241 510Z"/>
 <path fill="{matchaside}" d="M225 397L329 449V467L225 419Z"/>
 <path fill="{matcha}" d="M225 397L307 355L418 403L329 449Z"/>
 <path fill="{matchaside}" d="M307 303L418 355V403L307 355Z"/>
 <path fill="{matcha}" d="M307 303L418 251L522 303L418 355Z"/>
 <path fill="{pinkside}" d="M418 208L522 254V303L418 251Z"/>
 <path fill="{pink}" d="M418 208L518 160L618 208L522 254Z"/>'''
 if not small:
  s+=f'''<path fill="{matcha}" d="M367 524L403 506V477L436 460V434L471 417V388L529 360L578 382L522 410V439L488 456V485L454 502V531L418 547Z"/><path fill="{matchaside}" d="M367 524L418 547V586L367 560Z M403 477L454 502V531L403 506Z M436 434L488 456V485L436 460Z M471 388L522 410V439L471 417Z"/>'''
 for cx,cy,rx,ry,color,shadow in [(226,437,33,16,top,dark),(308,377,33,16,matcha,matchaside),(404,272,33,16,matcha,matchaside),(521,180,34,16,pink,pinkside)]:
  s+=f'<path fill="{shadow}" d="M{cx-rx} {cy}v22a{rx} {ry} 0 0 0 {2*rx} 0v-22Z"/><ellipse fill="{color}" cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}"/>'
 return '<g transform="translate(-120 -150)">'+s+'</g>'
def svg(w,h,body,title):
 return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img" aria-label="{title}"><title>{title}</title>{body}</svg>'
def save(name,w,h,body): (out/name).write_text(svg(w,h,body,'HousingRelay'))
for mode in ['color','mono','reverse']:
 ink='#F8F7EE' if mode=='reverse' else '#293720'
 save(f'symbol-{mode}.svg',510,480,symbol(mode))
 # 3.76:1 horizontal lockup with font-independent outlined wordmark.
 scale=0.120; ww=x*scale
 text=f'<g fill="{ink}" transform="translate(540 326) scale({scale} {-scale})">{word}</g>'
 save(f'logo-horizontal-{mode}.svg',round(560+ww),480,symbol(mode)+text)
 sw=round(ww+80)
 save(f'logo-stacked-{mode}.svg',sw,680,f'<g transform="translate({(sw-510)/2} 0)">{symbol(mode)}</g><g fill="{ink}" transform="translate(40 610) scale({scale} {-scale})">{word}</g>')
 save(f'wordmark-{mode}.svg',round(ww+32),260,f'<g fill="{ink}" transform="translate(16 193) scale({scale} {-scale})">{word}</g>')
save('favicon.svg',64,64,'<rect width="64" height="64" rx="13" fill="#F8F7EE"/><g transform="translate(4 5) scale(.11)">'+symbol(small=True)+'</g>')
save('favicon-dark.svg',64,64,'<rect width="64" height="64" rx="13" fill="#293720"/><g transform="translate(4 5) scale(.11)">'+symbol('reverse',small=True)+'</g>')
shutil.copy(root/'node_modules/@fontsource/manrope/LICENSE',out/'Manrope-LICENSE.txt')
(out/'README.txt').write_text('HousingRelay Terrace identity\nApproved reference: ChatGPT Image 27 Oct 2026, 15_19_19.png\nNative SVG paths, no embedded raster images or external fonts. Wordmark: Manrope Bold, outlined.\nUse color logos on cream or white; reverse logos on dark olive. Mono versions use one ink.\nKeep clear space of at least one stud diameter. Recommended minimum horizontal width: 180px. Use simplified favicon at small sizes.\nPalette: olive #3B482B; matcha #D5DFB6; blush #EAC8C2; cream #F8F7EE.\nThe small-size favicon omits the exterior staircase to preserve clarity.\nRebuild with scripts/build-brand.py using fontTools and Brotli.\n')
