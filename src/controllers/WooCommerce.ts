import * as express from 'express';
import { Request, Response } from 'express';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

const woocommerce = new WooCommerceRestApi({
  url: 'http://astrosboutique.com',
  consumerKey: 'ck_2460bb859a68ed89dd61b366c938ad0e0268fe33',
  consumerSecret: 'cs_618366529939e6841cf58fef1dde5cf1146cdd76',
  version: 'wc/v3',
});
class WooCommerce {
  public path = '/api/woo';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.get(this.path, this.response);
  }

  private response = async (_req: Request, res: Response) => {
    const response = await woocommerce.get('products');
    console.log(response.data);

    res.send('okay');
  };
}

export default WooCommerce;
