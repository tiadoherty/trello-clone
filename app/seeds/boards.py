from app.models import db, environment, SCHEMA, Board
from sqlalchemy.sql import text


def seed_boards():
    demo_board = Board(
        title="My Project",
        background_image="https://kickstarterclonebucket.s3.us-west-1.amazonaws.com/background_mountain.jpg",
        owner_id=2,
    )

    demo_board_two = Board(
        title="Town Hall Meetings",
        background_image="https://kickstarterclonebucket.s3.us-west-1.amazonaws.com/background_orange.jpg",
        owner_id=2,
    )

    db.session.add(demo_board)
    db.session.add(demo_board_two)
    db.session.commit()


def undo_boards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM boards"))

    db.session.commit()
