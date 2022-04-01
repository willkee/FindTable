# list_of_cuisines = [
#     "American",
#     "Mexican",
#     "Asian",
#     "European",
#     "African",
#     "Middle Eastern"
#     ]

# for cuisine in list_of_cuisines:
#     new_cuisine = Cuisine(type=cuisine)
#     db.session.add(new_cuisine)

# db.session.commit()

# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import relationship
# from sqlalchemy.schema import Column, ForeignKey, Table
# from sqlalchemy.types import Integer, String

# Base = declarative_base()

# restaurant_cuisines = Table(
#     "restaurant_cuisines",
#     Base.metadata,
#     Column("pony_id", ForeignKey("ponies.id"), primary_key=True),
#     Column("handler_id", ForeignKey("handlers.id"), primary_key=True))

# # Owner declaration...

# class Pony(Base):
#     __tablename__ = "ponies"

#     id = Column(Integer, primary_key=True)
#     name = Column(String(255))
#     birth_year = Column(Integer)
#     breed = Column(String(255))
#     owner_id = Column(Integer, ForeignKey("owners.id"))

#     owner = relationship("Owner", back_populates="ponies")
#     handlers = relationship("Handler",
#                             secondary=pony_handlers,
#                             back_populates="ponies")


# class Handler(Base):
#     __tablename__ = "handlers"

#     id = Column(Integer, primary_key=True)
#     first_name = Column(String(50))
#     last_name = Column(String(50))
#     employee_id = Column(String(12))

#     ponies = relationship("Pony",
#                           secondary=pony_handlers,
#                           back_populates="handlers")


# @app.route('/')
# @app.route('/restaurants')
# def view_restaurants():
#     return render_template('abc.html')
