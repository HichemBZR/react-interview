import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFilms } from "../../actions/filmActions";
import { Col, Row } from "reactstrap";
import Spinner from "../common/Spinner";
import FilmCard from "./FilmCard";
import "./Landing.css";
import { TablePagination } from "@trendmicro/react-paginations";
import "@trendmicro/react-paginations/dist/react-paginations.css";
import classnames from "classnames";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      pageLength: 8,
      totalRecords: 0,
      filterValue: "All",
      films: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.onFilterClick = this.onFilterClick.bind(this);
  }
  componentDidMount() {
    this.props.getFilms();
  }

  handleChange(e) {
    this.setState({
      filterValue: e.target.value
    });
  }

  onFilterClick() {
    this.setState({
      films: this.props.film.films.filter(
        f => f.category === this.state.filterValue
      )
    });
  }

  render() {
    let { likes, loading } = this.props.film;
    let films = this.state.films.length
      ? this.state.films
      : this.props.film.films;
    let categories = [];
    this.props.film.films.forEach(f => {
      if (categories.indexOf(f.category) === -1) {
        categories.push(f.category);
      }
    });
    if (loading) {
      return (
        <div className="landing">
          <div className="album py-5 bg-light">
            <div className="container h-100">
              <div className="h-100 animated fadeIn">
                <Row>
                  <Col xl={12}>
                    <Spinner />;
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      const pageLength = this.state.pageLength;
      const start = (this.state.page - 1) * pageLength;
      let display = films.filter(
        (f, index) => index >= start && index < start + pageLength
      );
      return (
        <main role="main">
          {/* Header */}
          <section className="jumbotron text-center">
            <div className="container">
              <h1 className="jumbotron-heading">Movie List Test</h1>
              <p className="lead text-muted">
                With high regards to <b>Particeep</b> and its team for giving me
                the chance to pass this test.
              </p>
              <p className="blockquote-footer">Aimene Hichem Bouzara</p>
            </div>
          </section>
          {/* Filter */}
          <div
            className={classnames("input-group mb-3 container", {
              gone: !categories.length
            })}
          >
            <div className="input-group-prepend">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.onFilterClick}
              >
                Filter
              </button>
            </div>
            <select
              className="custom-select"
              id="inputGroupSelect03"
              onChange={this.handleChange}
            >
              <option defaultValue>All</option>
              {categories.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          {/* Album */}
          <div className="album py-5 bg-light">
            <div className="container">
              <div className="row">
                {display.map(film => (
                  <FilmCard
                    film={film}
                    like={likes.filter(l => l.id === film.id)[0]}
                    key={film.id}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Pagination */}
          <div className="container">
            <TablePagination
              className="pagination"
              type="full"
              page={this.state.page}
              pageLength={this.state.pageLength}
              totalRecords={this.props.film.films.length}
              pageLengthMenu={[4, 8, 12]}
              onPageChange={({ page, pageLength }) => {
                this.setState({ page, pageLength });
              }}
              prevPageRenderer={() => <i className="fa fa-angle-left" />}
              nextPageRenderer={() => <i className="fa fa-angle-right" />}
            />
          </div>
        </main>
      );
    }
  }
}
Landing.propTypes = {
  getFilms: PropTypes.func.isRequired,
  film: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  film: state.film
});

export default connect(
  mapStateToProps,
  { getFilms }
)(Landing);
