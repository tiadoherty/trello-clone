from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Comment, db
from app.forms import CommentForm

comment_routes = Blueprint("comments", __name__)

#add a comment
@comment_routes.route("/new", methods=["POST"])
@login_required
def create_comment():
    """
    Create a new comment via a form and add it to the database
    """
    # make form from imported class
    form = CommentForm()
    # form csrf
    form["csrf_token"].data = request.cookies["csrf_token"]
    # if form passes validations, use form.data to create a new comment and add to the db then return
    if form.validate_on_submit():
        data = form.data

        new_comment = Comment(
            user_id = current_user.id,
            card_id = data["card_id"],
            comment = data["comment"]
        )

        db.session.add(new_comment)
        db.session.commit()

        print("this is the new comment from the backend ---->", new_comment)
        return {"comment": new_comment.to_dict()}, 200, {"Content-Type": "application/json"}

    # if form errors, return those errors
    if form.errors:
        print("form errors coming from the backend in the POST route -->", form.errors)
        return {"errors": form.errors}, 400, {"Content-Type": "application/json"}

#edit an existing comment
@comment_routes.route("/<int:id>/update", methods=["PUT"])
@login_required
def edit_comment(id):
    """
    Edit an existing card by id and update it in the db
    """
    form = CommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    # if form passes validations, find existing comment by id and update, then add to the db then return
    if form.validate_on_submit():
        data = form.data
        update_comment = Comment.query.get(id)

        if update_comment is None:
            return {"errors": "This Comment could not be found"}, 404

        if data["comment"]:
            update_comment.comment = data["comment"]

        db.session.commit()
        print("this is the updated comment from the backend -->", update_comment)
        return {"comment": update_comment.to_dict()}, 200, {"Content-Type": "application/json"}
    # if form errors, return those errors
    if form.errors:
        print("form errors coming from the backend in PUT route -->", form.errors)
        return {"errors": form.errors}, 400, {"Content-Type": "application/json"}

# delete an existing comment by id
@comment_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_comment(id):
    """
    Query for one comment by its id and delete it from the database
    """
    comment = Comment.query.get(id)

    if comment is None:
       return {"errors": "This Comment could not be found"}, 404

    db.session.delete(comment)
    db.session.commit()
    return {"message": "Succesfully Deleted"}
