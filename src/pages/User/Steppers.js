import {
  Alert,
  AlertTitle,
  Hidden,
  Icon,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import moment from "moment";
import React from "react";
import { BsFillClockFill } from "react-icons/bs";
import { FaBoxOpen } from "react-icons/fa";
import { GoPrimitiveDot } from "react-icons/go";
import { MdCancel, MdOutlineLocalShipping } from "react-icons/md";
import { RiHome5Fill } from "react-icons/ri";
import { TbTruckReturn } from "react-icons/tb";

const Steppers = ({ timelines }) => {
  const showIcon = (status) => {
    switch (status) {
      case "Pending":
        return <BsFillClockFill />;
      case "Confirmed":
        return <FaBoxOpen />;
      case "Shipped":
        return <MdOutlineLocalShipping />;
      case "Delivered":
        return <RiHome5Fill />;
      case "Canceled":
        return <MdCancel />;
      case "Returned":
        return <TbTruckReturn />;
      default:
        return <GoPrimitiveDot />;
    }
  };
  const getSeverity = (status) => {
    switch (status) {
      case "Confirmed":
        return "warning";
      case "Delivered":
        return "success";
      case "Canceled":
      case "Returned":
        return "error";
      case "Pending":
        return "info";
      case "Shipped":
      default:
        return "black";
    }
  };

  const theme = useTheme();
  const responsive = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Stepper
        activeStep={responsive ? 0 : timelines.length - 1}
        alternativeLabel={!responsive}
        sx={{
          mb: 2,
        }}
        orientation={responsive ? "vertical" : "horizontal"}
      >
        {timelines
          ?.sort?.(
            (a, b) =>
              !responsive &&
              (a.createdAt > b.createdAt
                ? 1
                : a.createdAt < b.createdAt
                ? -1
                : 0)
          )
          ?.map?.((timeline) => (
            <Step key={timeline._id}>
              <StepLabel
                icon={
                  <Icon
                    sx={{
                      fontSize: "1.2em",
                    }}
                    color={getSeverity(timeline.status)}
                  >
                    {showIcon(timeline.status)}
                  </Icon>
                }
                sx={{
                  textAlign: { xs: "left", md: "center" },
                }}
                optional={
                  timeline._id !== timelines[0]._id || !responsive ? (
                    <Typography variant={"caption"}>
                      {moment(timeline.createdAt).format("lll")}
                    </Typography>
                  ) : (
                    <></>
                  )
                }
              >
                {timeline.status}
              </StepLabel>
              <Hidden mdUp>
                <StepContent>
                  <Alert
                    icon={showIcon(timeline.status)}
                    severity={getSeverity(timeline.status)}
                  >
                    <AlertTitle>{timeline.message}</AlertTitle>
                    {moment(timeline.createdAt).format("lll")}
                  </Alert>
                </StepContent>
              </Hidden>
              s
            </Step>
          ))}
      </Stepper>
      <Hidden mdDown>
        {timelines
          ?.sort?.((b, a) =>
            a.createdAt > b.createdAt ? 1 : a.createdAt < b.createdAt ? -1 : 0
          )
          ?.map?.((timeline, index) => (
            <Alert
              key={timeline._id}
              icon={showIcon(timeline.status)}
              severity={getSeverity(timeline.status)}
              sx={{
                fontWeight: !index && "600",
              }}
            >
              <AlertTitle
                sx={{
                  fontWeight: !index && "600",
                }}
              >
                {timeline.message}
              </AlertTitle>
              {moment(timeline.createdAt).format("lll")}
            </Alert>
          ))}
      </Hidden>
    </>
  );
};

export default Steppers;
