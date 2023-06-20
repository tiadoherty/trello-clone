from app.models import db, environment, SCHEMA, Card
from sqlalchemy.sql import text
from datetime import date


def seed_cards():
    card_1 = Card(
        title="Redesign Homepage Layout",
        list_id=1,
        description="Update the existing homepage design to align with the new branding guidelines.",
        due_date=date(2023, 11, 20),
        cover_image="#E74C3C",
    )

    card_2 = Card(
        title="Create Homepage Banner",
        list_id=1,
        description="Finalize a design that resonates with the brand's target audience and conveys the desired message.",
        due_date=date(2023, 11, 23),
        cover_image="#A1BDD914",
    )

    card_3 = Card(
        title="Homepage Design Choices",
        list_id=2,
        description="Review the alignment of design choices with our brand guidelines and overall website goals.",
        due_date=date(2023, 11, 23),
        cover_image="#A1BDD914",
    )

    card_4 = Card(
        title="Wireframe Designs for Homepage Layout",
        list_id=3,
        description="Create wireframes with Figma and present the wireframes to stakeholders for review and approval",
        due_date=date(2023, 11, 10),
        cover_image="#AF7AC5",
    )

    card_5 = Card(
        title="Town Hall Announcements",
        list_id=4,
        description="A list of announcements for our next town hall. Add announcements in the comments below.",
        due_date=date(2023, 11, 23),
        cover_image="#A1BDD914",
    )

    card_6 = Card(
        title="The Schedule",
        list_id=5,
        description="Schedule Going Forward: TBD",
        due_date=date(2024, 10, 21),
        cover_image="#2874A6",
    )

    db.session.add(card_1)
    db.session.add(card_2)
    db.session.add(card_3)
    db.session.add(card_4)
    db.session.add(card_5)
    db.session.add(card_6)
    db.session.commit()


def undo_cards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cards"))

    db.session.commit()
