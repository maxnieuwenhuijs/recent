import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import classes from "./CoursesOverview.module.css";
import FilterCourse from "../FilterCourse/FilterCourse";
import LessonOverview from "../LessonOverview/LessonOverview";
import Paginations from "../Pagination/Pagination";
import NavBar from "../navBar/navBar";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import UploadNewCourse from "../UploadNewCourse/UploadNewCourse";
import { getPath } from "../../../util/getPath";

class coursesOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      course: 0,
      searchTerm: "",
      filterCourse: "",
      categories: [],
      loading: true,
      categorie: "",
      setCurrentPage: 1,
      postPerpage: 12,
      sideBarShow: false,
      watchedCourses: ''
    };
      this.removeContinueCourse = this.removeContinueCourse.bind(this)
  }

  componentDidMount() {
    Promise.all([
      axios.get(`${getPath()}courses`).then((res) => {
        const courses = res.data;
        this.setState({
          courses: courses,
          loading: false,
        });
      }),
      axios.get(`${getPath()}category`).then((res) => {
        const categories = res.data;
        this.setState({
          categories: categories,
        });
      }),
    ]).then(([result1, result2, result3]) => {
      // call setState here
    });

    let paginate = parseInt(localStorage.getItem('paginate'));

    if (!paginate) {
      this.setState({
        setCurrentPage: 1
      })
    } else {
      this.setState({
        setCurrentPage: paginate
      })
    }

 
  }

  dynamicSearch = () => {
    const indexOfLastPost = this.state.setCurrentPage * this.state.postPerpage;
    const indexOfFirstPost = indexOfLastPost - this.state.postPerpage;
    const currentsPosts = this.state.courses.slice(indexOfFirstPost, indexOfLastPost);

    return currentsPosts.filter((item) =>
      item.category_name
        .toString()
        .toLowerCase()
        .includes(this.state.categorie.toString().toLowerCase())
    );
  };

  userHasWatched = () => {
    
    var watchedCourses = this.state.courses;
    var getLatest = parseInt(localStorage.getItem('courseWatch'));
    
    var result = watchedCourses.filter(function (e) {
      return [getLatest].includes(e.course_id)
    });
    return result
  };

  // change page
  paginate = (pageNumber) => {
    let myDiv = document.getElementById('CoursesContainer');
    myDiv.scrollTop = 0;
    
    localStorage.setItem(`paginate`, pageNumber);
    
    this.setState({
      setCurrentPage: pageNumber
    })
  }

  removeContinueCourse() {
    localStorage.removeItem('courseWatch')
    this.setState({
      watched: '',
    })
  }

  render() {
    const loading = this.state.loading;
    const sideBarShow = this.state.sideBarShow;
    
   return (
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            {loading ? (
              <LoadingSpinner />
            ) : (
              <div>
                 <div className={classes.Overview}>
                   <div id={"Categories-Menu"} onClick={
                     () => this.setState({sideBarShow: !this.state.sideBarShow})
                   }>{sideBarShow ? null : <span id="primary">Categories</span> }</div>
                   <div id={'CategoriesBar'} className={`${classes.Categories}  ${sideBarShow ? 'slideInRight' : null }`}>
                    <h3>Categories</h3>
                    <ul>
                      {this.state.categories.map((item, i) => {
                        return (
                          <div
                            key={i}
                            // onClick={this.editCategory}>
                            onClick={() => {
                                if (item.category_name === this.state.categorie) {
                                  this.setState({
                                    categorie: "",
                                    postPerpage: 12
                                  });
                                  } else {
                                  this.setState({
                                    categorie: item.category_name,
                                    postPerpage: 9999,
                                    setCurrentPage: 1
                                  });
                                  }}}>
                            <input
                              readOnly
                              checked={
                                this.state.categorie === item.category_name
                              }
                              type="checkbox"
                              className={classes.Checkbox}
                              value={item.category_name}
                            />
                            <li>{item.category_name}</li>
                          </div>
                        );
                      })}
                    </ul>
                   </div>
                   {sideBarShow ? <div className="overlay" onClick={
                     () => this.setState({sideBarShow: !this.state.sideBarShow})
                   }></div> : null}
                   <FilterCourse
                     remove={this.removeContinueCourse}
                     watched={this.userHasWatched()}
                    courses={this.dynamicSearch()}
                      // courses={currentsPosts}
                    banner={this.state.categorie}
                  />
                  </div>
                 <Paginations setCurrentPage={this.state.setCurrentPage} postPerpage={this.state.postPerpage} totalPosts={this.state.courses.length} paginate={this.paginate} />
              </div>
            )}
          </Route>
          <Route path="/course/:id">
            <LessonOverview id={this.state.course} />
          </Route>
          <Route path="/admin/">
            <UploadNewCourse />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default coursesOverview;
