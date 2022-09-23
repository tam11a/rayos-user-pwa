import React from "react";
import snackContext from "../snackProvider";

export const notificationContext = React.createContext();

const Index = ({ children }) => {
  const snack = React.useContext(snackContext);
  const [permission, setPermission] = React.useState(false);
  const askPermission = () => {
    return new Promise(function (resolve, reject) {
      const permissionResult = Notification.requestPermission(function (
        result
      ) {
        resolve(result);
      });

      if (permissionResult) {
        permissionResult.then(resolve, reject);
      }
    }).then(function (permissionResult) {
      if (permissionResult !== "granted") {
        // throw new Error("We weren't granted permission.");
      }
    });
  };

  const show = (title, body) => {
    // try {
    //   new Notification(title, body);
    // } catch {
    snack.createSnack(body.body, "success");
    try {
      navigator.serviceWorker.ready.then(function (registration) {
        registration.showNotification(title, body);
      });
    } catch {}
    // }
  };

  React.useEffect(() => {
    // console.log(Notification.permission);
    if (Notification.permission !== "granted") {
      askPermission();
      setPermission(false);
    } else {
      setPermission(true);
    }
  }, []);

  return (
    <notificationContext.Provider
      value={{
        permission,
        show,
        askPermission,
      }}
    >
      {children}
    </notificationContext.Provider>
  );
};

export default Index;
