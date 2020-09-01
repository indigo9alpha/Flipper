
import React, { useCallback, useEffect, useState } from "react";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../reducks/users/operations";
import { db } from "../../firebase";


const ClosableDrawer = (props) => {
  const { container } = props;
  const dispatch = useDispatch()

  return (
    <nav>
      <Drawer
        container={container}
        variant="temporary"
        anchor="right"
        open={props.open}
        onClose={(e) => props.onClose(e)}
        ModalProps={{ keepMounted: true }}
      >
        <div className="drawerText">
          <div onClick={() => {
            dispatch(signOut())
          }}>
            <p>Log out</p>
          </div>
          <div onClick={() => {
            dispatch(push('signin/reset'))
          }}>
            <p>Account</p>
          </div>
        </div>
      </Drawer>
    </nav>
  );
};

export default ClosableDrawer;
