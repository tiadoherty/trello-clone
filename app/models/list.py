from .db import db, environment, SCHEMA, add_prefix_for_prod


class List(db.Model):
    __tablename__ = "lists"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    board_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("boards.id")), nullable=False
    )

    board = db.relationship("Board", back_populates="lists")
    cards = db.relationship("Card", back_populates="list", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "board_title": self.board.title,
            "cards": [card.to_dict() for card in self.cards],
        }
