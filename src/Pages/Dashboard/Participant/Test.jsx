import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";
import PageHeader from "../../../Components/PageHeader";
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	IconButton,
	Typography,
} from "@material-tailwind/react";

const PaymentHistory = () => {
	const axiosSecure = useAxiosSecure();
	const { user } = useAuth();
	const { data: paymentData = [] } = useQuery({
		queryKey: ["camps", `${user?.email}`],
		queryFn: async () => {
			const res = await axiosSecure.get(`/payments/${user?.email}`);
			return res.data;
		},
	});

	const TABLE_HEAD = [
		"No.",
		"Transaction ID",
		"Payment Status",
		"Confirmation Status",
	];

	return (
		<>
			<Helmet>
				<title>MediCamp | Payment History</title>
			</Helmet>
			<main>
				<PageHeader title="Payment History" />

				<Card className="h-full w-full">
					<CardBody className="overflow-scroll px-0">
						<table className="w-full min-w-max table-auto text-left">
							<thead>
								<tr>
									{TABLE_HEAD.map((head) => (
										<th
											key={head}
											className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
										>
											<Typography
												variant="small"
												color="blue-gray"
												className="font-normal leading-none opacity-70"
											>
												{head}
											</Typography>
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{paymentData.map((payment, idx) => (
									<tr key={payment._id} className="mb-3">
										<td>{idx + 1}</td>
										<td>{payment?.transactionId}</td>
										<td>{payment?.status}</td>
										<td>Pending</td>
									</tr>
								))}
							</tbody>
						</table>
					</CardBody>
					<CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
						<Button variant="outlined" size="sm">
							Previous
						</Button>
						<div className="flex items-center gap-2">
							<IconButton variant="outlined" size="sm">
								1
							</IconButton>
						</div>
						<Button variant="outlined" size="sm">
							Next
						</Button>
					</CardFooter>
				</Card>
			</main>
		</>
	);
};

export default PaymentHistory;