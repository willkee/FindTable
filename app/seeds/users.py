from app.models import db, User
from werkzeug.security import generate_password_hash
from faker import Faker
fake = Faker()

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo_user = User(
        first_name='Demo',
        last_name='User',
        email='demo@user.com',
        hashed_password=generate_password_hash('password'),
        business_owner=True)

    db.session.add(demo_user)

    for i in range(1, 25):
        owners = User(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            email=fake.email(),
            hashed_password=generate_password_hash(fake.password()),
            business_owner=True)
        db.session.add(owners)

    for i in range(25, 100):
        non_owners = User(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            email=fake.email(),
            hashed_password=generate_password_hash(fake.password()),
            business_owner=False)
        db.session.add(non_owners)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
