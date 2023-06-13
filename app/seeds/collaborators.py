from app.models import db, collaborators, User, Board, environment, SCHEMA
from sqlalchemy import insert
from sqlalchemy.exc import IntegrityError
from sqlalchemy.sql import text


def seed_collaborators():
    # collaborators_to_seed = [
    #     {'user_id': 3, 'board_id': 1}
    # ]
    collaborator = insert(collaborators).values(user_id=3, board_id=1)

    try:
        db.session.execute(collaborator)
        db.session.commit()
    except IntegrityError as e:
        db.session.rollback()


def undo_collaborators():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.collaborators RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM collaborators"))

    db.session.commit()
