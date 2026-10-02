from pathlib import Path
ROOT=Path(__file__).parents[1]

def test_harbor_world_contract():
    html=(ROOT/'index.html').read_text()
    assert 'id="world"' in html
    assert 'id="pet"' in html
    assert 'id="hud"' in html
    assert 'id="actionDock"' in html
    assert 'handheld' not in html.lower()

def test_v3_modules_exist():
    for f in ['js/state-v3.js','js/actions.js','js/visuals.js','js/world-events.js','css/v3-world.css']:
        assert (ROOT/f).exists(), f

def test_harbor_hotspots():
    html=(ROOT/'index.html').read_text()
    for id_ in ['fishingPier','market','breakwater','coastPost','craneZone']:
        assert f'id="{id_}"' in html

def test_approved_world_art_present():
    assert (ROOT/'assets/backgrounds/harbor-world.png').exists()
