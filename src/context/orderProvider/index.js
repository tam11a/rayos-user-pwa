import { Avatar, Dialog, DialogContent, Typography } from "@mui/material";
import React from "react";
import congratsImg from "../../assets/illustration_order_complete.svg";
const orderContext = React.createContext();

export const OrderProvider = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const popCongratulations = () => setOpen(!open);
  return (
    <orderContext.Provider
      value={{
        popCongratulations,
      }}
    >
      <Dialog open={open} onClose={popCongratulations}>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            rowGap: 2,
          }}
        >
          <img
            src={congratsImg}
            variant={"square"}
            style={{
              width: "80vw",
              maxWidth: "300px",
              aspectRatio: "1/1",
            }}
          />
          <Typography
            variant={"button"}
            sx={{
              textAlign: "center",
              "& b": {
                fontSize: "1.3em",
                color: "primary.main",
              },
            }}
          >
            <b>Congratulations!!</b> <br /> Your Order Have Been Placed!!
          </Typography>
        </DialogContent>
      </Dialog>
      {children}
    </orderContext.Provider>
  );
};

export default orderContext;
