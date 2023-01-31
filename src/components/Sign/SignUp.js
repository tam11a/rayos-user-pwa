import { joiResolver } from "@hookform/resolvers/joi";
import {
	Alert,
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	Typography,
} from "@mui/material";
import Joi from "joi";
import React from "react";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { authContext } from "../../context/authProvider";
import snackContext from "../../context/snackProvider";
import { requestOTP, requestSignUp, signUp } from "../../query/sign";
import { responseHandler } from "../../utilities/response-handler";
import ShowErr from "../ShowErr";
import CInput from "./CInput";
import CPassword from "./CPassword";
import OTPDialog from "./OTPDialog";

const SignUp = () => {
	const auth = React.useContext(authContext);
	const snack = React.useContext(snackContext);

	const [phone, setPhone] = React.useState();
	const [token, setToken] = React.useState();
	const [otp, setOtp] = React.useState();

	const {
		reset,
		handleSubmit,
		formState: { errors, isSubmitting },
		register,
	} = useForm({ resolver: joiResolver(schema) });

	const onResend = async (e) => {
		const res = await responseHandler(() => requestOTP(e));
		if (res.status) {
			setOtp(res.object.otp);
			snack.createSnack(`Resent OTP to ${e.phone}`);
			return true;
		} else {
			snack.createSnack(res.data, "error");
			return false;
		}
	};

	const onValid = async (e) => {
		// console.log(e);
		delete e.confirm_password;
		const res = await responseHandler(() => requestSignUp(e), [201]);
		if (res.status) {
			reset();
			snack.createSnack(`Sent OTP to ${e.phone}`);
			setOtp(res.object.otp);
			setPhone(e.phone);
			setToken(res.object?.token);
			auth.handleOpenCreate();
			handleOTP();
		} else {
			snack.createSnack(res.data, "error");
		}
	};

	const [openOTP, setOpenOTP] = React.useState(false);
	const handleOTP = () => setOpenOTP(!openOTP);

	const handleOTPSubmit = async (code) => {
		const res = await responseHandler(() =>
			signUp({
				token,
				otp: code,
			})
		);
		if (res.status) {
			snack.createSnack("Account Verified Successfully");
			return true;
		} else {
			snack.createSnack(res.data, "error");
		}
	};

	return (
		<>
			<Dialog
				open={auth.openCreate}
				onClose={auth.handleOpenCreate}
				PaperProps={{
					sx: {
						margin: "0",
						width: "95vw",
						maxWidth: "420px",
					},
				}}
			>
				<DialogTitle
					sx={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<div />
					<Typography variant={"button"}>create new account</Typography>
					<IconButton
						size={"small"}
						onClick={auth.handleOpenCreate}
					>
						<MdClose />
					</IconButton>
				</DialogTitle>
				<Divider />
				<form onSubmit={handleSubmit(onValid)}>
					<DialogContent
						sx={{
							"& > *": {
								my: 1,
							},
							".MuiTypography-root span": {
								color: "red",
								fontSize: "1rem",
							},
						}}
					>
						<Typography variant={"button"}>
							username <span>*</span>
						</Typography>
						<CInput
							fullWidth
							placeholder="Enter Your Name"
							{...register("userName")}
						/>
						<ShowErr obj={errors.userName} />

						<Typography variant={"button"}>
							fullname <span>*</span>
						</Typography>
						<CInput
							fullWidth
							placeholder="Enter Your Name"
							{...register("fullName")}
						/>
						<ShowErr obj={errors.fullName} />

						<Typography variant={"button"}>
							phone number <span>*</span>
						</Typography>
						<CInput
							fullWidth
							placeholder="01****"
							startAdornment={
								<Typography
									sx={{
										mr: 1,
									}}
								>
									+88
								</Typography>
							}
							inputProps={{
								type: "tel",
							}}
							{...register("phone")}
						/>
						<ShowErr obj={errors.phone} />
						<Typography variant={"button"}>email</Typography>
						<CInput
							fullWidth
							placeholder="Enter Your Email"
							{...register("email")}
						/>
						<ShowErr obj={errors.email} />
						<Typography variant={"button"}>
							password <span>*</span>
						</Typography>
						<CPassword
							fullWidth
							placeholder="Enter Your Password"
							{...register("password")}
						/>
						<ShowErr obj={errors.password} />

						<Typography variant={"button"}>
							confirm password <span>*</span>
						</Typography>
						<CPassword
							fullWidth
							placeholder="Confirm Your Password"
							{...register("confirm_password")}
						/>
						<ShowErr obj={errors.confirm_password} />
						<Button
							fullWidth
							variant={"contained"}
							type={"submit"}
							// onClick={auth.handleOpenOTP}
							color={"black"}
							disabled={isSubmitting}
						>
							create account
						</Button>
						<Divider
							sx={{
								mt: 0.6,
							}}
						>
							OR
						</Divider>
						<Button
							sx={{
								textAlign: "center",
								"&:hover": {
									bgcolor: "transparent",
								},
							}}
							fullWidth
							disableRipple
							onClick={auth.handleOpen}
						>
							Already Have an Account ?
						</Button>
					</DialogContent>
				</form>
			</Dialog>
			{openOTP && (
				<OTPDialog
					otp={otp}
					open={openOTP}
					onClose={handleOTP}
					onSubmit={handleOTPSubmit}
					onResendOTP={async () => await onResend({ phone: phone })}
				/>
			)}
		</>
	);
};

const schema = Joi.object({
	userName: Joi.string().label("username").required().messages({
		"string.empty": "Name Required",
	}),
	fullName: Joi.string().label("Name").required().messages({
		"string.empty": "Name Required",
	}),

	phone: Joi.string()
		.replace("+88", "")
		.replace(" ", "")
		.replace("-", "")
		.label("Phone Number")
		.regex(/01\d{9}$/)
		.required()
		.messages({
			"string.pattern.base": "Invalid Phone Number",
			"string.empty": "Phone Number Required",
		}),

	email: Joi.string().label("email").allow(""),

	password: Joi.string().label("Password").required().messages({
		"string.empty": "Password Required",
	}),
	confirm_password: Joi.equal(Joi.ref("password")).messages({
		"any.only": "Password Didn't Match!!",
	}),
});

export default SignUp;
