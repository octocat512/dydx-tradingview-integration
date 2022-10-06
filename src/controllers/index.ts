import express from 'express';
import {
	createOrder,
	getAccount,
	buildOrderParams,
	exportOrder,
	validateAlert,
	checkAfterPosition
} from '../services';
import { OrderParams } from '../types';

const router = express.Router();

router.get('/', async (req, res) => {
	console.log('Recieved GET request.');

	const accountResult = await getAccount();
	console.log(accountResult);
	if (accountResult) {
		res.send('OK');
	} else {
		res.send('Error on getting account data');
	}
});

router.post('/', async (req, res) => {
	console.log('Recieved Tradingview strategy alert:', req.body);

	const validated = await validateAlert(req.body);
	if (!validated) {
		res.send('Error. alert message is not valid');
		return;
	}

	const orderParams: OrderParams | undefined = await buildOrderParams(req.body);

	let orderResult;
	if (orderParams) {
		orderResult = await createOrder(orderParams);
	}

	if (orderResult) {
		await exportOrder(
			req.body['strategy'],
			orderResult.order,
			req.body['price']
		);
	}

	checkAfterPosition(req.body);

	res.send('OK');
});

router.get('/debug-sentry', function mainHandler(req, res) {
	throw new Error('My first Sentry error!');
});

export default router;
