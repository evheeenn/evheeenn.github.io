import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { Progress } from "antd";
import DeadlineBar from "./components/DeadlineProgressBar";
import ProgressBar from "./components/ProgressBar";
import dayjs from "dayjs";
import { calculateDeadline } from "../../../../Math";
import { useNavigate } from "react-router-dom";
import { mainTheme } from "../../../../colorThemes/colorBase";

export default function Project({ el }) {

  const navigate = useNavigate()

  const styles = {
    main: {
      width: "378px",
      height: "200px",
      background: mainTheme.projectBlockColor,
      margin: "17px 17px 7px 17px",
      borderRadius: "12px",
      cursor: "pointer",
    },

    headerWrapper: {
      display: "flex",
      justifyContent: "space-between",
      margin: "27px 27px 0 27px",
    },

    count: {
      color: mainTheme.textColor,
      fontSize: "17px",
    },

    h1: {
      color: mainTheme.headlineColor,
      fontSize: "27px",
      fontWeight: 600,
    },

    deadline: {
      width: "83%",
      margin: el.deadlineBullean
        ? "73px auto 0 30px" && el.sprintsBullean
          ? "73px auto 0 30px"
          : "38px auto 0 30px"
        : "73px auto 0 30px",
      height: 8,
      borderRadius: 5,
      color: "white",
      backgroundColor: "red",
    },

    progress: {
      width: "83%",
      color: "white",
      margin: el.deadlineBullean ? "26px auto 0 30px" : "73px auto 0 30px",
    },
  };
  
  const count = el.sprintsBullean ? "Sprints:" : "Tasks: ";

  const startDate = el.date;
  const deadline = el.deadline;

  const deadlineValue = calculateDeadline(startDate, deadline);

  const navigateToProjectPage = () => {
    navigate(`/project/${el.name}`)
  }

  return (
    <Box sx={styles.main} onClick={navigateToProjectPage}>
      <Box sx={styles.headerWrapper}>
        <Typography variant="h1" sx={styles.h1}>
          {el.name}
        </Typography>
        <Typography sx={styles.count}>
          {el.sprintsBullean
            ? `${count} ${el.sprints.length}`
            : `${count} ${el.tasks.length}`}
        </Typography>
      </Box>
      <Typography sx={{ margin: "7px 0 0 27px", color: mainTheme.textColor }}>
        {el.date.replace(/-/g, ".")}
      </Typography>
      {el.deadlineBullean ? (
        <DeadlineBar value={deadlineValue} style={styles.deadline} />
      ) : null}
      {!el.sprintsBullean ? (
        <ProgressBar value={50} style={styles.progress} />
      ) : null}
    </Box>
  );
}
