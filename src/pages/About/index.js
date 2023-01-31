import React from "react";
import Title from "../../components/Title";
import { Container, Typography } from "@mui/material";

const Index = () => {
	return (
		<Container>
			<Title>About Us</Title>
			<Typography variant="h6">Our Story</Typography>
			<br />
			<Typography
				sx={{
					textAlign: "justify",
				}}
			>
				We start our journey in 2022 as an e-commerce marketplace. We offer more
				than 20 categories of products, including health and beauty, cosmetics,
				electronics and etc. Rayos BD is dedicated to Change Experience via
				superior customer support and fulfillment, ensuring that consumers in
				every part of Bangladesh receive hassle-free product delivery. Customers
				may also order our items via Cash on Delivery and free returns, and
				prompt refunds. we do not take any advance money from our customers. To
				keep informed about our most recent promotions, campaigns, and events,
				follow us on Facebook, Twitter, YouTube, and Instagram.
			</Typography>
			<br />
			<Typography variant="h6">Our Promise</Typography>
			<br />
			<Typography
				sx={{
					textAlign: "justify",
				}}
			>
				<ul>
					<li>Full coverage in Bangladesh</li>
					<li>Fastest delivery</li>
					<li>Wide range of product</li>
					<li>Easy order and return policy</li>
					<li>Easy warranty policy</li>
					<li>24/7 customer policy</li>
				</ul>
			</Typography>
		</Container>
	);
};

export default Index;
