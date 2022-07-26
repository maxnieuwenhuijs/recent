import React, { Component } from "react";
import axios from "axios";
import classes from "./LessonOverview.module.css";
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton,
  BigPlayButton,
} from "video-react";
import "../../../../node_modules/video-react/dist/video-react.css";
import "./videoPlayer.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { createBrowserHistory } from 'history';
import { ProgressBar } from 'react-bootstrap';
import { getPath } from "../../../util/getPath";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'


let history = createBrowserHistory();


let timer = null;
class LessonOverview extends Component {

  constructor() {
    super();

    this.state = {
      lessons: [],
      course: [],
      courseID: '',
      lesson: '',
      videoUrl: "",
      summaryList: [],
      loading: true,
      duration: 0,
      intervalId: '',
      checked: false,
      progress: false,
      active: false,
      sideBarShow: false
    }

    this.startTimer = this.startTimer.bind(this);
    this.countdown = this.countdown.bind(this);
  }

  componentDidMount() {
    let url = window.location.href;
    let getID = url.substr(url.lastIndexOf("/") + 1);
    this.setState({
      courseID: getID
    })

    const getLessons = `${getPath()}course/` + getID;
    const getText = `${getPath()}text/` + getID;

    axios.get(getLessons).then((res) => {
      const lessons = res.data;
      this.setState({ lessons: lessons });

    });

    axios.get(getText).then((res) => {
      const summaryData = res.data;
      this.setState({ course: summaryData });

      const listData = this.state.course.summary_list;

      if (listData) {
        const listArray = listData.split(";");
        this.setState({
          summaryList: listArray,
          loading: false,
        });
      }
    });

    let videoStorage = localStorage.getItem(`video-${getID}`);

    if (videoStorage == null) {
      videoStorage = 1;
      localStorage.setItem(`video-${getID}`, videoStorage);

      clearInterval(this.state.intervalId);
      this.setState({
        duration: 0,
        checked: false,
        active: videoStorage,
      })

      this.startTimer();

      this.setState({
        videoUrl: `${getPath()}video/${getID}/${videoStorage}`,
        lesson: videoStorage,
        loop: true
      });

    } else {
      clearInterval(this.state.intervalId);
      this.setState({
        duration: 0,
        checked: false,
        active: videoStorage,
      })

      this.startTimer();

      this.setState({
        videoUrl: `${getPath()}video/${getID}/${videoStorage}`,
        lesson: videoStorage,
        loop: true
      });
    }

    var seconds = localStorage.getItem(`vid-${getID}-${videoStorage}`)

    setTimeout(() => {
      if (seconds != null) {
        const { player } = this.player.getState();
        this.player.seek(seconds);
        var duration = player.duration;
      }

      this.setState({
        duration: duration
      })
    }, 1000)
    localStorage.setItem(`video-${getID}`, videoStorage);
    
    }    

  countdown() {

    if (this.state.duration == 0) {

      clearInterval(this.state.intervalId);
    } else { 
      const { player } = this.player.getState();
      var userTime = player.currentTime;

      if (userTime < 3) {
         userTime = player.currentTime;
      } else {
         userTime = player.currentTime - 3;
      }

      var duration = player.duration;
      var userSeen = userTime / duration * 100;

      localStorage.setItem(`vid-${this.state.courseID}-${this.state.lesson}`, userTime);
      localStorage.setItem(`seen-${this.state.courseID}-${this.state.lesson}`, userSeen);
     
      this.setState({
        progress: true
      })

      if (userSeen > 85) {
        localStorage.setItem(`check-${this.state.courseID}-${this.state.lesson}`, 'VALID');
        this.setState({
          checked: true
        })
      }
    }

  }

  startTimer() {
      const intervalId = setInterval(this.countdown, 2500);
      this.setState({ intervalId: intervalId })
  }

  componentWillUnmount() {
    this.setState({
      duration: 0
    })
    clearInterval(this.state.intervalId);
    console.log('clear interval')
  }

