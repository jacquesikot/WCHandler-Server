import * as express from 'express';
import { Request, Response } from 'express';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

import { WC_CONSUMER_KEY, WC_CONSUMER_SECRET } from '../constants';

const woocommerce = new WooCommerceRestApi({
  url: 'http://astrosboutique.com',
  consumerKey: WC_CONSUMER_KEY,
  consumerSecret: WC_CONSUMER_SECRET,
  version: 'wc/v3',
});

class Products {
  public path = '/api/products';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.get(this.path, this.getProducts);
    this.router.get(this.path + '/categories', this.getCategories);
    this.router.post(this.path + '/categoriess', this.addCategory);
    this.router.post(this.path, this.addProduct);
    this.router.delete(this.path, this.deleteProduct);
  }

  private deleteProduct = async (req: Request, res: Response) => {
    try {
      const response = await woocommerce.delete(`products/${req.query.id}`, {
        force: true,
      });
      res.send(response.data);
    } catch (e) {
      console.log(e.response.data);
    }
  };

  private getProducts = async (_req: Request, res: Response) => {
    const products = await woocommerce.get('products');
    try {
      res.send(products.data);
    } catch (error) {
      console.error(error);
    }
  };

  private addProduct = async (req: Request, res: Response) => {
    const data = {
      name: req.body.name,
      regular_price: req.body.price,
      description: req.body.description,
      categories: [
        {
          id: req.body.category.id,
        },
      ],
    };

    try {
      await woocommerce.post('products', data);
      res.send('Product Added');
    } catch (e) {
      console.log(e.response.data);
    }
  };

  private getCategories = async (_req: Request, res: Response) => {
    try {
      const categories = await woocommerce.get('products/categories');
      res.send(categories.data);
    } catch (e) {
      console.error(e);
    }
  };

  private addCategory = async (req: Request, res: Response) => {
    const data = {
      name: req.body.name,
      image: req.body.image,
    };

    try {
      const category = await woocommerce.post('products/categories', data);
      res.send(category.data);
    } catch (e) {
      console.log(e.response.data);
      res.status(401).send('Bad Request');
    }
  };
}

export default Products;
