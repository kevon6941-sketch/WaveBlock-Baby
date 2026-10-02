from pathlib import Path
p=Path(__file__).parents[1]
html=(p/'index.html').read_text()
css=(p/'css/v3-world.css').read_text()
assert 'WaveBlock Baby v3.0' in html
assert 'id="world"' in html
assert '.world' in css
assert '.dock' in css
assert 'device-shell' not in html
assert 'grid-template-columns:repeat(4,1fr)' in css
print('v3 harbor visual contract ok')
