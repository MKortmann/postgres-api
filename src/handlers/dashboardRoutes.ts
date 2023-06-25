import express, { Request, Response } from 'express';

import { DashboardQueries } from '../services/dashboard';

const dashboardRoutes = (app: express.Application) => {
  app.get('/products_in_orders', productsInOrders);
  app.get('/users_with_orders', usersWithOrders);
  app.get('/five_most_expensive', fiveMostExpensive);
};

const dashboard = new DashboardQueries();

const productsInOrders = async (_req: Request, res: Response) => {
  const products = await dashboard.productsInOrders();
  res.json(products);
};
const usersWithOrders = async (_req: Request, res: Response) => {
  const products = await dashboard.usersWithOrders();
  res.json(products);
};

const fiveMostExpensive = async (_req: Request, res: Response) => {
  const products = await dashboard.fiveMostExpensive();
  res.json(products);
};

export default dashboardRoutes;
