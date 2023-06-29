from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Card, Comment, db
from app.forms import CardForm, CommentForm

card_routes = Blueprint("cards", __name__)


# get single card by id
@card_routes.route("/<int:id>")
@login_required
def get_single_card(id):
    """
    Query for one card by its id and returns that card in a dictionary
    """
    card = Card.query.get(id)

    if card is None:
        return {"errors": "This Card could not be found"}, 404

    res = card.to_dict()
    return {"single_card": res}


# delete single card by id
@card_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_card(id):
    """
    Query for one card by its id and delete it from the database
    """
    card = Card.query.get(id)

    if card is None:
        return {"errors": "This Card could not be found"}, 404

    db.session.delete(card)
    db.session.commit()
    return {"message": "Succesfully Deleted"}


# create a card
@card_routes.route("/new-card", methods=["POST"])
@login_required
def create_card():
    """
    Create a new card via a form and add it to the database
    """
    # make form from imported class
    form = CardForm()
    # form csrf
    form["csrf_token"].data = request.cookies["csrf_token"]
    # if form passes validations, use form.data to create a new list and add to the db then return
    if form.validate_on_submit():
        data = form.data

        new_card = Card(
            title=data["title"],
            list_id=data["list_id"],
            description=data["description"],
            due_date=data["due_date"],
            cover_image=data["cover_image"],
        )

        db.session.add(new_card)
        db.session.commit()

        print("this is the new card from the backend -->", new_card)
        return {"card": new_card.to_dict()}, 200, {"Content-Type": "application/json"}

    # if form errors, return those errors
    if form.errors:
        print("form errors coming from the backend in the POST route -->", form.errors)
        return {"errors": form.errors}, 400, {"Content-Type": "application/json"}


# edit form for a card
@card_routes.route("/<int:id>/edit", methods=["PUT"])
def update_card(id):
    """
    Edit an existing card by id and update it in the db
    """
    form = CardForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    # if form passes validations, find existing card and update, then add to the db then return
    if form.validate_on_submit():
        data = form.data
        update_card = Card.query.get(id)

        if update_card is None:
            return {"errors": "This Card could not be found"}, 404

        if data["title"]:
            update_card.title = data["title"]

        if data["description"]:
            update_card.description = data["description"]

        if data["due_date"]:
            update_card.due_date = data["due_date"]

        if data["list_id"]:
            update_card.list_id = data["list_id"]

        if data["cover_image"]:
            update_card.cover_image = data["cover_image"]

        db.session.commit()
        print("this is the updated list from the backend -->", update_card)
        return (
            {"card": update_card.to_dict()},
            200,
            {"Content-Type": "application/json"},
        )

    # if form errors, return those errors
    if form.errors:
        print("form errors coming from the backend in PUT route -->", form.errors)
        return {"errors": form.errors}, 400, {"Content-Type": "application/json"}


# get comments by card id
@card_routes.route("/<int:id>/comments")
@login_required
def get_card_comments(id):
    """
    Query for one card's comments by its id and returns the comments in a list
    """
    card = Card.query.get(id).to_dict()

    return {"comments": card["comments"]}
