import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import AppRoute from "./routes/AppRoute";
import theme from "./styles/theme";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppBody from "./components/AppBody";
import CategoryProvider from "./context/categoryProvider";
import { OrderProvider } from "./context/orderProvider";
import { SnackProvider } from "./context/snackProvider";
import NotificationProvider from "./context/notificationProvider";
import AuthProvider from "./context/authProvider";
import CartProvider from "./context/cartProvider";
import { QueryClientProvider, QueryClient } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";

function App() {
	const queryClient = new QueryClient();

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<GlobalStyles
				styles={{
					"*": {
						// Disable Blue Highlight when Touch/Press object with cursor: 'pointer' in Android
						WebkitTapHighlightColor: "transparent",
						// scrollbar
						scrollbarWidth: "5px",
						scrollbarHeight: "5px",
						scrollbarColor: `${theme.palette.primary.main} #00000033`,
						outline: "none !important",
					},
					"*::-webkit-scrollbar": {
						height: "5px",
						width: "5px",
					},
					"*::-webkit-scrollbar-track": {
						background: "#00000033",
					},
					"*::-webkit-scrollbar-thumb": {
						background: `${theme.palette.primary.main}aa`,
					},
					"*::-webkit-scrollbar-thumb:hover": {
						background: theme.palette.primary.main,
					},
					body: {
						overflowX: "hidden",
					},
					// App Body Scrollbar
					"&::-webkit-scrollbar": {
						width: "5px",
						height: "5px",
					},
					"&::-webkit-scrollbar-track": {
						background: "#00000033",
					},
					"&::-webkit-scrollbar-thumb": {
						background: `${theme.palette.primary.main}aa`,
					},
					"&::-webkit-scrollbar-thumb:hover": {
						background: theme.palette.primary.main,
					},
				}}
			/>
			<QueryClientProvider client={queryClient}>
				{/* <ReactQueryDevtools /> */}
				<OrderProvider>
					<CategoryProvider>
						<BrowserRouter basename="">
							<SnackProvider>
								<AuthProvider>
									<NotificationProvider>
										<CartProvider>
											<Header />
											<AppBody>
												<AppRoute />
											</AppBody>
											<Footer />
										</CartProvider>
									</NotificationProvider>
								</AuthProvider>
							</SnackProvider>
						</BrowserRouter>
					</CategoryProvider>
				</OrderProvider>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

export default App;
