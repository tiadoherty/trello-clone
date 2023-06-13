from app.models import db, environment, SCHEMA
from app.models.list import List
from sqlalchemy.sql import text

def seed_lists():
    demo_list_1 = List(
        title='Not Started',
        board_id=1
    )
    demo_list_2 = List(
        title='In Progress',
        board_id=1
    )
    demo_list_3 = List(
        title='Complete',
        board_id=1
    )

    db.session.add(demo_list_1)
    db.session.add(demo_list_2)
    db.session.add(demo_list_3)
    db.session.commit()

def undo_lists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.lists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM lists"))

    db.session.commit()
