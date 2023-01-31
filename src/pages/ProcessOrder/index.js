import {
	Alert,
	Avatar,
	Backdrop,
	Box,
	Button,
	ButtonGroup,
	CircularProgress,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
	FormControlLabel,
	Grid,
	Hidden,
	IconButton,
	InputBase,
	List,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
	MenuItem,
	Paper,
	Radio,
	RadioGroup,
	Select,
	Skeleton,
	Stack,
	Typography,
	useTheme,
} from "@mui/material";
import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { cartContext } from "../../context/cartProvider";
import noProduct from "../../assets/3298065 1.svg";
import { getAttachment } from "../../service/instance";
import snackContext from "../../context/snackProvider";
import { responseHandler } from "../../utilities/response-handler";
import { useDeleteCart, useUpdateCart } from "../../query/cart";
import { MdClose, MdOutlineAddShoppingCart } from "react-icons/md";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { IoIosImages } from "react-icons/io";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import {
	useCalculateOrder,
	useCreateOrder,
	useGetOrderCalculateByUser,
} from "../../query/order";
import orderContext from "../../context/orderProvider";
import { useCreateAddress, useGetAddressByUser } from "../../query/address";
import { HiOutlineQueueList } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import LoadingDivider from "../../components/LoadingDivider";
import { FiEdit2 } from "react-icons/fi";
import tableOptionsStyle from "../../styles/tableOptions";

