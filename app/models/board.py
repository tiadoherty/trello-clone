from .db import db, environment, SCHEMA, add_prefix_for_prod
from .collaborator import collaborators

class Board(db.Model):
    __tablename__ = 'boards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    background_image = db.Column(db.String, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    owner = db.relationship("User", back_populates="board")
    board_collaborators = db.relationship(
        "User",
        secondary=collaborators,
        back_populates="user_collaborators"
    )
    lists = db.relationship("List", back_populates="board", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "background_image": self.background_image,
            "owner": self.owner.to_dict(),
            "lists": [list.to_dict() for list in self.lists]
        }
