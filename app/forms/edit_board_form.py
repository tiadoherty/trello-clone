from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

#new form so that validators for AWS upload can be changed here
class EditBoardForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    background_image = StringField("Background Image", validators=[DataRequired()])
