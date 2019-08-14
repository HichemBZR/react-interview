import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteFilm, editLike, editDislike } from "../../actions/filmActions";
import classnames from "classnames";

class FilmCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      film: this.props.film,
      like: this.props.like.value
    };
  }

  onDeleteClick(id) {
    this.props.deleteFilm(id);
  }

  onLikeClick(id) {
    switch (this.state.like) {
      case 0:
        this.props.editLike(id, 1, 1);
        break;
      case 1:
        this.props.editLike(id, -1, 0);
        break;
      case -1:
        this.props.editLike(id, 1, 1);
        this.props.editDislike(id, -1, 1);
        break;
      default:
        break;
    }
  }

  onDislikeClick(id) {
    switch (this.state.like) {
      case 0:
        this.props.editDislike(id, 1, -1);
        break;
      case -1:
        this.props.editDislike(id, -1, 0);
        break;
      case 1:
        this.props.editDislike(id, 1, -1);
        this.props.editLike(id, -1, -1);
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div className="col-lg-4 col-md-6  ">
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h4 className="card-title font-weight-bold">
              {this.state.film.title}
            </h4>
            <div className="card-text text-muted">
              {this.state.film.category}
            </div>
          </div>
          <div className="card-footer bg-transparent border-success">
            <span>
              {/* Like button */}
              <button
                type="button"
                className="btn btn-light mr-1"
                onClick={this.onLikeClick.bind(this, this.state.film.id)}
              >
                <i
                  className={classnames(" text-secondary fas fa-thumbs-up", {
                    "text-info": this.state.like === 1
                  })}
                />
                <span className="badge badge-light">
                  {this.state.film.likes}
                </span>
              </button>
              {/* Dislike button */}
              <button
                type="button"
                className="btn btn-light mr-1"
                onClick={this.onDislikeClick.bind(this, this.state.film.id)}
              >
                <i
                  className={classnames(" text-secondary fas fa-thumbs-down", {
                    "text-danger": this.state.like === -1
                  })}
                />
                <span className="badge badge-light">
                  {this.state.film.dislikes}
                </span>
              </button>
              {/* Delete button */}
              <button
                type="button"
                className="btn btn-danger mr-1"
                onClick={this.onDeleteClick.bind(this, this.state.film.id)}
              >
                <i className="fas fa-times" />
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

FilmCard.propTypes = {
  deleteFilm: PropTypes.func.isRequired,
  editLike: PropTypes.func.isRequired,
  editDislike: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteFilm, editLike, editDislike }
)(FilmCard);
