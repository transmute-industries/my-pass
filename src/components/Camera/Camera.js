import React, { Component } from 'react';
import Camera from 'react-camera';

import Button from 'material-ui/Button';
import { Camera as CameraIcon } from 'material-ui-icons';

const style = {
  preview: {
    position: 'relative'
  },
  captureContainer: {
    display: 'flex',
    position: 'absolute',
    justifyContent: 'center',
    zIndex: 1,
    bottom: 0,
    width: '100%',
    padding: '16px'
  },
  captureImage: {
    width: '100%'
  }
};

export default class CameraComponent extends Component {
  state = {
    imageCaptured: false
  };
  constructor(props) {
    super(props);
    this.takePicture = this.takePicture.bind(this);
  }

  takePicture() {
    this.camera.capture().then(blob => {
      this.props.onCapture(blob);

      this.setState({
        imageCaptured: true,
        image: URL.createObjectURL(blob)
      });
    });
  }

  render() {
    return (
      <div style={style.container}>
        {!this.state.imageCaptured && (
          <Camera
            style={style.preview}
            ref={cam => {
              this.camera = cam;
            }}
          >
            <div style={style.captureContainer} onClick={this.takePicture}>
              <Button variant="fab" color="primary" aria-label="Add">
                <CameraIcon />
              </Button>
            </div>
          </Camera>
        )}

        {this.state.imageCaptured && (
          <div>
            <img
              alt="captured"
              style={style.captureImage}
              src={this.state.image}
            />
            <Button
              variant="raised"
              color="secondary"
              onClick={() => {
                this.setState({
                  imageCaptured: false
                });
              }}
            >
              Remove Photo
            </Button>
          </div>
        )}
      </div>
    );
  }
}
