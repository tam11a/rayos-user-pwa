import { Paper, Avatar, Stack, Grid, Typography, Rating } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetReviewsByProductID } from "../../query/review";
import snackContext from "../../context/snackProvider";
import { authContext } from "../../context/authProvider";
import { getAttachment } from "../../service/instance";
import moment from "moment/moment";

const Index = () => {
  const { productId } = useParams();
  const authCntxt = React.useContext(authContext);
  const snack = React.useContext(snackContext);

  const {
    data: reviewData,
    isLoading,
    isError,
  } = useGetReviewsByProductID(productId);

  const [review, setReview] = React.useState({});

  React.useEffect(() => {
    setReview(reviewData?.data?.data || []);
  }, [isLoading]);
  console.log(review);
  return (
    <>
      {review?.map?.((perCat, index) => (
        <React.Fragment key={index}>
          <Paper elevation={0} sx={{ my: 2 }}>
            <Stack
              direction="row"
              alignItems={"start"}
              justifyContent={"space-between"}
              columnGap={4}
            >
              <Stack
                direction="column"
                alignItems={"center"}
                rowGap={0.5}
                maxWidth="62px"
              >
                <Avatar
                  sx={{ width: 38, height: 38 }}
                  src={getAttachment(perCat.author.image)}
                  alt={perCat.author.fullName}
                />
                <Typography
                  variant={"caption"}
                  sx={{ fontWeight: 600 }}
                  noWrap="wrap"
                  maxWidth="62px"
                >
                  {perCat.author.userName}{" "}
                </Typography>
              </Stack>
              <Stack direction="column" rowGap={0.5} flex={1}>
                <Rating
                  name="half-rating-read"
                  value={perCat?.rating}
                  precision={0.1}
                  size="small"
                  readOnly
                />
                <Typography>{perCat?.message}</Typography>
                <Typography variant={"caption"}>
                  {" "}
                  {moment(perCat?.createdAt).format("lll")}
                </Typography>
              </Stack>
            </Stack>
          </Paper>
        </React.Fragment>
      ))}
    </>
  );
};

export default Index;
