from pathlib import Path
R=Path(__file__).parents[1]
def test_layered_world_contract():
    h=(R/'index.html').read_text()
    for x in ['environmentLayer','propLayer','npcLayer','petLayer','fxLayer','hudLayer']:
        assert f'id="{x}"' in h
    assert 'handheld-shell' not in h

def test_actor_and_scene_modules_exist():
    a=(R/'js/actors.js').read_text(); s=(R/'js/scene-machine.js').read_text()
    for x in ['createActor','moveActor','setActorPose','showActor','hideActor']: assert x in a
    for x in ['createSceneMachine','startScene','advanceScene','cancelScene']: assert x in s

def test_fishing_is_multistage():
    f=(R/'js/scenes/fishing.js').read_text()
    for x in ['move','fisherApproach','cast','wait','bite','reel','result','reset']: assert x in f
    assert 'biteWindow' in f

def test_damage_and_repair_contract():
    d=(R/'js/damage.js').read_text(); rp=(R/'js/scenes/repair.js').read_text()
    assert 'damageBand' in d and 'applyImpact' in d
    for x in ['workerApproach','clean','fill','cure','formwork','grout','strip','reset']: assert x in rp

def test_background_has_no_actor_reference():
    bg=(R/'assets/backgrounds/harbor-environment.svg').read_text().lower()
    for forbidden in ['waveblock','pet','fisher','worker','coastguard','turtle']:
        assert forbidden not in bg

def test_deploy_files():
    for p in ['index.html','css/world-v31.css','js/game.js','README.md']:
        assert (R/p).exists()
