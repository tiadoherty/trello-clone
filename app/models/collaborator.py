from .db import db, environment, SCHEMA, add_prefix_for_prod

collaborators = db.Table(
    'collaborators',
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True ),
    db.Column('board_id', db.Integer, db.ForeignKey(add_prefix_for_prod('boards.id')), primary_key=True )
)

if environment == "production":
    collaborators.schema = SCHEMA
