import {
  Paper,
  Avatar,
  Stack,
  Grid,
  Typography,
  Rating,
  Collapse,
  Button,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetReviewsByProductID } from "../../query/review";
import { getAttachment } from "../../service/instance";
import moment from "moment/moment";
import { IoMdAdd, IoMdRemove } from "react-icons/io";

const Index = () => {
  const { productId } = useParams();
  const [checked, setChecked] = React.useState(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const {
    data: reviewData,
    isLoading,
    isError,
  } = useGetReviewsByProductID(productId);

  const [review, setReview] = React.useState({});

  React.useEffect(() => {
    if (isError) return;
    setReview(reviewData?.data?.data || []);
  }, [isLoading]);
  return (
    <>
      {review?.slice?.(0, 2).map?.((perCat, index) => (
        <React.Fragment key={perCat?._id}>
          <ReviewBox perCat={perCat} />
        </React.Fragment>
      ))}
      {!!review?.slice?.(2, review.length).length && (
        <>
          <Collapse in={checked}>
            {review?.slice?.(2, review.length).map?.((perCat, index) => (
              <React.Fragment key={perCat?._id}>
                <ReviewBox perCat={perCat} />
              </React.Fragment>
            ))}
          </Collapse>
          <Button
            onClick={handleChange}
            size={"small"}
            startIcon={checked ? <IoMdRemove /> : <IoMdAdd />}
          >
            View More ({review?.slice?.(2, review.length).length})
          </Button>
        </>
      )}
    </>
  );
};

const ReviewBox = ({ perCat }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        mb: 2,
      }}
    >
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
            {perCat.author.userName}
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
            {moment(perCat?.createdAt).format("lll")}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Index;
