import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React from "react";

interface ConfirmationDialogProps {
  onClose: () => void;
  onOk: () => void;
  open: boolean;
  dialogTitle: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onClose,
  onOk,
  dialogTitle,
}) => {
  return (
    <React.Fragment>
      <Dialog open={open} onClose={onClose} maxWidth="md">
        <DialogTitle>Delete {dialogTitle}</DialogTitle>
        <DialogContent>Are you sure you want to delete {dialogTitle}</DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={onClose}>
            No
          </Button>
          <Button variant="contained" color="primary" onClick={onOk}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ConfirmationDialog;
