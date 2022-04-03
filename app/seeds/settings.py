from app.models import db, Setting


def seed_settings():
  casual = Setting(type='Casual')
  outdoor = Setting(type='Outdoor')
  fine_dining = Setting(type='Fine Dining')
  bar = Setting(type='Bar')
  cafe = Setting(type='Cafe')

  db.session.add(casual)
  db.session.add(outdoor)
  db.session.add(fine_dining)
  db.session.add(bar)
  db.session.add(cafe)

  db.session.commit()

def undo_settings():
  db.session.execute('TRUNCATE settings RESTART IDENTITY CASCADE;')
  db.session.commit()
