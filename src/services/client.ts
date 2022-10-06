import { DydxClient } from '@dydxprotocol/v3-client';
import config from 'config';
import 'dotenv/config';

class DYDXConnector {
	client: DydxClient;
	positionID = '0';
	static instance: DYDXConnector | null = null;

	public constructor() {
		if (
			!process.env.API_KEY ||
			!process.env.API_PASSPHRASE ||
			!process.env.API_PASSPHRASE
		) {
			throw new Error('API Key is not set in config file');
		}
		if (!process.env.STARK_PUBLIC_KEY || !process.env.STARK_PRIVATE_KEY) {
			throw new Error('STARK Key is not set in config file');
		}

		const apiKeys = {
			key: process.env.API_KEY,
			passphrase: process.env.API_PASSPHRASE,
			secret: process.env.API_SECRET
		};

		const starkKeyPair = {
			publicKey: process.env.STARK_PUBLIC_KEY,
			privateKey: process.env.STARK_PRIVATE_KEY
		};

		this.client = new DydxClient(config.get('Network.host'), {
			apiTimeout: 3000,
			networkId: config.get('Network.chainID'),
			apiKeyCredentials: apiKeys,
			starkPrivateKey: starkKeyPair
		});
	}

	static async build() {
		if(!this.instance) {
			const connector = new DYDXConnector();
			const account =
				await connector.client.private.getAccount(process.env.ETH_ADDRESS);
	
			connector.positionID = account.account.positionId;
			this.instance = connector;
		}

		return this.instance;
	}
}

export default DYDXConnector;
