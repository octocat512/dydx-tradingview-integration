import express, { Router } from 'express';
import dydxClient from '../services/client';
import createOrder from '../services/createOrder';
import getAccount from '../services/getAccount';
import {
	Market,
	AccountResponseObject,
	OrderResponseObject
} from '@dydxprotocol/v3-client';
import config = require('config');

const router: Router = express.Router();

router.get('/', async (req, res) => {
	// const markets = await dydxClient.public.getMarkets(Market.BTC_USD);
	const account = await getAccount();

	// res.send(account);

	// console.log(dydxClient.starkPrivateKey);
	// const apiKeys = await dydxClient.private.getApiKeys();
	// const apiKey = await dydxClient.ethPrivate.createApiKey(
	// 	'0x50fe1109188A0B666c4d78908E3E539D73F97E33'
	// );
	// const apiCredentials =
	// 	await dydxClient.onboarding.recoverDefaultApiCredentials(
	// 		'0x50fe1109188A0B666c4d78908E3E539D73F97E33'
	// 	);
	// res.send(apiCredentials);

	const result = await createOrder();
	res.send(result);

	// console.log(req);
});

router.post('/', async (req, res) => {
	// console.log(req.header);
	console.log(req.body);
	console.log(req.body['order']);
	// console.log(req);
});

export default router;