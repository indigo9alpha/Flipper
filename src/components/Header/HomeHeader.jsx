import React, { useState,useCallback } from "react";
import IconButton from "@material-ui/core/IconButton";
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import MenuIcon from '@material-ui/icons/Menu'
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import ClosableDrawer from './ClosableDrawer'


const HomeHeader = () => {
  const dispatch = useDispatch()

  const [sideBarOpen,setSideBarOpen] = useState(false)

  const handleDrawerToggle = useCallback((event) => {
    // tabキーとshiftキーで開閉しない
    if(event.type === 'keydown' &&
    (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setSideBarOpen(!sideBarOpen);
  },[setSideBarOpen, sideBarOpen])

  return (
    <>
      <IconButton onClick={() => {
        dispatch(push('/List'))
      }}>
        <ArrowRightIcon />
      </IconButton>
      <IconButton onClick={(event) => handleDrawerToggle(event)}>
        <MenuIcon />
      </IconButton>
      <ClosableDrawer open={sideBarOpen} onClose={handleDrawerToggle} />
    </>
  )
}

export default HomeHeader