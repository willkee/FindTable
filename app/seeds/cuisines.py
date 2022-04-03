from app.models import db, Cuisine

def seed_cuisines():
    cuisines = [
            Cuisine(type='African'),
            Cuisine(type='Mexican'),
            Cuisine(type='American'),
            Cuisine(type='Spanish'),
            Cuisine(type='French'),
            Cuisine(type='Chinese'),
            Cuisine(type='Japanese'),
            Cuisine(type='Korean'),
            Cuisine(type='Vietnamese'),
            Cuisine(type='Middle Eastern'),
            Cuisine(type='Kosher'),
            Cuisine(type='Halal'),
            Cuisine(type='Vegan'),
            Cuisine(type='Mediterranean'),
            Cuisine(type='British'),
            Cuisine(type='Italian'),
            Cuisine(type='South American'),
            Cuisine(type='Dessert'),
            Cuisine(type='Thai'),
            Cuisine(type='Fusion'),
    ]

    for cuisine in cuisines:
        db.session.add(cuisine)

    db.session.commit()

def undo_cuisines():
    db.session.execute('TRUNCATE cuisines RESTART IDENTITY CASCADE;')
    db.session.commit()
