from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, DateField
from wtforms.validators import DataRequired, Length

class CardForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    list_id = IntegerField("List ID", validators=[DataRequired()])
    description = TextAreaField("Description", validators=[DataRequired()])
    due_date = DateField("Due Date", validators=[DataRequired()])
    cover_image = StringField("Cover Color")
