import DYDXConnector from './client';
import 'dotenv/config';

export const getAccount = async () => {
	try {
		const connector = await DYDXConnector.build();
		const account =
			await connector.client.private.getAccount(process.env.ETH_ADDRESS);

		if (Number(account.account.freeCollateral) == 0) {
			throw new Error('No freeCollateral. Deposit collateral first.');
		}
		return account;
	} catch (error) {
		console.error(error);
	}
};