const Index = () => {
	const navigate = useNavigate();
	const cartCntxt = React.useContext(cartContext);
	const snack = React.useContext(snackContext);
	const { mutateAsync: calculateOrder, isLoading } = useCalculateOrder();
	const [searchParams] = useSearchParams();
	const [openCalculation, setOpenCalculation] = React.useState(false);
	const handleOpenCalculation = () => navigate("");

	const [shippingId, setShippingId] = React.useState();

	React.useEffect(() => {
		if (!searchParams.get("confirm")) setOpenCalculation(false);
		else setOpenCalculation(true);
	}, [searchParams]);

	const onCalculateOrder = async () => {
		if (!shippingId) {
			snack.createSnack("Please add a shipping address", "error");
			return;
		}
		const res = await responseHandler(
			() =>
				calculateOrder({
					carts: Array.from([...cartCntxt.cartList], (c) => {
						return {
							id: c._id,
						};
					}),
					paymentMethod: "COD",
					shipping: shippingId._id,
				}),
			[201]
		);
		if (res.status) {
			navigate("?confirm=1");
			snack.createSnack(res.msg);
		} else {
			snack.createSnack(res.msg, "error");
		}
	};

	return (
		<>
			<Container>
				<Grid
					container
					sx={{
						mt: 2,
					}}
					rowGap={2}
				>
					<Grid
						item
						xs={12}
						md={8}
					>
						<Typography
							variant="h6"
							sx={{
								mb: 1,
								fontWeight: "bold",
							}}
						>
							Product Items
						</Typography>
						<Paper
							elevation={0}
							sx={{
								boxShadow: {
									xs: 0,
									md: 5,
								},
							}}
						>
							<List disablePadding>
								{cartCntxt.isLoading ? (
									<>
										<ListItem>
											<ListItemAvatar>
												<Avatar>
													<Skeleton variant={"circular"} />
												</Avatar>
											</ListItemAvatar>
											<ListItemText
												primary={
													<Skeleton
														variant={"text"}
														width={100}
													/>
												}
												secondary={<Skeleton variant={"text"} />}
											/>
										</ListItem>
										<ListItem>
											<ListItemAvatar>
												<Avatar>
													<Skeleton variant={"circular"} />
												</Avatar>
											</ListItemAvatar>
											<ListItemText
												primary={
													<Skeleton
														variant={"text"}
														width={100}
													/>
												}
												secondary={<Skeleton variant={"text"} />}
											/>
										</ListItem>
										<ListItem>
											<ListItemAvatar>
												<Avatar>
													<Skeleton variant={"circular"} />
												</Avatar>
											</ListItemAvatar>
											<ListItemText
												primary={
													<Skeleton
														variant={"text"}
														width={100}
													/>
												}
												secondary={<Skeleton variant={"text"} />}
											/>
										</ListItem>
									</>
								) : cartCntxt.total ? (
									<>
										{cartCntxt.cartList?.map((cart) => (
											<React.Fragment key={cart.id}>
												<ProductItem cart={cart} />
											</React.Fragment>
										))}
									</>
								) : (
									<>
										<ListItem>
											<Stack
												direction={"column"}
												alignItems={"center"}
												justifyContent={"center"}
												spacing={2}
												sx={{
													flex: 1,
													my: 2,
												}}
											>
												<Avatar
													sx={{
														width: "220px",
														height: "180px",
														borderRadius: 0,
													}}
													src={noProduct}
												/>
												<Alert severity="error">No Product in Cart!</Alert>
											</Stack>
										</ListItem>
									</>
								)}
							</List>
						</Paper>
						<Hidden smDown>
							<Stack
								direction={"row"}
								sx={{
									my: 2,
									width: "100%",
									justifyContent: "space-between",
								}}
							>
								<Box>
									<Button
										color={"black"}
										variant={"contained"}
										size={"small"}
										startIcon={<MdOutlineAddShoppingCart />}
										component={Link}
										to={"/search"}
									>
										Continue Shopping
									</Button>
								</Box>
								<Box
									sx={{
										flex: 1,
										maxWidth: { xs: "unset", sm: "250px" },
									}}
								>
									<Stack
										direction={"row"}
										alignItems={"center"}
										justifyContent={"space-between"}
										sx={{
											width: "100%",
										}}
									>
										<Typography variant="button">Subtotal :</Typography>
										<Typography>{cartCntxt.subtotalAmount} ৳</Typography>
									</Stack>
									<Stack
										direction={"row"}
										alignItems={"center"}
										justifyContent={"space-between"}
										sx={{
											width: "100%",
										}}
									>
										<Typography variant="button">Delivery :</Typography>
										<Typography>{shippingId?.shippingFee || 0} ৳</Typography>
									</Stack>
									{cartCntxt.subtotalAmount - cartCntxt.totalAmount > 0 && (
										<Stack
											direction={"row"}
											alignItems={"center"}
											justifyContent={"space-between"}
											sx={{
												width: "100%",
											}}
										>
											<Typography variant="button">Discount :</Typography>
											<Typography>
												{cartCntxt.totalAmount - cartCntxt.subtotalAmount} ৳
											</Typography>
										</Stack>
									)}
									<Divider
										sx={{
											my: 1,
										}}
									/>
									<Stack
										direction={"row"}
										alignItems={"center"}
										justifyContent={"space-between"}
										sx={{
											width: "100%",
											mb: 2,
										}}
									>
										<Typography variant="button">total :</Typography>
										<Typography>
											{cartCntxt.totalAmount + (shippingId?.shippingFee || 0)} ৳
										</Typography>
									</Stack>
								</Box>
							</Stack>
						</Hidden>
					</Grid>
					<Grid
						item
						xs={12}
						md={4}
						sx={{
							pl: {
								xs: 0,
								md: 2,
							},
						}}
					>
						<Typography
							variant="h6"
							sx={{
								mb: 1,
								fontWeight: "bold",
							}}
						>
							Payment & Shipping
						</Typography>
						<Paper
							elevation={0}
							sx={{
								mb: 1,
								boxShadow: {
									xs: 0,
									md: 5,
								},
							}}
						>
							<List>
								<ListItem>
									<Typography
										variant={"body1"}
										fontWeight={"bold"}
									>
										Payment Method
									</Typography>
								</ListItem>
								<ListItem
									sx={{
										pt: 0,
									}}
								>
									<RadioGroup
										defaultValue="cod"
										sx={{
											"& *": {
												fontWeight: "600",
											},
										}}
									>
										<FormControlLabel
											value="cod"
											control={<Radio color={"warning"} />}
											label="Cash On Delivery"
										/>
									</RadioGroup>
								</ListItem>
								<Divider />
								<ListItem
									sx={{
										mt: 2,
									}}
								>
									<Typography
										variant={"body1"}
										fontWeight={"bold"}
									>
										Shipping Info
									</Typography>
								</ListItem>
								<ShippingDialog
									shippingId={shippingId}
									setShippingId={setShippingId}
								/>
							</List>
						</Paper>
						<Hidden xsUp>
							<Stack
								direction={"row"}
								alignItems={"center"}
								justifyContent={"space-between"}
								sx={{
									width: "100%",
								}}
							>
								<Typography variant="button">Subtotal :</Typography>
								<Typography>{cartCntxt.subtotalAmount} ৳</Typography>
							</Stack>
							<Stack
								direction={"row"}
								alignItems={"center"}
								justifyContent={"space-between"}
								sx={{
									width: "100%",
								}}
							>
								<Typography variant="button">Delivery :</Typography>
								<Typography>{shippingId?.shippingFee || 0} ৳</Typography>
							</Stack>
							{cartCntxt.subtotalAmount - cartCntxt.totalAmount > 0 && (
								<Stack
									direction={"row"}
									alignItems={"center"}
									justifyContent={"space-between"}
									sx={{
										width: "100%",
									}}
								>
									<Typography variant="button">Discount :</Typography>
									<Typography>
										{cartCntxt.totalAmount - cartCntxt.subtotalAmount} ৳
									</Typography>
								</Stack>
							)}
							<Divider
								sx={{
									my: 1,
								}}
							/>
							<Stack
								direction={"row"}
								alignItems={"center"}
								justifyContent={"space-between"}
								sx={{
									width: "100%",
									mb: 2,
								}}
							>
								<Typography variant="button">total :</Typography>
								<Typography>
									{cartCntxt.totalAmount + (shippingId?.shippingFee || 0)} ৳
								</Typography>
							</Stack>
						</Hidden>
						<Button
							variant={"contained"}
							color={"black"}
							disabled={!cartCntxt.total || isLoading || !shippingId}
							fullWidth
							onClick={onCalculateOrder}
						>
							Proceed to Checkout
						</Button>
					</Grid>
				</Grid>
			</Container>
			{openCalculation && (
				<CalculationDialog
					open={openCalculation}
					onClose={handleOpenCalculation}
				/>
			)}
		</>
	);
};

