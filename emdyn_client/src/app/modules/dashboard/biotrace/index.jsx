import { Component } from 'react'
import { Carousel, Button, Icon, notification } from 'antd'
import { connect } from 'react-redux'
import { updateProgress, resetProgress, timeToUpdate } from './reducers'
import keys from 'lodash/keys'
import path from 'path'
import { remote } from 'electron'
import fs from 'fs'
const dialog = remote.dialog


export class LeftNavButton extends Component {
  render() {
    let {currentSlide, slideCount, ...restProps} = this.props
    return <button {...restProps}><Icon type="left" /></button>
  }
}
export class RightNavButton extends Component {
  render() {
    let {currentSlide, slideCount, ...restProps} = this.props
    return <button {...restProps}><Icon type="right" /></button>
  }
}

class BioTrace extends Component {
  constructor() {
    super();
    this.histrotyData = [
      {
        "id": 1,
        "username": "name-of-system-user",
        "start": "13 Aug 2017 00:41AM",
        "end": "14 Aug 2017 12:00AM",
        "total": 250000,
        "processed": 249996,
        "matches-count": 3,
        "errors": {
          "count": 4,
          "list": [
            { "name": "ImageName1", "date": "13 Aug 2017 00:41AM", "error": "Invalid file type" },
            { "name": "ImageName2", "date": "12 Aug 2017 00:41AM", "error": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure placeat perspiciatis deserunt, cumque magni quis deleniti delectus velit ullam tenetur inventore beatae eligendi, voluptatibus facere. Non laboriosam, obcaecati recusandae cupiditate." },
            { "name": "ImageName3", "date": "11 Aug 2017 00:41AM", "error": "Code:3" },
            { "name": "ImageName4", "date": "15 Aug 2017 00:41AM", "error": "Code:4" }
          ]
        },
        "matches": [
          {
            "id": 3,
            "name": "Frank Rosevelt",
            "process-id": 2,
            "process-timestamp": "13 Aug 2017 00:41AM",
            "matches-count": 2,
            "galleries": ["g1", "g9"],
            "photo": "https://ka-perseus-images.s3.amazonaws.com/5ad54a536650d222a75cf1046fc3b973f6a8955e.jpg",
            "matches": [
              {
                "confidence": 1,
                "face": {
                  "galleries": ["g1", "g2"],
                  "id": 22,
                  "meta": "Sam Berry",
                  "photo": "https://pbs.twimg.com/profile_images/648763416686034944/C2sNZL7Y.jpg",
                  "photo_hash": "dc7ac54590729669ca869a18d92cd05e",
                  "thumbnail": "http://static.findface.pro/57726179d6946f02f3763824/dc7ac54590729669ca869a18d92cd05e_thumb.JPG",
                  "timestamp": "2016-07-01T12:18:27.477653",
                  "x1": 236,
                  "x2": 311,
                  "y1": 345,
                  "y2": 419
                }
              },
              {
                "confidence": 1,
                "face": {
                  "galleries": ["g1", "g4"],
                  "id": 99,
                  "meta": "Jimmy Fallon",
                  "photo": "https://upload.wikimedia.org/wikipedia/commons/9/9e/Jimmy_Fallon,_Montclair_Film_Festival,_2013.jpg",
                  "photo_hash": "dc7ac54590729669ca869a18d92cd05e",
                  "thumbnail": "http://static.findface.pro/257726179d6946f02f3763824/dc7ac54590729669ca869a18d92cd05e_thumb.JPG",
                  "timestamp": "2016-07-01T12:18:27.477653",
                  "x1": 236,
                  "x2": 311,
                  "y1": 345,
                  "y2": 419
                }
              }
            ]
          },
          {
            "id": 22,
            "name": "Sam Berry",
            "process-id": 2,
            "process-timestamp": "13 Aug 2017 00:41AM",
            "matches-count": 2,
            "galleries": ["g1", "g9"],
            "photo": "http://static.findface.pro/SamBerry.jpg",
            "matches": [
              {
                "confidence": 1,
                "face": {
                  "galleries": ["g1", "g2"],
                  "id": 3,
                  "meta": "Frank Rosevelt",
                  "photo": "http://static.findface.pro/FrankRosevelt.jpg",
                  "photo_hash": "dc7ac54590729669ca869a18d92cd05e",
                  "thumbnail": "http://static.findface.pro/57726179d6946f02f3763824/dc7ac54590729669ca869a18d92cd05e_thumb.JPG",
                  "timestamp": "2016-07-01T12:18:27.477653",
                  "x1": 236,
                  "x2": 311,
                  "y1": 345,
                  "y2": 419
                }
              },
              {
                "confidence": 1,
                "face": {
                  "galleries": ["g1", "g4"],
                  "id": 99,
                  "meta": "Jimmy Fallon",
                  "photo": "http://static.findface.pro/JimmyFallon.jpg",
                  "photo_hash": "dc7ac54590729669ca869a18d92cd05e",
                  "thumbnail": "http://static.findface.pro/257726179d6946f02f3763824/dc7ac54590729669ca869a18d92cd05e_thumb.JPG",
                  "timestamp": "2016-07-01T12:18:27.477653",
                  "x1": 236,
                  "x2": 311,
                  "y1": 345,
                  "y2": 419
                }
              }
            ]
          },
          {
            "id": 99,
            "name": "Jimmy Fallon",
            "process-id": 2,
            "process-timestamp": "13 Aug 2017 00:41AM",
            "matches-count": 2,
            "galleries": ["g1", "g9"],
            "photo": "http://static.findface.pro/JimmyFallon.jpg",
            "matches": [
              {
                "confidence": 1,
                "face": {
                  "galleries": ["g1", "g2"],
                  "id": 3,
                  "meta": "Frank Rosevelt",
                  "photo": "http://static.findface.pro/FrankRosevelt.jpg",
                  "photo_hash": "dc7ac54590729669ca869a18d92cd05e",
                  "thumbnail": "http://static.findface.pro/57726179d6946f02f3763824/dc7ac54590729669ca869a18d92cd05e_thumb.JPG",
                  "timestamp": "2016-07-01T12:18:27.477653",
                  "x1": 236,
                  "x2": 311,
                  "y1": 345,
                  "y2": 419
                }
              },
              {
                "confidence": 1,
                "face": {
                  "galleries": ["g1", "g4"],
                  "id": 22,
                  "meta": "Sam Berry",
                  "photo": "http://static.findface.pro/SamBerry.jpg",
                  "photo_hash": "dc7ac54590729669ca869a18d92cd05e",
                  "thumbnail": "http://static.findface.pro/257726179d6946f02f3763824/dc7ac54590729669ca869a18d92cd05e_thumb.JPG",
                  "timestamp": "2016-07-01T12:18:27.477653",
                  "x1": 236,
                  "x2": 311,
                  "y1": 345,
                  "y2": 419
                }
              }
            ]
          }
        ]

      },
      {
        "id": 2,
        "username": "name-of-system-user",
        "start": "16 Aug 2017 00:41AM",
        "end": "17 Aug 2017 12:00AM",
        "total": 150000,
        "processed": 150000,
        "matches-count": 0,
        "errors": {
          "count": 0,
          "list": []
        },
        "matches": [

        ]
      }

    ];
    // this.histrotyData = [];
    this.state = {
      selectedProcess: this.histrotyData[0] || null,
      errorsView: false,
      galleryMode: false,
      currentGallery: [],
      showGalleryModal: false,
      slideIndex: 0,
    }
    this.selectPath = this.selectPath.bind(this);
    this.startProcess = this.startProcess.bind(this);
    this.selectProcess = this.selectProcess.bind(this);
    this.changeViewType = this.changeViewType.bind(this);
    this.toggleGalleryMode = this.toggleGalleryMode.bind(this);
    this.toggleGalleryModal = this.toggleGalleryModal.bind(this);
    this.exportCsv = this.exportCsv.bind(this);
  }

  //triggers progress overlay
  triggerOverlay() {
    this.props.updateProgress({ showProgressOverlay: !this.props.progress.showProgressOverlay });
  }

  // starts process
  startProcess() {
    this.triggerOverlay();
    this.startCounter();
    setTimeout(() => {
      clearInterval(this.interval);
      this.props.resetProgress();
    }, 20000);
  }

  //opens file selet dialog and gets path to file/folder
  selectPath() {
    dialog.showOpenDialog({
      properties: ['openFile', 'openDirectory', 'multiSelections']
    }, (paths) => {
      if (paths) {
        this.props.updateProgress({ paths })
      }
    });
  }

  exportCsv() {
    const data = this.state.selectedProcess;
    if (!data.matches.length) {
      notification.error({ message: "No data to export" });
      return;
    }
    let csvContent = `Job ID,Start date,End date,Username,Original ID,Matches \n`;

    data.matches.forEach((item, index) => {
      const matchesList = item.matches.map(matches => matches.face.meta).join(',');
      const dataString = `${data.id},${data.start},${data.end},${data.username},${item.name},"${matchesList}"`;
      csvContent += index < data.matches.length ? `${dataString} \n` : dataString;
    });

    dialog.showSaveDialog(fileName => {
      if (fileName === undefined) {
        notification.error({ message: "You didn't save the file" });
        return;
      }
      fs.writeFile(fileName + '.csv', csvContent, 'utf8', (err) => {
        if (err) {
          notification.error({ message: "An error ocurred creating the file " + err.message });
        }
        notification.success({ message: "The file has been succesfully saved" });
      });
    });
  }

  startCounter() {
    let timeCounter = timeToUpdate;
    this.interval = setInterval(() => {
      timeCounter = timeCounter -= 1;
      if (timeCounter == 0) {
        this.props.updateProgress({ from: this.props.progress.from += 10 });
        timeCounter = timeToUpdate;
      }
      this.props.updateProgress({ timeCounter });
    }, 1000);
  }

  /*
    shows for user path to folder in case of folder select or multiply files select.
    In case of single file select - shows path to this file
  */
  getPath(PATH) {
    if (!PATH.length) {
      return 'Choose files or folder'
    }
    if (PATH.length > 1) {
      return path.dirname(PATH[0])
    }
    return PATH[0];
  }

  getHeadClass() {
    if (!this.state.selectedProcess) {
      return '';
    }
    return this.state.errorsView ? 'error' : 'success';
  }

  //shows all data related to choosen job in history
  selectProcess(selectedProcess) {
    return () => {
      this.setState({ selectedProcess })
    }
  }

  //show errors/matches for competed job
  changeViewType() {
    this.setState({ errorsView: !this.state.errorsView })
  }

  setCurrentGallery(gallery) {
    let currentGallery = [];
    if (gallery) {
      currentGallery.push({
        name: gallery.name,
        date: gallery["process-timestamp"],
        photo: gallery.photo,
      });
      gallery.matches.forEach((item) => {
        currentGallery.push({
          name: item.face.meta,
          date: item.face.timestamp,
          photo: item.face.photo,
          confidence: item.confidence
        })
      });
    }
    this.setState({ currentGallery });
  }

  onProcessClick(gallery) {
    return () => {
      this.setCurrentGallery(gallery);
      this.toggleGalleryMode();
    }
  }

  toggleGalleryMode() {
    if (this.state.errorsView) {
      return false
    }
    this.setState({ galleryMode: !this.state.galleryMode });
  }

  toggleGalleryModal(index) {
    return () => {
      this.setState({ showGalleryModal: !this.state.showGalleryModal, slideIndex: index || 0 });
    }
  }


  render() {
    const { updateProgress, progress} = this.props;

    //progress overlay
    const progressOverlay = progress.showProgressOverlay ? (
      <div className="progress">
        <div className="info">
          <h3 className="title">Currently processing your selected images</h3>
          <div className="box">
            Files processed
            <div className="count">{progress.from}</div>
          </div>
          <div className="box">
            Total to process
            <div className="count">{progress.total}</div>
          </div>
          <div className="timer">
            Next status refresh in
            <div className="count">{progress.timeCounter}</div>
            sec
          </div>
          <div className="note"><Icon type="info-circle-o" /> Info: If you logout the process will continue until you return</div>
        </div>
      </div>
    ) : null;
    //end progress overlay

    //results block
    const results = this.state.selectedProcess ? (
      <ul className="list">
        <li><b>Username :</b> {this.state.selectedProcess.username || '-'}</li>
        <li><b>Total :</b> {this.state.selectedProcess.total || '-'}</li>
        <li><b>Processed :</b> {this.state.selectedProcess.processed || '-'}</li>
        <li className={`selectable ${!this.state.errorsView ? 'active' : null}`} onClick={this.changeViewType}>
          <b>Matches :</b>
          {this.state.selectedProcess["matches-count"]}
        </li>
        <li className={`selectable ${this.state.errorsView ? 'active' : null}`} onClick={this.changeViewType}>
          <b>Errors :</b>
          {this.state.selectedProcess.errors.count}
        </li>
        <li><b>Start :</b> {this.state.selectedProcess.start || '-'}</li>
        <li><b>End :</b> {this.state.selectedProcess.end || '-'}</li>
      </ul>) : (<p className="empty-text">The results will be displayed after the first comparison</p>);
    //end results block

    //history block
    const history = this.histrotyData.length ? (
      <div className="scrolling-list">
        <div className="head">
          <div className="col">Username</div>
          <div className="col">Start</div>
          <div className="col">End</div>
        </div>
        <ul className="list">{
          this.histrotyData.map((row, index) => {
            return (
              <li key={index} className={this.state.selectedProcess.id == row.id ? 'active' : ''} onClick={this.selectProcess(row)}>
                <div className="col">{row.username || '-'}</div>
                <div className="col">{row.start || '-'}</div>
                <div className="col">{row.end || '-'}</div>
              </li>
            )
          })}
        </ul>
      </div>
    ) : (<p className="empty-text">The results will be automatically added after the first comparison</p>);
    //end history block

    //matches/errors list
    const viewList = this.state.selectedProcess ? (this.state.errorsView ? this.state.selectedProcess.errors.list : this.state.selectedProcess.matches) : [];
    const processedList = viewList.length ? (
      <div className="scrolling-list matched-list">
        <div className="head">
          <div className="col">File name</div>
          <div className="col">Start process date</div>
          <div className="col">{this.state.errorsView ? 'Errors' : 'Matches'}</div>
        </div>
        <ul className={`list ${this.state.errorsView ? '' : 'matches'}`}>
          {
            viewList.map((item, index) => {
              return (
                <li key={index} onClick={this.onProcessClick(item)}>
                  <div className="col">{item.name}</div>
                  <div className="col">{item["process-timestamp"] || item.date}</div>
                  <div className="col">{item["matches-count"] || item.error}</div>
                </li>
              )
            })
          }
        </ul>
        <div className="bottom-panel">
          {this.state.errorsView ? null : (<Button onClick={this.exportCsv}>Export CSV <Icon type="export" /></Button>)}
        </div>
      </div>
    ) : (<div className="empty-text">No data to display</div>);
    //end matches/errors list

    //process block
    const process = (
      <div className="content">
        <div className="item">
          {this.state.selectedProcess ? processedList : (<div className="empty-text">Any files or folder to start comparing</div>)}
        </div>
        <div className="info">
          <div className="item scrolling-list results">
            <div className="head">Results</div>
            {results}
          </div>
          <div className="item history">
            <div className="head">Jobs Completed</div>
            {history}
          </div>
        </div>
      </div>
    );
    //end process block

    // gallery block
    const gallery = this.state.currentGallery.length ? (
      <div className="content gallery">
        <div className="item">
          <div className="head" onClick={this.toggleGalleryMode}><Icon type="left" /> Back to list view</div>
          <div className="main-img">
            <div
              className="img"
              onClick={this.toggleGalleryModal()}
              style={{ backgroundImage: `url(${this.state.currentGallery[0].photo}` }}>
              <Icon type="plus-circle-o" />
            </div>
            <ul className="img-info">
              <li><b>Name:</b>{this.state.currentGallery[0].name}</li>
              <li><b>Start process date :</b>{this.state.currentGallery[0].date}</li>
            </ul>
          </div>
          <div className="matches-gallery">
            <div className="scrolling-list">
              <div className="head">Matches</div>
              <ul className="list">
                {this.state.currentGallery.map((item, index) => {
                  if (index === 0) {
                    return
                  }
                  return (
                    <li
                      onClick={this.toggleGalleryModal(index)}
                      key={index}
                      style={{ backgroundImage: `url(${item.photo})` }}>
                      <Icon type="plus-circle-o" />
                      <span className="confidence">{item.confidence}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>

        {this.state.showGalleryModal ? (
          <div className="modal">
            <div className="modal-overlay" onClick={this.toggleGalleryModal()}><Icon type="close" /></div>
            <div className="modal-content">
              <Carousel initialSlide={this.state.slideIndex} arrows={true} prevArrow={<LeftNavButton />} nextArrow={<RightNavButton />}>
                {this.state.currentGallery.map((item, index) => {
                  return (
                    <div key={index}>
                      <div className="gallery-modal-wrap">
                        <div
                          className="gallery-photo"
                          style={{ backgroundImage: `url(${item.photo})` }}>
                        </div>
                        <div className="name">{item.name}</div>
                      </div>
                    </div>
                  )
                })}
              </Carousel>
            </div>
          </div>
        ) : null}

      </div>
    ) : null;
    // end gallery block

    return (
      <div>
        <div className="match">
          <div className="item upload">
            <div className={`head ${this.getHeadClass()}`}>{this.state.errorsView ? 'Errors' : 'Processed'}</div>
            <div className="upload-row">
              <div className="file-select" onClick={this.selectPath}>
                <input
                  type="text"
                  value={this.getPath(progress.paths)}
                  readOnly
                  className="input-custom" />
                <div className="browse">Browse...</div>
              </div>
              <Button type="primary" disabled={!progress.paths.length} onClick={this.startProcess}>Go</Button>
            </div>
          </div>
          {this.state.galleryMode ? gallery : process}
        </div>
        {progressOverlay}
      </div>
    )
  }
}

export default connect(
  ({progress}) => ({
    progress,
  }),
  {
    updateProgress,
    resetProgress,
  }
)(BioTrace)