from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import date

class Card(db.Model):
    __tablename__ = 'cards'

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    due_date = db.Column(db.Date)
    cover_image = db.Column(db.String)
    list_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("lists.id")), nullable=False)

    list = db.relationship("List", back_populates="cards")
    comments = db.relationship("Comment", back_populates="card")

    def to_dict(self):
        return{
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "due_date": self.due_date,
            "cover_image": self.cover_image,
            "list_title": self.list.title,
            "comments": [comment.to_dict() for comment in self.comments],
            "num_comments": len(self.comments),
            "days_left": (self.due_date - date.today()).days,
        }
