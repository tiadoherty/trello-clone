from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class BoardForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    background_image = StringField("Background Image", validators=[DataRequired()])
