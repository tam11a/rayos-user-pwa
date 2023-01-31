import React from "react";

// components
import {
	AppBar,
	Avatar,
	Badge,
	Box,
	Button,
	Container,
	Divider,
	Drawer,
	Fab,
	Grid,
	Hidden,
	Icon,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Paper,
	Stack,
	Toolbar,
	Typography,
} from "@mui/material";

// icons
import { HiLocationMarker, HiOutlineMail } from "react-icons/hi";
import { GrFacebookOption, GrLocation } from "react-icons/gr";
import { MdCall, MdClose, MdLogout } from "react-icons/md";
import { ImGooglePlus } from "react-icons/im";
import {
	RiDashboardLine,
	RiMessengerLine,
	RiWhatsappLine,
	RiYoutubeLine,
} from "react-icons/ri";
import { BiMenuAltRight } from "react-icons/bi";
import { AiFillInstagram, AiOutlineUser } from "react-icons/ai";

// assets
import pndIcon from "../../assets/pnd-favicon.svg";
import { Link } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsTwitter, BsYoutube } from "react-icons/bs";
import {
	FaFacebookMessenger,
	FaLinkedinIn,
	FaUserCircle,
} from "react-icons/fa";
import { authContext } from "../../context/authProvider";
import { authRootURL, getAttachment } from "../../service/instance";
import { IoCallOutline } from "react-icons/io5";

