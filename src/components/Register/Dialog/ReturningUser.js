import React from 'react';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import DialogActions from 'material-ui/Dialog/DialogActions';
import DialogContent from 'material-ui/Dialog/DialogContent';
import DialogContentText from 'material-ui/Dialog/DialogContentText';
import DialogTitle from 'material-ui/Dialog/DialogTitle';

class ReturningUserDialog extends React.Component {
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
          <DialogTitle id="alert-dialog-title">
            {'Welcome back!'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              If you are in need of assistance regarding your age, gender or
              vision, please see these services...
            </DialogContentText>
            <pre>{JSON.stringify(this.props.registrationResults, null, 2)}</pre>
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

export default ReturningUserDialog;