  setlessonHandler(courseId, lessonOrder) {
    return () => {
      clearInterval(this.state.intervalId);
      this.setState({
        duration: 0,
        checked: false,
        active: lessonOrder
      })

      this.startTimer()


        this.setState({
          videoUrl: `${getPath()}video/${courseId}/${lessonOrder}`,
          lesson: lessonOrder,
          loop: true
        });

      var seconds = localStorage.getItem(`vid-${courseId}-${lessonOrder}`)
 
        setTimeout(() => {
          if (seconds != null) {
            const { player } = this.player.getState();
            this.player.seek(seconds);
            var duration = player.duration;
          }

          this.setState({
            duration: duration
          })
        }, 50)
      localStorage.setItem(`video-${courseId}`, lessonOrder);
    }
  }
    render() {

    let url = window.location.href;
    let getID = url.substr(url.lastIndexOf("/") + 1);
    const posterUrl = `${getPath()}assets/courses/${getID}/img/image.png`;
    const ebookDownloadUrl = `${getPath()}download/${getID}/${this.state.course.ebook_title}.pdf`;
    const ebookImage = `${getPath()}assets/courses/${getID}/img/ebook.png`;
    const bannerImage = `${getPath()}assets/courses/${getID}/img/banner.png`;
    const loading = this.state.loading;
    const sideBarShow = this.state.sideBarShow;

    return (
      <div className={classes.Wrapper}>
        
        <div className={classes.Back} id={'secondary'} onClick={() => {
          document.location= '/'
        }}>
          <FontAwesomeIcon icon={faArrowLeft} /> BACK
          </div>
        {loading ? (
          <LoadingSpinner />
        ) : (
          //Load wrapper
            <div>
                  {sideBarShow ? <div className="overlay" onClick={
                     () => this.setState({sideBarShow: !this.state.sideBarShow})
                   }></div> : null}
            <div className={classes.MovieSection}>
                <Player
                  playsInline
                  ref={player => {
                    this.player = player;
                  }}
                  
                key={this.state.lesson}
                className={classes.MoviePlayer}
                autoPlay={true}
                loop={false}
                muted={false}
                controls={true}
                data-reactid=".0.1.0.0"
                poster={posterUrl}
                  src={this.state.videoUrl}
                  resizeMode={"cover"}
                  rate={1.0}
                >

                <ControlBar >
                  <ReplayControl seconds={10} order={1.1} />
                  <ForwardControl seconds={30} order={1.2} />
                    <CurrentTimeDisplay order={4.1} />
                    <TimeDivider order={4.2}/>
                  <PlaybackRateMenuButton
                    rates={[2, 1.5, 1.25, 1, 0.5]}
                    order={7.1}
                  />
                  <VolumeMenuButton />
                </ControlBar>
                <BigPlayButton position="center" />
                </Player>
                            <div id={"Lesson-Menu"} className={sideBarShow ? 'LessonCross' : null} onClick={
                     () => this.setState({sideBarShow: !this.state.sideBarShow})
                   }>{sideBarShow ? null : <span id="primary">Overview</span> }</div>
              <div className={classes.CourseDescription}>
                <div className={classes.Product}>
                  <div className={classes.List}>
                    <h3>{this.state.course.summary_list_title}</h3>
                    <ul>
                      {this.state.summaryList.map((item, i) => {
                        return (
                          <div>
                            <li key={i}>{item}</li>
                          </div>
                        );
                      })}
                    </ul>
                  </div>
                  <div className={classes.ProductSummary}>
                    <div className={classes.subTitle}>
                      <h1>{this.state.course.title}</h1>
                      <div className={classes.eBook}>
                          <a href={ebookDownloadUrl}>
                            <img className={classes.eBookImage} src={ebookImage} />
                          <span>
                            Download eBook
                            <img
                              className={classes.pdf}
                              src={window.location.origin + "/pdf.png"}
                            />
                          </span>
                        </a>
                      </div>
                    </div>
                    <h2>{this.state.course.summary_title}</h2>
                    <p>{this.state.course.summary}</p>
                    <img className={classes.Banner} src={bannerImage} />
                    <h3>{this.state.course.product_summary_title}</h3>
                    <p>{this.state.course.product_summary}</p>
                  </div>
                </div>
              </div>
              </div>
            <div id="SideBar" className={`${classes.sideBar}  ${sideBarShow ? 'slideInLeft' : null }`}>
                <h2 
                  className={classes.CourseContent}>Course content</h2>
              <ol className={classes.LessonList}>
                {this.state.lessons.map((item, i) => {
                  return (
                    <div className={classes.LessonContainer}>
                      <ProgressBar
                        now={localStorage.getItem(`seen-${this.state.courseID}-${item.lesson_order}`)} />  

                    <li
                      key={i}
                      order={item.lesson_order}
                      course={item.folder_name}
                      lesson={item.lesson_id}
                      className={this.state.active == item.lesson_order ? 'active' : ''}
                    >                                          
                      <input type="checkbox" className={classes.Checkbox}
                        onClick={() => {
                          var storage = localStorage.getItem(`check-${this.state.courseID}-${item.lesson_order}`);
                          if (storage) {
                            this.setState({
                              checked: false
                            })
                            localStorage.removeItem(`check-${this.state.courseID}-${item.lesson_order}`);
                            localStorage.removeItem(`vid-${this.state.courseID}-${item.lesson_order}`);
                            localStorage.removeItem(`seen-${this.state.courseID}-${item.lesson_order}`);
                          } else {
                            localStorage.setItem(`check-${this.state.courseID}-${item.lesson_order}`, 'VALID');
                          }
                         }}
                        checked={
                          localStorage.getItem(`check-${this.state.courseID}-${item.lesson_order}`) && this.state.checked == true || localStorage.getItem(`check-${this.state.courseID}-${item.lesson_order}`)
                      }/>
                        <span
                          className={this.state.active == item.lesson_order ? 'active' : ''}
                          onClick={
                        this.setlessonHandler(
                          item.course_id,
                          item.lesson_order)
                      }>
                        {item.lesson_title}
                      </span>
                      </li>
                    </div>
                  );
                })}
              </ol>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default LessonOverview;
