from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import List, db
from app.forms import ListForm

list_routes = Blueprint("lists", __name__)

#get all lists of a project - don't think i need since we are getting this info from the project on single project page

#get single list by id
@list_routes.route("/<int:id>")
@login_required
def get_single_list(id):
    """
    Query for one list by its id and returns that list in a dictionary
    """
    list = List.query.get(id)

    if list is None:
        return {"errors": "This List could not be found"}, 404

    res = list.to_dict()
    return {"single_list": res}

#delete single list by id
@list_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_list(id):
    """
    Query for one list by its id and delete it from the database
    """
    list = List.query.get(id)

    if list is None:
        return {"errors": "This List could not be found"}, 404

    db.session.delete(list)
    db.session.commit()
    return {"message": "Succesfully Deleted"}

#create a list
@list_routes.route("/new-list", methods=["POST"])
@login_required
def create_list():
    """
    Create a new list via a form and add it to the database
    """
    # make form from imported class
    form = ListForm()
    # form csrf
    form["csrf_token"].data = request.cookies["csrf_token"]
    # if form passes validations, use form.data to create a new list and add to the db then return
    if form.validate_on_submit():
        data = form.data

        new_list = List(
            title=data["title"],
            board_id=data["board_id"]
        )

        db.session.add(new_list)
        db.session.commit()

        print("this is the new list from the backend -->", new_list)
        return {"list": new_list.to_dict()}, 200, {"Content-Type": "application/json"}

    # if form errors, return those errors
    if form.errors:
        print("form errors coming from the backend in the POST route -->", form.errors)
        return {"errors": form.errors}, 400, {"Content-Type": "application/json"}


#edit form for a list
@list_routes.route("/<int:id>/edit", methods=["PUT"])
def update_list(id):
    """
    Edit an existing list by id and update it in the db
    """
    form = ListForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    # if form passes validations, find existing project and update, then add to the db then return
    if form.validate_on_submit():
        data = form.data
        update_list = List.query.get(id)

        if update_list is None:
            return {"errors": "This List could not be found"}, 404

        if data["title"]:
            update_list.title = data["title"]

        db.session.commit()
        print("this is the updated list from the backend -->", update_list)
        return (
            {"list": update_list.to_dict()},
            200,
            {"Content-Type": "application/json"},
        )
    # if form errors, return those errors
    if form.errors:
        print("form errors coming from the backend in PUT route -->", form.errors)
        return {"errors": form.errors}, 400, {"Content-Type": "application/json"}