const Index = () => {
	const [catDrawerState, setCatDrawerState] = React.useState(false);
	const handleCatDrawer = () => setCatDrawerState(!catDrawerState);
	return (
		<>
			<Hidden mdDown>
				<Paper
					sx={{
						bgcolor: "primary.contrastText",
						py: 3,
						pb: 5,
					}}
					elevation={3}
				>
					<Container maxWidth="lg">
						<Grid container>
							<Grid
								item
								xs={4}
							>
								<Stack
									direction={"column"}
									alignItems={"left"}
									sx={{
										rowGap: 2,
										mt: 1,
										color: "primary.main",
										width: "fit-content",
										// mx: "auto",
									}}
								>
									<Typography
										variant="h6"
										sx={{
											fontWeight: "bold",
										}}
									>
										Information
									</Typography>

									<Typography
										component={Link}
										to={"/about"}
										sx={{
											fontWeight: "600",
											color: "unset",
											textDecoration: "none",
										}}
									>
										About Us
									</Typography>

									<Typography
										component={Link}
										to={"/privacy-policy"}
										sx={{
											fontWeight: "600",
											color: "unset",
											textDecoration: "none",
										}}
									>
										Privacy Policy
									</Typography>
									<Typography>Terms & Conditions</Typography>
								</Stack>
							</Grid>
							<Grid
								item
								xs={4}
							>
								<Stack
									direction={"column"}
									alignItems={"center"}
									sx={{
										rowGap: 2,
										mt: 1,
										width: "fit-content",
										mx: "auto",
										color: "primary.main",
										textAlign: "left",
									}}
								>
									<Typography
										variant="h6"
										sx={{
											fontWeight: "bold",
										}}
									>
										Customer Service
									</Typography>
									<Typography>Contact Us</Typography>
									<Typography>Delivery Policy</Typography>
									<Typography>Return Policy</Typography>
								</Stack>
							</Grid>
							<Grid
								item
								xs={4}
							>
								<Stack
									direction={"column"}
									alignItems={"left"}
									sx={{
										rowGap: 2,
										mt: 1,
										color: "primary.main",
										width: "fit-content",
										mx: "auto",
										marginRight: 0,
									}}
								>
									<Typography
										variant="h6"
										sx={{
											fontWeight: "bold",
										}}
									>
										Address
									</Typography>
									<Stack
										direction={"row"}
										columnGap={1}
										alignItems={"flex-start"}
									>
										<IconButton
											size={"small"}
											sx={{
												fontSize: "1rem",
												mt: "-1px",
											}}
											color={"primary"}
										>
											<GrLocation />
										</IconButton>
										<Typography>
											Notunbag, Khilgaon,
											<br />
											312/46B, Dhaka 1219,
											<br />
											Dhaka, Bangladesh
										</Typography>
									</Stack>
									<Stack
										direction={"row"}
										columnGap={1}
										alignItems={"flex-start"}
									>
										<IconButton
											size={"small"}
											sx={{
												fontSize: "1rem",
												mt: "-1px",
											}}
											color={"primary"}
										>
											<HiOutlineMail />
										</IconButton>
										<Typography>rayosbd92@gmail.com</Typography>
									</Stack>
									<Stack
										direction={"row"}
										columnGap={1}
										alignItems={"flex-start"}
									>
										<IconButton
											size={"small"}
											sx={{
												fontSize: "1rem",
												mt: "-1px",
											}}
											color={"primary"}
										>
											<IoCallOutline />
										</IconButton>
										<Typography>09639129215</Typography>
									</Stack>
								</Stack>
							</Grid>
							<Grid
								item
								xs={12}
								sx={{
									mt: 3,
								}}
							>
								<Stack
									direction={"row"}
									spacing={1}
									sx={{
										width: "fit-content",
										mx: "auto",
									}}
								>
									<IconButton
										color={"primary"}
										component={"a"}
										href={"https://www.facebook.com/rayosbd"}
										target={"_blank"}
									>
										<GrFacebookOption />
									</IconButton>
									<IconButton
										color={"primary"}
										component={"a"}
										href={"https://twitter.com/"}
										target={"_blank"}
										disabled
									>
										<BsTwitter />
									</IconButton>
									<IconButton
										color={"primary"}
										component={"a"}
										href={"https://www.instagram.com/rayos_bd/"}
										target={"_blank"}
									>
										<AiFillInstagram />
									</IconButton>
									<IconButton
										color={"primary"}
										component={"a"}
										href={"https://www.linkedin.com/feed/"}
										target={"_blank"}
										disabled
									>
										<FaLinkedinIn />
									</IconButton>
									{/* <IconButton
                    color={"primary"}
                    component={"a"}
                    href={
                      "https://www.youtube.com/channel/UCLEc4oki--wJ62_CAIKBW3A"
                    }
                    target={"_blank"}
                  >
                    <ImGooglePlus />
                  </IconButton> */}
								</Stack>
								<Typography
									variant={"subtitle2"}
									color={"primary"}
									sx={{
										mx: "auto",
										textAlign: "center",
										mt: 2,
										"& a": {
											color: "#000",
											fontWeight: "600",
											textDecoration: "none",
										},
									}}
								>
									Copyright © 2022 RayosBD. All Rights Reserved. | Designed &
									Developed by{" "}
									<a
										href={"https://github.com/tam11a"}
										target={"_blank"}
										rel={"noreferrer"}
									>
										Tam
									</a>{" "}
									&{" "}
									<a
										href={"https://github.com/Asatter833"}
										target={"_blank"}
										rel={"noreferrer"}
									>
										Utsha
									</a>
									.
								</Typography>
							</Grid>
						</Grid>
					</Container>
				</Paper>
			</Hidden>
			<Hidden mdUp>
				<AppBar
					color={"secondary"}
					sx={{
						py: 0,
						top: "auto",
						bottom: "0",
					}}
					elevation={3}
				>
					<Toolbar
						disableGutters
						sx={{
							height: "fit-content",
							minHeight: "20px !important",
						}}
					>
						<Container
							maxWidth="lg"
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								py: 0.5,
							}}
						>
							<IconButton
								size={"large"}
								color={"primary"}
								component={Link}
								to={"/search"}
							>
								<RiDashboardLine />
								{/* <MdOutlineExplore /> */}
							</IconButton>
							<IconButton
								size={"large"}
								color={"primary"}
								component={Link}
								to={"/notification"}
							>
								<Badge
									overlap={"circular"}
									badgeContent={0}
									color="black"
								>
									<IoMdNotificationsOutline />
								</Badge>
							</IconButton>
							<Fab
								sx={{
									position: "absolute",
									top: "0",
									left: "50%",
									transform: "translate(-50%, -50%)",
									bgcolor: "#fff",
									p: 0,
								}}
								component={Link}
								to={"/"}
							>
								<Avatar
									src={pndIcon}
									sx={{
										width: "max-content",
										p: 0.7,
									}}
									alt="pnd"
								/>
							</Fab>
							<Box />
							<Box />
							<Box />
							<Box />
							<IconButton
								size={"large"}
								color={"primary"}
								component={Link}
								to={"/user"}
							>
								{/* <AiOutlineShoppingCart /> */}
								<AiOutlineUser />
							</IconButton>
							<IconButton
								size={"large"}
								color={"primary"}
								onClick={handleCatDrawer}
							>
								<BiMenuAltRight />
							</IconButton>
						</Container>
					</Toolbar>
				</AppBar>
				<Box
					sx={{
						height: "90px",
					}}
				/>
				<FooterDrawer
					open={catDrawerState}
					handleClose={handleCatDrawer}
				/>
			</Hidden>
		</>
	);
};

