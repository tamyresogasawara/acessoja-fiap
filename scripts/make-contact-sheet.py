from pathlib import Path
from PIL import Image, ImageDraw

width = 700
pages = []
for index, source in enumerate(sorted(Path('docs/rendered').glob('page-*.png')), start=1):
    image = Image.open(source).convert('RGB')
    height = round(image.height * width / image.width)
    resized = image.resize((width, height))
    canvas = Image.new('RGB', (width, height + 36), 'white')
    canvas.paste(resized, (0, 36))
    ImageDraw.Draw(canvas).text((12, 10), f'PAGE {index}', fill='black')
    pages.append(canvas)

rows = []
for start in range(0, len(pages), 2):
    pair = pages[start:start + 2]
    row = Image.new('RGB', (width * 2 + 20, max(page.height for page in pair)), '#cccccc')
    row.paste(pair[0], (0, 0))
    if len(pair) == 2:
        row.paste(pair[1], (width + 20, 0))
    rows.append(row)

sheet = Image.new('RGB', (width * 2 + 20, sum(row.height for row in rows) + 20 * (len(rows) - 1)), '#888888')
y = 0
for row in rows:
    sheet.paste(row, (0, y))
    y += row.height + 20
sheet.save('docs/rendered/contact-sheet.jpg', quality=88)
