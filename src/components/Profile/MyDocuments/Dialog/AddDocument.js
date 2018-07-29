import React from 'react';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import DialogActions from 'material-ui/Dialog/DialogActions';
import DialogContent from 'material-ui/Dialog/DialogContent';
import DialogContentText from 'material-ui/Dialog/DialogContentText';
import DialogTitle from 'material-ui/Dialog/DialogTitle';

import Camera from '../../../Camera';

class AddDocument extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      open: nextProps.open
    });
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Add Document'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please attach the document.
            </DialogContentText>
            <Camera
              onCapture={imgData => {
                // this.setState({
                //   imgData
                // });
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              No Thanks
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AddDocument;
