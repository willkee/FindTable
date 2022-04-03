from app.models import db, Restaurant

# Adds restaurants seed data



def seed_restaurants():
    new_restaurant = {
        owner_id
    }



def undo_restaurants():
    db.session.execute('TRUNCATE restaurants RESTART IDENTITY CASCADE;')
    db.session.commit()
