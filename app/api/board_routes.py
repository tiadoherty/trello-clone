from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Board, User, db
from app.forms import BoardForm, EditBoardForm

board_routes = Blueprint("boards", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


# get boards owned by current user
@board_routes.route("/current")
@login_required
def current_boards():
    """
    Query for all boards owned by currently logged in user and returns them in a list of board dictionaries
    """
    id = current_user.id
    print("This is the id of the current user -->", id)

    boards = Board.query.filter(Board.owner_id == id)

    res = [board.to_dict() for board in boards]

    return {"boards": res}


# get boards that you are a collaborator of, but don't own
@board_routes.route("/collab")
@login_required
def collab_boards():
    id = current_user.id
    res = User.query.get(id).to_dict()
    return {"collaborator_boards": res["collaborators"]}


# get single board by id
@board_routes.route("/<int:id>")
@login_required
def get_single_board(id):
    """
    Query for one board by its id and returns that board in a dictionary
    """
    board = Board.query.get(id)

    if board is None:
        return {"errors": "This Board could not be found"}, 404

    # refactor later - this would prevent the collaborators from looking at a board they don't own
    # if board.owner_id != current_user.id:
    #     return {"errors": "Forbidden"}, 401

    res = board.to_dict()
    return {"single_board": res}


# delete single board by id
@board_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_board(id):
    """
    Query for one board by its id and delete it from the database
    """
    print("Board ID from backend delete route -->", id)
    board = Board.query.get(id)

    if board is None:
        return {"errors": "This Board could not be found"}, 404

    if board.owner_id != current_user.id:
        return {"errors": "Forbidden - only the owner of this board can delete"}, 401

    db.session.delete(board)
    db.session.commit()
    return {"message": "Succesfully Deleted"}

# create a board
@board_routes.route("/current", methods=["POST"])
@login_required
def create_board():
    """
    Create a new board via a form and add it to the database
    """
    # make form from imported class
    form = BoardForm()
    # form csrf
    form["csrf_token"].data = request.cookies["csrf_token"]
    # if form passes validations, use form.data to create a new board and add to the db then return
    if form.validate_on_submit():
        data = form.data

        new_board = Board(
            title=data["title"],
            background_image=data["background_image"],
            owner_id=current_user.id,
        )

        db.session.add(new_board)
        db.session.commit()

        print("this is the new board from the backend -->", new_board)
        return {"board": new_board.to_dict()}, 200, {"Content-Type": "application/json"}

    # if form errors, return those errors
    if form.errors:
        print("form errors coming from the backend in the POST route -->", form.errors)
        return {"errors": form.errors}, 400, {"Content-Type": "application/json"}

# edit an existing board 
@board_routes.route("/<int:id>/edit", methods=["PUT"])
@login_required
def edit_board(id):
    """
    Edit an existing board by id and update it in the db
    """
    form = EditBoardForm()
    # form csrf
    form["csrf_token"].data = request.cookies["csrf_token"]
    # if form passes validations, find existing project and update, then add to the db then return
    if form.validate_on_submit():
        data = form.data
        update_board = Board.query.get(id)
        if update_board is None:
            return {"errors": "This Board could not be found"}, 404

        if update_board.owner_id != current_user.id:
            return {"errors": "Only the owner of this board can edit its details"}, 401

        if data["title"]:
            update_board.title = data["title"]

        if data["background_image"]:
            update_board.background_image = data["background_image"]

        db.session.commit()
        print("this is the updated board from the backend -->", update_board)
        return (
            {"board": update_board.to_dict()},
            200,
            {"Content-Type": "application/json"},
        )
    # if form errors, return those errors
    if form.errors:
        print("form errors coming from the backend in PUT route -->", form.errors)
        return {"errors": form.errors}, 400, {"Content-Type": "application/json"}
