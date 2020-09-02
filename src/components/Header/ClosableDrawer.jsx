
import React from "react";
import Drawer from "@material-ui/core/Drawer";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import { signOut } from "../../reducks/users/operations";

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
