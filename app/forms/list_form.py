from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class ListForm(FlaskForm):
        title = StringField("Title", validators=[DataRequired()])
        board_id = IntegerField("Board Id", validators=[DataRequired()])