const ShippingDialog = ({ shippingId, setShippingId }) => {
	const snack = React.useContext(snackContext);
	const [open, setOpen] = React.useState(false);
	const onClose = () => {
		setOpen(!open);
		setOpenForm(false);
	};
	const { data: address, isLoading: loadingAddress } = useGetAddressByUser();
	const [shipping, setShipping] = React.useState();

	const [openForm, setOpenForm] = React.useState(false);
	const handleForm = () => setOpenForm(!openForm);

	const { reset, watch, handleSubmit, register, getValues } = useForm({});

	const { mutateAsync, isLoading } = useCreateAddress();

	React.useEffect(() => {
		if (openForm) return;
		reset({});
	}, [openForm]);

	const onValid = async (data) => {
		const res = await responseHandler(() => mutateAsync(data), [201]);
		if (res.status) {
			snack.createSnack(res.msg);
			setShipping(res.data);
			setShippingId(res.data);
			onClose();
		} else {
			snack.createSnack(res.msg, "error");
		}
	};

	return (
		<>
			{!shippingId ? (
				<ListItem>
					<Button
						variant={"outlined"}
						startIcon={<HiOutlineQueueList />}
						onClick={onClose}
						fullWidth
					>
						Select Shipping Location
					</Button>
				</ListItem>
			) : (
				<ListItemButton
					sx={{
						border: "1px solid",
						borderColor: "#333",
						bgcolor: "#00000011",
						m: 1,
					}}
					onClick={onClose}
				>
					<ListItemText
						primary={shipping?.label}
						secondary={
							<>
								<div>{shipping?.details}</div>
								<div>{shipping?.phone}</div>
							</>
						}
						primaryTypographyProps={{
							sx: {
								fontWeight: "500",
							},
						}}
					/>
					<IconButton size={"small"}>
						<FiEdit2 />
					</IconButton>
				</ListItemButton>
			)}
			<Dialog
				open={open}
				onClose={onClose}
				PaperProps={{
					sx: {
						width: "95vw",
						maxWidth: "550px",
					},
				}}
			>
				<DialogTitle
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<span>Shipping Location</span>
					<IconButton
						size={"small"}
						onClick={onClose}
					>
						<MdClose />
					</IconButton>
				</DialogTitle>
				<LoadingDivider isLoading={loadingAddress || isLoading} />
				{openForm ? (
					<form onSubmit={handleSubmit(onValid)}>
						<DialogContent>
							<DialogContentText
								sx={{
									mb: 1,
								}}
							>
								Label
							</DialogContentText>
							<InputBase
								sx={tableOptionsStyle}
								placeholder={"Home, Work, Office etc."}
								fullWidth
								{...register("label")}
							/>
							<DialogContentText
								sx={{
									my: 1,
								}}
							>
								Phone Number
							</DialogContentText>
							<InputBase
								sx={tableOptionsStyle}
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
								fullWidth
								{...register("phone")}
							/>
							<DialogContentText
								sx={{
									my: 1,
								}}
							>
								Shipping Type
							</DialogContentText>
							<Select
								value={watch("type") || ""}
								{...register("type")}
								sx={tableOptionsStyle}
								inputProps={
									{
										// sx: { ...tableOptionsStyle },
									}
								}
								fullWidth
							>
								<MenuItem value={"INSIDE"}>Inside Dhaka</MenuItem>
								<MenuItem value={"SUBAREA"}>Dhaka Subarea</MenuItem>
								<MenuItem value={"OUTSIDE"}>Outside Dhaka</MenuItem>
							</Select>
							<DialogContentText
								sx={{
									my: 1,
								}}
							>
								Address
							</DialogContentText>
							<InputBase
								sx={{
									...tableOptionsStyle,
									height: "unset",
								}}
								multiline
								minRows={4}
								placeholder={"Aa..."}
								fullWidth
								{...register("details")}
							/>
						</DialogContent>
						<Divider />
						<DialogActions>
							<Button
								variant={"outlined"}
								color={"error"}
								onClick={handleForm}
							>
								Cancel
							</Button>
							{/* <Button variant={"outlined"} type={"submit"}>
                {watch("_id") ? "Update" : "Create"}
              </Button> */}
							<Button
								variant={"contained"}
								type={"submit"}
							>
								{watch("_id") ? "Update" : "Create"} & Select
							</Button>
						</DialogActions>
					</form>
				) : (
					<>
						<DialogContent>
							{![...(address?.data?.data || [])].length && (
								<Alert
									action={
										<Button
											color={"success"}
											variant={"outlined"}
											onClick={setOpenForm}
										>
											Create New
										</Button>
									}
								>
									No location saved.
								</Alert>
							)}
							{[...(address?.data?.data || [])]?.map?.((saved) => (
								<ListItemButton
									sx={{
										border: "1px solid",
										borderColor:
											shippingId?._id === saved._id ? "#333" : "#ccc",
										bgcolor:
											shippingId?._id === saved._id
												? "#00000011"
												: "transparent",
										my: 1,
									}}
									key={saved._id}
								>
									<ListItemText
										primary={saved?.label}
										secondary={
											<>
												<div>{saved.details}</div>
												<div>{saved.phone}</div>
											</>
										}
										primaryTypographyProps={{
											sx: {
												fontWeight: "500",
											},
										}}
										onClick={() => {
											setShippingId(saved);
											setShipping(saved);
											onClose();
										}}
									/>
									<IconButton
										onClick={() => {
											reset({
												...saved,
												id: saved._id,
											});
											handleForm();
										}}
									>
										<FiEdit2 />
									</IconButton>
								</ListItemButton>
							))}
						</DialogContent>
						<Divider />
						<DialogActions>
							<Button
								variant={"contained"}
								onClick={() => {
									reset({});
									handleForm();
								}}
							>
								New Location
							</Button>
						</DialogActions>
					</>
				)}
			</Dialog>
		</>
	);
};

