import {
	Button,
	Dialog,
	DialogContent,
	InputBase,
	Paper,
	Rating,
	Stack,
	Typography,
} from "@mui/material";
import React from "react";
import snackContext from "../../../context/snackProvider";
import { useCreateReview } from "../../../query/review";
import { responseHandler } from "../../../utilities/response-handler";

const Review = ({ onCloseReview, orderId, orderLine, product }) => {
	const snack = React.useContext(snackContext);
	const [value, setValue] = React.useState(5);
	const [message, setMessage] = React.useState("");
	const { mutateAsync: create, isLoading: creating } = useCreateReview();
	const onCreate = async () => {
		const res = await responseHandler(
			() =>
				create({
					order: orderId,
					orderline: orderLine,
					product: product,
					rating: value,
					message: message,
				}),
			[201]
		);
		if (res.status) {
			snack.createSnack(res.message, "success");
			onCloseReview();
		} else {
			snack.createSnack(res.message, "error");
		}
	};
	return (
		<Dialog
			open={true}
			onClose={onCloseReview}
			scroll={"body"}
			PaperProps={{
				sx: {
					width: "95vw",
					maxWidth: "400px",
				},
			}}
		>
			<DialogContent>
				<Typography
					variant={"h6"}
					sx={{ fontWeight: "bold", textAlign: "center", mb: 3 }}
				>
					How was your experience?
				</Typography>
				<Stack sx={{ alignItems: "center", justifyContent: "center" }}>
					<Rating
						size="large"
						value={value}
						onChange={(e, newValue) => {
							setValue(newValue);
						}}
					/>
				</Stack>
				<InputBase
					multiline
					sx={{
						border: "2px solid #ddd",
						mt: 3,
						mb: 2,
						borderRadius: "2px",
						px: 1,
					}}
					fullWidth
					minRows={5}
					placeholder={"Give Your Feedback"}
					value={message}
					onChange={(e) => {
						setMessage(e.target.value);
					}}
					// required
				/>
				<Button
					variant={"contained"}
					fullWidth
					disabled={creating || !message}
					onClick={onCreate}
				>
					Submit
				</Button>
			</DialogContent>
		</Dialog>
	);
};

export default Review;
