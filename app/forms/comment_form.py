from flask_wtf import FlaskForm
from wtforms import (
    TextAreaField,
    IntegerField,
)
from wtforms.validators import DataRequired


class CommentForm(FlaskForm):
    # user id will come from the route instead of from the form
    # user_id = IntegerField("userId", validators=[DataRequired()])
    card_id = IntegerField("projectId", validators=[DataRequired()])
    comment = TextAreaField("comment", validators=[DataRequired()])