const CalculationDialog = ({ open, onClose }) => {
	const navigate = useNavigate();
	const snack = React.useContext(snackContext);
	const congrats = React.useContext(orderContext);
	const [order, setOrder] = React.useState();
	const { data, isLoading, isError } = useGetOrderCalculateByUser();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

	React.useEffect(() => {
		if (isError) {
			snack.createSnack("Something went wrong", "error");
			onClose();
		}
		if (!data) return;
		if (!data.data.success) {
			snack.createSnack(data?.data?.message || "Something went wrong", "error");
			onClose();
		}

		setOrder(data.data?.data);
	}, [isError, data]);

	const { mutateAsync: createOrder, isLoading: createLoading } =
		useCreateOrder();

	const onConfirmOrder = async () => {
		const res = await responseHandler(() => createOrder({}), [201]);
		if (res.status) {
			onClose();
			snack.createSnack(res.msg);
			navigate("/user/order");
			congrats.pop();
		} else {
			snack.createSnack(res.msg, "error");
		}
	};

	return isLoading ? (
		<>
			<Backdrop
				open={true}
				sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
			>
				<CircularProgress color="secondary" />
			</Backdrop>
		</>
	) : (
		<>
			<Dialog
				open={open}
				// onClose={onClose}
				PaperProps={{
					sx: {
						width: "100vw",
					},
				}}
				fullScreen={fullScreen}
			>
				<DialogTitle
					sx={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<span>Order Details</span>
					{/* <span>{order?.total} ৳</span> */}
				</DialogTitle>
				<Divider />
				<DialogContent>
					<List disablePadding>
						{order?.carts?.map?.((cart) => (
							<React.Fragment key={cart._id}>
								<ListItem
									sx={{
										p: 0,
									}}
								>
									<ListItemAvatar>
										<Avatar
											src={getAttachment(cart.variant?.product?.image)}
											sx={{
												borderRadius: 1,
												height: "70px",
												width: "70px",
												background: "transparent",
												color: "primary.dark",
												mr: 2,
											}}
										>
											<IoIosImages
												style={{
													fontSize: "1.8em",
												}}
											/>
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										sx={{
											flex: 1,
										}}
										primary={
											<>
												<b>{cart.variant?.product?.titleEn || "-"}</b>
											</>
										}
										secondary={
											<>
												{cart.variant?.product?.variantType || "Variant"}:{" "}
												<span
													style={{
														fontWeight: 600,
													}}
												>
													{cart.variant?.titleEn || "-"}
												</span>
												<br />
												<span
													style={{
														fontWeight: 600,
													}}
												>
													{cart.quantity || 0}
												</span>{" "}
												items &times;{" "}
												<span
													style={{
														fontWeight: 600,
													}}
												>
													{cart.variant?.product?.price || 0}
												</span>{" "}
												৳
											</>
										}
										primaryTypographyProps={{
											noWrap: true,
											sx: {
												color: "black.main",
												textDecoration: "none",
											},
										}}
										secondaryTypographyProps={{
											noWrap: true,
											sx: {
												textDecoration: "none",
												"& span": {
													color: "black.main",
												},
											},
										}}
									/>
									<ListItemText
										primary={
											<>{cart.quantity * cart.variant?.product?.price} ৳</>
										}
										primaryTypographyProps={{
											noWrap: true,
											sx: {
												color: "black.main",
												fontWeight: "600",
												textAlign: "right",
											},
										}}
									/>
								</ListItem>
							</React.Fragment>
						))}
					</List>
					<Divider
						sx={{
							my: 2,
						}}
					/>
					<Stack
						direction={"row"}
						alignItems={"center"}
						justifyContent={"space-between"}
						sx={{
							width: "100%",
						}}
					>
						<Typography variant="button">Payment Method :</Typography>
						<b>Cash On Delivery</b>
					</Stack>
					<Divider
						sx={{
							my: 2,
						}}
					/>
					<Stack
						direction={"row"}
						alignItems={"center"}
						justifyContent={"space-between"}
						sx={{
							width: "100%",
						}}
					>
						<Typography variant="button">Shipping Address :</Typography>
						<b>{order?.shipping.phone}</b>
					</Stack>
					<Typography
						variant="subtitle2"
						fontWeight={500}
						textAlign={"right"}
					>
						{order?.shipping.details}
					</Typography>

					<Divider
						sx={{
							my: 2,
						}}
					/>
					<Stack
						direction={"row"}
						alignItems={"center"}
						justifyContent={"space-between"}
						sx={{
							width: "100%",
						}}
					>
						<Typography variant="button">Subtotal :</Typography>
						<Typography>{order?.sellPrice || 0} ৳</Typography>
					</Stack>
					<Stack
						direction={"row"}
						alignItems={"center"}
						justifyContent={"space-between"}
						sx={{
							width: "100%",
						}}
					>
						<Typography variant="button">Delivery Fee :</Typography>
						<Typography>{order?.shippingFee || 0} ৳</Typography>
					</Stack>
					<Stack
						direction={"row"}
						alignItems={"center"}
						justifyContent={"space-between"}
						sx={{
							width: "100%",
						}}
					>
						<Typography variant="button">Discount :</Typography>
						<Typography>- {order?.discountPrice || 0} ৳</Typography>
					</Stack>
					<Divider
						sx={{
							my: 1,
						}}
					/>
					<Stack
						direction={"row"}
						alignItems={"center"}
						justifyContent={"space-between"}
						sx={{
							width: "100%",
							mb: 2,
						}}
					>
						<Typography variant="button">
							<b>total :</b>
						</Typography>
						<Typography>
							<b>{order?.total || 0}</b> ৳
						</Typography>
					</Stack>
				</DialogContent>
				<Divider />
				<DialogActions>
					<Button
						variant={"outlined"}
						color={"error"}
						onClick={onClose}
					>
						Cancel
					</Button>
					<Button
						variant={"contained"}
						color={"black"}
						onClick={onConfirmOrder}
						disabled={createLoading || isLoading}
					>
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export const ProductItem = ({ cart }) => {
	const snack = React.useContext(snackContext);

	const { mutateAsync: deleteCart, isLoading } = useDeleteCart();
	const onDeleteCart = async () => {
		const res = await responseHandler(() =>
			deleteCart({
				cartId: cart._id,
			})
		);
		if (res.status) {
			snack.createSnack(res.msg);
		} else {
			snack.createSnack(res.msg, "error");
		}
	};

	const { mutateAsync: updateCart, isLoading: isCartLoading } = useUpdateCart();
	const onUpdateCart = async (quantity) => {
		const res = await responseHandler(
			() =>
				updateCart({
					cartId: cart?._id,
					quantity,
				}),
			[201]
		);
		if (res.status) {
			snack.createSnack(res.msg);
		} else {
			snack.createSnack(res.msg, "error");
		}
	};

	return (
		<>
			<ListItem
				key={cart._id}
				disablePadding
				sx={{
					px: 1,
					pr: { xs: 1, md: 2 },
					py: 0.5,
				}}
			>
				<ListItemAvatar>
					<Avatar
						src={getAttachment(cart.variant?.product?.image)}
						sx={{
							borderRadius: 1,
							height: "55px",
							width: "55px",
							background: "transparent",
							color: "primary.dark",
							mr: 1,
						}}
						component={Link}
						to={`/product/${cart?.variant?.product?._id}`}
					>
						<IoIosImages
							style={{
								fontSize: "1.8em",
							}}
						/>
					</Avatar>
				</ListItemAvatar>
				<ListItemText
					sx={{
						flex: 1,
					}}
					primary={
						<>
							<b>{cart.variant?.product?.titleEn || "-"}</b>
						</>
					}
					secondary={
						<>
							{cart.variant?.product?.variantType}:{" "}
							<span
								style={{
									fontWeight: 600,
								}}
							>
								{cart.variant?.titleEn || "-"}
							</span>{" "}
							&times;{" "}
							<span
								style={{
									fontWeight: 600,
								}}
							>
								{cart.variant?.product?.price || 0}{" "}
								{cart.variant?.product?.price !==
								cart.variant?.product?.sellPrice ? (
									<del>{cart.variant?.product?.sellPrice || 0}</del>
								) : (
									""
								)}
							</span>{" "}
							৳
						</>
					}
					primaryTypographyProps={{
						noWrap: true,
						sx: {
							color: "black.main",
							textDecoration: "none",
						},
						component: Link,
						to: `/product/${cart?.variant?.product?._id}`,
					}}
					secondaryTypographyProps={{
						noWrap: true,
						sx: {
							textDecoration: "none",
							"& span": {
								color: "black.main",
							},
						},
						component: Link,
						to: `/product/${cart?.variant?.product?._id}`,
					}}
				/>
				<IconButton
					sx={{ pl: 0 }}
					color={"black"}
					size={"small"}
					onClick={() => onUpdateCart(cart?.quantity - 1)}
					disabled={!(cart?.quantity - 1) || isLoading || isCartLoading}
				>
					<AiFillMinusSquare />
				</IconButton>
				<Typography
					variant="h6"
					sx={{
						minWidth: "15px",
						textAlign: "center",
					}}
				>
					{cart?.quantity || 0}
				</Typography>
				<IconButton
					color={"black"}
					size={"small"}
					onClick={() => onUpdateCart(cart?.quantity + 1)}
					disabled={
						cart?.quantity >= cart?.variant.quantity ||
						isLoading ||
						isCartLoading
					}
				>
					<AiFillPlusSquare />
				</IconButton>
				<IconButton
					sx={{
						ml: 1,
					}}
					color={"error"}
					size={"small"}
					onClick={() => onDeleteCart(cart._id)}
					disabled={isLoading || isCartLoading}
				>
					<RiDeleteBinLine />
				</IconButton>
			</ListItem>
		</>
	);
};

export default Index;
