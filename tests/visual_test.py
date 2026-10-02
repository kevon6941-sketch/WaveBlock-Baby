from pathlib import Path
p=Path(__file__).parents[1]
html=(p/'index.html').read_text()
css=(p/'css/game.css').read_text()
assert 'v3.0 Visual Complete' in html
assert 'visual-complete' in html
assert '--ink:#123f4b' in css
assert '.device-shell' in css
assert '.screen-bezel' in css
assert 'grid-template-columns:repeat(4,1fr)' in css
print('visual contract ok')
