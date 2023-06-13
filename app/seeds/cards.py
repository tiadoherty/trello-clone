from app.models import db, environment, SCHEMA, Card
from sqlalchemy.sql import text
from datetime import date


def seed_cards():
    card_1 = Card(
        title="Redesign Homepage Layout",
        list_id=1,
        description="Update the existing homepage design to align with the new branding guidelines.",
        due_date=date(2023, 11, 20),
        cover_image="blue",
    )

    card_2 = Card(
        title="Create Homepage Banner",
        list_id=1,
        description="Finalize a design that resonates with the brand's target audience and conveys the desired message.",
        due_date=date(2023, 11, 23),
        cover_image="yellow",
    )

    card_3 = Card(
        title="Homepage Design Choices",
        list_id=2,
        description="Review the alignment of design choices with our brand guidelines and overall website goals.",
        due_date=date(2023, 11, 23),
        cover_image="yellow",
    )

    card_4 = Card(
        title="Wireframe Designs for Homepage Layout",
        list_id=3,
        description="Create wireframes with Figma and present the wireframes to stakeholders for review and approval",
        due_date=date(2023, 11, 10),
        cover_image="yellow",
    )

    db.session.add(card_1)
    db.session.add(card_2)
    db.session.add(card_3)
    db.session.add(card_4)
    db.session.commit()

def undo_cards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cards"))

    db.session.commit()
