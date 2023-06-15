from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length


class BoardForm(FlaskForm):
    title = StringField(
        "Title",
        validators=[
            DataRequired(),
            Length(
                min=2,
                max=100,
                message="Board title must be between 2 - 100 characters",
            ),
        ],
    )
    background_image = StringField("Background Image", validators=[DataRequired()])
