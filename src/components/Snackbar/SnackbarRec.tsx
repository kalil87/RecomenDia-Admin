import { Close } from "@mui/icons-material";
import { IconButton, Snackbar } from "@mui/material"
import { Fragment } from "react";


interface Props {
  open: boolean;
  isError: boolean;
  message: string;
  onClose: () => void;
}

export const SnackbarRec = ({ open, isError, message, onClose }: Props ) => {
  return (
    <Snackbar
      anchorOrigin={{
        horizontal: "right",
        vertical: "bottom",
      }}
      open={open}
      autoHideDuration={5000}
      message={message}
      ContentProps={{
        sx: {
          backgroundColor: isError ? 'red' : 'green',
          marginLeft: '20px'
        }
      }}
      onClose={onClose}
      action={
        <Fragment>
          <IconButton
            onClick={onClose}
          >
            <Close fontSize="small" sx={{ color: 'white' }} />
          </IconButton>
        </Fragment>
      }
    />
  )
}
