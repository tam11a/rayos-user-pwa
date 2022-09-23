import { Button } from "@mui/material";
import React from "react";
import { IoPhonePortraitOutline } from "react-icons/io5";

const InstallationButton = () => {
  const [deferredPrompt, setDeferredPrompt] = React.useState();
  const [updatePrompt, setUpdatePrompt] = React.useState();

  React.useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevents the default mini-infobar or install dialog from appearing on mobile
      e.preventDefault();
      // Save the event because you'll need to trigger it later.
      setDeferredPrompt(e);
    });

    window.addEventListener("update_ready", (e) => {
      // Prevents the default mini-infobar or install dialog from appearing on mobile
      e.preventDefault();
      // Save the event because you'll need to trigger it later.
      setUpdatePrompt("available");
    });
  }, []);

  // console.log(updatePrompt);

  return (
    <>
      <Button
        size={"small"}
        sx={{
          py: 0,
          textTransform: "unset",
          display: deferredPrompt ? "flex" : "none",
          "&:hover": { background: "transparent" },
        }}
        startIcon={
          <IoPhonePortraitOutline
            style={{
              fontSize: "0.8rem",
            }}
          />
        }
        disableRipple
        onClick={async () => {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          // The deferredPrompt can only be used once.
          setDeferredPrompt();
          // Act on the user's choice
          if (outcome === "accepted") {
            console.log("User accepted the install prompt.");
          } else if (outcome === "dismissed") {
            console.log("User dismissed the install prompt");
          }
        }}
      >
        Install Our App
      </Button>
      {/* <Button
        size={"small"}
        sx={{
          py: 0,
          textTransform: "unset",
          //   display: updatePrompt ? "flex" : "none",
          "&:hover": { background: "transparent" },
        }}
        startIcon={
          <IoPhonePortraitOutline
            style={{
              fontSize: "0.8rem",
            }}
          />
        }
        disableRipple
        onClick={async () => {
          window.location.reload(true);
        }}
      >
        Update Available
      </Button> */}
    </>
  );
};

export default InstallationButton;