const FooterDrawer = ({ open, handleClose }) => {
	const authCntxt = React.useContext(authContext);
	// console.log(authCntxt.userInfo);
	return (
		<Drawer
			anchor="right"
			open={open}
			onClose={handleClose}
			PaperProps={{
				sx: {
					width: "95vw",
					maxWidth: "300px",
				},
			}}
		>
			<List disablePadding>
				<ListItem>
					<Box
						sx={{
							flex: 1,
						}}
					/>
					<IconButton
						color={"black"}
						size={"small"}
						onClick={handleClose}
					>
						<MdClose />
					</IconButton>
				</ListItem>
				<Divider />
				{authCntxt.isVerified ? (
					<>
						<ListItem>
							<Button
								fullWidth
								color={"black"}
								variant={"contained"}
								startIcon={
									<Avatar
										src={getAttachment(authCntxt.userInfo?.image)}
										alt={authCntxt.userInfo?.fullName}
										sx={{
											bgcolor: "transparent",
										}}
									>
										<AiOutlineUser
											style={{
												fontSize: "1.3em",
											}}
										/>
									</Avatar>
								}
								component={Link}
								to={"/user"}
								onClick={handleClose}
							>
								<ListItemText
									primary={authCntxt.userInfo?.userName}
									secondary={authCntxt.userInfo?.phone}
									sx={{
										textTransform: "none",
										textAlign: "left",
										// pl: 1,
									}}
									primaryTypographyProps={{
										noWrap: true,
									}}
									secondaryTypographyProps={{
										noWrap: true,
										sx: {
											color: "#ffffff77",
											fontSize: "0.7rem",
											fontWeight: "600",
										},
									}}
								/>
							</Button>
						</ListItem>
					</>
				) : (
					<ListItem>
						<Button
							fullWidth
							variant={"contained"}
							startIcon={
								<FaUserCircle
									style={{
										fontSize: "2.4rem",
									}}
								/>
							}
							onClick={() => {
								handleClose();
								authCntxt.handleOpen();
							}}
							color={"black"}
						>
							<ListItemText
								primary={
									<>
										<b>SIGN IN</b> or
									</>
								}
								secondary={"Join Our Site"}
								sx={{
									textTransform: "none",
									textAlign: "left",
									pl: 1,
								}}
								secondaryTypographyProps={{
									sx: {
										color: "white",
										fontSize: "0.7rem",
									},
								}}
							/>
						</Button>
					</ListItem>
				)}
				{authCntxt.isVerified && (
					<ListItemButton
						sx={{
							mx: 2,
						}}
						onClick={() => {
							authCntxt.logout();
							handleClose();
						}}
					>
						<ListItemIcon>
							<Icon color="error">
								<MdLogout />
							</Icon>
						</ListItemIcon>
						<ListItemText primary={"Logout"} />
					</ListItemButton>
				)}
			</List>
		</Drawer>
	);
};

export default Index;
