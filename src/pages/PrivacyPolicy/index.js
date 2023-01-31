import React from "react";
import Title from "../../components/Title";
import { Box, Container, Typography } from "@mui/material";

const Index = () => {
	return (
		<Container>
			<Title>Privacy policy</Title>

			<Box
				sx={{
					py: 2,
					"& > *": {
						my: 2,
					},
				}}
			>
				<Typography
					sx={{
						textAlign: "justify",
					}}
				>
					Welcome to Rayos BD. We respect your private information. We are
					committed to upholding customer rights and ensuring the safety. Please
					read this Privacy Policy for more information.
				</Typography>

				<b>How Will We Use Your Information?</b>
				<Typography
					sx={{
						textAlign: "justify",
					}}
				>
					If a consumer wishes to use the website to make an order for the
					specified goods, Rayos BD may gather numerous sorts of necessary
					information. As part of the purchasing process, when a customer makes
					a purchase from Rayos BD via the website, Rayos BD will gather
					personal information about the consumer, including name, phone number,
					address, email address, etc. To prepare orders that consumers have
					ordered on the eCommerce site, the firm will receive, store, and
					process this data. It will also retain it in case any allegations are
					made in the future. The firm may, with the customer's consent, contact
					him or her with information on specials, promotions, new product
					categories, and other useful updates.
				</Typography>

				<b>Data Security</b>

				<Typography
					sx={{
						textAlign: "justify",
					}}
				>
					To avoid accidental loss, deletion, or damage to your information as
					well as unauthorized or unlawful access to it, we have put in place
					the necessary technological and security measures. Your personal
					information is gathered on a secure server when we collect data
					through the Site. Because of our security measures, we occasionally
					might need to see identification documentation before we can provide
					you access to personal data. You are in charge of preventing unwanted
					access to your computer and password.
				</Typography>

				<b>What purpose do we use your data?</b>

				<Typography
					sx={{
						textAlign: "justify",
					}}
				>
					<ul>
						<li>
							{" "}
							Knowing your interests and customizing our site to them will
							strengthen our relationship.{" "}
						</li>
						<li> To contact you if when required </li>
						<li> To fulfill your request for services </li>
						<li> concentrate our efforts on enhancing the product. </li>
						<li> contact you to participate in a survey.</li>
					</ul>
				</Typography>

				<b>Your Right</b>

				<Typography
					sx={{
						textAlign: "justify",
					}}
				>
					You have the right to request that we fix any errors in your data
					without charging you. Additionally, you have the right to request that
					we no longer use your personal information for direct marketing at any
					time.
				</Typography>
			</Box>
		</Container>
	);
};

export default Index;
