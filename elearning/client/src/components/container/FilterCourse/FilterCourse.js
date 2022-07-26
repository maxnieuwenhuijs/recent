import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import classes from "./FilterCourse.module.css";
import "./categoryStyle.css";
import { getPath } from "../../../util/getPath";
import { ProgressBar } from 'react-bootstrap';

const filterCourse = (props) => {
  let banner = "Default";

  banner = props.banner;

  let bannerName = props.banner;

  switch (banner) {
    case "Marketing":
      banner = "Marketing";
      break;
    case "Mind & Body":
      banner = "Mindbody";
      break;
    case "Business":
      banner = "Business";
      break;
    case "SEO & Traffic":
      banner = "SEO";
      break;
    case "Health & Beauty":
      banner = "Healthandbeauty";
      break;
    case "Communication":
      banner = "Communication";
      break;
    default:
      banner = "Default";
  }

  return (
    <div  id={"CoursesContainer"} className={classes.TopContainer}>
      <div className={classes.Banner}>
        <div>
          <h3>{bannerName}</h3>
        </div>
        <img src={window.location.origin + `/${banner}.jpg`} />
      </div>

      <div className={classes.Container}>
        <div className={`${classes.Watched} ${classes.Wrapper}`}>
          {props.watched.map((item, i) => {
            return (
              <div
                key={i}
                className={classes.CourseCard}
                order={item.module_order}
              >
                <img src={window.location.origin + "/close.png"} className={classes.Close} onClick={props.remove}/>
                <h3>Continue course:</h3>
                <Link
                  key={i}
                  category={item.category_name}
                  to={`/course/${item.course_id}`}
                >
                  <li className={classes.Listitem}>
                    <div className={classes.ImageContainer}>
                      <img
                        src={`${getPath()}assets/courses/${item.course_id}/img/banner.png`}
                      />
                    </div>
                    <div className={classes.TextContainer}>
                      <h3>{item.course_title}</h3>
                      <p>{item.course_description}</p>
                    </div>
                    <p className={`${classes.Category} ${item.category_style}`}>
                      {item.category_name}
                    </p>
                  </li>
                </Link>
              </div>
            );
          })}
        </div>

      <div className={classes.Wrapper} >
        {props.courses.map((item, i) => {
          return (
            <div
              onClick={() => {
                localStorage.setItem('courseWatch', item.course_id)
              }}
              key={i}
              className={classes.CourseCard}
              order={item.module_order}
            >
              <Link
                key={i}
                category={item.category_name}
                to={`/course/${item.course_id}`}
              >
                <li className={classes.Listitem}>
                  <div className={classes.ImageContainer}>
                    <img
                      src={`${getPath()}assets/courses/${item.course_id}/img/banner.png`}
                    />
                  </div>
                  <div className={classes.TextContainer}>
                    <h3>{item.course_title}</h3>
                    <p>{item.course_description}</p>
                  </div>
                  <p className={`${classes.Category} ${item.category_style}`}>
                    {item.category_name}
                  </p>
                </li>
              </Link>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
};

export default filterCourse;
