import React from "react";
import { useGetCartByUser } from "../../query/cart";
import { authContext } from "../authProvider";
import CartDrawer from "./CartDrawer";

export const cartContext = React.createContext();

const Index = ({ children }) => {
	const authCntxt = React.useContext(authContext);
	// Toggle State
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(!open);
	// Cart State
	const [cartList, setCartList] = React.useState([]);
	const [subtotalAmount, setSubtotalAmount] = React.useState(0);
	const [totalAmount, setTotalAmount] = React.useState(0);

	// Fetch Category Data
	const {
		data: cartData,
		isLoading,
		isError,
	} = useGetCartByUser(authCntxt.isVerified);

	// Set Cart List to State
	React.useEffect(() => {
		arrangeCartData();
	}, [cartData]);

	const arrangeCartData = () => {
		if (isLoading || isError || !cartData) return;
		if (!cartData.data.success) return;
		setCartList(cartData.data.data);
		var tmpST = 0;
		var tmpT = 0;
		cartData.data?.data?.map((c) => {
			tmpST += parseFloat(c.variant?.product?.sellPrice || 0) * c.quantity;
			tmpT += parseFloat(c.variant?.product?.price || 0) * c.quantity;
		});
		setSubtotalAmount(tmpST);
		setTotalAmount(tmpT);
	};

	React.useEffect(() => {
		if (authCntxt.isVerified && !isError) return;
		setCartList([]);
	}, [authCntxt.isVerified, isError]);

	return (
		<cartContext.Provider
			value={{
				handleOpen,
				total: cartList?.length,
				subtotalAmount,
				totalAmount,
				cartList,
				isLoading,
				isError,
			}}
		>
			<CartDrawer
				open={open}
				onClose={handleOpen}
			/>
			{children}
		</cartContext.Provider>
	);
};

export default Index;
